import { Injectable } from '@nestjs/common';
import { Job, Worker } from 'bullmq';
import { TicketsServices } from 'src/tickets/tickets.services';

@Injectable()
export class WorkerService {
  private worker: Worker;
  constructor(private ticketService: TicketsServices) {
    this.worker = new Worker(
      'putTicketToSearch',
      async (job) => {
        this.processJob(job);
      },
      {
        connection: {
          host: 'localhost',
          port: 6379,
        },
      },
    );
  }

  async processJob(job: Job) {
    try {
      const ticket = job.data.data;
      console.log(ticket);
      await this.ticketService.toOpenSearch(ticket);
    } catch (error) {
      throw new Error(error);
    }
  }
}
