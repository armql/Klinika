import { SubmitHandler, useForm } from "react-hook-form";
import { Input, schema_login } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SliderCard from "../features/authentication/components/SliderCard";
import axios from "axios";

type FormFields = z.infer<typeof schema_login>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema_login),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    axios
      .post(
        "/api/Auth/login",
        {
          Email: data.email,
          password: data.password,
        },
        {
          headers: {
            "content-type": "Application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="w-full h-full flex py-12 gap-12 bg-white px-12">
      <div className="w-full md:w-[50%] h-full flex justify-center items-center">
        <div className="sm:w-[400px] w-full px-4 flex flex-col gap-8 ">
          <div className="w-full sm:text-start text-center gap-4 flex flex-col">
            <h1 className="font-medium text-5xl">Login</h1>
            <span className="text-lg text-zinc-700">
              Empower your health journey with a simple click. Register now and
              prioritize your well-being today.
            </span>
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              htmlFor="email"
              labelName="Email"
              type="text"
              placeholder="Your email goes here"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              htmlFor="password"
              labelName="Password"
              type="password"
              placeholder="Your password goes here"
              {...register("password")}
              error={errors.password?.message}
            />
            <Input
              htmlFor="rememberMe"
              labelName="Remember Me"
              type="checkbox"
              placeholder=""
              {...register("remember_me")}
              error={errors.remember_me?.message}
            />
            <button
              type="submit"
              className="mt-4 py-2.5 hover:bg-primary/70 font-manrope text-compact bg-primary/50 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <SliderCard />
    </section>
  );
}
