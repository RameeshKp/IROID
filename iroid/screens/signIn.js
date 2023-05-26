import React, { Component } from 'react';
import { 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
} from 'react-native';
import TextBox from '../components/TextBox';
import axios from 'axios';
import qs from 'qs'
import { BASE_URL, TOKEN } from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }
  setUserName = (val) => {
    this.setState({
      userName: val
    });
  }
  setPassword = (val) => {
    this.setState({
      password: val
    });
  }
  onSubmit = async() => {
    var formdata = new FormData();
    formdata.append("email", this.state.userName);
    formdata.append("password", this.state.password);
    formdata.append("lang_id", "en");
    formdata.append("device_token", "sss");
    const requestOptions = {
      method: 'POST',
      data: formdata,
    };
    axios.post("http://proteinium.iroidtechnologies.in/api/v1/login", requestOptions)
      .then(async response => {
        await AsyncStorage.setItem('TOKEN',TOKEN);
        this.props.navigation.navigate('Dashboard')
        this.getMealCategories()
      })
      .catch(error => {
         alert("Failed")
      	});
  }
 
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 30,
            flexGrow: 1
          }}
        >
          <Text 
            style={{
              color: '#000000',
              fontFamily: 'SegoeUIBold',
              fontSize: 30
            }}
          >
            Sign In
          </Text>
          <Text 
            style={{
              color: '#7C7D7E',
              fontFamily: 'SegoeUI',
              fontSize: 14,
              marginVertical: 5
            }}
          >
            Enter Your Details
          </Text>
          <TextBox
            placeholder="User Name"
            onChangeText={(val) => this.setUserName(val)}
          />
          <TextBox
            placeholder="Password"
            onChangeText={(val) => this.setUserName(val)}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              paddingHorizontal: 20,
              backgroundColor: '#3BB0EC',
              borderRadius: 28,
              marginVertical: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => { this.onSubmit() }}
          >
            <Text 
              style={{
                color: '#FFFFFF',
                fontFamily: 'SegoeUI',
                fontSize: 14,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <Text 
            style={{
              color: '#444444',
              fontFamily: 'SegoeUI',
              fontSize: 14,
              marginVertical: 10
            }}
          >
            Forgot your password?
          </Text>
          <Text 
            style={{
              color: '#7C7D7E',
              fontFamily: 'SegoeUI',
              fontSize: 14,
              marginVertical: 10
            }}
          >
            Don't have an Account? 
            <Text 
              style={{
                color: '#5DA7A3',
                fontFamily: 'SegoeUIBold',
              }}
            >
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
