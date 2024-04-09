// import { Input } from "../features/authentication/__auth";
// import useForm from "../features/authentication/hooks/useForm";

// type FormFields = {
//   email: string;
//   password: string;
// };

// export default function Login() {
//   const { data, handleChange } = useForm({
//     email: "",
//     password: "",
//   });

//   return (
//     <section className="w-full h-[80vh] flex">
//       <div className="w-[50%] h-full bg-white flex justify-center items-center">
//         <div className="w-[400px] flex flex-col gap-8 ">
//           <div className="w-96 text-start gap-4 flex flex-col">
//             <h1 className="font-medium text-5xl">Login</h1>
//             <span className="text-lg text-zinc-700">
//               You are just a click away from prioritizing your health journey.
//             </span>
//           </div>
//           <form className="flex flex-col gap-4">
//             <Input
//               htmlFor="email"
//               labelName="Email"
//               type="text"
//               placeholder="Your email goes here"
//               name="email"
//               id="email"
//               value={data.email}
//               onChange={handleChange}
//             />
//             <Input
//               htmlFor="password"
//               labelName="Password"
//               type="password"
//               placeholder="Your password goes here"
//               name="password"
//               id="password"
//               value={data.password}
//               onChange={handleChange}
//             />

//             <button
//               type="submit"
//               className="mt-4 py-2.5 hover:bg-primary/70 font-manrope text-compact bg-primary/50 rounded-md"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="w-[50%] h-full bg-zinc-600"></div>
//     </section>
//   );
// }
