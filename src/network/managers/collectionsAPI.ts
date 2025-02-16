import { IOverduePayment, IPaymentCollection, IUpcomingPayment } from '../../modelTypeScript';
import { ENDPOINT } from '../endpoints';
import * as api from '../webservice';

interface IReq {
    page: number
    search: string
}

export async function getOverduePayment({ page, search }: IReq) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    return new Promise<{
        status: boolean;
        error: string;
        message: string
        data: IOverduePayment[]
        has_more_records?: boolean
        records_count?: number
    }>((res) => {

        api
            .fetchService(ENDPOINT.COLLECTIONS_OVERDUE.toString(), ENDPOINT.COLLECTIONS_OVERDUE.method, { page, search })
            .then((response) => {

                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                        data: response.overdue_payments.data,
                        records_count: response.overdue_payments.records_count,
                        has_more_records: response.overdue_payments.has_more_records,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message,
                        data: []
                    });
                }
            });
    });
}


export async function getUpcomingPayments({ page, search }: IReq) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    return new Promise<{
        status: boolean;
        error: string;
        message: string
        data: IUpcomingPayment[]
        has_more_records?: boolean
        records_count?: number
    }>((res) => {

        api
            .fetchService(ENDPOINT.COLLECTIONS_UPCOMING.toString(), ENDPOINT.COLLECTIONS_UPCOMING.method, { page, search })
            .then((response) => {

                console.log('==================================== COLLECTIONS_UPCOMING');
                console.log(response);
                console.log('====================================');
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                        data: response.upcoming_payments.data,
                        records_count: response.upcoming_payments.records_count,
                        has_more_records: response.upcoming_payments.has_more_records,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message,
                        data: []
                    });
                }
            });
    });
}

export async function getCollectionPayments({ page, search }: IReq) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    return new Promise<{
        status: boolean;
        error: string;
        message: string
        data: IPaymentCollection[]
        has_more_records?: boolean
        records_count?: number
    }>((res) => {

        api
            .fetchService(ENDPOINT.COLLECTIONS_PAYMENTS.toString(), ENDPOINT.COLLECTIONS_PAYMENTS.method, { page, search })
            .then((response) => {

                console.log('==================================== COLLECTIONS_UPCOMING');
                console.log(response);
                console.log('====================================');
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                        data: response.collections.data,
                        records_count: response.collections.records_count,
                        has_more_records: response.collections.has_more_records,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message,
                        data: []
                    });
                }
            });
    });
}