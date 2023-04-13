"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

type UserData = {
  userId: string;
  userName: string;
  userEmail: string;
  userFollowing: number[];
  userFollower: number[];
};

const UserProfile = ({ username }: any) => {
  const router = useRouter();
  const [userData, setuserData] = useState<UserData>();
  const jwt = localStorage.getItem("jwt");

  const fetcher = (url: RequestInfo | URL) => {
    fetch(url, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: "cors",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 403) {
          router.push("/login");
        }
      })
      .then((data) => setuserData(data));
  };

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`,
    fetcher
  );

  if (!userData) return <div>loading...</div>;
  // if (error) return <div>failed to load</div>;

  return (
    <div>
      <p>{username}</p>
      <p>ID: {userData.userId} </p>
      <p>Username: {userData.userName} </p>
      <p>Email: {userData.userEmail} </p>
      <p>Following: {userData.userFollowing.length} </p>
      <p>Followers: {userData.userFollower.length} </p>
    </div>
  );
};

export default UserProfile;
