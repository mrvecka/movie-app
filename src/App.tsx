import "./App.css";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieStoreProvider } from "./components/MovieStoreProvider";
import { lazy } from "react";

const queryClient = new QueryClient();

// route base code-splitting
const Home = lazy(() => import("./pages/Home"));
const Game = lazy(() => import("./pages/Game"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieStoreProvider>
        <BrowserRouter>
          <nav className="flex flex-row gap-4 justify-center border-b-2 border-solid mb-4 py-2">
            <Link to="/">Search</Link>
            <Link to="/my-movies">My Movies</Link>
            <Link to="/game">Game</Link>
          </nav>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movie-detail/:id" element={<MovieDetail />} />
            <Route path="/my-movies" element={<UserProfile />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </MovieStoreProvider>
    </QueryClientProvider>
  );
}
