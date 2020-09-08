// Components/Test.js

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
} from 'react-native';
import Avatar from './Avatar';
//  import Animated, { Easing } from 'react-native-reanimated'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosition: 0,
      leftPosition: 0,
    };
    var {height, width} = Dimensions.get('window');
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches;
        if (touches.length == 1) {
          this.setState({
            topPosition: touches[0].pageY - height / 2,
            leftPosition: touches[0].pageX - width / 2,
          });
        }
      },
    });
  }

  //   componentDidMount() {
  //     Animated.parallel([
  //       Animated.spring(
  //         this.state.topPosition,
  //         {
  //           toValue: 100,
  //           tension: 8,
  //           friction: 3
  //         }
  //       ),
  //       Animated.timing(
  //         this.state.leftPosition,
  //         {
  //           toValue: 100,
  //           duration: 1000,
  //           easing: Easing.elastic(2)
  //         }
  //       )
  //     ]).start()
  //   }
  render() {
    return (
      <View style={styles.main_container}>
        <Avatar />
        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.animation_view,
            {top: this.state.topPosition, left: this.state.leftPosition},
          ]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
});

export default Test;
