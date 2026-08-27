import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

export interface ApiEnvelope<T>{
    isError: boolean;
    data: T;
    message?: string;
    statusCode: number
}

export type HTTPMethod = "get" | "post" | "patch" | "put" | "delete"

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig{
    returnFullEnvelope?: boolean
}

export class HttpClient{
    private readonly instance: AxiosInstance;

    constructor(baseURL: string){
        this.instance = axios.create({
          baseURL,
          headers: new AxiosHeaders({
              "Content-Type": "application/json"
          }),
        });

        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig =>{
                if(!config.headers){
                    config.headers = new AxiosHeaders();
                }

                const token = localStorage.getItem("ctr-atk") ?? sessionStorage.getItem("ctr-atk");

                if(token){
                    (config.headers as AxiosHeaders).set(
                        "Authorization", `Bearer ${token}`,
                    );
                }

                return config
            },

            (error: AxiosError) => Promise.reject(error),
        )
    }

    // GET / DELETE (no body)
    public async request<T>(
       method: "get" | "delete",
       url: string,
       config: ExtendedAxiosRequestConfig & { returnFullEnvelope: true}, 
    ): Promise<ApiEnvelope<T>>;

    
    public async request<T>(
        method: "get" | "delete",
        url: string,
        config?: ExtendedAxiosRequestConfig,
    ):Promise<T>;

    // POST / PUT / PATCH (with body)
    public async request<T, B = unknown>(
        method: "post" | "put" | "patch",
        url: string,
        body: B,
        config?: ExtendedAxiosRequestConfig,
    ):Promise<T>

    public async request<T, B= unknown>(
        method: HTTPMethod,
        url: string,
        bodyOrConfig?: B | ExtendedAxiosRequestConfig,
        maybeConfig?: ExtendedAxiosRequestConfig,
    ): Promise<T | ApiEnvelope<T>> {
        const isBodyMethod = ["post", "put", "patch"] .includes(method);
        const data = isBodyMethod ? (bodyOrConfig as B) : undefined;
        const config = isBodyMethod ? maybeConfig : (bodyOrConfig as ExtendedAxiosRequestConfig);

        try{
            const response = await this.instance.request<ApiEnvelope<T>>({
                method, url, data, ...config,
            });

            if(config?.responseType === "blob"){
                return response.data as unknown as T;
            }

            const envelope = response.data;

            if(envelope.isError){
                throw envelope;
            }

            return config?.returnFullEnvelope ? envelope : envelope.data
        }catch(err){
            if(axios.isAxiosError(err)){
                if(err.response?.data){
                    const apiError = err.response.data as ApiEnvelope<T>;
                    throw apiError
                }

                throw{
                    isError: true,
                    data: null as T,
                    message: err.message,
                    statusCode: err.response?.status ?? 0,
                }satisfies ApiEnvelope<T>
            }
            
            throw err;
        }
    }

    public get<T>(
        url: string,
        config: ExtendedAxiosRequestConfig & {returnFullEnvelope: true},
    ):Promise<ApiEnvelope<T>>
    public get<T>(url : string, config?: ExtendedAxiosRequestConfig): Promise<T>;
    public get<T>(
    url: string,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T | ApiEnvelope<T>> {
    return this.request<T>("get", url, config);
  }

  public delete<T>(
    url: string,
    config: ExtendedAxiosRequestConfig & { returnFullEnvelope: true },
  ): Promise<ApiEnvelope<T>>;
  public delete<T>(
    url: string,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T>;
  public delete<T>(
    url: string,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T | ApiEnvelope<T>> {
    return this.request<T>("delete", url, config);
  }

  public post<T, B = unknown>(
    url: string,
    body: B,
    config: ExtendedAxiosRequestConfig & { returnFullEnvelope: true },
  ): Promise<ApiEnvelope<T>>;
  public post<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T>;
  public post<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T | ApiEnvelope<T>> {
    return this.request<T, B>("post", url, body, config);
  }

  public put<T, B = unknown>(
    url: string,
    body: B,
    config: ExtendedAxiosRequestConfig & { returnFullEnvelope: true },
  ): Promise<ApiEnvelope<T>>;
  public put<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T>;
  public put<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T | ApiEnvelope<T>> {
    return this.request<T, B>("put", url, body, config);
  }

  public patch<T, B = unknown>(
    url: string,
    body: B,
    config: ExtendedAxiosRequestConfig & { returnFullEnvelope: true },
  ): Promise<ApiEnvelope<T>>;
  public patch<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T>;
  public patch<T, B = unknown>(
    url: string,
    body: B,
    config?: ExtendedAxiosRequestConfig,
  ): Promise<T | ApiEnvelope<T>> {
    return this.request<T, B>("patch", url, body, config);
  }
}

export const httpClient = new HttpClient(
  import.meta.env.VITE_API_BASE_URL || "http://iokagbue-001-site4.ktempurl.com",
);