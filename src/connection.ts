import { SOCKET_URL } from './api';

let listener = (_) => {}

let connection = null;
const connect = async () => {
  connection = new WebSocket(`ws://${SOCKET_URL}/chat`, ['protocolOne', 'protocolTwo']);
  connection.addEventListener('error', (err) => {
    console.error('Socket error', err);
  })
  connection.addEventListener('message', (event) => {
    listener(event);
  })
}

const send = (data: string) => {
  connection.send(data);
}

const onData = (cb) => {
  listener = cb
}

export { connect, send, onData };