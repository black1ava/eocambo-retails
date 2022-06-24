import { useState, useRef } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

function HomeSlide({ images }){

  const carouselRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  function renderItem({ item }){
    return (
      <View style={{
          height: 300,
          overflow: 'hidden',
          width: 337
        }}
      >
        <Image style={{ width: '100%', height: '100%', borderRadius: 20 }} source={{ uri: item }}/>
      </View>

    )
  }

  return (
    <View style={ styles.sliderContainer }>
      <View>
        <Carousel 
          layout="default"
          ref={ carouselRef }
          data={ images }
          renderItem={ renderItem }
          sliderWidth={ Dimensions.get('window').width }
          itemWidth={ 400 }
          loop
          autoplay
          autoplayDelay={ 3000 }
          onSnapToItem={ index => setActiveIndex(index)}
        />
      </View>
      <View style={ styles.paginationContainer }>
        <Pagination 
          dotsLength={ images.length }
          activeDotIndex={ activeIndex }
          dotStyle={{
            width: 10,
            height: 10,
            marginVertical: 8,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }}
        />
      </View>
    </View>
  );
}

HomeSlide.propTypes = propTypes;

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'relative'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default HomeSlide;