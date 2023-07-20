import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'registration',
      password: 'registration',
      database: 'registration',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ReservationModule,
    UserModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
