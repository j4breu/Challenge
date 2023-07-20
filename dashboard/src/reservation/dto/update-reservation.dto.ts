export class UpdateReservationDto {
  id: number;
  documentType?: string;
  documentId?: string;
  date?: string;
  reservationType?: string;
  peopleNumber?: number;
  description?: string
  status?: boolean
  authorId?: number
}
