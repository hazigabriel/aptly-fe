import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const baseUrl = process.env.API_URL || 'http://localhost:3001';

const baseUrl = process.env.API_URL || 'http://localhost:3001'
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const instance = axios.create({
    baseURL: `${baseUrl}/`,
});

const request = async <T>(
    method: HttpMethod,
    url: string,
    otherProperties?: Record<string, any>,
    customHeaders: Record<string, string> = {},
    sendToken: boolean = true,
): Promise<T> => {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;

    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            headers: {
                Authorization: sendToken && token ? `Bearer ${token}` : '',
                ...customHeaders,
            },
            ...otherProperties,
        };

        const res: AxiosResponse = await instance(config);

        return res
    } catch (error: any) {
        throw error;
    }
};

const get = async <T>(
    url: string,
    data?: Record<string, any>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    return request<T>('get', url, data, customHeaders);
};

const post = async <T>(
    url: string,
    data?: Record<string, any>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    return request<T>('post', url, data, customHeaders);
};

const put = async <T>(
    url: string,
    data?: Record<string, any>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    return request<T>('put', url, data, customHeaders);
};

const deleteRequest = async <T>(
    url: string,
    data?: Record<string, any>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    return request<T>('delete', url, data, customHeaders);
};

export { get, post, put, deleteRequest };
