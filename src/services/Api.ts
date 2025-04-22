import axios, { AxiosRequestConfig } from "axios";
import { Buffer } from "buffer";

export const _DATABASE = process.env.NEXT_PUBLIC_DATABASE;
export const _BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const local_host = `http://localhost:${process.env.NEXT_PUBLIC_FQ_LOCAL_SERVER_PORT}`;
import tokens from "./tokens.json";

interface Tokens {
  [key: string]: string;
}

const typedTokens: Tokens = tokens as Tokens;

type HttpMethod = "get" | "post" | "put" | "delete" | "sql";

type RequestOptions = {
  loading?: boolean;
  body?: {
    sql: "string";
    params: [{ [key: string]: string | number }];
  };
  key?: Record<string, string | any>;
  page?: Record<string, string | number>;
  sort?: Record<string, string | number>;
  joins?: Record<string, string | number>;
  filter?: Record<string, string | number>;
  search?: Record<string, string | number>;
  hidden?: Record<string, string | number>;
  fields?: Record<string, string | number>;
  session?: Record<string, string | number>;
  validation?: Record<string, string | number>;
  permission?: Record<string, string | number>;
  nearby?: { [key: string]: string | number };
};

function uniqueKey(input: string) {
  let code = input.charCodeAt(0);
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    code = (code << 5) - code + char;
    code &= code;
  }
  return Buffer.from(code.toString()).toString("base64").substring(0, 8);
}

function isSQLQuery(method: HttpMethod | "SQL", body: any) {
  if (method === "SQL") {
    if (!body) return false;

    if (Array.isArray(body)) {
      return body.map(b => b.sql).every(b => typeof b === "string");
    }

    return typeof body.sql === "string";
  }

  return false;
}

function getSQLQuery(body: any) {
  if (Array.isArray(body)) {
    if (body.length === 1) {
      return JSON.stringify(body[0].sql);
    }
    return JSON.stringify(body.map(b => b.sql));
  }

  return JSON.stringify(body.sql);
}

function getKey(method: HttpMethod, url: string, options: RequestOptions): string {
  console.log(_DATABASE)
  if (!local_host) throw new Error("local_host is not defined");

  const _url = local_host + url;
  const parsed_url = new URL(_url);
  const pathname = "/" + parsed_url.pathname.split("/")[1];

  const request = {
    fields: options.fields,
    hidden: options.hidden,
    filter: options.filter,
    nearby: options.nearby,
    collections: options.joins,
    permission: options.permission,
    validation: options.validation,
    body_is_array: !isSQLQuery(method, options.body) ? Array.isArray(options.body || {}) : "",
    sql_query: isSQLQuery(method, options.body) ? getSQLQuery(options.body) : "",
  };

  let tokenStr = pathname;

  for (let key in request) {
    if (request[key as keyof typeof request]) {
      tokenStr += key + ":" + request[key as keyof typeof request];
    }
  }

  return method + ":" + pathname + ">" + uniqueKey(tokenStr);
}

const makeRequest = async (method: HttpMethod, endpoint: string, options: RequestOptions = {}): Promise<any> => {
  const {
    body,
    page,
    sort,
    joins,
    hidden,
    fields,
    filter,
    search,
    nearby,
    session,
    validation,
    permission,
    loading = true,
  } = options;

  const headers: any = {};

  if (hidden) headers.hidden = hidden;
  if (filter) headers.filter = filter;
  if (fields) headers.fields = fields;
  if (session) headers.session = session;
  if (joins) headers.collections = joins;
  if (validation) headers.validation = validation;
  if (permission) headers.permission = permission;
  if (nearby) headers.nearby = nearby;

  const key = getKey(method, endpoint, options);
  const token = typedTokens[key] || false;

  if (!token) {
    headers["key"] = key;
  } else {
    headers.token = token;
  }

  const params: any = {
    page: page,
    sort: sort,
    search: search,
  };

  try {
    if (loading) {
      console.log("Loading started...");
    }

    const axiosInstance = axios.create({
      baseURL: token ? _BASE_URL : local_host,
      headers: { app: _DATABASE },
    });

    const requestConfig: AxiosRequestConfig = {
      method,
      params,
      headers,
      data: body,
      url: endpoint,
    };

    const response = await axiosInstance(requestConfig);
    return response.data;
  } catch (error: any) {
    console.error(`${method.toUpperCase()} Error:`, error.message);
    throw error;
  } finally {
    if (loading) {
      console.log("Loading completed.");
    }
  }
};

const Api = {
  get: async (endpoint: string, options?: RequestOptions): Promise<any> => makeRequest("get", endpoint, options),
  put: async (endpoint: string, options?: RequestOptions): Promise<any> => makeRequest("put", endpoint, options),
  post: async (endpoint: string, options?: RequestOptions): Promise<any> => makeRequest("post", endpoint, options),
  delete: async (endpoint: string, options?: RequestOptions): Promise<any> => makeRequest("delete", endpoint, options),
  sql: async (endpoint: string, options?: RequestOptions): Promise<any> =>
    makeRequest("post", `/sql-${endpoint.replace("/", "")}`, options),
};

export default Api;