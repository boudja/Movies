import React from 'react';
import {Text} from 'react-native';
import FilmList from './FilmList';
import {connect} from 'react-redux';
class WatchedFilms extends React.Component {
  render() {
    return (
      <FilmList
        films={this.props.watchedFilms}
        navigation={this.props.navigation}
        favoriteList={false}
        watchedList={true}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchedFilms: state.toggleWatched.watchedFilms,
  };
};

export default connect(mapStateToProps)(WatchedFilms);
