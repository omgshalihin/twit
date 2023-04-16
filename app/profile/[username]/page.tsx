import React from "react";
import UserProfile from "./UserProfile";
import UserTweets from "./UserTweets";
import SideBar from "@/components/sidebar";

const page = ({ params }: { params: { username: string } }) => {
  const username = params.username;

  return (
    <div>
      <UserProfile username={username} />
      <UserTweets username={username} />
    </div>
  );
};

export default page;
