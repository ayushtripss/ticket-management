import { Module, forwardRef } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { TicketsController } from './tickets.controller';
import { TicketsServices } from './tickets.services';
import { TicketsRepository } from './tickets.repository';
import { SearchModule } from 'src/search/search.module';
import { QueueModule } from 'src/queues/queue.module';
import { EventModule } from 'src/event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [databaseModule,SearchModule,QueueModule, EventModule],
    controllers: [TicketsController],
    providers: [TicketsServices,TicketsRepository],
    exports: [TicketsServices]
})
export class TicketsModule {}
