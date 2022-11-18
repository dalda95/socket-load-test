import * as http from "http";
import config from "./config";
import { Server } from 'socket.io';
let connectedSockets = 0
let lastSetIntervalTimestamp: any =  new Date()

setInterval(() => {
    const difference: number =  new Date() as any - lastSetIntervalTimestamp
    console.log('connected count', connectedSockets, 'difference time', difference)
    lastSetIntervalTimestamp = new Date()
}, 1000)

const startSocketServer = (): void => {
    const socketServer = http.createServer().listen(config.port);
    const io = new Server(socketServer, {
            cors: {
                origin: true,
                credentials: true
            },
            path: '/test',
            allowEIO3: true
        });

    io.on('connect', (socket) => {
        connectedSockets += 1;

        socket.on('disconnect', async (reason: string) => {
            const forPromise =  new Promise((resolve) => {
                connectedSockets -= 1
                for (let i = 0; i < 10000000; i++){
                }
                resolve(true)
            })

            await forPromise


        })
    })
};


process.on('unhandledRejection', (e) => {
    console.error(e)
})


startSocketServer()