import io from 'socket.io-client'
import config from "./config";
let connectedSockets = 0
const connectSocket = (userIndex: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const socket = io('http://localhost:9010', {
            // Send auth token on connection, you will need to DI the Auth service above
            rejectUnauthorized: false,
            reconnection: false,
            withCredentials: true,
            path: '/test',
            transports: ['websocket'],
            autoConnect: false
        });

        socket.on('connect', () => {
            console.info('connected client', userIndex)
            resolve(true)
        })
        socket.on('disconnect', () => {
            console.info('disconnected client', userIndex)
        })

        socket.on('connect_error', (reason) => {
            console.error('connect_error', reason)
            reject()
        })
        socket.connect();
    })




}

const init = async () => {
    for (let i = 0; i < config.socketsClient; i++) {
        try {
            await connectSocket(i)
        } catch (e) {
            console.error('skip', i)
        }

    }
}

init().then(() => {
    console.log('CLIENTS PROCESS RESOLVED')
})
