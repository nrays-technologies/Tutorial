import { ENDPOINT } from '../endpoints';
import * as api from '../webservice';

interface IResponse {

}

export async function loginApi() {
  return new Promise<{
    status: boolean;
    error: string;
    data: IResponse[];
  }>((res) => {
    api
      .fetchService(
        ENDPOINT.LOG_IN.toString(),
        ENDPOINT.LOG_IN.method,
        null
      )
      .then((response) => {
        if (response && response.status == true) {
          res({
            status: true,
            error: '',
            data: response.data
          });
        } else {
          res({
            status: response.status,
            error: response.error
              ? response.error
              : 'Something not right at verification.',
            data: undefined
          });
        }
      });
  });
}
