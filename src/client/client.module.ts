import { Module } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import * as dgram from 'dgram';

@Module({})
export class ClientModule {
	private readonly socket: dgram.Socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
	private readonly PORT = 8080;
	private readonly multicastAddress = '239.255.255.250';

	constructor() {
		this.socket.on('message', (msg, rinfo) => {
			const message = msg.toString();
			if (message === 'DISCOVER') {
				console.log(`Node discovered: ${rinfo.address}:${rinfo.port}`);
				// Here you could add the discovered node to your DHT
			}
		});
		this.socket.on('error', (err) => {
			console.error('Server error:', err);
		});
		this.socket.on('listening', () => {
			const address = this.socket.address();
			console.log(`Server listening on ${address.address}:${address.port}`);
			this.socket.addMembership(this.multicastAddress);
		});
		this.socket.bind(this.PORT);
	}

	@Interval(Math.floor(10000 * Math.random()))
	sendDiscoveryMessage() {
		const client = dgram.createSocket('udp4');
		const discoveryMsg = Buffer.from('DISCOVER');

		client.bind(() => {
			client.setBroadcast(true);
			client.send(discoveryMsg, this.PORT, this.multicastAddress, (err) => {
				if (err) {
					console.error('Error sending discovery message:', err);
				} else {
					console.log('sent');
				}
				client.close();
			});
		});
	}
}
