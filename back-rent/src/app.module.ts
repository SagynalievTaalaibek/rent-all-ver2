import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MainCategoryModule } from './main-category/main-category.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делаем модуль глобальным, чтобы не импортировать его в каждом модуле
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Читаем переменную окружения
      }),
      inject: [ConfigService],
    }),
    /*MongooseModule.forRoot('mongodb://mongo:27017/task'),
    // MongooseModule.forRoot('mongodb://localhost:27017/task'),*/
    UsersModule,
    MainCategoryModule,
    CategoryModule,
    ItemModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
