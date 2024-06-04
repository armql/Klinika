import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiService } from "../services/ApiServices";
import swal from "sweetalert2";

export type Category = {
    id: number;
    name: string;
};

export type HelpCenter = {
    name: string;
    email: string;
    subject: string;
    message: string;
    categoryId: number;
};

const apiService = new ApiService<HelpCenter>({
    category: "api/HelpCenterCategory/getAll",
    create: "api/HelpCenter/create",
}, axios.create({ baseURL: '/' }));

export default function ContactForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<HelpCenter>({
        name: "",
        email: "",
        subject: "",
        message: "",
        categoryId: 0,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiService.category();
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error("Error: data is not an array", data);
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'categoryId' && value ? Number(value) : value,
        }));
    };


    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (formData.name.length > 100) {
            newErrors.name = "Name cannot exceed 100 characters";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid";
        }
        if (formData.email.length > 100) {
            newErrors.email = "Email cannot exceed 100 characters";
        }
        if (formData.subject.length > 255) {
            newErrors.subject = "Subject cannot exceed 255 characters";
        }
        if (formData.message.length > 5000) {
            newErrors.message = "Message cannot exceed 5000 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await apiService.create(formData);
                console.log("Form submitted successfully:", response);
                swal.fire({
                    title: "Success!",
                    text: "Your message has been sent successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    categoryId: 0,
                });
                setErrors({});
            } catch (error) {
                console.error("Error submitting form", error);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Help Center</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject*</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message*</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-compact bg-primary/50 hover:bg-primary/70 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}