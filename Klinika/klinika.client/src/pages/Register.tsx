import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Select } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema_register } from "../features/authentication/__auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, X } from "@phosphor-icons/react";
import getErrorMessage from "../util/http-handler";
import GlobalError from "../features/validation/components/GlobalError";

type FormFields = z.infer<typeof schema_register>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema_register),
  });
  const [globalError, setGlobalError] = useState("");

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
        return response.data;
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        setGlobalError(errorMessage);
      });
  };

  return (
    <section className="w-full h-full flex py-12 gap-12 bg-white sm:px-12 px-4">
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
            <Select
              htmlFor="gender"
              labelName="Gender"
              {...register("gender")}
              options={["Not Specified", "Male", "Female"]}
              error={errors.gender?.message}
            />
            <GlobalError error={globalError} close={() => setGlobalError("")} />
            <button
              type="submit"
              className="mt-4 py-2.5 flex justify-center items-center font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md active:cursor-wait"
            >
              {isSubmitting ? (
                <Spinner size={24} className="animate-spin" />
              ) : (
                "Register"
              )}
            </button>
            <span className="font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary/80 hover:underline hover:text-primary focus:cursor-wait"
              >
                Login now
              </Link>
            </span>
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
