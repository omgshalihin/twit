"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Alert, Dropdown, Tabs } from "flowbite-react";
import TweetsList from "./TweetsList";

const UserTweets = ({ username }: any) => {
  const [userTweets, setuserTweets] = useState();
  const jwt = localStorage.getItem("jwt");

  const fetcher = (url: RequestInfo | URL) => {
    fetch(url, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => setuserTweets(data));
  };

  useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tweets/${username}`,
    fetcher
  );

  if (!userTweets) return <div>loading...</div>;
  console.log(userTweets);
  return (
    <div>
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item active={true} title="Tweets">
          <TweetsList userTweets={userTweets} />
        </Tabs.Item>
        <Tabs.Item title="Replies">Replies content</Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default UserTweets;
