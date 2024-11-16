import { Module } from '@nestjs/common';
import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.services';
import { TrainsRepository } from './trains.repository';
import { databaseModule } from 'src/database/database.module';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
    imports: [databaseModule,TicketsModule],
    controllers: [TrainsController],
    providers: [TrainsService,TrainsRepository],
})
export class TrainsModule {}
