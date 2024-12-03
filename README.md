# Movie DB app

Minimalistic example of React app with MobX state management. App will search and display movies from http://omdbapi.com
User is able to favoritize movies and check them on My movies page. Favorite movies are stored in localStorage.
Search params are handled through url params, seems more convenient for this use case

## Techstack

React + Vite + TS + Mobx + ReactQuery + shad/cn + Tailwind

## Structure

/store - Application store
/pages - Main pages of application
/api - defined api calls to omdbapi
/components/ui - components from shad/cn
