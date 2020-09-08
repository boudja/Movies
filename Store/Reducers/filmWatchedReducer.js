const initialState = {watchedFilms: []};

function toggleWatchedFilms(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'WATCHED_FILM':
      const watchedFilmIndex = state.watchedFilms.findIndex(
        (item) => item.id === action.value.id,
      );
      if (watchedFilmIndex !== -1) {
        nextState = {
          ...state,
          watchedFilms: state.watchedFilms.filter(
            (item, index) => index !== watchedFilmIndex,
          ),
        };
      } else {
        nextState = {
          ...state,
          watchedFilms: [...state.watchedFilms, action.value],
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

export default toggleWatchedFilms;
