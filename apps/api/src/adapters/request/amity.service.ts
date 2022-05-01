import Channels from "@models/channel";
import { rejects } from "assert";
import { AxiosRequestConfig } from "axios";
import { HttpClient } from "./http.client";

export class AmityService extends HttpClient {
  static classInstance?: AmityService;
  constructor() {
    super('https://api.sg.amity.co/api');
    this._initializeRequestInterceptor();
    
  }
  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };
  _handleRequest = (config: AxiosRequestConfig) => {
   config.headers['Authorization'] = 'Bearer 89c3e1d576884249fd67078b5ac8ab5957aae711';
    return config;
  };

  static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AmityService();
    }

    return this.classInstance;
  }

  createConversation(data): Promise<Channels> {
    return this.instance.post("/v3/channels/conversation", data)
  }
  createMessage(data): Promise<any> {
    return this.instance.post<any>("/v3/messages", data)
  }
}