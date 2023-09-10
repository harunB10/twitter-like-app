import { useState, useEffect } from "react";
import { interval, merge, Subscription } from "rxjs";
import { BsHeartFill } from "react-icons/bs";
import './App.css'
import { map, scan, startWith } from "rxjs/operators";
import Tweet from "./components/Tweet";
import Tabs from "./components/Tabs";

import { BehaviorSubject, combineLatest } from "rxjs";


export interface TweetsData {
  account: string;
  timestamp: number;
  content: string;
  liked?: boolean
}

function App() {
  const [tweetList, setTweetList] = useState<TweetsData[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const likedTweets$ = new BehaviorSubject<number[]>([]);

  const createTweetSource = (
    frequency: number,
    account: string,
    attribute: string,
  ) => {
    return interval(frequency).pipe(
      map((i) => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`,
      })),
    );
  };
  

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  

  useEffect(() => {
    const tweets = merge(
      createTweetSource(5000, "AwardsDarwin", "Facepalm"),
      createTweetSource(3000, "iamdevloper", "Expert"),
      createTweetSource(5000, "CommitStrip", "Funny"),
    );

    const subscription: Subscription = tweets.subscribe((tweet: TweetsData) => {
      setTweetList((prevTweets) => {
        const updatedTweets = [...prevTweets, { ...tweet, liked: false }];
      
        updatedTweets.sort((a, b) => b.timestamp - a.timestamp);
      
        const filteredTweets = updatedTweets.filter(
          (prevTweet) => Date.now() - prevTweet.timestamp <= 30000
        );
        return filteredTweets;
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* <div className="counterTop">
        <BsHeartFill className="filledHeart" /> <div id="counter-value">0</div>
      </div> */}
      <Tabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {tweetList.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </>
  );
}

export default App;
