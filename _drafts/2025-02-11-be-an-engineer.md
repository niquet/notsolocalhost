---
title: "Be(come) an Engineer"
date: 2025-02-11
layout: post
---

- Tech is built on first principles
- Fundamentals on which the latest tools are built rarely change
- Have basic understanding of all fundamentals (jack-of-all trades) or go deep in one area
- There is no wrong or right, only you
- Getting better is full of trial and error, experimentation, experience

## Communication Protocols

- Link services together
- Understand how protocols work
- Almost all protocols we use and love are built on top of either TCP or UDP
- Understanding the differences between them helps you make the right choice
- Anything you build on top of these protocols must adhere to their fundamental properties
- It all depends on what you're building
- HTTP
- HTTP/2
- HTTP/3
- You need to understand how things work in order to improve them
- Using any protocol comes with a cost especially while building APIs
- Understanding that cost will help you make better informed decisions
- Protocols such as WebSockets, gRPC or just raw TCP/UDP (real-time bidirectional communication protocols) can be used for real-time communication between two services
- It is possible to go as deep as desired in any protocol
- Maybe one day you will write an RFC proposing a new protocol

## Web Servers

- Deliver static or dynamic content served on top of the HTTP protocol
- If you build a Web API you may spin up your own web server in your language of choice or use a web framework
- Modern web servers support both HTTP/1.1 and HTTP/2
- HTTP/3 is slowly getting support as its newer protocol
- Configuring your web server with the appropriate protocol is critical for performance and resilience
- The internal architecture of web servers can also differ
- Web servers can be single or multithreaded
- They can have one thread or multiple listener threads
- There are many ways client connections can be accepted and distributed among the threads
- If you choose an off-the-shelf web server you are stuck with its architecture
- If you build your own from scratch you get to choose the architecture that is right for you
- Additionally, web servers can sit any where in the stack
- 

## Credits

- H. Nasser. *"[How to Become a Good Backend Engineer (Fundamentals)](https://medium.com/@hnasr/how-to-become-a-good-backend-engineer-fundamentals-4dcc4a16ce55),"* Dec 3, 2022. Medium. [Online].
- 
