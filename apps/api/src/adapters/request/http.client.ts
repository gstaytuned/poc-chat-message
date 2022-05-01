import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }
  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };
  _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['content-type'] = 'application/json';
    console.log('Starting Request', JSON.stringify(config.headers, null, 2))
    return config;
  };


  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => {
    console.log('Response:', JSON.stringify(data, null, 2))
    return data
  }

  protected _handleError = (error: any) => Promise.reject(error);
}