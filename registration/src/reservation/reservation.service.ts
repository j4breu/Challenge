import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    private readonly userService: UserService,
    private readonly httpService: HttpService
  ) { }

  async createReservation(user: CreateUserDto, reservation: CreateReservationDto, roleName: string) {
    const userFound = await this.userService.searchUser(user.email);

    if (!userFound) {
      const newUser = await this.userService.createUser(user, roleName);
      reservation.authorId = newUser.id;
    } else {
      reservation.authorId = userFound.id;
    }

    const newReservation = this.reservationRepository.create(reservation);

    this.httpService.post(`http://localhost:8001/api/role/${newReservation}`, {});
    this.httpService.post(`http://localhost:8003/api/role/${newReservation}`, {});

    return this.reservationRepository.save(newReservation);
  }

  async updateReservation(reservation: UpdateReservationDto) {
    const reservationFound = await this.reservationRepository.findOne({
      where: {
        id: reservation.id
      }
    });

    const updatedReservation = Object.assign(reservationFound, reservation);
    return this.reservationRepository.save(updatedReservation);
  }
}
