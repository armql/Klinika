import {AxiosInstance, AxiosResponse} from "axios";

// Define a type for your API endpoints
type ApiEndpoints = {
    category?: string;
    category2?: string;
    reservations?: string;
    paginate?: string;
    get?: string;
    create?: string;
    create_image?: string;
    update?: string;
    delete?: string;
    bulk_delete?: string;
};

type PatchProps = { op: string; path: string; value: number | string | boolean; }[];

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

    category2 = async (): Promise<T[]> => {
        if (this.endpoints.category2) {
            const response: AxiosResponse<T[]> = await this.axiosInstance.get(
                this.endpoints.category2
            );
            return response.data;
        } else {
            throw new Error("Category endpoint is undefined");
        }
    };

    createImage = async (image: File): Promise<T> => {
        if (!this.endpoints.create_image) {
            throw new Error("create_image endpoint is undefined");
        }

        const formData = new FormData();
        formData.append('file', image);

        const response: AxiosResponse<T> = await this.axiosInstance.post(
            this.endpoints.create_image,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
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

    reservations = async (
        userId: string,
        currentPage: number,
        pageSize: number,
        search: string
    ): Promise<T[]> => {
        const response: AxiosResponse<T[]> = await this.axiosInstance.get(
            `${this.endpoints.reservations}?userId=${userId}&pageNumber=${currentPage}&pageSize=${pageSize}&search=${search}`
        );
        return response.data;
    };

    get = async (id: number | string): Promise<T> => {
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

    update = async (id: number | string, item: PatchProps): Promise<T> => {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(
            `${this.endpoints.update}/${id}`,
            item
        );
        return response.data;
    };

    delete = async (id: number | string): Promise<void> => {
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
