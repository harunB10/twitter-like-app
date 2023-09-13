import React from "react";
import ProfilePicture from "./ProfilePicture";
import User from "./User";
import Timestamp from "./Timestamp";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import Message from "./Message";
import {Tweet as TweetType} from '../App'

interface TweetProps {
  tweet: TweetType
  handleLikeToggle: (tweetId: string) => void;
  isLiked: boolean;
}

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  return (
    <div className="tweet" data-testid="tweet">
      <ProfilePicture />
      <div className="body">
        <div className="top">
          <User account={props.tweet.account} />
          <Timestamp timestamp={props.tweet.timestamp} />
        </div>
        <Message message={props.tweet.content} />
        <div
          className="actions"
          onClick={() => props.handleLikeToggle(props.tweet.id)}
        >
          {props.isLiked ? (
            <BsHeartFill data-testid={"unlike-button"} color={"red"} />
          ) : (
            <BsHeart data-testid={"like-button"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
