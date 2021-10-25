import Toast, {ToastShowOptions} from 'react-native-toast-message';

/** Provides UI feedback methods */
class UiService {
  toast(options: ToastShowOptions) {
    Toast.show(options);
  }

  toastSuccess = (text = 'Action successful!', title = 'Success!') => {
    Toast.show({type: 'success', text1: title, text2: text});
  };

  toastError = (text = 'Action failed!', title = 'Error!') => {
    Toast.show({type: 'error', text1: title, text2: text});
  };

  toastInfo = (text: string, title = 'Info') => {
    Toast.show({type: 'info', text1: title, text2: text});
  };
}

export default new UiService();
