"use client";
import { Card } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlinePushpin, AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import useSWR from "swr";
import { useRouter } from "next/navigation";

type ReplyData = {
  replyContent: string;
  replyId: string;
  user: {
    userName: string;
  };
  userReplyTo: string[];
};

const RepliesList = ({ username }: any) => {
  const [userIncomingReplies, setUserIncomingReplies] = useState<any>();
  const jwt = localStorage.getItem("jwt");
  const router = useRouter();

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
      .then((data) => setUserIncomingReplies(data));
  };

  useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/replies/${username}?incoming=true`,
    fetcher
  );

  if (!userIncomingReplies) return <div>loading...</div>;
  return (
    <div className="min-w-sm">
      {userIncomingReplies.map((incomingReply: ReplyData) => (
        <Card key={incomingReply.replyId}>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="pt-0 pb-5 sm:pt-0">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Thomas image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-400 truncate text-sm">
                      @{incomingReply.user.userName}
                    </p>
                    <p className="text-gray-400 truncate text-sm font-bold">
                      {incomingReply.replyContent}
                    </p>
                    <div className="flex flex-row">
                      <BsChat color="gray" />
                      <FaRetweet color="gray" />
                      <AiOutlinePushpin color="gray" />
                      <AiOutlineDelete color="gray" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RepliesList;
