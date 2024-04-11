import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../features/authentication/__auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema_register } from "../features/authentication/__auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiResponse from "../api"

/* REMOVE COMMENTS LATER

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
*/


export default function Register() {
    // state variables for email and passwords
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");    
  const navigate = useNavigate();

  // state variable for error messages
  const [error, setError] = useState("");

  const handleLoginClick = () => {
      navigate("/login");
  }


  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "confirmPassword") setConfirmPassword(value);
      if (name === "firstName") setFirstName(value);
      if (name === "lastName") setLastName(value);
      if (name === "birthDate") setBirthDate(value);
      if (name === "gender") setGender(value);
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // validate email and passwords
      if (firstName == null) {
          setError("Please fill in all fields.");
      /*} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Please enter a valid email address.");*/
      } else if (password !== confirmPassword) {
          setError("Passwords do not match.");
      } else {
          // clear error message
          setError("");

          // post data to the /register api
          const response = await fetch("api/Auth/register", {
              method: "POST",
              headers: {
                "content-type" : "Application/json",
                "Accept": "applicaiton/json"
              },
              body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  birthDate: birthDate,
                  gender: gender
              }),
          })
              //.then((response) => response.json())
              .then((data) => {
                  // handle success or error from the server
                  console.log(data);
                  if (data.ok)
                      setError("Successful register.");
                  else
                      
                      setError("Error registering");
                      console.log("register error" + data)

              })
              .catch((error) => {
                  // handle network error
                  console.error(error);
                  setError("Error registering. 2");
              });
      }
  };

  return (
    <section className="register w-full h-full flex py-12 gap-12 bg-white px-12">
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
            onSubmit={handleSubmit}
          >
            <Input
              htmlFor="firstName"
              id="firstName"
              labelName="First Name"
              type="text"
              placeholder="Enter your first name"
              onChange={handleChange}
              /*{...register("first_name")}
              error={errors.first_name?.message}*/
            />
            <Input
              htmlFor="lastName"
              id="lastName"
              labelName="Last Name"
              type="text"
              placeholder="Enter your last name"
              onChange={handleChange}
              /*{...register("last_name")}
              error={errors.last_name?.message}*/
            />
            <Input
              htmlFor="email"
              id="email"
              labelName="Email"
              type="text"
              placeholder="Enter your email address"
              onChange={handleChange}
              /*{...register("email")}
              error={errors.email?.message}*/
            />
            <Input
              htmlFor="password"
              id="password"
              labelName="Password"
              type="password"
              placeholder="Create a secure password"
              onChange={handleChange}
              /*{...register("password")}
              error={errors.password?.message}*/
            />
            <Input
              htmlFor="confirmPassword"
              id="confirmPassword"
              labelName="Confirm Password"
              type="password"
              placeholder="Create a secure password"
              onChange={handleChange}
              /*{...register("password")}
              error={errors.password?.message}*/
            />
            <Input
              htmlFor="gender"
              id="gender"
              labelName="Gender"
              type="text"
              placeholder="Choose your gender"
              onChange={handleChange}
              /*{...register("password")}
              error={errors.password?.message}*/
            />
            <Input
              htmlFor="birthDate"
              id="birthDate"
              labelName="Birth Date"
              type="date"
              placeholder="Enter your birth date"
              onChange={handleChange}
              /*{...register("age")}
              error={errors.age?.message}*/
            />
            <button
              type="submit"
              className="mt-4 py-2.5 font-manrope hover:bg-primary/70 text-compact bg-primary/50 rounded-md"
            >
              Register
            </button>
          </form>
          {error && <p className="error">{error}</p>}
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
