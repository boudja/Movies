import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import moment from 'moment';

class FilmItem extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      sourceImage = require('../Images/ic_favorite.png');
      return <Image style={styles.favorite_image} source={sourceImage}></Image>;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.film.title,
    };
  }
  _onPressButton() {
    if (this.props.film.title === this.state.title) {
      console.log('if1');
      this.setState({
        title:
          'Sorti le ' +
          moment(new Date(this.props.film.release_date)).format('DD/MM/YYYY'),
      });
    } else {
      console.log('if2');
      this.setState({
        title: this.props.film.title,
      });
    }
  }
  render() {
    const {film, displayDetailForFilm, watchedList} = this.props;
    if (watchedList) {
      return (
        <TouchableOpacity
          onLongPress={() => {
            this._onPressButton();
          }}
          style={styles.watchedFilm_main_container}
          onPress={() => {
            displayDetailForFilm(film.id);
          }}>
          <Image
            style={styles.watchedFilm_image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <View style={styles.watchedFilm_title}>
            <Text style={{fontFamily: 'bold', fontSize: 15, color: 'grey'}}>
              {this.state.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => {
            displayDetailForFilm(film.id);
          }}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>

            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>

            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  watchedFilm_main_container: {
    height: 120,
    flexDirection: 'row',
  },
  watchedFilm_title: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  watchedFilm_image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },

  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});

export default FilmItem;
