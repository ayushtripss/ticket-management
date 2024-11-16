export class TicketMapping{
    mappings: {
      properties: {
        ticketId: {
            type:'long'
        },
        userId: {
          type: 'long',
        },
        trainId: {
            type: 'long'
        }
        createdAt: {
          type: 'date',
        },
      },
    }
  };

  