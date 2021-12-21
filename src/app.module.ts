import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const User = process.env.MONGO_CONNECT_USERNAME || 'root';
const Password = process.env.MONGO_CONNECT_PASSWORD || 'example';
const DbName = process.env.MONGO_CONNECT_DB || 'example';
const Host = process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(Host, {
      user: User,
      pass: Password,
      dbName: DbName,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
