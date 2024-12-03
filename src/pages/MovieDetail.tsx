import { fetchMovie } from "@/api/movies-api";
import { useMovieStore } from "@/components/MovieStoreProvider";
import { Movie } from "@/store/FavoriteMovieStore";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const MovieDetail = observer(() => {
  const params = useParams();
  const movieStore = useMovieStore();

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["movie", params.id],
    enabled: !!params.id,
    queryFn: () => fetchMovie(params.id!),
    staleTime: 1000 * 60 * 5,
  });

  function toggleFavoriteMovie(movie: Movie) {
    movieStore.toggleFavoritedMovie(movie);
  }

  return (
    <>
      {isError && <p>Error: {error.message}</p>}
      {(isFetching || isLoading) && <p>Loading</p>}
      {data && (
        <div className="grid md:grid-cols-[1fr_200px] gap-4 mt-4">
          <div>
            <h1 className="text-left mb-4">{data.Title}</h1>
            <div className="flex flex-col md:flex-row gap-4 w-full text-left">
              <img
                src={data.Poster}
                alt={data.Title}
                className="max-w-[200px]"
              />
              <div>
                <span className="text-xl flex flex-row items-center gap-4">
                  ({data.Metascore}%){" "}
                  <Star
                    color={
                      movieStore.isMovieFavorited(data) ? "#ffcc00" : "black"
                    }
                    onClick={() => toggleFavoriteMovie(data)}
                  />
                </span>
                <p className="text-left mt-4">{data.Plot}</p>
                <section className="my-2">
                  <h3 className="font-semibold">Actors</h3>
                  <p className="text-sm">{data.Actors}</p>
                </section>
                <section className="my-2">
                  <h3 className="font-semibold">Writer</h3>
                  <p className="text-sm">{data.Writer}</p>
                </section>
                <section className="my-2">
                  <h3 className="font-semibold">Director</h3>
                  <p className="text-sm">{data.Director}</p>
                </section>
              </div>
            </div>
            <section className="text-left mt-4">
              <h2 className="font-bold">Ratings</h2>
              <ul>
                {data.Ratings.map((rating: any) => (
                  <li key={rating.Source}>
                    <h3 className="font-semibold">{rating.Source}</h3>
                    <p>{rating.Value}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="text-left flex flex-col gap-4">
            <section>
              <h3 className="font-semibold">Box office</h3>
              <p className="text-sm">{data.BoxOffice}</p>
            </section>

            <section>
              <h3 className="font-semibold">Genre</h3>
              <p className="text-sm">{data.Genre}</p>
            </section>
            <section>
              <h3 className="font-semibold">Language</h3>
              <p className="text-sm">{data.Language}</p>
            </section>
            <section>
              <h3 className="font-semibold">Runtime</h3>
              <p className="text-sm">{data.Runtime}</p>
            </section>
            <section>
              <h3 className="font-semibold">Released</h3>
              <p className="text-sm">{data.Released}</p>
            </section>
          </div>
        </div>
      )}
    </>
  );
});

export default MovieDetail;
