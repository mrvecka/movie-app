export interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const API_KEY = "<your-api-key>";
export const fetchMovies = async (keyword: string, page: number = 1) => {
  const response = await fetch(
    `http://omdbapi.com/?${new URLSearchParams({
      apikey: API_KEY,
      s: keyword,
      page: page.toString(),
    })}`
  );

  return response.json();
};

export const fetchMovie = async (imdbId: string) => {
  const response = await fetch(
    `http://omdbapi.com/?${new URLSearchParams({
      apikey: API_KEY,
      i: imdbId,
    })}`
  );

  return response.json();
};
