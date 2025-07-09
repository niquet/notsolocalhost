---
title: "Idiomatic Error Handling in Go"
data: 2025-03-12
layout: post
---

- Go’s built-in errors don’t contain stack traces
- Nor do they support conventional `try`/`catch` methods to handle them
- Errors in Go are just values returned by functions (lightweight, simple)

---

- An error is anything that implements the `Error()` methood

```go
type error interface {
    Error() string
}
```

- Errors can also be constructed on the fly using Go’s built-in `errors` or `fmt` packages
- `fmt.Errorf` comes in handy when used to wrap another error with the `%w` format verb

```go
package main

import (
    "errors"
    "fmt"
)

func DoSomething() error {
    return errors.New("something didn't work")
}

func Divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("can't divide '%d' by zero", a)
    }
    return a / b, nil
}
```

- A few notes
- Errors can be returned as `nil` (also the zero value of an error in Go)
- Checking `if err != nil` is the idiomatic way to determine if an error was encountered (replaces the `try`/`catch` statements)
- Errors are typically returned as the last argument in a function
- When returning an error, the other arguments returned by the function are typically returned as their respective zero value
- Error messages are usually written in lower-case and don't end in punctuation
- Exceptions can be made, e.g., when including a proper noun, a function name, etc.

---

- 

## Credits

- https://earthly.dev/blog/golang-errors/
- 
