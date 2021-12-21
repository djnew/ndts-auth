import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from 'src/users/user.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserScheme }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
