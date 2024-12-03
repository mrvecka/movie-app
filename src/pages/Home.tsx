import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/api/movies-api";
import { Star } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Movie } from "@/store/FavoriteMovieStore";
import { useMovieStore } from "@/components/MovieStoreProvider";

const formSchema = z.object({
  search: z.string(),
});

const Home = observer(() => {
  const movieStore = useMovieStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );
  const [pages, setPages] = useState<number[]>([]);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);
  const [isQueryRunning, setIsQueryRunning] = useState(false);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: keyword,
    },
  });

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["movies", keyword, page],
    enabled: keyword !== "",
    queryFn: () => fetchMovies(keyword, page),
  });

  const moveToPage = useCallback(
    (page: number) => {
      if (page >= 1) {
        setPage(page);
      }
    },
    [page]
  );

  useEffect(() => {
    setIsQueryRunning(isFetching || isLoading);
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (!data) return;

    const totalResults = data.totalResults;
    const totalPages = Math.ceil(totalResults / 10);
    setTotalPagesCount(totalPages);
    const visiblePages = [];
    // to keep current page in center of pagination component, we start with page - 1
    const startPage = page - 1 >= 1 ? page - 1 : 1;
    for (let pageIndex = startPage; pageIndex <= startPage + 2; pageIndex++) {
      if (pageIndex >= 1 && pageIndex <= totalPages) {
        visiblePages.push(pageIndex);
      }
    }

    setPages(visiblePages);
  }, [data, page]);

  useEffect(() => {
    setSearchParams({
      search: keyword,
      page: page.toString(),
    });
  }, [page, keyword]);

  function openDetail(imdbID: string) {
    navigate(`/movie-detail/${imdbID}`);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setKeyword(values.search);
    setPage(1);
  }

  function toggleFavoriteMovie(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    movie: Movie
  ) {
    event.stopPropagation();
    movieStore.toggleFavoritedMovie(movie);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-4 w-full justify-center my-4"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {isQueryRunning && <p>Loading...</p>}
      {!isQueryRunning && isError && <p>Error: {error.message}</p>}
      {!isQueryRunning && !keyword && <p>Try searching for movies</p>}
      {!isQueryRunning && keyword && !data?.totalResults && <>No Results</>}
      <div className="grid md:grid-cols-3 gap-2">
        {(data as any)?.Search?.map((movie: any) => (
          <div
            key={movie.imdbID}
            className="text-left cursor-pointer"
            onClick={() => openDetail(movie.imdbID)}
          >
            <img className="w-full" src={movie.Poster} alt={movie.Title} />
            <div className="flex flex-row gap-2 justify-between my-2 px-2">
              <div>
                <p className="text-base font-semibold">{movie.Title}</p>
                <p className="text-sm">{movie.Year}</p>
              </div>
              <Star
                color={movieStore.isMovieFavorited(movie) ? "#ffcc00" : "black"}
                onClick={($event) => toggleFavoriteMovie($event, movie)}
              />
            </div>
          </div>
        ))}
      </div>
      {data && data.totalResults && keyword && (
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => moveToPage(page - 1)} />
              </PaginationItem>
            )}
            {pages.map((pageNumber) => (
              <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink
                  isActive={page === pageNumber}
                  className="cursor-pointer"
                  onClick={() => moveToPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {page !== totalPagesCount && (
              <PaginationItem>
                <PaginationNext
                  isActive={page !== 1}
                  onClick={() => moveToPage(page + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
});

export default Home;
