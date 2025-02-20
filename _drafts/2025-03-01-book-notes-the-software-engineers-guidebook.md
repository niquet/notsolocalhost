---
title: "Book Notes #1: \"The Software Engineer's Guidebook\" by Gergely Orosz"
date: 2025-02-14
layout: post
---

- Notes on _"The Software Engineer's Guidebook"_ by Gergely Orosz

## Part II: The Competent Software Developer

- Software development/engineering takes years to master
- Better companies put reasonable day-to-day expectations in place
- Almost all companies expect software developers to progress to senior level
- Common expectations below
    - Typically handles smaller tasks or projects with some guidance
    - Follows team practices in development and architecture
    - Seeks feedback on designs and might take the initiative generally
    - Seeks help and mentorship while being eager to learn
    - Usually has 0-5 years of industry experience

- Common titles
    - Software Engineer (SWE), SWE 2
    - Developer, Software Developer (SDE), SDE 2
    - Member of Technical Staff (MTS)

### Getting Things Done

- Getting things done, reliably: be good at breaking down work, be realistic in your estimates, unblock yourself autonomously, deliver quality work
- Build a reputation for getting things done reliably
- Several approaches to growing as a developer:
    - Focus on the most important piece of work
    - Unblock yourself
    - Break down the work
    - Estitmate the duration of work
    - Seek out mentors
    - Keep your "goodwill balance" topped up
    - Take the initiative

### Focus on the most important piece of work

- Easy to get overwhelmed and feel like you're not making progress
- Simplify your work life:
    - What's the single most important task on your list?
    - If you could only do one thing this week, what would it be?
- Your answer is your #1 priority
- Identify it and make sure you definitely, absolutely deliver that pieve of work on time

- Make a habit of always completing your #1 priority
- Even it means turning down other tasks, skipping meetings, and pushing back on other matters

- Learn to say "no"
- Usually, balancing everything is manageable, until the plate is so full there's no time to work on the most important stuff
- You don’t need to turn down everything, but when push comes to shove, and you’re at risk of not completing your #1 priority task, then do say, “no”
- Good ways to turn down other things
    - "Yes, I'd like to help, but ..."
    - "I can either take a look at this when I've finished ..., or I will have to push back on my commitment to ... because I can't do both."
    - "Yes, I’d like to go, BUT I am swamped with work I need to finish. Would you mind sending over the meeting notes afterward so I can catch up? I’d be grateful. Thanks a lot!"

### Unblock yourself

- _Know when you're blocked_ and admit when you're stuck
- Rule of thumb for catching yourself being blocked: If you go more than 30 minutes without meaningful progress (an hour at most)
- Try different unblocking approaches when blocked
    - Explain your problem and teh approaches already tried to a rubber duck (rubber-ducking) -> verbalize your problem
    - Sketch out the problem on a sheet of paper -> visualize your problem
    - Read documentation, references for the technology you're blocked on -> check for "misuse" and readily available features
    - Search online for similar problems; make sure to describe your problems in various ways
    - Post a question on a programming Q&A site; also check StackOverflow or similar -> explaining the problem might give you additional ideas on how to solve it
    - Take a break, go for a walk, or switch to an unrelated task -> getting a fresh perspective when coming back to the blocker
    - Start from scratch, or undo all changes—pay closer attention to the process the second time around

- Get support: some blockers are due to a lack of knowledge, experience, or access to the right people
- Contact other developers who could help
- Easy way to start to get unblocked: "Hey team, I’m stuck on this problem. Can anyone lend a hand, perhaps pair with me on it?"

- Special kind of blocker: blocked by waiting on somebody
- Learn to escalate
    - Aim to not harm personal relationships when you escalate (good relationships >> getting tasks done)
    - An engineer who likes working with you is more likely to help
    - When considering whether to escalate beyond your team, discuss it with your manager and teammates, first
- Gergely's approach to escalating
    - Explain why help is needed; give context so they understand the importance
    - If nothing happens, ask why
    - If still nothing happens, warn about the potential of excalation
    - And if still nothing happens, escalate involving my manageer, the other person's manager, or both

- The larger the company, the more blockers are not technology problems
- Aim to make an excalation a win-win outcome
- When the other person does what you requested, thank them and let people know that they helped

### Unblocking yourself cheatsheet

- Planning
    - Situation: Not enough clarity on what to do (“missing information” blocker)
    - Behavior: Make clear what information is missing and escalate to colleagues who can help

    - Situation: Not knowing who to consult for information about a certain area (“missing
information” blocker)
    - Behavior: Ask for help from your lead or manager in identifying these people, then make a list of points of contact; consider sharing it with your team

- Building
    - Situation: New language or framework (“missing information” blocker)
    - Behavior: Learn it, ask for recommended learning resources, find the documentation, source code, and the people who created it; start small by learning just enough to solve your problem, before diving deeper in

    - Situation: Error messages that make no sense and googling doesn’t help (“missing information”blocker)
    - Behavior: Try to solve it yourself, then pair with a colleague or reach out to team who built the failing component; if you get stuck for some time, ask your team for help and fresh ideas

    - Situation: Puzzled about how something works (“missing information” blocker,) such as a tool, a framework, or some coding construct
    - Behavior: Try decomposing it by drawing it, looking at the source code, and doing some research; if you don’t make progress, ask for help from a more experienced colleague and explain what you’ve done so far; if there’s nobody experienced enough on your team, try further afield: ping people you know, or ask your manager who to contact

    - Situation: Build problems (“missing information” or “waiting on others” blockers,) like a build failing, strange errors, or unusual slowness
    - Behavior: Read up on the build tooling and see if you can figure it out; a safer bet is to contact the person or team who set up the build and ask for pointers on debugging the issue; if there’s a dedicated person or team for the build, they might need to do the work, so ask and then escalate, if needed; or offer to do the actual work of investigation and making a fix, and only ask for pairing

    - Situation: Missing dependency on another team/service that arises midway through a task(“waiting on others” blocker) such as an API not working as needed, or components or systems not being ready
    - Behavior: There’s not much you can do, beyond letting the other party know they’re a blocker, escalate, and pause this workstream – or try to do a workaround; involve your manager, or at least inform them

    - Situation: Access problems (“waiting on others” or “missing information” blocker.) such as no access to systems or data for making changes as part of your work
    - Behavior: Contact your manager, as access rights almost always go through them; explain the problem and why you need access; or ping more tenured colleagues, who probably went through the same problem before

    - Situation: Misleading documentation (“missing information” blocker.)
    - Behavior: Contact the team owning the documentation and offer to fix it; if you can modify the documentation and make the changes, while letting the documentation owner know, then do so; if you need help to progress, the documentation owner is a good source of guidance

    - Situation: Outages, or systems being down, which prevent you from working or validating that
what you built is working (“waiting on others” blocker.)
    - Behavior: Flag the outage and escalate it; there’s a chance you’re the first person to notice it; once you get acknowledgment, there’s not much to do but wait and work on other things

- Testing
    - Situation: Tests fail non-deterministically (“missing information blocker.)
    - Behavior: Debug to understand what’s happening and why; try pairing with a team member or ask in the chat if anyone’s had similar issues

    - Situation: Missing test data, such as data to reproduce a test case, or production-like data (“missing information” blocker)
    - Behavior: Figure out how to get this data; it could be as easy as finding the right logs, or as complex as requesting access to production data, which may mean waiting on others, or escalating

    - Situation: Tests are too slow (“waiting on the machine” blocker)
    - Behavior: Step up and look for ways to make tests faster, and do some performance analysis of where slowdowns occur

- Reviewing
    - Situation: Waiting on code review (“waiting on others” blocker)
    - Behavior: Ping reviewers to ask for reviews directly, and escalate if you don’t hear back in a reasonable time; seek support from team members and your manager on how to handle these situations

    - Situation: Merge conflicts:
    - Behavior: After resolving a conflict, it’s sensible to retest your work and also the previous change to ensure nothing’s broken; keep pull requests small to make merge conflicts less problematic, and to iterate faster

- Deploying
    - Permissions/access problems (“waiting on others” blocker)
    - Behvaior: Find colleagues who can give access, and escalate if needed; at bigger workplaces, there’s almost always a dedicated team or process for approvals

    - Deployment is too slow (“waiting on the machine” blocker)
    - Behvaior: If there’s a team that owns deployment tooling, contact them and see if they can prioritize speeding things up; if you can tweak the deployment setup, consider getting your hands dirty to shorten the wait time for deploys to complete; if the deployment cannot be sped up, check if health checks can be put in place, so there’s no need to manually verify that things work correctly after a deployment

- Operating systems and maintenance
    - Situation: Bugs which can’t be reproduced (“waiting on others” blocker)
    - Behavior: For customer bug reports you struggle to reproduce, more information must be sought (such as adding extra logging to the code and asking the customer to try again, or requesting information from them)

    - Situation: Not enough logs to debug system issues (“missing information” blocker)
    - Behavior: Add more logs, monitoring, or alerts, and deploy these, then try again to debug the production issue; pair with a teammate depending on how complex the issue is

    - Situation: Outages (“missing information” or “waiting on others” blocker): Systems your team owns go down, either due to an outage, or because of an issue at your end
    - Behavior: Alert your manager and team, and if possible, jump in to mitigate the outage; after the issue is resolved, there will likely be an investigation into the root cause, and a postmortem

### Break down the work

- 
