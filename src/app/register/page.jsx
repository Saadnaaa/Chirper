"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../actions/auth/register";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(
      formData.name,
      formData.username,
      formData.email,
      formData.password,
    );

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message || "Account created successfully");
      router.push("/home");
    }
  };
  return (
    <main>
      <h1>Create Your Account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Create Account</button>
      </form>
    </main>
  );
};

export default RegisterPage;
