"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loginUser } from "../actions/auth/login";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData.username, formData.password);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      router.push("/home");
    }
  };
  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
