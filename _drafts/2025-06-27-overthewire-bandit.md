---
title: "OverTheWire Bandit Walkthrough (0–34)"
slug: overthewire-bandit
date: 2025-06-26
layout: default
---

- Beginner wargame that teaches the basics for other wargames
- You start at level 0 and try to work your way up to level 34
- You will encounter many situations in which you have no idea what you are supposed to do
- The purpose of this game is for you to learn the basics
- Part of learning the basics, is reading a lot of new information
- First, if you know a command, but don’t know how to use it, try the manual (man page) by entering `man <command>`
- Second, if there is no man page, the command might be a shell built-in. In that case use the `help <X>` command
- Also, your favorite search-engine is your friend; learn how to use it!

## Level 0

- Pretty straight forward
- Password is already given
- Let's look at the SSH (Secure Shell) protocol
- Method for securely sending commands to a computer over an unsecured network
- Authenticates and encrypts connections between devices
- SSH also allows for tunneling, or port forwarding, which is when data packets are able to cross networks that they would not otherwise be able to cross
- Tunneling is a method for moving packets across a network using a protocol or path they would not ordinarily be able to use
- SSH is often used for controlling servers remotely, for managing infrastructure, and for transferring files
- What SSH does
    - SSH sets up a connection between a user's device and a faraway machine
    - It uses encryption to scramble the data that traverses the connection
    - It wraps data packets with additional information — called headers — to change their destination (tunneling)
    - SSH tunnels use a technique called port forwarding to send packets from one machine to another
    - Port forwarding sends data packets directed at an IP address and port on one machine to an IP address and port on a different machine
- How SSH works
    - SSH runs on top of the TCP/IP protocol suite
    - TCP/IP transports and delivers data packets
    - The use of TCP is one way that SSH is different from other tunneling protocols, some of which use the faster but less-reliable UDP instead
    - SSH is "secure" because of public key cryptography
    - In an SSH connection, both sides have a public/private key pair, and each side authenticates the other using these keys
    - While public key cryptography authenticates the connected devices in SSH, a properly secured computer will still require authentication from the person using SSH
    - Often this takes the form of entering a username and password
    - Once authentication is complete, the person can execute commands on the remote machine as if they were doing so on their own local machine
- Linux and Mac operating systems come with SSH built in
- Windows machines may need to have an SSH client application installed
- On Mac and Linux computers, users can open the Terminal application and directly enter SSH commands
- Port 22 is the default port for SSH
- Sometimes, firewalls may block access to certain ports on servers behind the firewall, but leave port 22 open
- SSH is therefore useful for accessing servers on the other side of the firewall: packets directed to port 22 are not blocked, and can then be forwarded to any other port
- SSH access typically comes with elevated privileges, such as the ability to install applications on a server or delete, alter, or extract data
- As a result SSH access can be harmful in the hands of an attacker — or even a well-intentioned insider
SSH has been used in a number of documented attacks in order to exfiltrate private data, open backdoor routes into a secure network, and gain root access on servers
- SSH can also pass through firewalls that leave port 22 unblocked (as many do), allowing attackers to slip inside of secure networks
- Attackers can also steal SSH keys in order to access private computers and servers
- In fact, SSH key management is a major security problem for large organizations, as their many servers may use thousands or even millions of keys, and tracking and updating those keys manually is close to impossible
- SSH keys do not expire unless they are explicitly revoked, so once an attacker gains a key, they may have persistent access for months or years

- `man ssh` - OpenSSH remote login client

## Credits

- [https://overthewire.org/wargames/bandit/](https://overthewire.org/wargames/bandit/)
- [https://www.cloudflare.com/learning/access-management/what-is-ssh/](https://www.cloudflare.com/learning/access-management/what-is-ssh/)
- []()
