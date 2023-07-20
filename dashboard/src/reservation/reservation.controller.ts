import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto'
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('reservation')
export class ReservationController {

  constructor(private reservationService: ReservationService) { }

  @Post()
  createReservation(
    @Body('user') user: CreateUserDto,
    @Body('reservation') reservation:CreateReservationDto 
  ) {
    return this.reservationService.createReservation(user, reservation);
  }
}
