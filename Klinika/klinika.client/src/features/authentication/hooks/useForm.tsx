import { useState } from "react";

type FormState = {
  [key: string]: string;
};

export default function useForm(initialState: FormState) {
  const [data, setData] = useState(initialState);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [ev.target.name]: ev.target.value,
    });
  };

  return { data, handleChange };
}
