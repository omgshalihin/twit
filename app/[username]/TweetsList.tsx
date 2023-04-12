"use client";

import React from "react";
import { Card } from "flowbite-react";
import { FaRetweet } from "react-icons/fa";
import { AiOutlinePushpin, AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

type TweetData = {
  user: {
    userName: string;
  };
  tweetContent: string;
  tweetId: string;
};

const TweetsList = ({ userTweets }: any) => {
  return (
    <div className="min-w-sm">
      {userTweets.map((tweet: TweetData) => (
        <Card key={tweet.tweetId}>
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
                      @{tweet.user.userName}
                    </p>
                    <p className="text-gray-400 truncate text-sm font-bold">
                      {tweet.tweetContent}
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

export default TweetsList;
