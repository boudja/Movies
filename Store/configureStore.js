import {createStore} from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import setAvatar from './Reducers/avatarReducer';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import toggleWatched from './Reducers/filmWatchedReducer';
const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

export default createStore(
  persistCombineReducers(rootPersistConfig, {
    toggleFavorite,
    setAvatar,
    toggleWatched,
  }),
);
