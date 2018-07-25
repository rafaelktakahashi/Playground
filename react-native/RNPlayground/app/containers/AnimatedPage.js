import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import { Text, Button } from 'native-base';

/**
 * Little view that fades in
 */
class FadeInView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class BlockThatMoves extends Component {
  state = {
    xPos: new Animated.Value(5),
  };

  moveRight() {
    Animated.timing(this.state.xPos, { toValue: 100, duration: 800 }).start();
  }

  moveLeft() {
    Animated.timing(this.state.xPos, { toValue: 5, duration: 800 }).start();
  }

  render() {
    let { xPos } = this.state;
    return (
      <Animated.View style={{ ...this.props.style, marginLeft: xPos }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

/**
 * Trying out animations in react-native
 */

export default class AnimatedPage extends Component {
  static navigationOptions = {
    title: 'Animated Page',
  };

  constructor(props) {
    super(props);
    this.blockThatMoves = React.createRef();
  }

  moveBlockLeft() {
    this.blockThatMoves.current.moveLeft();
  }

  moveBlockRight() {
    this.blockThatMoves.current.moveRight();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Trying out animations in react-native.</Text>
        <FadeInView
          style={{
            width: 250,
            height: 100,
            textAlign: 'center',
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
            This is a view that gradually incrases its opacity when loaded.
          </Text>
        </FadeInView>

        <BlockThatMoves
          ref={this.blockThatMoves}
          style={{
            width: 250,
            height: 100,
            textAlign: 'center',
            margin: 10,
            backgroundColor: '#4040c0',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              margin: 10,
              color: 'white',
            }}
          >
            Moving
          </Text>
        </BlockThatMoves>
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={this.moveBlockLeft.bind(this)}
            style={{ margin: 10 }}
          >
            <Text>Move block left</Text>
          </Button>
          <Button
            onPress={this.moveBlockRight.bind(this)}
            style={{ margin: 10 }}
          >
            <Text>Move block right</Text>
          </Button>
        </View>
      </View>
    );
  }
}
