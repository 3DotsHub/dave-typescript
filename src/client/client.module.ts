import { Module } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import * as dgram from 'dgram';

@Module({})
export class ClientModule {
	private readonly socket: dgram.Socket = dgram.createSocket('udp4');
	private readonly bootstrap = {
		address: 'localhost',
		port: 8080,
	};

	constructor() {
		this.socket.on('message', (msg, rinfo) => {
			console.log(`Client received: ${msg} from ${rinfo.address}:${rinfo.port}`);
		});

		this.socket.on('close', () => {
			console.log('Socket closed');
		});
	}

	@Interval(3000)
	workflow() {
		this.send('Hello');
	}

	send(message: string) {
		this.socket.send(message, this.bootstrap.port, this.bootstrap.address, (err) => {
			if (err) {
				console.error(err);
				this.socket.close();
			} else {
				console.log('Message sent to server!');
			}
		});
	}
}
