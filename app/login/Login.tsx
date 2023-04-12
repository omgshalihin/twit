"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/dist/client/components/headers";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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
      .then((response) => {
        if (response.status === 200) return response.text();
        else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else {
          setErrorMsg(
            "Something went wrong, try again later or reach out to shalihinsgp@gmail.com"
          );
        }
      })
      .then((data: any) => {
        const jwtToken = data;
        if (jwtToken) {
          localStorage.setItem("jwt", data);
          router.push(`${formData.username}`);
        }
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
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
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
      <div>
        {errorMsg ? <div className="text-red-400">{errorMsg}</div> : <></>}
      </div>
    </main>
  );
};

export default Login;
