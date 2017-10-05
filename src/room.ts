import { apiFetch } from './api';

class Room {
    name: string;
    color: string;
    chats: any[] = [];

    constructor(fields) {
        Object.assign(this, fields);
    }

    async loadChats(user) {
        this.chats = await apiFetch(`/api/v1/rooms/${this.name}/chats`, user && user.token, 'GET') || [];
        console.log('loaded - New chats', this.chats);
    }

    addChat(chat) {
        this.chats = [...this.chats, chat];
        console.log('added - New chats', this.chats);
    }

    async chat(message, user) {
        this.chats = [...this.chats, { text: message, at: new Date(), username: user.username }];

        console.log('New chats', this.chats);

        return apiFetch(`/api/v1/rooms/${this.name}/chat`, user && user.token, 'POST', {
            room: this.name,
            username: user.username,
            text: message
        });
    }
}

export { Room };