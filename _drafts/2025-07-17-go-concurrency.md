---
title: "Concurrency in Go"
slug: gp-concurrency
date: 2025-07-17
layout: default
---

Personal notes on the book "Concurrency in Go" by Katherine Cox-Buday. Reference: Katherine Cox-Buday. *[Concurrency in Go: Tools and Techniques for Developers](https://katherine.cox-buday.com/concurrency-in-go/)*. O'Reilly Media, 2017.

**Table of Contents**

- [Concurrency Semantics](#concurrency-semantics)
- [Communicating Sequential Processes](#communicating-sequential-processes)
- [Concurrency Building Blocks (in Go)](#concurrency-building-blocks-in-go)
- [Concurrency Patterns (in Go)](#concurrency-patterns-in-go)
- [Concurrency at Scale](#concurrency-at-scale)
- [Goroutines and the Go Runtime](#goroutines-and-the-go-runtime)

## Concurrency Semantics

- "Concurrency", "asynchronous", "parallel", and "threaded" are distinct concepts
- A process is considered **concurrent** if it occurs simultaneously with one or more other processes
- Amdahl's Law models potential performance gains from implementing solutions in a parallel manner
  - It helps determine whether parallelization is an effective strategy for addressing performance concerns in a system
  - _Gains are limited by the portion of the program that must be executed sequentially_
  - Evaluate whether significant performance improvements can be achieved by simply increasing the number of cores available to your program
  - Consider if the problem can be reduced to how to combine and store results obtained in parallel
- If your problem is **embarrassingly parallel**, design your application to scale horizontally whenever possible
- Cloud computing introduces challenges such as:
  - Provisioning resources
  - Communication between machine instances
  - Aggregating and storing results
  - Modeling code for concurrent execution
- Web scale enables properties like:
  - Rolling upgrades
  - Elastic, horizontally scalable architecture
  - Geographic distribution
- These properties introduce new levels of complexity regarding comprehension and fault tolerance

### Concurrency is Hard

- 

## Communicating Sequential Processes
## Concurrency Building Blocks (in Go)

- `sync` package: handles Go's memory access synchronization
- 

## Concurrency Patterns (in Go)
## Concurrency at Scale
## Goroutines and the Go Runtime