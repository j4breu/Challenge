import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    private readonly httpService: HttpService
  ) { }

  async createReservation(reservation: CreateReservationDto) {

    const newReservation = this.reservationRepository.create(reservation);

    return this.reservationRepository.save(newReservation);
  }

  getReservations() {
    return this.reservationRepository.find({
      relations: ['author']
    });
  }

  async updateReservation(reservation: UpdateReservationDto) {
    const reservationFound = await this.reservationRepository.findOne({
      where: {
        id: reservation.id
      }
    });

    if (!reservationFound) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }

    this.httpService.post(`http://localhost:8001/api/user/${reservation}`, {});
    this.httpService.post(`http://localhost:8002/api/user/${reservation}`, {});

    const updatedReservation = Object.assign(reservationFound, reservation);
    return this.reservationRepository.save(updatedReservation);
  }
}
