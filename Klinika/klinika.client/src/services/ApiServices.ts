import {AxiosInstance, AxiosResponse} from "axios";

// Define a type for your API endpoints
type ApiEndpoints = {
    category?: string;
    paginate: string;
    get: string;
    create: string;
    update: string;
    delete: string;
    bulk_delete?: string;
};

export class ApiService<T> {
    endpoints: ApiEndpoints;
    axiosInstance: AxiosInstance;

    constructor(endpoints: ApiEndpoints, axiosInstance: AxiosInstance) {
        this.endpoints = endpoints;
        this.axiosInstance = axiosInstance;
    }

    category = async (): Promise<T[]> => {
        if (this.endpoints.category) {
            const response: AxiosResponse<T[]> = await this.axiosInstance.get(
                this.endpoints.category
            );
            return response.data;
        } else {
            throw new Error("Category endpoint is undefined");
        }
    };
    paginate = async (
        currentPage: number,
        pageSize: number,
        search: string
    ): Promise<T[]> => {
        const response: AxiosResponse<T[]> = await this.axiosInstance.get(
            `${this.endpoints.paginate}?pageNumber=${currentPage}&pageSize=${pageSize}&search=${search}`
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

    update = async (id: number | string, item: T): Promise<T> => {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(
            `${this.endpoints.update}/${id}`,
            item
        );
        return response.data;
    };

    delete = async (id: string | number): Promise<void> => {
        await this.axiosInstance.delete(`${this.endpoints.delete}?id=${id}`);
    };
    bulk_delete = async (id: string[]): Promise<void> => {
        if (this.endpoints.bulk_delete) {

            await this.axiosInstance.delete(this.endpoints.bulk_delete, {data: id});
        } else {
            throw new Error("Bulk delete endpoint is undefined");
        }
    };
}
