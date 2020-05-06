import io from 'socket.io-client';
import config from './config';

const socket = io(config.SOCKET_CONNECTION);
socket.connect();

export default socket;