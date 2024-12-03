import { useMovieStore } from "@/components/MovieStoreProvider";
import { ChevronRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const UserProfile = observer(() => {
  const navigate = useNavigate();
  const movieStore = useMovieStore();

  function openDetail(imdbID: string) {
    navigate(`/movie-detail/${imdbID}`);
  }

  return (
    <>
      <h1>My favorite movies</h1>
      <div>
        <ul>
          {movieStore.favoritedMovies.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => openDetail(movie.imdbID)}
              className="flex flex-row gap-4 cursor-pointer px-4 py-2 hover:bg-gray-200"
            >
              <span>{movie.Title}</span>
              <ChevronRight />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default UserProfile;
