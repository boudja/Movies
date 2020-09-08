import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FilmList from '../Components/FilmList';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';
import {connect} from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.searchedText = '';
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
    this._loadFilms = this._loadFilms.bind(this);
  }

  _displayDetailForFilm = (idFilm) => {
    //console.log('display film with id ' + idFilm);
    this.props.navigation.navigate('DetailFilm', {idFilm});
  };
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        // console.log(
        //   'Page : ' +
        //     this.page +
        //     ' / TotalPages : ' +
        //     this.totalPages +
        //     ' / Nombre de films : ' +
        //     this.state.films.length,
        // );
        this._loadFilms();
      },
    );
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

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        },
      );
    } else alert(' Veuillez Saisir le nom du film !');
  }

  render() {
    // console.log(this.props);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />

        <View style={styles.button_view}>
          <Button
            style={styles.btnSearch}
            title="Rechercher"
            onPress={() => {
              this._searchFilms();
            }}
          />
        </View>
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
  main_container: {
    marginTop: 20,
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_view: {
    margin: 5,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  btnSearch: {
    margin: 5,
    marginRight: 5,
  },
});
const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};
export default connect(mapStateToProps)(Search);
