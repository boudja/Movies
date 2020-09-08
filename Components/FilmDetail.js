import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Platform,
  Button,
} from 'react-native';
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };

    //this._toggleFavorite = this._toggleFavorite.bind(this)
    // this._shareFilm = this._shareFilm.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film,
    });
  }

  _shareFilm() {
    const {film} = this.state;
    Share.share({title: film.title, message: film.overview});
  }

  _displayFloatingActionButton() {
    const {film} = this.state;
    if (film != undefined && Platform.OS === 'android') {
      // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')}
          />
        </TouchableOpacity>
      );
    }
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
  _addWatchedFilms() {
    const action = {type: 'WATCHED_FILM', value: this.state.film};
    this.props.dispatch(action);
  }
  _watchedFilms() {
    let titre = 'Marquer comme vu';
    if (
      this.props.watchedFilms.findIndex(
        (item) => item.id === this.state.film.id,
      ) !== -1
    ) {
      titre = 'Non Vu';
    }
    return (
      <Button
        title={titre}
        onPress={() => {
          this._addWatchedFilms();
        }}></Button>
    );
  }
  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png');
    var shouldEnlarge = false;
    if (
      this.props.favoriteFilms.findIndex(
        (item) => item.id === this.state.film.id,
      ) !== -1
    ) {
      sourceImage = require('../Images/ic_favorite.png');
      shouldEnlarge = true;
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image style={styles.favorite_image} source={sourceImage} />
      </EnlargeShrink>
    );
  }

  _toogleFavorite() {
    const action = {type: 'TOOGLE_FAVORITE', value: this.state.film};
    this.props.dispatch(action);
  }

  // componentDidUpdate() {
  //   console.log(this.props.favoriteFilms);
  // }

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoriteFilms.findIndex(
      (item) => item.id === this.props.navigation.state.params.idFilm,
    );
    if (favoriteFilmIndex !== -1) {
      this.setState(
        {
          film: this.props.favoriteFilms[favoriteFilmIndex],
        },
        () => {
          this._updateNavigationParams();
        },
      );
      return;
    }
    this.setState({isLoading: true});
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
      (data) => {
        this.setState(
          {
            film: data,
            isLoading: false,
          },
          () => {
            this._updateNavigationParams();
          },
        );
      },
    );
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
            />
          </View>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{this.state.film.title}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toogleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text}>
              {this.state.film.overview}
            </Text>
          </View>
          <View style={styles.details_container}>
            <Text style={styles.default_text}>
              Sorti le{' '}
              {moment(new Date(this.state.film.release_date)).format(
                'DD/MM/YYYY',
              )}
            </Text>
            <Text style={styles.default_text}>
              Note : {this.state.film.vote_average}/10
            </Text>
            <Text style={styles.default_text}>
              Nombre de votes : {this.state.film.vote_count}
            </Text>
            <Text style={styles.default_text}>
              Budget : {numeral(this.state.film.budget).format('0,0[.]00 $')}
            </Text>
            <Text style={styles.default_text}>
              Genre(s) :{' '}
              {this.state.film.genres
                .map(function (genre) {
                  return genre.name;
                })
                .join(' / ')}
            </Text>
            <Text style={styles.default_text}>
              Companie(s) :{' '}
              {this.state.film.production_companies
                .map(function (company) {
                  return company.name;
                })
                .join(' / ')}
            </Text>
          </View>
          <View style={styles.button_container}>{this._watchedFilms()}</View>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.route.params.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoading: false,
      });
    });
    console.log('Component FilmDetail monté');
  }

  render() {
    console.log(this.props.watchedFilms);
    // console.log('id du film' + this.props.route.params.idFilm);
    //  console.log(this.props);
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  image_container: {
    flex: 3,
  },
  image: {
    height: 200,
    margin: 5,
  },
  title_container: {
    flex: 2,
  },
  title_text: {
    fontFamily: 'bold',
    fontSize: 28,
    textAlign: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  description_container: {
    flex: 7,
    marginLeft: 5,
    marginRight: 5,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  details_container: {
    flex: 3,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    flex: 1,
    height: null,
    width: null,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#33A8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30,
  },
  button_container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.toggleFavorite.favoriteFilms,
    watchedFilms: state.toggleWatched.watchedFilms,
  };
};
export default connect(mapStateToProps)(FilmDetail);
