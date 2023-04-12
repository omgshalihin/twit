"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/dist/client/components/headers";
import { Label, TextInput, Button } from "flowbite-react";

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
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" color="white" value="Your username" />
          </div>
          <TextInput
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={(e) => handleInput(e)}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" color="white" value="Your password" />
          </div>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => handleInput(e)}
            required={true}
          />
        </div>
        <Button type="button" onClick={() => jwtTokenHandler()}>
          Register new account
        </Button>
        <div>
          {errorMsg ? <div className="text-red-400">{errorMsg}</div> : <></>}
        </div>
      </div>
    </main>
  );
};

export default Login;
