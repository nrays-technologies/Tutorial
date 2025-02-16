import moment from 'moment';
import { MAIN_URL } from '../network/webservice';
import { Alert, Linking, Platform } from 'react-native';

export const getProfileImagePath = (img: string | null) => {
  return `${MAIN_URL}uploads/profile/${img}`;
  // return `${Config.RP_BASE_URL}uploads/profile/${img}`;
};

export const defaultOptionsPrice = {
  significantDigits: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: '₹'
};

const currencyFormatter = (value: any, options?: any) => {
  if (typeof value == 'string') value = parseFloat(value);
  if (typeof value !== 'number') value = 0.0;

  options = { ...defaultOptionsPrice, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split('.');
  return `${options.symbol}${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};

// export const CurrencyFormatter = (number, options) => {
//   const defaultOptions = {
//     significantDigits: 2,
//     thousandsSeparator: ",",
//     decimalSeparator: ".",
//     symbol: "$",
//   };

export const getTodayDate = (format: string) => {
  return moment().local().format(format)
};

const getTimeFrom = (date: string) => {
  const time = moment(date, 'yyyy-MM-DD hh-mm-ss').format('h:mm A');
  return time;
};

const getTimeUtcLocalFrom = (date: string) => {
  const time = moment.utc(date, 'yyyy-MM-DD hh-mm-ss').local().format('h:mm A');
  return time;
};

const getDateTimeFrom = (date: string) => {
  const time = moment
    .utc(date, 'yyyy-MM-DD hh-mm-ss')
    .local()
    .format('h:mm A, MMMM DD, yyyy');

  return time;
};

const getStringFrom = ({ date, format }: { date: string; format: string }) => {
  // const time = moment.utc(date, 'yyyy-MM-DD hh-mm-ss').local().format(format);
  return moment(date).format(format);
};

const getCurrentTimeInMinutes = (currentTime: string) => {
  const [hours, minutes] = currentTime.split(':');
  return parseInt(hours) * 60 + parseInt(minutes) + 90;
};

const getDateFrom = ({ date, format }: { date: string; format: string }) => {
  const time = moment.utc(date, 'yyyy-MM-DD hh-mm-ss').local().format(format);
  return time;
};

export const getLocalDateTime = (format: string) => {
  return moment().format(format);
};

const getParseDate = ({ date, format }: { date: string; format: string }) => {
  const time = moment(date, 'yyyy-MM-DD').local().format(format);

  return time;
};

const differenceBetweenDateAndLocal = (date1: string) => {
  const dateOrder = moment.utc(date1, 'yyyy-MM-DD hh-mm-ss').local();
  const dateLocal = moment().local();

  const difBetweenDate = moment(dateLocal).diff(dateOrder, 'minutes');
  return difBetweenDate;
};

const differenceBetweenDates = (date1: string, date2: string) => {
  const dateOrder = moment.utc(date1, 'yyyy-MM-DD hh-mm-ss').local();
  const dateLocal = moment.utc(date2, 'yyyy-MM-DD hh-mm-ss').local();

  const difBetweenDate = moment(dateLocal).diff(dateOrder, 'minutes');
  return difBetweenDate;
};

export const isPastSession = (strEndDate: string) => {
  const startDate = moment(strEndDate).local();
  const dateLocal = moment().local();

  if (dateLocal > startDate) {
    return true;
  } else {
    return false;
  }
};

export const isFutureSession = (edDate: string) => {
  const endDate = moment(edDate).local();
  const dateLocal = moment().local();

  if (dateLocal < endDate) {
    return true;
  } else {
    return false;
  }
};

const comparisonDates = (strDate: string, edDate: string) => {
  const startDate = moment(strDate).local();
  const endDate = moment(edDate).local();
  const dateLocal = moment().local();

  if (dateLocal > startDate && dateLocal < endDate) {
    return true;
  } else {
    return false;
  }
};

// const differenceBetweenDates = (date1: string, date2: string) => {
//   const dateOrder = moment(date1, 'ddd, DD MMM YY h:mm a');
//   const dateDubai = moment(date2, 'yyyy-M-DD HH:mm');

//   const difBetweenDate = moment(dateDubai).diff(dateOrder, 'minutes');
// };

const isValidMailId = (email: string) => {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};

const getFirstCharOfWord = (str: string) => {
  return str
    .match(/\b(\w)/g)
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const capitalizeFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getAddress = (info) => {
  const { address_1, address_2, address_city, address_state, address_pincode } = info;
  let address = address_1;

  if (address_2 && address_2.length > 1) {
    address = `${address}, ${address_2}`;
  }
  if (address_city && address_city.length > 1) {
    address = `${address}, ${address_city}`;
  }
  if (address_state && address_state.length > 1) {
    address = `${address}, ${address_state}`;
  }
  if (address_pincode && address_pincode.length > 1) {
    address = `${address}, ${address_pincode}`;
  }
  return address;
};

const getSourceType = (info) => {
  const { lead_sources } = info;
  let sourceTypes = '';
  if (lead_sources && lead_sources.length > 0) {
    sourceTypes = lead_sources.map(item => item.name).join(", ")
  }

  return sourceTypes;
};

const getTagColor = (slug: string) => {


  switch (slug) {
    case 'new-lead':
      return '#cc8904'
      break;
    case 'contacted':
      return '#ba9904'
      break;
    case 'qualified':
      return '#0a04ba'
      break;
    case 'proposal-sent':
      return '#0496ba'
      break;
    case 'negotiation':
      return '#ba5c04'
      break;
    case 'closed-won':
      return '#04ba37'
      break;
    case 'closed-lost':
      return '#ba0410'
      break;

    default:
      return '#636363'
      break;
  }

}

const callOnMobileNumber = (phone: string) => {
  let phoneNumber = phone;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  }
  else {
    phoneNumber = `telprompt:${phone}`;
  }
  Linking.openURL(phoneNumber);
  // Linking.canOpenURL(phoneNumber)
  // .then(supported => {
  //   if (!supported) {
  //     Alert.alert('Phone number is not available');
  //   } else {
  //     return Linking.openURL(phoneNumber);
  //   }
  // })
  // .catch(err => console.log(err));
}



export {
  getStringFrom,
  currencyFormatter,
  getTimeFrom,
  getDateTimeFrom,
  getDateFrom,
  getFirstCharOfWord,
  capitalizeFirstChar,
  differenceBetweenDates,
  differenceBetweenDateAndLocal,
  isValidMailId,
  getParseDate,
  getCurrentTimeInMinutes,
  getAddress,
  comparisonDates,
  getTimeUtcLocalFrom,
  getSourceType,
  getTagColor,
  callOnMobileNumber
};
