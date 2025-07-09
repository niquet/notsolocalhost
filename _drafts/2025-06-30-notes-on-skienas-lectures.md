---
title: "Notes from Skiena’s CSE 373 Lectures"
slug: skiena-algorithms
date: 2025-06-25
layout: default
---

- I've had a course based on Skiena's book in my own university time
- It's been a while
- It's fun to refresh these topics
- Also some notes from the book in here (maybe)

## Introduction to algorithms

- Algorithm: a way of solving a general problem; turns a specified input into a specified output
- Efficient: as per big O notation
- Correct: always, for any input, returns specified output
- Correct algorithms "provably" do what we want it to do (also called provably correct algorithms)
- Different levels of detail when describing algorithms:
    - Describe the idea of an algorithm in English
    - Describe more complex ideas within the algorithm using pseudocode or a picture
    - Describe complex algorithms by implementing them in a specific programming language
- Proof and counterexample: an algorithm has to be proven correct or "defeated" by showing counterexamples to it
- **Searching for counterexamples** is the best way to disprove the correctness of a heuristic
    1. Think about small examples
    2. Think about examples with ties on your decision criteria
    3. Think about examples with extremes of big and small
- Mathematical induction is a very useful method for proving the correctness of recursive algorithms
- Recursion and induction are the same basic idea: (1) basis case, (2) general assumption, (3) general case
- "Once we proof an algorithm is NP-complete, we can assume that there is no _fast_ algorithm"

## A scheduling problem

**Input:** A set _I_ of _n_ intervals on the line.<br>
**Output:** Wha is the largest subset of mutually non-overlapping intervals which can be selected from _I_?

- Idea: earliest job first: wrong; first job might be too long for other jobs to be selected
- Idea: shortest job first; might prevent us from taking two longer jobs which barely overlap
- Idea: 

## Asymptotic notation

- 

## Program analysis

- 

## Elementary data structures

- 

## Greedy algorithms

- 

## Sorting

- 

## Hashing

- 

## Graph algorithms

- 

## Backtracking

- 

## Dynamic programming

- 

## Credits

[1] S. Skiena, "Analysis of Algorithms Lectures," CSE 373, Department of Computer Science, Stony Brook University. [Online]. Available: [https://www3.cs.stonybrook.edu/~skiena/373/videos/](https://www3.cs.stonybrook.edu/~skiena/373/videos/). [Accessed: 25-Jun-2025].
