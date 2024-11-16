import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  private queue: Queue;

  async getQueueInstance() {
    this.queue = new Queue('putTicketToSearch', {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async addJob(data) {
    try {
      await this.queue.add('addTicket', {
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
