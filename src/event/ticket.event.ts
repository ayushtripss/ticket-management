import {Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { QueueService } from "src/queues/queue.services";

@Injectable()
export class TicketEventListener {
  constructor(@Inject('QUEUE') private queueServices: QueueService) {}

  @OnEvent('ticket.created', {async: true})
  async ticketCreatedEvent(ticket) {
    try {
        console.log("3",ticket);
        //await this.queueServices.addJob(ticket);
    } catch (error) {
      throw new Error('error in event')
    }
  }
}
