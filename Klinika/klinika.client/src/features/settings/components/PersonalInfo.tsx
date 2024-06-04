import {Spinner, User} from "@phosphor-icons/react";
import {Input} from "../../validation/__validation.ts";
import {zAuth} from "../../../store/zAuth.ts";
import {zPersonal} from "../__settings.ts";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ApiService} from "../../../services/ApiServices.ts";
import {Reservation} from "../../../pages/developer/ReservationData.tsx";
import axios_instance from "../../../api/axios.ts";
import {useForm} from "react-hook-form";

export type Account = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: number;
    image: string;
}

function PersonalInfo() {
    const {data: userData} = zAuth();
    const {data: accountData, setData: setAccountData} = zPersonal();
    const {
        register,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isDirty}
    } = useForm<Account>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const current_api = new ApiService<Reservation>(
        {
            update: "Account/update",
            get: 'Account/get',
            delete: 'Image/delete'
        },
        axios_instance
    );
    const [loading, setLoading] = useState(true);
    const [settingImage, setSettingImage] = useState(false);

    const onSubmit = (data: Account) => {
        const patchDoc = Object.keys(data).map((key) => ({
            op: "replace",
            path: `/${key}`,
            value: data[key as keyof Account],
        }));

        current_api.update(userData.id, patchDoc)
            .then(response => {
                console.log(response.message);
                setAccountData(response);
                window.location.reload();
            })
            .catch(error => console.error(error));
    };


    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB');
                return;
            }
            const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
            if (!validFormats.includes(file.type)) {
                alert('Invalid file format. Only JPG, PNG, GIF, and BMP are allowed.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userData.id);

            try {
                const response = await axios_instance.post('Image/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const newImageId = response.data.id;
                setValue('image', newImageId);
                setSettingImage(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        current_api.get(userData.id)
            .then(response => {
                const accountData: Account = {
                    id: response.id,
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    profileImage: response.profileImage,
                    image: response.image,
                };
                setValue('firstName', accountData.firstName);
                setValue('lastName', accountData.lastName);
                setValue('email', accountData.email);
                setAccountData(accountData);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, [userData.id, setValue, setAccountData, settingImage]); // eslint-disable-line react-hooks/exhaustive-deps -- this is exhaustive

    if (loading) {
        return <div className="bg-white w-full h-full"></div>;
    }

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
                        {accountData && accountData.image ? (
                            <img src={accountData.image} alt="profile" className="w-32 h-32 rounded-full"/>
                        ) : (
                            <User size={32} className="text-zinc-600"/>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <h1 className="font-medium text-2xl">Profile Picture</h1>
                        <p className="text-zinc-600 text-sm">JPG, PNG, GIF, or BMP. Max size of 5MB</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 justify-center items-end">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 px-4 py-1.5 rounded-md bg-black hover:border-zinc-600 border-transparent text-white font-medium"
                    >
                        Change profile picture
                    </button>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="border-2 px-6 py-1.5 hover:border-zinc-300 hover:bg-red-50 rounded-md text-zinc-800 font-medium">*/}
                    {/*    Delete*/}
                    {/*</button>*/}
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <Input
                                    htmlFor="firstName"
                                    labelName="First name"
                                    placeholder=""
                                    type="text"
                                    {...register('firstName')}
                                    name="firstName"
                                />
                            </div>

                        </div>
                        <div className="flex flex-row group items-end justify-start w-[380px]">
                            <div className="w-[340px]">
                                <Input {...register('lastName')} htmlFor="lastName" labelName="Last name" placeholder=""
                                       type="text"
                                       name="lastName"/>
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
                            <Input {...register('email')} htmlFor="email" labelName="Email" placeholder="" type="email"
                                   name="email"/>
                        </div>

                    </div>
                </div>
                {isDirty &&
                    <button
                        type="submit"
                        className="mt-4 px-6 w-40 py-2.5 flex justify-center items-center font-manrope hover:bg-zinc-950 text-white bg-zinc-800 rounded-md active:cursor-wait"
                    >
                        {isSubmitting ? (
                            <Spinner size={24} className="animate-spin"/>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                }
            </form>
        </div>
    );
}

export default PersonalInfo;