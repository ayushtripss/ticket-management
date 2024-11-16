import { SearchService } from './search.service';

export const SearchProvider = [
  {
    provide: 'OPENSEARCH',
    useFactory: async () => {
      const opensearchService = new SearchService();
      await opensearchService.getSearchInstance();
      return opensearchService;
    },
  },
];
