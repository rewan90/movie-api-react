import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWY2MWE1NGYwZTBlMTEzZjE3NjAzODA0NGQ4OGI4OSIsInN1YiI6IjY2NWM2ZWQzNzA4ZmYyMzY4NGEwYTY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kqmJPCpEuDwMim1zLrt6kiwGsgctSsbx056W44g9fX4';

const useTrending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  const getTrending = async (mediaType) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week`, {
        headers: {
          accept: "application/json",
          Authorization: API_KEY
        }
      });
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrending("movie").then(setTrendingMovies);
    getTrending("tv").then(setTrendingTv);
    getTrending("person").then(setTrendingPeople);
  }, []);

  return { trendingMovies, trendingTv, trendingPeople };
};

export default useTrending;