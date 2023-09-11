import { useState, useEffect } from "react";
import { Observable, Subscription, interval, merge } from "rxjs";
import { BsHeartFill } from "react-icons/bs";
import "./App.css";
import { map } from "rxjs/operators";
import Tweet from "./components/Tweet";
import Tabs from "./components/Tabs";
import { v4 as uuidv4 } from "uuid";

type Tweet = {
  account: string;
  timestamp: number;
  content: string;
  id: string;
};

type ObservableType = {
  account: string;
  timestamp: number;
  content: string;
};

type LikedTweets = string[];

function App() {
  const [tweetList, setTweetList] = useState<Tweet[]>([]);
  const [likedTweets, setLikedTweets] = useState<LikedTweets>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [likeCounter, setLikeCounter] = useState(0);

  const createTweetSource = (
    frequency: number,
    account: string,
    attribute: string,
  ): Observable<ObservableType> => {
    return interval(frequency).pipe(
      map((i: number) => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`,
      })),
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLikeToggle = (tweetId: string): void => {
    if (likedTweets.includes(tweetId)) {
      setLikedTweets((prevLikedTweets) =>
        prevLikedTweets.filter((id) => id !== tweetId),
      );
      setLikeCounter((prevValue) => prevValue - 1);
    } else {
      setLikedTweets((prevLikedTweets) => [...prevLikedTweets, tweetId]);
      setLikeCounter((prevValue) => prevValue + 1);
    }
  };

  useEffect(() => {
    const tweets: Observable<ObservableType> = merge(
      createTweetSource(5000, "AwardsDarwin", "Facepalm"),
      createTweetSource(3000, "iamdevloper", "Expert"),
      createTweetSource(5000, "CommitStrip", "Funny"),
    );

    const subscription: Subscription = tweets.subscribe((tweet) => {
      const tweetWithId = { ...tweet, id: uuidv4() }; // set unique id to identify a tweet
      setTweetList((prevTweets) => [...prevTweets, tweetWithId]);
    });

    // cleanup function to remove old tweets (to prevent memory leak)
    const cleanupInterval = setInterval(() => {
      setTweetList((prevTweets) =>
        prevTweets.filter((tweet) => currentTime - tweet.timestamp <= 30000),
      );
    }, 60000); // cleanup every 60 seconds

    return () => {
      subscription.unsubscribe();
      clearInterval(cleanupInterval);
    };
  }, []);

  const currentTime = Date.now();
  const filteredTweets =
    activeTab === "Liked"
      ? tweetList.filter((tweet) => likedTweets.includes(tweet.id))
      : tweetList.filter((tweet) => currentTime - tweet.timestamp <= 30000);

  filteredTweets.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <div className="counterTop">
        <BsHeartFill className="filledHeart" />
        <div id="counter-value" data-testid="counter">
          {likeCounter}
        </div>
      </div>
      <Tabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {filteredTweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          handleLikeToggle={handleLikeToggle}
          isLiked={likedTweets.includes(tweet.id)}
        />
      ))}
    </>
  );
}

export default App;
