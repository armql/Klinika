import { AxiosInstance, AxiosResponse } from "axios";

// Define a type for your API endpoints
type ApiEndpoints = {
  getAll: string;
  get: string;
  create: string;
  update: string;
  delete: string;
};

export class ApiService<T> {
  endpoints: ApiEndpoints;
  axiosInstance: AxiosInstance;

  constructor(endpoints: ApiEndpoints, axiosInstance: AxiosInstance) {
    this.endpoints = endpoints;
    this.axiosInstance = axiosInstance;
  }

  getAll = async (): Promise<T[]> => {
    const response: AxiosResponse<T[]> = await this.axiosInstance.get(
      this.endpoints.getAll
    );
    return response.data;
  };

  get = async (id: string): Promise<T> => {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      `${this.endpoints.get}/?id=${id}`
    );
    return response.data;
  };

  create = async (item: T): Promise<T> => {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      this.endpoints.create,
      item
    );
    return response.data;
  };

  update = async (item: T): Promise<T> => {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      `${this.endpoints.update}`,
      item
    );
    return response.data;
  };

  delete = async (id: string): Promise<void> => {
    await this.axiosInstance.delete(`${this.endpoints.delete}?id=${id}`);
  };
}
