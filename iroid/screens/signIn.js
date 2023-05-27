import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TextBox from '../components/TextBox';
import axios from 'axios';
import { TOKEN } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  setUserName = (val) => {
    this.setState({
      userName: val,
    });
  };

  setPassword = (val) => {
    this.setState({
      password: val,
    });
  };

  onSubmit = async () => {
    if(this.state.userName!=='shak@gmail.com'&&this.state.password!=='123456'){
      alert("Invalid username or password");
      return
    }
    var formdata = new FormData();
    formdata.append('email', this.state.userName);
    formdata.append('password', this.state.password);
    formdata.append('lang_id', 'en');
    formdata.append('device_token', 'sss');
    const requestOptions = {
      method: 'POST',
      data: formdata,
    };
    axios
      .post('http://proteinium.iroidtechnologies.in/api/v1/login', requestOptions)
      .then(async (response) => {
        await AsyncStorage.setItem('TOKEN', TOKEN);
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0, 
            routes: [{ name: 'Dashboard' }], 
          })
        );
      })
      .catch((error) => {
        alert('Failed');
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter Your Details</Text>
          <TextBox
            placeholder="User Name"
            onChangeText={(val) => this.setUserName(val)}
          />
          <TextBox
            placeholder="Password"
            onChangeText={(val) => this.setPassword(val)}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.onSubmit();
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          <Text style={styles.signUpText}>
            Don't have an Account?{' '}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    flexGrow: 1,
  },
  title: {
    color: '#000000',
    fontFamily: 'SegoeUIBold',
    fontSize: 30,
  },
  subtitle: {
    color: '#7C7D7E',
    fontFamily: 'SegoeUI',
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#3BB0EC',
    borderRadius: 28,
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#444444',
    fontFamily: 'SegoeUI',
    fontSize: 14,
    marginVertical: 10,
  },
  signUpText: {
    color: '#7C7D7E',
    fontFamily: 'SegoeUI',
    fontSize: 14,
    marginVertical: 10,
  },
  signUpLink: {
    color: '#5DA7A3',
    fontFamily: 'SegoeUIBold',
  },
});
