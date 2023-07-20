import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'auth',
      password: 'auth',
      database: 'auth',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
