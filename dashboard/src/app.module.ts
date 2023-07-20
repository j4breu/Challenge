import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dashboard',
      password: 'dashboard',
      database: 'dashboard',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
