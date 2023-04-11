"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  async function jwtTokenHandler(): Promise<void> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/authenticate`;
    await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setToken(data);
        localStorage.setItem("jwt", data);
        console.log(formData.username);
        router.push(`/dashboard/${formData.username}`);
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  return (
    <main>
      <div>
        <label htmlFor="username">Username</label>
        <input
          className="ml-2 dark:bg-white dark:text-black"
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="ml-2 dark:bg-white dark:text-black"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div>
        <button
          className=""
          id="submit"
          type="button"
          onClick={() => jwtTokenHandler()}
        >
          Login
        </button>
      </div>
      <h1>token: {token}</h1>
    </main>
  );
};

export default Login;
