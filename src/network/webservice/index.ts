import Config from 'react-native-config';
import NetworkUtils from '../ulitity/NetworkUtils';
import { alertShow } from '../../utilities/alerts';
import { StorageKey, getValue } from '../../utilities/storage';


const MAIN_URL = `${Config.RP_BASE_URL}`;
// const BASE_URL = `${MAIN_URL}${Config.RP_SUB_URL}`;

// const BASE_URL ='https://dev.dcenergies.in/api/'
const BASE_URL ='https://dcenergies.in/api/'
type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  status: string;
  kind: ResponseKind;
  error?: string;
  data?: T;
};


export const fetchService = async (
  endpoint: string,
  method: string,
  params?: any | null,
  headerContentType?: 'application/json'
) => {
  const isConnected = await NetworkUtils.isNetworkAvailable();
  // const { accessToken } = await getAccessToken();
  const authToken = await getValue(StorageKey.authToken);
  if (isConnected == false) {
    let dictError = {
      status: false,
      data: undefined,
      error: 'NETWORK_ERROR'
    };
    alertShow({
      msg: 'Check your connection. No internet found',
      buttonTitle: 'OK'
    });
    return dictError;
  }

  let apiOptions = {
    method: method,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };
  if (params != null) {
    console.log("---",params);
    
    apiOptions = {
      ...apiOptions,
      body: JSON.stringify(params)
    };
  }
  if (authToken) {
    apiOptions = {
      ...apiOptions,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      })
    };
  }

  console.log(endpoint);
  console.log(JSON.stringify(apiOptions));
  

  
  let statusCode = 0;
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, apiOptions);
    console.log(JSON.stringify(response));
    statusCode = response.status;
    if (__DEV__ && (endpoint == 'device' || endpoint == 'device/deactivate')) {
      console.log(`Response --->`, endpoint);
      console.log(response);
      console.log(statusCode);
    }
    switch (statusCode) {
      case 200:
      case 201:
        const jsonData = await response.json();
        return {
          status: true,
          ...jsonData,
          status_code: statusCode,
          error: ''
        };
        break;
      case 400:
      case 404:
        case 422:
        const jsonData4 = await response.json();
        return {
          status: false,
          error: '',
          ...jsonData4,
          status_code: statusCode,
          
        };
        break;
    
      default:
        return {
          status: false,
          data: undefined,
          status_code: statusCode,
          message: `API Error`,
          error: `API Error`
        };
        break;
    }
  } catch {
    return {
      status: statusCode === 200 ? true : false,
      data: undefined,
      status_code: statusCode,
      message: `API Error`,
      error: statusCode === 200 ? '' : `Server error`
    };
  }
};
