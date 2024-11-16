import { Module, forwardRef } from "@nestjs/common";
import { TicketEventListener } from "./ticket.event";
import { QueueModule } from "src/queues/queue.module";
import { EventEmitterService } from "./eventEmitter.service";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
    imports:[QueueModule],
    providers: [TicketEventListener, EventEmitterService],
    exports:[TicketEventListener, EventEmitterService]
})
export class EventModule {}