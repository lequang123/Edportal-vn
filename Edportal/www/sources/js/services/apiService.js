import axios from "axios";
import { METHODS } from "../common/enum";

export default class ApiService {
  constructor(options = {}) {
    this.baseURL = options.baseURL;
    this.parser = options.parser;
    this.timeout = options.timeout;
    this.headers = this.getRequestHeaders(options.headers || {});
    this.endpointParams = options.endpointParams || {}; // Added this line to avoid undefined
    this.endpoint = this.getPathWithParams(
      options.endpoint || undefined,
      this.endpointParams
    );

    this.data = options.data || {};

    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options.axiosConfig,
    });

    this.axios.interceptors.request.use(
      (config) => {
        // const accessToken = Tokens.GetAccessToken();

        // config.headers["Authorization"] = {
        //     toString() { return `Bearer ${accessToken}`; },
        // }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  getRequestHeaders(headers = {}) {
    const result = {};
    Object.keys(headers).forEach((header) => {
      const key = header.toLowerCase();
      result[key] = headers[header];
    });
    return result;
  }

  getPathWithParams(path = "", params = {}) {
    Object.keys(params).forEach((p) => {
      const searchStrParam = `/:${p}`;
      path = path.replace(searchStrParam, `/${params[p]}`);
    });
    return path;
  }

  request(method, reqData) {
    if (this.data) {
      if (reqData instanceof FormData) {
        reqData.append("BrotherApiKey", this.data.BrotherApiKey);
      } else {
        reqData = {
          ...reqData,
          ...this.data,
        };
      }
    }

    return new Promise(async (resolve, reject) => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": this.headers["Content-Type"]
          ? this.headers["Content-Type"]
          : "application/json",
        ...this.headers,
      };

      let data = reqData;
      let config = {};

      if (method === METHODS.GET) {
        data = {
          headers: headers,
          params: reqData,
        };
      } else if (method === METHODS.DELETE) {
        data = {
          headers: headers,
          data: reqData,
        };
      } else {
        config = { headers: headers };
      }

      this.axios[method](this.endpoint, data, config)
        .then((response) => {
          const result = this.parser ? this.parser(response.data) : response.data;
          return resolve(result);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  get(data) {
    return this.request(METHODS.GET, data);
  }
  
  post(data) {
    return this.request(METHODS.POST, data);
  }
  
  put(data) {
    return this.request(METHODS.PUT, data);
  }
  
  delete(data) {
    return this.request(METHODS.DELETE, data);
  }
}
