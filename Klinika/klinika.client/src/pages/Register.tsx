import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema_register } from "../features/authentication/__auth";
import axios from "axios";

type FormFields = z.infer<typeof schema_register>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema_register),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    axios
      .post(
        "api/Auth/register",
        {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          password: data.password,
          birthDate: data.age,
          gender: data.gender,
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
      <div className="w-[100%] md:w-[50%] h-full flex justify-center items-center">
        <div className="sm:w-[400px] w-full px-4 flex flex-col gap-8 ">
          <div className="w-full sm:text-start text-center gap-4 flex flex-col">
            <h1 className="font-medium text-5xl">Register</h1>
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
              htmlFor="first_name"
              labelName="First Name"
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
              error={errors.first_name?.message}
            />
            <Input
              htmlFor="last_name"
              labelName="Last Name"
              type="text"
              placeholder="Enter your last name"
              {...register("last_name")}
              error={errors.last_name?.message}
            />
            <Input
              htmlFor="email"
              labelName="Email"
              type="text"
              placeholder="Enter your email address"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              htmlFor="password"
              labelName="Password"
              type="password"
              placeholder="Create a secure password"
              {...register("password")}
              error={errors.password?.message}
            />
            <Input
              htmlFor="password"
              labelName="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirm_password")}
              error={errors.confirm_password?.message}
            />
            <Input
              htmlFor="age"
              labelName="Age"
              type="date"
              placeholder="Enter your birth date"
              {...register("age")}
              error={errors.age?.message}
            />
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="gender"
                className="font-medium sm:text-base text-sm text-compact"
              >
                Gender
              </label>
              <select
                title="Select a gender"
                {...register("gender")}
                className={`border-2 rounded-md sm:text-base text-sm w-full py-2 px-2 font-light placeholder-zinc-500 focus:outline-primary`}
              >
                <option value="Not specified" selected disabled>
                  Not specified
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <span className="absolute sm:-bottom-5 truncate -bottom-4 px-2 sm:text-sm text-xs text-red-600">
              {errors.gender?.message}
            </span>
            <button
              type="submit"
              className="mt-4 py-2.5 font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="w-[50%] max-h-screen bg-gradient-to-b from-compact/80 to-primary/50 md:block hidden rounded-md">
        <div className="w-full h-full flex justify-end p-4 flex-col items-start">
          <h1 className="text-4xl font-manrope text-compact">
            Lorem ipsum dorum
          </h1>
        </div>
      </div>
    </section>
  );
}
