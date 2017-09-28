import { apiFetch } from './api';

class Room {
    name: string;
    color: string;
    chats: any[] = [];

    constructor(fields) {
        Object.assign(this, fields);
    }

    async loadChats(user) {
        this.chats = await apiFetch(`/api/v1/rooms/${this.name}/chats`, user && user.token) || [];
    }

    addChat(chat) {
        this.chats = [...this.chats, chat];
    }

    async chat(message, user) {
        console.log('CHATTING', message, user);
        this.chats = [...this.chats, { text: message, at: new Date(), username: user.username }];

        return apiFetch(`/api/v1/rooms/${this.name}/chat`, user && user.token, {
            method: 'POST',
            data: {
                room: this.name,
                username: user.username,
                text: message
            }
        });
    }
}

export { Room };