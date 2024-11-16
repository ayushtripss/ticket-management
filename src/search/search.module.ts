import { Module } from '@nestjs/common';
import { SearchProvider } from './search.provider';
import { SearchService } from './search.service';

@Module({
    imports: [],
    providers: [...SearchProvider,SearchService],
    exports: [...SearchProvider]
})
export class SearchModule {}
