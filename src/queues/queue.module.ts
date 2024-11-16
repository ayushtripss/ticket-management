import { Module } from '@nestjs/common';
import { QueueProvider } from './queue.provider';
import { QueueService } from './queue.services';


@Module({
  imports: [],
  providers: [...QueueProvider, QueueService],
  exports: [...QueueProvider]
})
export class QueueModule {}