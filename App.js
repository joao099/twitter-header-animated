import React from 'react';
import {View, ScrollView, Image, Animated} from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;
PROFILE_MAX_MARGIN_HORIZONTAL = 160;
PROFILE_MIN_MARGIN_HORIZONTAL = 10;
PROFILE_MIN_MARGIN_VERTICAL =
  HEADER_MAX_HEIGHT / 2 - PROFILE_IMAGE_MAX_HEIGHT / 2;
PROFILE_MAX_MARGIN_VERTICAL = HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {scrollY: new Animated.Value(0)};
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const marginHorizontal = this.state.scrollY.interpolate({
      inputRange: [0, PROFILE_MAX_MARGIN_HORIZONTAL],
      outputRange: [
        PROFILE_MIN_MARGIN_HORIZONTAL,
        PROFILE_MAX_MARGIN_HORIZONTAL,
      ],
      extrapolate: 'clamp',
    });

    const marginVertical = this.state.scrollY.interpolate({
      inputRange: [0, PROFILE_MIN_MARGIN_VERTICAL],
      outputRange: [PROFILE_MAX_MARGIN_VERTICAL, PROFILE_MIN_MARGIN_VERTICAL],
      extrapolate: 'clamp',
    });

    const animStyle = {
      transform: [
        {
          translateY: marginVertical,
        },
      ],
    };

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'lightskyblue',
            height: headerHeight,
          }}
        />
        <Animated.View
          style={[
            {
              height: PROFILE_IMAGE_MAX_HEIGHT,
              width: PROFILE_IMAGE_MAX_HEIGHT,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginLeft: marginHorizontal,
            },
            animStyle,
          ]}>
          <Image
            style={{flex: 1, width: null, height: null}}
            source={require('./assets/me.jpg')}
          />
        </Animated.View>
        <ScrollView
          style={{flex: 1}}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}
          scrollEventThrottle={16}>
          <View style={{height: 1000}} />
        </ScrollView>
      </View>
    );
  }
}

export default App;
