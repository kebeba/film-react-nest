//TODO описать DTO для запросов к /films
import {
  IsArray,
  IsDateString,
  IsFQDN,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class FilmDTO {
  @IsUUID()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
}

export class ScheduledFilmDTO {
  @IsUUID()
  id: string;
  @IsDateString()
  datetime: string;
  @IsString()
  hall: string;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class FilmsDTO {
  @IsNumber()
  total: number;
  @IsArray()
  items: FilmDTO[];
}

export class ScheduledFilmsDTO {
  @IsNumber()
  total: number;
  @IsArray()
  items: ScheduledFilmDTO[];
}
