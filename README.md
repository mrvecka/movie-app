# Movie DB app

Minimalistic example of React app with MobX state management. App will search and display movies from http://omdbapi.com
User is able to favoritize movies and check them on My movies page. Favorite movies are stored in localStorage.
Search params are handled through url params, seems more convenient for this use case

## Techstack

React + Vite + TS + Mobx + ReactQuery + shad/cn + Tailwind

## Structure

1. /store - Application store
2. /pages - Main pages of application
3. /api - defined api calls to omdbapi
4. /components/ui - components from shad/cn
