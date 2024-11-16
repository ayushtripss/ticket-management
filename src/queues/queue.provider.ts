import { SearchService } from "src/search/search.service";
import { QueueService } from "./queue.services";

export const QueueProvider = [
    {
        provide: 'QUEUE',
        useFactory: async () => {
           const queueService = new QueueService()
           await queueService.getQueueInstance();
           return queueService; 
        }
    },
]