//TODO реализовать DTO для /orders
import { IsArray, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class OrderedFilmDTO {
  @IsUUID()
  film: string;
  @IsUUID()
  session: string;
  @IsDateString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
  @IsUUID()
  id: string;
}

export class OrderDTO {
  @IsNumber()
  total: number;
  @IsArray()
  items: OrderedFilmDTO[];
}
