import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema_register } from "../features/authentication/__auth";

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
    // TODO: Implementation with backend
    console.log(data);
  };

  return (
    <section className="w-full h-[90vh] flex">
      <div className="w-[50%] h-full bg-white flex justify-center items-center">
        <div className="w-[400px] flex flex-col gap-8 ">
          <div className="w-96 text-start gap-4 flex flex-col">
            <h1 className="font-medium text-5xl">Register</h1>
            <span className="text-lg text-zinc-700">
              Empower your health journey with a simple click. Register now and
              prioritize your well-being today.
            </span>
          </div>
          <form
            className="flex flex-col gap-4"
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
              htmlFor="age"
              labelName="Age"
              type="date"
              placeholder="Enter your birth date"
              {...register("age")}
              error={errors.age?.message}
            />
            <button
              type="submit"
              className="mt-4 py-2.5 font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="w-[50%] h-full bg-zinc-600"></div>
    </section>
  );
}
