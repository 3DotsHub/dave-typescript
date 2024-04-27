import { Module } from '@nestjs/common';
import * as dgram from 'dgram';

@Module({})
export class DaemonModule {
	private readonly socket: dgram.Socket = dgram.createSocket('udp4');

	constructor() {
		this.start();
	}

	start() {
		this.socket.on('message', (msg, rinfo) => {
			console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
			this.socket.send(Buffer.from('Got your message!'), rinfo.port, rinfo.address);
		});

		this.socket.on('listening', () => {
			const address = this.socket.address();
			console.log(`Server listening on ${address.address}:${address.port}`);
		});

		this.socket.bind(8080);
	}
}
