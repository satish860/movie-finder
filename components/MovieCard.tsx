import React from "react";
import { Genre, Movie } from "../typings";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  movie: Movie;
  genres: [Genre];
}

const MovieCard = ({ movie, genres }: Props) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={500}
        objectFit="cover"
      ></Image>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">{movie.overview}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {movie.genre_ids.map((genreId: number) => {
          return (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{genres.find((genre: Genre) => genre.id === genreId)?.name}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MovieCard;
