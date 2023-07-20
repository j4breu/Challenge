import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentType: string;

  @Column()
  documentId: string;

  @Column()
  date: string;

  @Column()
  reservationType: string;

  @Column()
  peopleNumber: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: boolean;

  @Column()
  authorId: number;

  @ManyToOne(() => User, user => user.reservations)
  author: User;
}
