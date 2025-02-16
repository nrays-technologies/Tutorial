import {StyleSheet} from 'react-native';
import {ColorsApp} from './colors';

const StylesG = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white,
    alignItems: 'center'
  },
  header: {
    height: 12,
  },
  safearea: {
    flex: 1,
  },
  separatorFlatList: {
    width: '100%',
    height: 1,
    backgroundColor: ColorsApp.listSeparator,
  },
  btn: {
    backgroundColor: 'skyblue',
    borderRadius: 6,
  },
  btnTitle: {padding: 10},
  spaceBox: {height: 10},
  textShadow: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  card: {
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    borderRadius: 8,
  },
  shadow: {
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.05,
    elevation: 4,
  },
  shadowBtn: {
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.05,
    elevation: 3,
  },
  shadowRed: {
    // shadowColor: ColorsApp.redDark,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 6,
  },
  shadowTop: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.17,
    shadowColor: '#000',
    elevation: 4,
  },
  shadowBottom: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  footer: {
    height: 10,
  },
});

export default StylesG;
