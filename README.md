# Olin Quotes: A Digital Quote Board

Olin Quotes is a web app for saving and remembering quotable moments at Olin College of Engineering.
It is intended to replace the current whiteboard+Post-it+Trello solution with one that is better suited
to saving quotes. Quotes will be likable, searchable, and available for use with other projects using
a GraphQL API.

The frontend is a React web app written in TypeScript and styled with Sass. It uses Redux for state
management and communicates with the backend using WebSockets (though that will soon be changed to
GraphQL and intermittent polling). The backend is written in JavaScript ES6 (conversion to TypeScript
is on the todo list) and data is stored in a MongoDB database running on MongoDB Atlas. Users can sign
in using their Google or Facebook account, and avatars are stored in a Google Cloud Platform Bucket (chosen over AWS S3
due to [Google's sustainability practices](https://cloud.google.com/sustainability/)).

## Current look
![Olin Quotes board view](https://i.imgur.com/NlUvjHs.png)
Users can add quotes, like quotes, comment on quotes, create boards, and add other users to boards.
Search functionality is next on the todo list.

![Olin Quotes quote comment page](https://i.imgur.com/aAMWuk8.png)
