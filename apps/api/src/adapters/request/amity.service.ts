import Channels from "@models/channel";
import { rejects } from "assert";
import { AxiosRequestConfig } from "axios";
import { config } from "process";
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
  //  config.headers["Authorization"] = "Bearer b0eceb5e68ddf36545308f4e000b12dcd90985e2bf3d6a2e";
  //  config.headers["x-api-key"] = "Bearer b0eceb5e68ddf36545308f4e000b12dcd90985e2bf3d6a2e";
    return config;
  };

  static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AmityService();
    }

    return this.classInstance;
  }

  createConversation(data, token): Promise<Channels> {
    return this.instance.post("/v3/channels/conversation", data, {headers: {
      "Authorization": `Bearer ${token}`
  }})
  }
  createMessage(data , token): Promise<any> {
    return this.instance.post<any>("/v3/messages", data , {headers: {
        "Authorization": `Bearer ${token}`
    }})
  }
  createStoreAdmin(data): Promise<any> {
    return this.instance.post<any>("/v3/sessions", data, {headers: {
      "x-api-key": `b0eceb5e68ddf36545308f4e000b12dcd90985e2bf3d6a2e`
  }})
  }
}