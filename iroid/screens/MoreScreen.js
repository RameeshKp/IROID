import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#FFFFFF' }}>
      <Text>More</Text>
    </View>
    );
  }
}