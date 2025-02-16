import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackRoots } from '../../../navigation/AppNavigation';
import { useTranslation } from 'react-i18next';
import { spaceLeftRightList } from '../../../constants/constants';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

type Props = NativeStackScreenProps<AppStackRoots, 'TermsAndPP'>;

const TermsAndPP = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    navigation.setOptions({ title: t(route.params.title) });
  }, [navigation]);

  const width = useSharedValue(100);

  // const handlePress = () => {
  //   width.value = width.value + 50;
  // };

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };
  return (
    <View style={styles.container}>
      <Text>{t(route.params.title)}</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur. Dui felis nam augue fusce nulla.
        Praesent in aliquam ornare pretium congue nisi scelerisque. Urna odio eu
        sed ipsum tristique. Aliquam nunc urna est consectetur sed elit.
        Scelerisque sagittis quis est ligula in imperdiet at. Amet porttitor id
        faucibus quam id justo. Quisque sit quis malesuada malesuada diam lorem
        amet odio. Elit dignissim id augue scelerisque varius nunc lobortis nisl
        nullam. Metus scelerisque nunc vestibulum bibendum habitant aenean
        purus. Gravida eu morbi volutpat vitae. Euismod enim sed in platea.
        Consequat nulla semper donec imperdiet egestas sollicitudin turpis
        lobortis adipiscing. Congue dictum eget sit tristique dictum velit
        feugiat. Interdum velit diam quis tristique mauris adipiscing donec.
        Mattis sodales vestibulum adipiscing et blandit nec urna ultricies. Orci
        non consectetur cursus cras hendrerit morbi arcu. Sed sociis duis et mus
        turpis semper. Massa sit imperdiet mi purus massa lorem quis aliquam.
        Tincidunt commodo eget id vitae tincidunt in risus. Amet ac nec dui
        felis a consectetur. Id risus enim fringilla velit porttitor mi.
        Accumsan eu vestibulum augue tellus eget at purus sed risus. Dignissim
        nibh commodo tempor purus nunc commodo adipiscing. Neque aliquet id sit
        tincidunt cursus ante leo suspendisse tincidunt. Pretium nullam volutpat
        egestas in at commodo varius risus orci. Interdum lobortis cursus tortor
        volutpat aliquam enim morbi praesent. Commodo est amet morbi pretium
        arcu. Lobortis convallis libero id tincidunt massa posuere iaculis
        aliquet. Quam sed imperdiet sed nunc nibh mauris varius ut. Et massa
        porttitor nam blandit eu urna gravida in. Massa ipsum amet magna nam
        vitae id viverra morbi. Scelerisque neque in senectus sagittis blandit.
        Arcu in vitae amet in. Tellus nulla massa pretium morbi in ultricies
        cursus in. Elementum cursus sem proin magna libero rutrum imperdiet
        libero. Egestas facilisi turpis urna morbi bibendum ante non orci est.
        Vel facilisis laoreet ultricies est non mi. At nibh mauris sodales
        praesent in nibh duis. Semper bibendum nec donec massa. Feugiat lacus
        vestibulum fames sed aenean. Sed odio pellentesque tristique tempor.
        Enim in volutpat eu vitae et sit. Sit vel lacus vestibulum.
      </Text>
      {/* <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title="Click me" /> */}
    </View>
  );
};

export default TermsAndPP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: spaceLeftRightList
  }
});
