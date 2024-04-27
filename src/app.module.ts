import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaemonModule } from './daemon/daemon.module';
import { ClientModule } from './client/client.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ScheduleModule.forRoot(), DaemonModule, ClientModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
