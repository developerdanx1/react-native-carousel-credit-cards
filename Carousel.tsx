import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import card2 from './assets/cards/2.png';
import card3 from './assets/cards/3.png';
import card4 from './assets/cards/4.png';
import card5 from './assets/cards/5.png';
import card6 from './assets/cards/6.png';
import card7 from './assets/cards/7.png';
import card8 from './assets/cards/8.png';
import card9 from './assets/cards/9.png';

type Card = {
  id: string;
  source: string;
};

const cards: Card[] = [
  {
    id: '2',
    source: card2,
  },
  {
    id: '3',
    source: card3,
  },
  {
    id: '4',
    source: card4,
  },
  {
    id: '5',
    source: card5,
  },
  {
    id: '6',
    source: card6,
  },
  {
    id: '7',
    source: card7,
  },
  {
    id: '8',
    source: card8,
  },
  {
    id: '9',
    source: card9,
  },
];

const { width, height } = Dimensions.get('screen');

const Carousel: React.FC = () => {
  const xScroll = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={styles.flatList}
        data={cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xScroll } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ['-90deg', '0deg', '90deg'];

          const translateX = xScroll.interpolate({ inputRange, outputRange });
          return (
            <View key={index} style={styles.imageContainer}>
              <Animated.Image
                style={[styles.image, { transform: [{ rotateZ: translateX }] }]}
                source={item.source}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {},
  flatList: {
    flexGrow: 0,
  },
  imageContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 450,
    width: width - 100,
    resizeMode: 'contain',
  },
});
