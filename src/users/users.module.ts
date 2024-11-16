import { Module } from '@nestjs/common';
import { UsersController } from './core/users.controller';
import { UsersService } from './core/users.service';
import { databaseModule } from 'src/database/database.module';
import { UsersRepository } from './core/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    databaseModule,
    AuthModule,
    RedisModule,
    TicketsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
