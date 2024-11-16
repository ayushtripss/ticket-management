import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TrainsModule } from './trains/trains.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { QueueModule } from './queues/queue.module';
import { WorkerModule } from './worker/worker.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    UsersModule,
    TrainsModule,
    TicketsModule,
    AuthModule,
    RedisModule,
    QueueModule,
    WorkerModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
