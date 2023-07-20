import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { HttpModule } from '@nestjs/axios';
HttpModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RoleController, HttpModule],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule { }
