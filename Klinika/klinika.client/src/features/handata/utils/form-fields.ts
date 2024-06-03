type Options = {
    id: number | string;
    name: string;
};

export type FormField = {
    type: string;
    identifier: string;
    name: string;
    options?: Options[];
    placeholder?: string;
    isHidden?: boolean;
    value?: string | number;
};
