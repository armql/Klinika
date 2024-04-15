import { useEffect } from "react";
import axios_instance from "../../../api/axios
import { useFormStore } from "../store/FormStore";

type FormProps = {
  type: string;
  api: string;
};

export default function ModalForm({ type, api }: FormProps) {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center bg-opacity-20 justify-center bg-black ">
      <div className="flex justify-center items-center w-[700px] h-[600px] rounded-md bg-white">
        <h1>{type}</h1>
        <form></form>
      </div>
    </div>
  );
}

// const { editItem } = useFormStore();
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const result = await axios_instance.get(api);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);
