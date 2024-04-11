import { SubmitHandler, useForm } from "react-hook-form";
import { Input, schema_login } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SliderCard from "../features/authentication/components/SliderCard";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


/* REMOVE COMMENTS LATER
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
    // TODO: Implementation with backend
    console.log(data);
  };

*/

    export default function Login() {
        // state variables for email and passwords
        const [Email, setEmail] = useState<string>("");
        const [Password, setPassword] = useState<string>("");
        const [RememberMe, setRememberMe] = useState<boolean>(false);
        // state variable for error messages
        const [error, setError] = useState<string>("");
        const navigate = useNavigate();

        // handle change events for input fields
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === "email") setEmail(value);
            if (name === "password") setPassword(value);
            if (name === "rememberme") setRememberMe(e.target.checked);
        };

        const handleRegisterClick = () => {
            navigate("/register");
        }


        // handle submit event for the form
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // validate email and passwords
            if (!Email || !Password) {
                setError("Please fill in all fields.");
            } else {
                // clear error message
                setError("");

                const response = await fetch("api/Auth/login", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    Email: Email,
                    Password: Password,
                    RememberMe: RememberMe
                  }),
                  headers: {
                    "content-type" : "Application/json",
                    "Accept": "applicaiton/json"
                  }
                })


                    .then((data) => {
                        // handle success or error from the server
                        console.log(data);
                        if (data.ok) {
                            setError("Successful Login.");
                            window.location.href = '/';
                        }
                        else
                            setError("Error Logging In.");
                            console.log("login error: " + data)

                    })
                    .catch((error) => {
                        // handle network error
                        console.error(error);
                        setError("Error Logging in.");
                    });
            }
        };

  return (
    <section className="login w-full h-full flex py-12 gap-12 bg-white px-12">
      <div className="w-[100%] md:w-[50%] h-full flex justify-center items-center">
        <div className="sm:w-[400px] w-full px-4 flex flex-col gap-8 ">
          <div className="w-full sm:text-start text-center gap-4 flex flex-col">
            <h1 className="font-medium text-5xl">Login</h1>
            <span className="text-lg text-zinc-700">
                          Empower your health journey with just one click. Log in now
                          to unlock personalized care at your fingertips!.
            </span>
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <Input
              htmlFor="email"
              labelName="Email"
              type="text"
              placeholder="Your email goes here"
              onChange={handleChange}
              /*error={errors.email?.message}
              {...register("email")}*/
            />
            <Input
              htmlFor="password"
              labelName="Password"
              type="password"
              placeholder="Your password goes here"
              onChange={handleChange}
              /*{...register("password")}
              error={errors.password?.message}*/
                      />

            <Input
              type="checkbox"
              id="rememberme"
              name="rememberme"
              checked={rememberme}
              onChange={handleChange} /><span>Remember Me</span>

            <button
              type="submit"
              value="Login"
              className="mt-4 py-2.5 hover:bg-primary/70 font-manrope text-compact bg-primary/50 rounded-md"
            >
              Login
            </button>
            <button 
              onClick={handleRegisterClick}
              className="mt-4 py-2.5 hover:bg-primary/70 font-manrope text-compact bg-primary/50 rounded-md"
            >
              Register
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <SliderCard />
    </section>
  );
}
