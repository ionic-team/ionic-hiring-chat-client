import { apiFetch } from './api';

import { Room } from './room';

const createRoom = async (name, user) => {
    const res = await apiFetch(`/api/v1/room`, user && user.token, {
        method: 'POST',
        data: {
            name: name
        }
    });

    return new Room(res);
}

const getRooms = (user) => apiFetch('/api/v1/rooms', user && user.token);

export { getRooms, createRoom };