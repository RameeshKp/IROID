import * as React from 'react';
import {
  View,
  SafeAreaView, 
  ImageBackground} from 'react-native';
import Carousel,{Pagination}  from 'react-native-snap-carousel';
import { SCREEN_WIDTH } from '../constants';
export default class RNCarousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
        ],
      }
    }
    _renderItem({item,index}){
        return (
          <ImageBackground
          source={{uri:item.image}}
          style={{
            borderRadius: 10,
            height: 167,
            overflow: 'hidden',
          }}
          resizeMode="cover"
    />
        )
    }
    render() {
        return (
          <SafeAreaView style={{flex: 1, paddingTop: 20 }}>
            <View style={{  flexDirection:'row', justifyContent: 'center',}}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.props.carouselItems}
                  sliderWidth={SCREEN_WIDTH-40}
                  itemWidth={SCREEN_WIDTH-40}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
            <Pagination
                  dotsLength={this.props.carouselItems?.length==1?
                    this.props.carouselItems?.length+1:this.props.carouselItems?.length}
                  activeDotIndex={this.state.activeIndex}
                  containerStyle={{ 
                    width: SCREEN_WIDTH-40,
                  }}
                  dotContainerStyle={{
                    width: 3
                  }}
                  dotColor={'#5DA7A3'}
                  inactiveDotColor={'#D1D1D152'}
                  inactiveDotOpacity={this.props.carouselItems?.length==1?0:1}
                  inactiveDotScale={0.8}
    />
          </SafeAreaView>
        );
    }
}
