import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MovieCard from "../components/MovieCard";
import { Genre, Movie } from "../typings";
import Select from "react-select";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MovieProps {
  movies: [Movie];
  genres: [Genre];
}

const Home: NextPage<MovieProps> = ({ movies, genres }: MovieProps) => {
  const convertedGenres = genres.map((genre) => {
    return {
      value: genre.id,
      label: genre.name,
    };
  });

  const [filteredMovies, setfilteredMovies] = useState<any>(movies);

  const handleChange = (newValue: any) => {
    if (newValue.length === 0) {
      setfilteredMovies(movies);
    } else {
      var selectedGenre = newValue.map((genre: any) => parseInt(genre.value));
      var temp = movies.filter((movie: any) => {
        return movie.genre_ids.some((item: any) =>
          selectedGenre.includes(item)
        );
      });
      console.log(temp);
      setfilteredMovies(temp);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-start">
        <Select
          isMulti
          onChange={handleChange}
          className="basic-multi-select"
          options={convertedGenres}
        />
      </div>
      <motion.div
        layout
        className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
      >
        <AnimatePresence>
          {filteredMovies.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} genres={genres} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ req, res }: any) {
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=59");
  const searchResults = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );

  const genre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  const searchResultsJson = await searchResults.json();
  const genreJson = await genre.json();

  console.log("Loading the real Movie");
  return {
    props: {
      movies: searchResultsJson.results,
      genres: genreJson.genres,
    }, // will be passed to the page component as props
  };
}
