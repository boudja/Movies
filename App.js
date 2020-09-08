import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Search from './Components/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FilmDetail from './Components/FilmDetail';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favorite from './Components/Favorite';
import Test from './Components/Test';
import NewFilms from './Components/NewFilms';
import WatchedFilms from './Components/WatchedFilms';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';


export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store);
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;

                  if (route.name === 'Search') {
                    iconName = focused ? 'ios-search' : 'ios-search-outline';
                  } else if (route.name === 'Favorite') {
                    iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                  } else if (route.name === 'NewFilms') {
                    iconName = require('./Images/ic_fiber_new.png');
                    return (
                      <Image
                        style={styles.tabBar_icon}
                        source={iconName}></Image>
                    );
                  } else if (route.name === 'WatchedFilms') {
                    iconName = require('./Images/ic_watched_film.png');
                    return (
                      <Image
                        style={styles.watchedFilms_icon}
                        source={iconName}></Image>
                    );
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen
                name="Search"
                component={SearchStackScreen}
                options={{tabBarLabel: 'Recherche'}}
              />
              <Tab.Screen
                name="Favorite"
                component={FavoriteStackScreen}
                options={{tabBarLabel: 'Favoris'}}
              />
              <Tab.Screen
                name="NewFilms"
                component={NewFilmsStackScreen}
                options={{tabBarLabel: 'News'}}
              />
              <Tab.Screen
                name="WatchedFilms"
                component={WatchedFilmsStackScreen}
                options={{tabBarLabel: 'Mes films vus'}}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

function SearchStackScreen() {
  return (
    <StackSearch.Navigator>
      <StackSearch.Screen
        name="Search"
        component={Search}
        options={{title: 'Recherche'}}
      />
      <StackSearch.Screen name="Details" component={FilmDetail} />
    </StackSearch.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <StackFavorite.Navigator>
      <StackFavorite.Screen
        name="Favorite"
        component={Favorite}
        options={{title: 'Films Favoris'}}
      />
      <StackFavorite.Screen name="Details" component={FilmDetail} />
    </StackFavorite.Navigator>
  );
}
function WatchedFilmsStackScreen() {
  return (
    <StackWatchedFilms.Navigator>
      <StackWatchedFilms.Screen
        name="WatchedFilms"
        component={WatchedFilms}
        options={{title: 'Mes Films Vus'}}
      />
      <StackWatchedFilms.Screen name="Details" component={FilmDetail} />
    </StackWatchedFilms.Navigator>
  );
}
function NewFilmsStackScreen() {
  return (
    <StackNewFilms.Navigator>
      <StackNewFilms.Screen
        name="NewFilms"
        component={NewFilms}
        options={{title: 'Les Derniers Films'}}
      />
      <StackNewFilms.Screen name="Details" component={FilmDetail} />
    </StackNewFilms.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar_icon: {
    width: 30,
    height: 30,
  },
  watchedFilms_icon: {
    width: 30,
    height: 30,
  },
});
const Tab = createBottomTabNavigator();
const StackSearch = createStackNavigator();
const StackFavorite = createStackNavigator();
const StackNewFilms = createStackNavigator();
const StackWatchedFilms = createStackNavigator();
