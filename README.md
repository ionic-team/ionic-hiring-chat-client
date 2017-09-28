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
      - Returns a sane user model back with a `token` field that is a JWT
 * `/api/v1/user/signup`
   - `POST` - `{ username, password }` - sign a user up
      - Returns a sane user model back with a `token` field that is a JWT 
 * `/api/v1/rooms`
   - `GET` - returns the list of rooms
 * `/api/v1/room`
   - `POST` - `{ name }` - create a room with name `name`
 * `/api/v1/rooms/:roomName/chats`
   - `GET` - get the chats for this room
