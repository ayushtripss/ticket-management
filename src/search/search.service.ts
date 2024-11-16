import { Injectable } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { TicketMapping } from './search.mapping';

@Injectable()
export class SearchService {
  private instance: Client;

  async getSearchInstance() {
    const host = 'localhost';
    const protocol = 'https';
    const port = 9200;
    const auth = 'admin:admin';
    this.instance = new Client({
      node: protocol + '://' + auth + '@' + host + ':' + port,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async createIndex() {
    try {
      await this.instance.indices.create({
        index: 'ticket_info',
        body: TicketMapping,
      });
      return true;
    } catch (error) {
      throw new Error(`error in opensearch create index ${error}`);
    }
  }

  async checkIndex() {
    try {
      const index = await this.instance.indices.exists({
        index: 'ticket_info',
      });
      return index.statusCode === 200;
    } catch (error) {
      throw new Error(`error in finding index`);
    }
  }

  async putDatainIndex(ticket) {
    try {
      console.log('fsdfasfasfd');
      const exist = await this.checkIndex();
      if (!exist) {
        await this.createIndex();
      }

      await this.instance.index({
        index: 'ticket_info',
        body: ticket,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickets(id: number) {
    try {
      const tickets = await this.instance.search({
        index: 'ticket_info',
        body: {
          query: {
            match: { trainId: id },
          },
        },
      });
      console.log('fsafadsf', tickets.body.hits);
      return tickets;
    } catch (error) {
      throw new Error(error);
    }
  }
}
//threshold, knn and some other advance thing in opensearch
//bullmq and diff bw kafka rabbit and bullmq
//pub sub
