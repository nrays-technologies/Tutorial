import { Alert } from 'react-native';
import { clearAll } from './storage';

function alertShow({
  title = '',
  msg,
  buttonTitle = 'ok'
}: {
  title?: string;
  msg: string;
  buttonTitle?: string;
}) {
  Alert.alert(title, msg, [
    {
      text: buttonTitle,
      style: 'cancel'
    }
  ]);
}

function alertShowWithMultiButtonPromise({
  title = '',
  msg,
  buttonsTitle = ['Cancel']
}: {
  title?: string;
  msg: string;
  buttonsTitle: string[];
}) {
  return new Promise(function (resolve, reject) {
    Alert.alert(
      title,
      msg,
      buttonsTitle.map((item) => {
        return {
          text: item,
          onPress: () => resolve(item)
        };
      })
    );
  });
}

function alertShowExpToken({ dispatch }: { dispatch: Dispatch }) {
  Alert.alert('', 'You have been logout out. Please login again.', [
    {
      text: 'Ok',
      onPress: () => {
        clearAll();
        // dispatch(updateUserInfo(undefined));
      }
    }
  ]);
}

export { alertShow, alertShowWithMultiButtonPromise, alertShowExpToken };
