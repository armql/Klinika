type Options = {
  id: number;
  name: string;
};

export type FormField = {
  type: string;
  identifier: string;
  name: string;
  options?: Options[];
  placeholder?: string;
  isHidden?: boolean;
};
