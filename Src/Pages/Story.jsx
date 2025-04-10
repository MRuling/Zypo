import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { Svg, G, Circle, Defs, Stop, LinearGradient } from 'react-native-svg';

const SIZE = 80;
const STROKE_WIDTH = 4;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const NUM_SEGMENTS = 12;
const SEGMENT_LENGTH = CIRCUMFERENCE / NUM_SEGMENTS;
const GAP = SEGMENT_LENGTH * 0.3;

const storyData = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  imgUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
}));

const StoryRing = ({ imgUrl }) => {
    const navigation = useNavigation();
  const [viewed, setViewed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const animateRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  useEffect(() => {




    
    if (clicked && !viewed) {
      animateRotation();
      setTimeout(() => {
        rotation.stopAnimation();
        setViewed(true);
        setClicked(false);
        navigation.navigate('Stories');

      }, 3000);
    }
  }, [clicked]);

  const getStrokeDasharray = () => {
    if (viewed) return undefined;
    if (clicked) {
      return Array(NUM_SEGMENTS).fill(`${SEGMENT_LENGTH - GAP},${GAP}`).join(',');
    }
    return undefined;
  };

  const strokeDasharray = getStrokeDasharray();
  const strokeColor = viewed ? '#ccc' : 'url(#gradient)';

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={() => !viewed && setClicked(true)} style={{ marginHorizontal: 6 }}>
      <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate: clicked ? spin : '0deg' }] }]}>
          <Svg width={SIZE} height={SIZE}>
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#feda75" />
                <Stop offset="25%" stopColor="#fa7e1e" />
                <Stop offset="50%" stopColor="#d62976" />
                <Stop offset="75%" stopColor="#962fbf" />
                <Stop offset="100%" stopColor="#4f5bd5" />
              </LinearGradient>
            </Defs>
            <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={strokeColor}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                fill="none"
              />
            </G>
          </Svg>
        </Animated.View>

        <View style={styles.innerCircle}>
          <Image source={{ uri: imgUrl }} style={styles.avatar} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={storyData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => <StoryRing imgUrl={item.imgUrl} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  innerCircle: {
    width: SIZE - STROKE_WIDTH * 2,
    height: SIZE - STROKE_WIDTH * 2,
    borderRadius: (SIZE - STROKE_WIDTH * 2) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: SIZE - STROKE_WIDTH * 4,
    height: SIZE - STROKE_WIDTH * 4,
    borderRadius: (SIZE - STROKE_WIDTH * 4) / 2,
  },
});
