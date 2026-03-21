import { model, Schema } from 'mongoose';

export interface IFilmSession {
  id: string;
  datetime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: IFilmSession[];
}

const filmSessionSchema = new Schema<IFilmSession>({
  id: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taken: {
    type: [String],
    required: true,
    default: [],
  },
});

const filmSchema = new Schema<IFilm>({
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  schedule: {
    type: [filmSessionSchema],
    required: true,
  },
});

export const filmModel = model<IFilm>('film', filmSchema);
