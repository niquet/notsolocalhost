---
title: "Illustrated Guide to Go"
data: 2025-04-01
layout: post
---

Context

- A `Context` carries deadlines, cancellation signals, and other scoped values across API boundaries and goroutines
- `Context` comes with a `Done()` channel, signals when cancelled
- `Context`'s `Err()` explains why the `Done()` channel was closed

goroutines

- Lightweight thread of execution
- goroutines are run concurrently by the Go runtime
- Use `go` keyword to execute a function concurrently (can be an anonymous function call)
- Wait for goroutines to finish using `WaitGroup`

Channels

- Connect goroutines
- Send values into channels from one goroutine, receive those values in another goroutine
- Create a new channel with make(chan val-type), channel gets same type
- Send a value into a channel using the channel `<-` syntax
- The `<-channel` syntax receives a value from the channel
- By default sends and receives block until both the sender and receiver are ready
- You can use a blocking receive to wait for a goroutine to finish
- When waiting for multiple goroutines to finish, you may prefer to use a `WaitGroup`
- By default channels are unbuffered: they will only accept sends (`chan <-`) if there is a corresponding receive (`<- chan`) ready to receive the sent value
- Buffered channels accept a limited number of values without a corresponding receiver for those values
- Later we can receive these buffered values as usual

Channel synchronization

- We can use channels to synchronize execution across goroutines
- Example:

    ```go
    package main

    import (
        "fmt"
        "time"
    )

    func worker(done chan bool) {
        fmt.Print("working...")
        time.Sleep(time.Second)
        fmt.Println("done")

        done <- true
    }

    func main() {

        done := make(chan bool, 1)
        go worker(done)

        <-done
    }
  ```

Channel directions

- Specify if a channel is meant to only send or receive values when using them as function parameters
- This specificity increases the type-safety of the program
- Example:

    ```go
    package main

    import "fmt"

    // accepts a channel for sending values
    func ping(pings chan<- string, msg string) {
    pings <- msg
    }

    // accepts a channel for receiving, a channel for sending values
    func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
    }

    func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
    }
    ```

Select

- `select` lets you wait on multiple channel operations
- Implementing timeouts in Go is easy and elegant thanks to channels and select
- Common pattern to prevent goroutine leaks in case the channel is never read: buffer a channel (results in nonblocking goroutine)
- `select` can be used to implement a timeout: receive from a channel to await the result and `<-time.After` awaits a value
- `select` then proceeds with the first receive that's ready (timeout case if the operation takes more than the allowed time)

Non-blocking channel operations

- Basic sends and receives on channels are blocking
- We can use `select` with a `default` clause to implement _non-blocking_ sends, receives, and even non-blocking multi-way `select`s
- Non-blocking receive: if a value is available on the channel, `select` will take the receive case; if not it will immediately take the `default` case
- Non-blocking send works similarly
- We can use multiple cases above the `default` clause to implement a multi-way non-blocking `select`

Closing channels

- Closing a channel indicates that no more values will be sent on it
- Can be useful to communicate completion to the channel’s receivers
- Special 2-value form of receive (`val, ok := <- channel`): `ok` will be false if the channel has been closed and all values in the channel have already been received
- Reading from a closed channel succeeds immediately, returning the zero value of the underlying type
- The optional second return value is `true` if the value received was delivered by a successful send operation to the channel
- It returns `false` if it was a zero value generated because the channel is closed and empty

Range over channels

- We can also use the `range` syntax to iterate over values received from a channel
- This `range` iterates over each element as it’s received from queue
- Example that closes a a non-empty channel and still has the remaining values be received:

    ```go
    package main

    import "fmt"

    func main() {

        queue := make(chan string, 2)
        queue <- "one"
        queue <- "two"
        close(queue)

        for elem := range queue {
            fmt.Println(elem)
        }
    }
    ```

Timers

- `Timer` makes it easy to execute at some point in the future
- Timers represent a single event in the future
- Timer receives how long yo wait and it provides a channel `<-timerName.C` that will be notified at that time
- Advantage over `time.Sleep`: Timer can be canceled before it fires

Tickers

- Timers: do something _once_ it the future
- Tickers: do something repeatedly at regular intervals
- Tickers use a channel `<-ticker.C` that is sent values
- Tickers can be stopped like timers

Worker pools

- Worker: is run as several concurrent instances
- Workers will receive work through channels, send results through other channels
- Ensure that worker goroutines have finished by
    a. collecting results
    b. _or_ using a WaitGroup

WaitGroups

- Used to wait for multiple goroutines to finish
- If a WaitGroup is explicitly passed into functions, it should be done by _pointer_
- Wrap the worker call in a closure that makes sure to tell the WaitGroup that this worker is done
- This way the worker itself does not have to be aware of the concurrency primitives involved in its execution
- BLock until the WaitGroup counter goes back to 0 (all the workers notified they're done)
- This approach has no straightforward way to propagate errors from workers

Rate limiting

- Mechanism for controlling resource utilization, maintaining quality of service
- Go supports rate limiting with goroutines, channels, and tickers
- Basic rate limiting: `limiter` (ticker) channel unblocks on receive
- Bursty rate limiter: allow short bursts in the rate limiting by buffering the limiter channel

Atomic counters

- Primary mechanism for managing state in Go is communication over channels
- Another option for managing state is using the `sync/atomic` package for atomic counters accessed by multiple goroutines
- If you don't use `sync/atomic`, goroutines interfere with each other (and potentially cause data race failures)

Mutexes

- Another tool for managing more complex state in Go
- Used to safely access data across multiple goroutines
- Mutexes _must not_ be copied, pass only by pointer
- The same holds true for embedding a `Mutex` within a `struct`
- Lock a `Mutex` before accessing fields it protects, unlock at the end of the function using a `defer` statement
- The zero value of a mutex is usable as-is (no initialization required)
- Example: increment a named counter using several concurrently running goroutines:

    ```go
    package main

    import (
        "fmt"
        "sync"
    )

    type Container struct {
        mu       sync.Mutex
        counters map[string]int
    }

    func (c *Container) inc(name string) {

        c.mu.Lock()
        defer c.mu.Unlock()
        c.counters[name]++
    }

    func main() {
        c := Container{

            counters: map[string]int{"a": 0, "b": 0},
        }

        var wg sync.WaitGroup

        doIncrement := func(name string, n int) {
            for i := 0; i < n; i++ {
                c.inc(name)
            }
            wg.Done()
        }

        wg.Add(3)
        go doIncrement("a", 10000)
        go doIncrement("a", 10000)
        go doIncrement("b", 10000)

        wg.Wait()
        fmt.Println(c.counters)
    }
    ```

Stateful goroutines

- Mutexes explicitly lock to synchronize access to shared state across goroutines
- Another option is to use the built-in synchronization features of goroutines and channels
- This channel-based approach aligns with Go’s ideas of sharing memory by communicating and having each piece of data owned by exactly 1 goroutine
- State is owned by a single goroutine—guarantees that the data is never corrupted with concurrent access
- Reading and writing to the sate is done by sending messages to the goroutine that owns the state
- The owning goroutine sends corresponding replies
- Channel-based approach useful for:
    - Scenarios with multiple channels
    - Cases where managing multiple mutexes is prone to errors
- Choose the approach that:
    - Feels most natural to you
    - Makes it easier to verify program correctness
    - Both methods have their place depending on the situation

    ```go
    package main

    import (
        "fmt"
        "math/rand"
        "sync/atomic"
        "time"
    )

    // Encapsulates the read requests to the owning goroutine
    type readOp struct {
        key  int
        resp chan int
    }

    // Encapsulates the write requests to the owning goroutine
    type writeOp struct {
        key  int
        val  int
        resp chan bool
    }

    func main() {

        var readOps uint64
        var writeOps uint64

        reads := make(chan readOp)
        writes := make(chan writeOp)

        go func() {
            var state = make(map[int]int)
            for {
                select {
                case read := <-reads:
                    read.resp <- state[read.key]
                case write := <-writes:
                    state[write.key] = write.val
                    write.resp <- true
                }
            }
        }()

        for r := 0; r < 100; r++ {
            go func() {
                for {
                    read := readOp{
                        key:  rand.Intn(5),
                        resp: make(chan int)}
                    reads <- read
                    <-read.resp
                    atomic.AddUint64(&readOps, 1)
                    time.Sleep(time.Millisecond)
                }
            }()
        }

        for w := 0; w < 10; w++ {
            go func() {
                for {
                    write := writeOp{
                        key:  rand.Intn(5),
                        val:  rand.Intn(100),
                        resp: make(chan bool)}
                    writes <- write
                    <-write.resp
                    atomic.AddUint64(&writeOps, 1)
                    time.Sleep(time.Millisecond)
                }
            }()
        }

        time.Sleep(time.Second)

        readOpsFinal := atomic.LoadUint64(&readOps)
        fmt.Println("readOps:", readOpsFinal)
        writeOpsFinal := atomic.LoadUint64(&writeOps)
        fmt.Println("writeOps:", writeOpsFinal)
    }
    ```

## 

- 

## Credits

- M. McGranaghan, E. Bendersky. *“[Go by Example: Context](https://gobyexample.com/context)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Goroutines](https://gobyexample.com/goroutines)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Channels](https://gobyexample.com/channels)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Channel Buffering](https://gobyexample.com/channel-buffering)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Channel Synchronization](https://gobyexample.com/channel-synchronization)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Channel Directions](https://gobyexample.com/channel-directions)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Select](https://gobyexample.com/select)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Timeouts](https://gobyexample.com/timeouts)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Non-Blocking Channel Operations](https://gobyexample.com/non-blocking-channel-operations)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Closing Channels](https://gobyexample.com/closing-channels)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Range Over Channels](https://gobyexample.com/range-over-channels)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Timers](https://gobyexample.com/timers)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Tickers](https://gobyexample.com/tickers)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Worker Pools](https://gobyexample.com/worker-pools)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: WaitGroups](https://gobyexample.com/waitgroups)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Rate Limiting](https://gobyexample.com/rate-limiting)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Atomic Counters](https://gobyexample.com/atomic-counters)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Mutexes](https://gobyexample.com/mutexes)."* Go by Example. [Online].
- M. McGranaghan, E. Bendersky. *“[Go by Example: Stateful Goroutines](https://gobyexample.com/stateful-goroutines)."* Go by Example. [Online].

- J. Almeida. *“[Building a Worker Pool in Golang](https://jmdalmeida.medium.com/building-a-worker-pool-in-golang-1e6c0fdfd78c),”* Aug 2, 2017. Medium. [Online].
- 
