import { useState } from 'react';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const useApi = <T>(options?: UseApiOptions) => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const request = async (
    url: string,
    method: string = 'GET',
    body: any = null,
    headers: Record<string, string> = {}
  ) => {
    try {
      console.log(`API Request: ${method} ${url}`, body ? { body } : '');
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...headers,
        },
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      console.log('Request options:', {
        method,
        headers: requestOptions.headers,
        body: body ? 'PRESENT' : 'NONE'
      });

      const response = await fetch(url, requestOptions);
      console.log(`Response status: ${response.status}`);
      
      // If unauthorized (token expired or invalid), redirect to login
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Your session has expired. Please login again.');
      }
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setState((prev) => ({ ...prev, data, loading: false }));
      options?.onSuccess?.(data);
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('API Error:', errorMessage);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      options?.onError?.(errorMessage);
      return null;
    }
  };

  const get = (url: string, headers?: Record<string, string>) =>
    request(url, 'GET', null, headers);

  const post = (url: string, body: any, headers?: Record<string, string>) =>
    request(url, 'POST', body, headers);

  const put = (url: string, body: any, headers?: Record<string, string>) =>
    request(url, 'PUT', body, headers);

  const patch = (url: string, body: any, headers?: Record<string, string>) =>
    request(url, 'PATCH', body, headers);

  const del = (url: string, headers?: Record<string, string>) =>
    request(url, 'DELETE', null, headers);

  return {
    ...state,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

export default useApi; 