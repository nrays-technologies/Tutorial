import { Platform } from 'react-native';
import { ENDPOINT } from '../endpoints';
import * as api from '../webservice';
import { IUser } from '../../modelTypeScript';

interface IReqSignUp {
    first_name: string,
    last_name: string,
    mobile: string,
    referral_code: string
}

interface IReqVerificationOTP {
    mobile: string,
    code: string
}

export async function sendOTPUser({ mobile }: {mobile: string}) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    return new Promise<{
        status: boolean;
        error: string;
        message: string
        // data: IUser | undefined;
    }>((res) => {
        api
            .fetchService(ENDPOINT.OTP_SNED.toString(), ENDPOINT.OTP_SNED.method, {mobile})
            .then((response) => {
                
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message
                        // data: response.data.data ? (response.data.data as IUser) : undefined,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message
                        // data: undefined,
                    });
                }
            });
    });
}

export async function verificationOTPUser({ mobile, code = "" }: IReqVerificationOTP) {
    // const pushToken = await getValue(StorageKey.tokenFIR);

    
    const params = {
        mobile,
        otp: code
    }

    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    return new Promise<{
        status: boolean;
        error: string;
        data: IUser | undefined;
    }>((res) => {
        api
            .fetchService(ENDPOINT.OTP_VERIFICATION.toString(), ENDPOINT.OTP_VERIFICATION.method, params)
            .then((response) => {
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        data: response.data ? response.data : undefined,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect OTP',
                        data: undefined,
                    });
                }
            });
    });
}

export async function pinSetup({ pin, }: {pin: string}) {
    // const pushToken = await getValue(StorageKey.tokenFIR);

    

    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    return new Promise<{
        status: boolean;
        error: string;
        data: IUser | undefined;
    }>((res) => {
        api
            .fetchService(ENDPOINT.PIN_SUBMIT.toString(), ENDPOINT.PIN_SUBMIT.method, {pin})
            .then((response) => {
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        data: response.data ? (response.data as IUser) : undefined,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        data: undefined,
                    });
                }
            });
    });
}

export async function loginWithPinCode({ pin, }: {pin: string}) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    return new Promise<{
        status: boolean;
        error: string;
        data: IUser | undefined;
    }>((res) => {
        api
            .fetchService(ENDPOINT.LOGIN_WITH_PIN.toString(), ENDPOINT.LOGIN_WITH_PIN.method, {pin})
            .then((response) => {
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        data: response.data ? (response.data as IUser) : undefined,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        data: undefined,
                    });
                }
            });
    });
}