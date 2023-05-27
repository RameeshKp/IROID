import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, Image, FlatList, ImageBackground,  ActivityIndicator, StyleSheet } from 'react-native';
import Bell from '../assets/images/bell.png';
import Arrow from '../assets/images/arrow.png';
import RNCarousel from '../components/RNCarousel';
import { SCREEN_WIDTH } from '../constants';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item }) => {
  return (
    <View>
      <ImageBackground
        source={{ uri: item.image }}
        style={HomeScreenStyles.imageBackground}
      >
        <View style={HomeScreenStyles.imageBackgroundOverlay}>
          <Text style={HomeScreenStyles.imageBackgroundText}>{item.name}</Text>
        </View>
      </ImageBackground>
      <View style={HomeScreenStyles.arrowContainer}>
        <Image source={Arrow} style={HomeScreenStyles.arrowImage} />
      </View>
    </View>
  );
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      mealcategories: []
    };
  }

  componentDidMount = () => {
    this.getMealCategories();
  };

  getMealCategories = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const data = qs.stringify({
      lang_id: "en",
      user_id: "357",
    });

    var config = {
      method: 'post',
      url: `${BASE_URL}get-mealcategories`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    const response = await axios(config);
    const res = response.data;
    var newRes = res.slice(4);
    var jsonData = JSON.parse(newRes).data;
    var banners = jsonData?.banners;
    var mealcategories = jsonData?.meal_categories;

    this.setState({
      banners: banners,
      mealcategories: mealcategories
    });
  }

  render() {
    return (
      <SafeAreaView style={HomeScreenStyles.container}>
        <StatusBar translucent backgroundColor="#3BB0EC" />
        <View style={HomeScreenStyles.headerContainer}>
          <Text style={HomeScreenStyles.logoText}>IROID</Text>
          <Image style={HomeScreenStyles.bellIcon} source={Bell} />
        </View>
        {this.state.banners?.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={HomeScreenStyles.scrollViewContent}
          >
            <RNCarousel carouselItems={this.state.banners} />
            <FlatList
              contentContainerStyle={HomeScreenStyles.flatListContent}
              data={this.state.mealcategories}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => {
                return <View style={HomeScreenStyles.itemSeparator} />;
              }}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator
            color="#3BB0EC"
            size={50}
            style={HomeScreenStyles.activityIndicator}
          />
        )}
      </SafeAreaView>
    );
  }
}

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#3BB0EC",
    paddingBottom: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'ShurikenStd-Boy',
    fontSize: 34,
  },
  bellIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 31,
    right: 20,
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  imageBackground: {
    borderRadius: 10,
    height: 167,
    width: SCREEN_WIDTH - 40,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  imageBackgroundOverlay: {
    backgroundColor: '#92929290',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    borderRadius: 10,
    width: SCREEN_WIDTH - 40,
  },
  imageBackgroundText: {
    fontFamily: 'SegoeUIBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  arrowContainer: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: -15,
    right: 30,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00000029',
  },
  arrowImage: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemSeparator: {
    height: 30,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


