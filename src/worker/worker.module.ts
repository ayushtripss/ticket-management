import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  providers: [WorkerService],
  exports: [],
})
export class WorkerModule {}
