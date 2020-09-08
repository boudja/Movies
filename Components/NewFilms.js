import FilmList from '../Components/FilmList';
import {getNewFilms} from '../API/TMDBApi';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {} from 'react-native';

class NewFilms extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.totalPages = 0;

    this.state = {
      films: [],
      isLoading: false,
    };
    this._loadFilms = this._loadFilms.bind(this);
  }
  _loadFilms() {
    this.setState({isLoading: true});
    getNewFilms(this.page + 1).then((data) => {
      this.page = data.page;
      this.totalPages = data.total_pages;
      this.setState({
        films: [...this.state.films, ...data.results],
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    this._loadFilms();
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#33B8FF" />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages}
          favoriteListe={false}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {},
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewFilms;
