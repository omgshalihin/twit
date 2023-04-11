import React from "react";
import UserProfile from "./UserProfile";

const page = ({ params }: { params: { username: string } }) => {
  const username = params.username;
  return (
    <div>
      <UserProfile username={username} />
    </div>
  );
};

export default page;
