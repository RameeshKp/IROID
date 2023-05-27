import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_WIDTH } from '../constants';

export default class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout=async()=>{
   await AsyncStorage.clear();
  this.props.navigation.dispatch(
    CommonActions.reset({
      index: 0, 
      routes: [{ name: 'SignIn' }], 
    })
  );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
         style={styles.button}
         onPress={()=>this.logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  button:{
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3BB0EC',
    borderRadius:20,
    width:SCREEN_WIDTH-60
  },
  buttonText:{
    color: '#FFFFFF',
    fontFamily: 'SegoeUIBold',
    fontSize: 14,
  }
});