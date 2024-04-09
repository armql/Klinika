import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // TODO: Implementation with backend
    console.log(data);
  };

  return (
    <section className="w-full h-[80vh] flex">
      <div className="w-[50%] h-full bg-white flex justify-center items-center">
        <div className="w-[400px] flex flex-col gap-8 ">
          <div className="w-96 text-start gap-4 flex flex-col">
            <h1 className="font-medium text-5xl">Login</h1>
            <span className="text-lg text-zinc-700">
              You are just a click away from prioritizing your health journey.
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
            <button
              type="submit"
              className="mt-4 py-2.5 hover:bg-primary/70 font-manrope text-compact bg-primary/50 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="w-[50%] h-full bg-zinc-600"></div>
    </section>
  );
}
