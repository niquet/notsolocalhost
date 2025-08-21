---
title: "You’re Not Here to Read Docs"
slug: youre-not-here-to-read-the-docs
date: 2025-07-14
layout: default
---

Picture this: You just landed a new role. Or stumbled upon an open-source project that sparks your interest. Maybe it's some wild idea of your own. Either way, you're thrust into a brand-new codebase. Unfamiliar tools. New faces might surround you. There’s a lot to figure out, fast.

There's the codebase itself—that large collection of files, frameworks, and architectural decisions pieced together with varying degrees of care. But if you're not going alone, people become essential. So, how do you tackle onboarding? Should you bury yourself in docs first, or get hands-on right away?

Reddit user [tr14l](https://www.reddit.com/user/tr14l/) offers a satirical take on the absolute worst approach:

> First, you open docs and read the title of every 4th item. Then, in stand up for the next 4 weeks you mention the names of those doc pages. Then, once you've milked that you talk about environment setup for another 2 weeks. At the end of the second week you'll have to mention some security or access problem that you are waiting to hear back from. Try to stretch that out for another 2 weeks. Then you have a family emergency for a week or two. By then you should be on final interview stage for the next company. Put in your two weeks. Rinse and repeat for 15 years.

The point? Avoid real work. Coast. Complain. But that’s not you. You're driven to create, to grow, to add real value—not to read docs and wait around.

This note explores effective onboarding. On a team, how do you tap colleagues' knowledge without draining their time? How do you make sense of a large, unknown codebase? We’ve both been there—let’s dive in.

## Ask people without draining them

Going solo? Skip this part. But for team efforts, the people element is unavoidable.

Others rely on you. You rely on others. To get unblocked, seek guidance, or—hear me out—borrow hard-won experience during those early days. The trick? Do it thoughtfully. Respect their time and focus.

Andrew Bosworth's ["Career Cold Start Algorithm"](https://boz.com/articles/career-cold-start) offers a simple framework. It caps the burden you place on any single person to just 30 minutes—one focused meeting to accelerate your understanding. Here's what to do:

1. Find someone on the team. Ask for a 30-minute meeting.
2. Follow a simple checklist during that meeting:
  - _First 25 minutes:_ Ask them to share everything they think you should know. Take notes. Pause them to clarify anything you don’t understand.
  - _Next 3 minutes:_ Ask, “What are the biggest challenges the team is facing right now?”
  - _Last 2 minutes:_ Ask, “Who else should I talk to?” Write down every name.
3. Repeat this process for every name you're given.
4. Stop when you hear no new names.

Ryan Peterman [suggests a practical twist](https://www.developing.dev/p/how-to-onboard) by narrowing the search space. Start by asking your manager or tech lead for the initial list of people to talk to. Ask those people targeted questions during the 30 minute meeting:

- Learning team direction: “What is the motivation behind your work?” “How does this fit into the team’s plan?” “What wins are we expecting from this?”
- Learning system design: “Where does your work fit into the overall system?” “What pieces does our team own?”
- Learning who knows what: "Who knows the most about [tech area]?" "If [tech area] breaks, who can fix it?"

By asking the right people the right questions, you’ll get up to speed faster—without draining your new colleagues.

<p style="text-align: center; margin: 2em 0;">~ ~ ~</p>

Sadly this approach falls apart when you're outside a formal team structure. Reaching out to open source contributors? Contacting strangers online? (_Stranger danger._) The Career Cold Start Algorithm hits a wall. These people don't owe you 30 minutes of their time. Fear not—other strategies can bridge that gap.

Join the conversation where it's already happening. Most distributed group efforts maintain active forums through GitHub Discussions, Slack channels, Discord servers, or mailing lists. These spaces buzz with support requests and collaborative problem-solving.

Introduce yourself. Share your background. Express genuine interest in contributing. Many communities welcome newcomers warmly and offer guidance to those who approach respectfully.

Participate before you ask. Jump into existing discussions. Comment thoughtfully on issues. Help others as your comfort grows. This builds goodwill and demonstrates your commitment to the project.

Seek mentorship. Some projects offer formal mentoring programs that pair newcomers with experienced contributors. Others provide informal guidance through dedicated channels or office hours. These relationships make onboarding smoother and more personal—transforming what could be an intimidating process into a supported journey.

The key difference? You're earning your place in the conversation rather than requesting it outright. Build relationships through contribution, not through cold outreach.

"How can I contribute?" you ask. "The codebase is massive." Lucky you—that's exactly what we're tackling next.

## Navigate codebases gracefully








- How do they approach their workflow?
- What style conventions do they follow? At what pace do they expect contributions?
- These questions shape how you fit in.

---

- You won't get far if all you do is research
- You won't get far if you don't research at all
- Get your hands dirty while understanding some of the theory of what you're touching

---

- You should never skip the code part
- Figuring things out with a search engine, text books, papers, reference software, and sheer will power (aka persistence) is a life skill best learned early

---

- You’ll have to ramp up many times in your career
- As a rule of thumb, you should expect to be a solid contributor on a new team after 3 months
- That means you’d start to also contribute to the team’s direction by then
- 

People

- You can't function in a team if you don't know how to work with others
- Being good with computers is being good with code
- Life is about people though

Code

- Your immediate priority should be to start landing code
- This will help you tie your high-level understanding to the codebase
- Also, it’s the fastest way to start having an impact
- _Land a ton of low-risk changes (~1-2 per day) that improved the codebase_
- You don’t need to write that much code but you get the idea
- This helped him learn faster and get comfortable making changes
- To get started, your manager should pair you with an “onboarding buddy” who’ll provide hands-on support
- The more mature your team’s onboarding process is the less you’ll need their help
- A great onboarding process has:
  - Up-to-date wiki on setting up your dev environment
  - Async support channels (e.g. Q&A groups, eng chat threads) to get small technical questions answered
  - Backlog of unambiguous, low-risk tasks 
- You have a unique asset as someone who is onboarding
- Your fresh perspective can help you see gaps in the current processes
- If you see problems, don’t just unblock yourself
- Take the opportunity to also fix it for future hires

---

- Familiarise yourself with the architecture first
  - Where is the code deployed?
  - Can you go there and see it running?
  - Can you test in a real environment?
  - How is data entering and leaving the system?
- Follow it through end to end.
- Code is easy to understand when you know what it's trying to achieve. never start with the code; end with it!

- Try to follow the "usual" flow through the code
- Basically look at a typical endpoint (for example) and try to understand where all the data flows

- They all have the same issue, lack of documentation that maps to the source code implementation!

- I went through this recently, best way for me was to just take tickets that touch all different parts of the code, instead of focusing on one service or module

- I've found the best way to learn a system is to investigate/fix reported bugs, but if that's not quite what you've been tasked with that can be challenging
- My other advice would be to pick a piece of functionality you observe in the system itself, and try and trace through the codebase to see how it works
- (Documentation is always the most helpful, but also has a nasty habit of falling out of date too
- But when you don't have it at all, out of date would be more helpful than nothing!)

- Follow a sort of “domain path” or the journey some bit of data takes, just cmd+clicking through to the classes and services, and if something feels like a dead end or black hole, make a point to come back but don’t let it hang you up from grokking the general a-to-b path

- I never try to familiarize myself with the entire code base
- That will come naturally, with time
- The architecture yes, the user interface (if there is one), somewhat
- Beyond that, I work the stories
- Over time, that will guide me to an understanding of most of the app
- Not all, there will always be dark corners no one understands or touches, but enough of it to feel comfortable saying I know the code
- Architecture is top down, starting as high as federal government regulations and going as low as the code, but the code exists on the very bottom of that ladder
- Often, a product's architecture will involve many code bases spread across teams, languages, and even continents

- Every time you're working on something, dig a bit deeper than you need to get the job done


- For me I use top down approach.

- Understood the business use case. Understood architecture (modules and their purpose)
- Understood where is the detail implementation (it will be helpful if there is flow diagram and where it is being implemented), and with proper context, go through the code base
- Diving to codebase without context is a nightmare

- What would the software architecture exactly be?
- The tools or design patterns?
- what is the deployment platform
- is it api or monolith.
- does it have gateway etc
- which modules responsible for which use case

---

Undersanding a code base:

Code ditribution

- Overall "idea" of the code distribution, or where the meat is, by using `cloc . --by-file`
- This shows you a listing of files and their respective number of lines of code and comments
- You instantly get an idea of the "big" files of the project you probably should get to know
- You also see the ratio comment/code and can start documenting and writing tests as you go
- It will help you understand the project, and will be useful for everyone and in refactoring

Structure

- 

## Credits

\[1\] Ryan Peterman, "How To Onboard," developing.dev, 2025-07-14. [Online]. Available: [https://www.developing.dev/p/how-to-onboard](https://www.developing.dev/p/how-to-onboard). [Accessed: 2025-07-14].

\[2\] A. Bosworth, "A Career Cold Start Algorithm," boz.com, Jul. 14, 2025. [Online]. Available: [https://boz.com/articles/career-cold-start](https://boz.com/articles/career-cold-start). [Accessed: 2025-07-15].

\[3\] Reddit user community, "How to efficiently familiarise yourself with a large codebase at a new job?", r/ExperiencedDevs, Reddit, Aug. 23, 2022. [Online]. Available: [https://www.reddit.com/r/ExperiencedDevs/comments/wud22m/how_to_efficiently_familiarise_yourself_with_a/](https://www.reddit.com/r/ExperiencedDevs/comments/wud22m/how_to_efficiently_familiarise_yourself_with_a/). [Accessed: 2025-07-14].

\[4\] Hacker News user community, "Ask HN: How do you efficiently get up to speed on a large codebase?", Hacker News, May 13, 2019. [Online]. Available: [https://news.ycombinator.com/item?id=19924100](https://news.ycombinator.com/item?id=19924100). [Accessed: 2025-07-15].

\[5\]
