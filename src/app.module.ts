import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:rootpassword@localhost:27017/task-manager?authSource=admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
