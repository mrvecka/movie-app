import { FavoriteMovieStore } from "@/store/FavoriteMovieStore";
import { createContext, ReactNode, useContext } from "react";

const movieStore = new FavoriteMovieStore();
const StoreContext = createContext<FavoriteMovieStore>(movieStore);

export const useMovieStore = () => useContext(StoreContext);

export const MovieStoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={movieStore}>{children}</StoreContext.Provider>
  );
};
