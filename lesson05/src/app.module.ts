import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short', // name of the guard
        ttl: 1000, // time to live: 1 second
        limit: 3, // limit each IP to 3 requests per ttl
      },
      {
        name: 'long', // name of the guard, this long guard is default rate limit guard
        ttl: 60000, // time to live: 60 seconds
        limit: 5, // limit each IP to 5 requests per ttl
      }
    ]),
    MyLoggerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
