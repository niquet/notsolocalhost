---
title: "From Concept to Contract: Designing APIs"
date: 2025-03-06
layout: post
---

- Easy to understand for anyone consuming them
- Future-proof
- Secure
- Fast

---

- REST APIs are one of the most common kinds of web interfaces available today
- Allow communication with services via the REST API
- Proper design takes into account security, performance, and ease of use for API consumers
- Should follow commonly accepted conventions

---

- REST API -> application programming interface architecture style that conforms to specific architectural constraints
- It is not a protocol or standard
- While REST APIs can be accessed through a number of communication protocols, most commonly, they are called over HTTPS, so the guidelines below apply to REST API endpoints that will be called over the internet
- Note: For REST APIs called over the internet, you'll like want to follow the best practices for REST API authentication

---

**Accept and respond with JSON**

- Some people think REST should only return hypertext
- REST APIs should accept JSON for request payload and also send responses to JSON
- JSON is the standard for transferring data
- Almost every networked technology can use it
- To make sure that when our REST API app responds with JSON that clients interpret it as such, we should set Content-Type in the response header to application/json (`application/json; charset=utf-8`) after the request is made
- Many server-side app frameworks set the response header automatically
- Some HTTP clients look at the Content-Type response header and parse the data according to that format
- The only exception is if we’re trying to send and receive files between client and server
- Then we need to handle file responses and send form data from client to server
- But that is a topic for another time
- We should also make sure that our endpoints return JSON as a response
- Many server-side frameworks have this as a built-in feature

---

**Use nouns instead of verbs in endpoint paths**

- Don't use verbs in our endpoint paths -> our HTTP request method already has the verb
- Use the nouns which represent the entity that the endpoint that we're retrieving or manipulating as the pathname
- Having verbs in our API endpoint doesn’t convey any new information
- The action should be indicated by the HTTP request method that we're making
- The most common methods include GET, POST, PUT, and DELETE
  - GET retrieves resources
  - POST submits new data to the server
  - PUT updates existing data
  - DELETE removes data
- The verbs map to CRUD operations
- With the two principles we discussed above in mind, we should create routes like `GET /articles/` for getting news articles
- Likewise, `POST /articles/` is for adding a new article
- `PUT /articles/:id` is for updating the article with the given id
- `DELETE /articles/:id` is for deleting an existing article with the given ID
- `/articles` represents a REST API resource
- 

## Credits

- *"Best practices for REST API design,"* Mar 2, 2020. StackOverflow Blog. [Online]. Available: [https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/).
