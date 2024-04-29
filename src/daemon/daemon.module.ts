import { Module } from '@nestjs/common';
import * as dgram from 'dgram';
import { bootstrapV0 } from './daemon.config';
import { Interval } from '@nestjs/schedule';
import { Op, M, Pd } from '../../protos/dave';

@Module({})
export class DaemonModule {
	private readonly socket: dgram.Socket = dgram.createSocket('udp4');
	private readonly bindingPort: number = parseInt(process.env.DAVEPORT) || 1618;

	constructor() {
		this.socket.on('message', (msg, rinfo) => {
			if (msg.length == 0) return;
			try {
				const decodedMessage = M.fromBinary(msg);

				if ((decodedMessage.op = Op.PEER)) {
					const rawIp = decodedMessage.pds.at(0).ip;
					console.log(rawIp);
				}
			} catch (error) {
				console.log(error);
			}
		});

		this.socket.on('listening', () => {
			const address = this.socket.address();
			console.log(`Socket listening on ${address.address}:${address.port}`);
		});

		this.socket.bind(this.bindingPort);

		// this.getPeers();
	}

	// @Interval(10000)
	getPeers() {
		const payload = Buffer.from('0x00', 'hex');
		bootstrapV0.forEach((host) => this.socket.send(payload, host.port, host.address));
		// this.sendPeers();
	}

	sendPeers() {
		const m = M.create();
		console.log('create');
		console.log(m);
	}
}
