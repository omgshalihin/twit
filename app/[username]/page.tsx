import React from "react";
import UserProfile from "./UserProfile";
import UserTweets from "./UserTweets";

const page = ({ params }: { params: { username: string } }) => {
  const username = params.username;
  return (
    <div>
      <UserProfile username={username} />
      <UserTweets />
    </div>
  );
};

export default page;
