import React from "react";
import ProfilePicture from "./ProfilePicture";
import User from "./User";
import Timestamp from "./Timestamp";
import Message from "./Message";
import Action from "./Action";
import { TweetsData } from "../App";

interface TweetData {
  tweet: TweetsData;
}

function Tweet(props: TweetData) {
  return (
    <div className="tweet">
      <div className="body">
        <div className="top">
          <ProfilePicture />
          <User account={props.tweet.account} />
          <Timestamp timestamp={props.tweet.timestamp} />
        </div>
        <Message message={props.tweet.content} />
        <Action
        />
      </div>
      <i className="fas fa-ellipsis-h"></i>
    </div>
  );
}

export default Tweet;
