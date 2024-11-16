import { Module, forwardRef } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { AuthServices } from './core/auth.service';
import { AuthRepository } from './core/auth.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [databaseModule,forwardRef(() => UsersModule)],
    controllers: [],
    providers: [AuthServices,AuthRepository],
    exports: [AuthServices]
})
export class AuthModule {}
