import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Animated, {
  SharedTransition,
  withSpring,
} from 'react-native-reanimated';

const leavesBackground = require('../assets/nature/leaves.jpg');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type StackParamList = {
  Profiles: undefined;
  Home: { tag: Tag };
  Details: { item: any };
};

const springOptions = {
  damping: 15,
};

const transition = SharedTransition.custom((values) => {
  'worklet';
  return {
    width: withSpring(values.targetWidth, springOptions),
    height: withSpring(values.targetHeight, springOptions),
    originX: withSpring(values.targetOriginX, springOptions),
    originY: withSpring(values.targetOriginY, springOptions),
  };
});

const profiles = {
  dog: {
    image: require('../assets/avatars/dog.png'),
    title: 'Maria',
  },
  desert: {
    image: require('../assets/avatars/desert.png'),
    title: 'Alice',
  },
  cat: {
    image: require('../assets/avatars/cat.png'),
    title: 'James',
  },
  mountains: {
    image: require('../assets/avatars/mountains.png'),
    title: 'Jennifer',
  },
  parrot: {
    image: require('../assets/avatars/parrot.png'),
    title: 'Thomas',
  },
  wolf: {
    image: require('../assets/avatars/wolf.png'),
    title: 'Margaret',
  },
} as const;

export type Tag = keyof typeof profiles;

export default function ProfilesScreen({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Profiles'>) {
  const goToDetails = (tag: Tag) => {
    navigation.navigate('Home', { tag });
  };

  return (
    <View style={profilesStyles.container}>
      <StatusBar barStyle={'light-content'} />
      <Image source={leavesBackground} style={profilesStyles.backgroundImage} />
      <Text style={profilesStyles.header}>Welcome back!</Text>
      <View style={commonStyles.row}>
        {Object.keys(profiles).map((tag) => (
          <Pressable
            onPress={() => goToDetails(tag as Tag)}
            key={tag}
            style={profilesStyles.profileWrapper}>
            <Animated.Image
              sharedTransitionTag={tag}
              sharedTransitionStyle={transition}
              source={profiles[tag as Tag].image}
              style={profilesStyles.profile}
            />
            <Animated.Text
              sharedTransitionTag={`${tag}-text`}
              sharedTransitionStyle={transition}
              style={profilesStyles.profileLabel}>
              {profiles[tag as Tag].title}
            </Animated.Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const profilesStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 100 : 25,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    opacity: 0.6,
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    color: '#f0fdf4',
    marginBottom: 20,
  },
  profileWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  profile: {
    height: 150,
    width: 150,
    marginBottom: 8,
  },
  profileLabel: {
    fontSize: 20,
    color: '#f0fdf4',
  },
});

const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
