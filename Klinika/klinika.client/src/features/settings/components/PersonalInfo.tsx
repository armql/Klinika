import {NotePencil, User} from "@phosphor-icons/react";
import {Input} from "../../validation/__validation.ts";

function PersonalInfo() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <div>
                <h1 className="text-2xl font-medium">Personal Info</h1>
                <p className="text-zinc-600">
                    Your personal information is used to create your profile and to verify your identity.
                </p>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 border-t-2 border-b-2 py-8 px-4">
                <div className="flex flex-row items-center gap-6">
                    <div className="border-2 w-32 h-32 rounded-full flex justify-center items-center">
                        <User size={48} weight="duotone"/>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <h1 className="font-medium text-2xl">Profile Picture</h1>
                        <p className="text-zinc-600 text-sm">JPG, PNG, GIF, or BMP. Max size of 5MB</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 justify-center items-end">
                    <button
                        type="button"
                        className="border-2 px-4 py-1.5 rounded-md bg-black hover:border-zinc-600 border-transparent text-white font-medium">
                        Change profile picture
                    </button>
                    <button
                        type="button"
                        className="border-2 px-6 py-1.5 hover:border-zinc-300 hover:bg-red-50 rounded-md text-zinc-800 font-medium">
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-6 border-b-2 py-8 px-4">
                <div>
                    <h1 className="font-medium text-2xl">Full Name</h1>
                    <p className="text-zinc-600 text-sm">
                        Your full name is used to identify you and to address you in our communications.
                    </p>
                </div>
                <div className="flex flex-row gap-6 w-full">
                    <div className="flex flex-row group items-end justify-start w-[380px]">
                        <div className="w-[340px]">
                            <Input htmlFor="firstName" labelName="First name" placeholder="" type="text"
                                   name="firstName"/>
                        </div>

                        <div className="pb-0.5 pl-1.5 group-hover:block hidden">
                            <button
                                type="button"
                                className=""
                            >
                                <NotePencil size={32} weight="duotone"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row group items-end justify-start w-[380px]">
                        <div className="w-[340px]">
                            <Input htmlFor="lastName" labelName="Last name" placeholder="" type="text"
                                   name="lastName"/>
                        </div>

                        <div className="pb-0.5 pl-1.5 group-hover:block hidden">
                            <button
                                type="button"
                                className=""
                            >
                                <NotePencil size={32} weight="duotone"/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex flex-row justify-between items-center gap-6 border-b-2 py-8 px-4">
                <div>
                    <h1 className="font-medium text-2xl">Email</h1>
                    <p className="text-zinc-600 text-sm">
                        Your email is used to log in and to send you important notifications.
                    </p>
                </div>
                <div className="flex flex-row group items-end justify-start w-[380px]">
                    <div className="w-[340px]">
                        <Input htmlFor="email" labelName="Email" placeholder="" type="email"
                               name="email"/>
                    </div>

                    <div className="pb-0.5 pl-1.5 group-hover:block hidden">
                        <button
                            type="button"
                            className=""
                        >
                            <NotePencil size={32} weight="duotone"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 border-b-2 py-8 px-4">
                <div>
                    <h1 className="font-medium text-2xl">Password</h1>
                    <p className="text-zinc-600 text-sm">
                        Your password is used to log in and to secure your account.
                    </p>
                </div>
                <div className="flex flex-row group items-end justify-start w-[380px]">
                    <div className="w-[340px]">
                        <Input htmlFor="password" labelName="Password" placeholder="" type="password"
                               name="password"/>
                    </div>

                    <div className="pb-0.5 pl-1.5 group-hover:block hidden">
                        <button
                            type="button"
                            className=""
                        >
                            <NotePencil size={32} weight="duotone"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;