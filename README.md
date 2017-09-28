# Ionic Interviews - Chat Client

This is a simple chat client that needs a backend.

## Getting Started

First, clone this repo and run `npm install`:

To test the client, run `npm start`.

## Removing mock/dev mode

By default the app has a mocked-out API. To remove the mocking system, edit `src/api.ts` and set `MOCK = false`.

## API

The Client expects the following API endpoints:

*Note the syntax `{ username, password }` means `{ username: theUsername, password: thePassword }`*:

 * `/api/v1/user/login`
   - `POST` - `{ username, password }` - log a user in
      - Returns { username, token } where `token` is a JWT
 * `/api/v1/user/signup`
   - `POST` - `{ username, password }` - sign a user up
      - Returns { username, token } where `token` is a JWT
 * `/api/v1/rooms`
   - `GET` - returns the list of rooms
      - Returns `[{ name }]` where `name` is the name of the room
 * `/api/v1/room`
   - `POST` - `{ name }` - create a room with name `name`
      - Returns `{ name }`
 * `/api/v1/rooms/:roomName/chats`
   - `GET` - get the chats for this room
      - Returns `[{ room, username, text }]` where `room` is the name of the room, `username` the username of the user who created the chat, and `text` the content of the chat.
