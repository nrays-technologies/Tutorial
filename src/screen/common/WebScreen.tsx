import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WebView } from 'react-native-webview';
const WebScreen = ({ navigation, route }) => {
  const url = route.params.url;
  const title = route.params.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? title : '',
      backgroundColor: 'red'
    });
  }, []);
  return <WebView style={styles.container} source={{ uri: url }} />;
};

export default WebScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
