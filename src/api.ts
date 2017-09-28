const API_URL = 'http://localhost:4000';
const SOCKET_URL = 'localhost:8080';

const MOCK = true;

const MOCK_DATA = {
    '/api/v1/rooms': [{
        name: 'chat',
        color: '#333333'
    }, {
        name: 'random',
        color: '#ff0000'
    }],
    '/api/v1/rooms/chat/chats': [
        { text: 'This is cool', username: 'max', at: new Date('27 September 2017 14:48 UTC').toISOString() },
        { text: 'Great point!', username: 'alice', at: new Date('27 September 2017 17:48 UTC').toISOString() },
        { text: 'Wowza', username: 'tom', at: new Date('27 September 2017 19:48 UTC').toISOString() },
    ],
    '/api/v1/rooms/random/chats': [
        { text: 'I liek melk', username: 'max', at: new Date('27 September 2017 14:48 UTC').toISOString() },
        { text: 'How do you throw away a garbage can?', username: 'tom', at: new Date('27 September 2017 19:48 UTC').toISOString() },
    ],
    '/api/v1/user/login': 'echo-token',
    '/api/v1/user/signup': 'echo-token',
    '/api/v1/rooms/chat/chat': 'echo',
    '/api/v1/rooms/random/chat': 'echo',
    '/api/v1/room': 'echo'
}

const apiMock = async (endpoint, _, ...args) => {
    const ep = MOCK_DATA[endpoint];
    // If it's an echo endpoint, send back what we got
    if(typeof ep === 'string' && ep === 'echo') {
        return await { at: new Date().toISOString() , ...args[0][0]['data'] };
    }
    if(typeof ep === 'string' && ep === 'echo-token') {
        console.log('Args', args);
        if(args) {
            return await { at: new Date().toISOString(), token: 'FAKE_TOKEN', ...args[0][0]['data'] };
        }
    }
    return await MOCK_DATA[endpoint];
};

const apiFetch = async (endpoint, token, ...args) => {
    if(MOCK) {
        return await apiMock(endpoint, token, args);
    }

    const fullArgs: any = {};
    if(token) {
        fullArgs.headers = {
            'Authorization': `Bearer ${token}`
        }
    }
    
    const res = await fetch(`${API_URL}${endpoint}`, ...args)
    if(res.ok) return res.json();
    throw new Error('' + res.status);
}

export { API_URL, SOCKET_URL, apiFetch };