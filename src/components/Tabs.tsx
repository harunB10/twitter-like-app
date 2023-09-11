import React from "react";
import "../index.css";

interface TabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === "All" ? "active" : ""}`}
        onClick={() => onChangeTab("All")}
      >
        All
      </button>
      <button
        className={`tab ${activeTab === "Liked" ? "active" : ""}`}
        onClick={() => onChangeTab("Liked")}
      >
        Liked
      </button>
    </div>
  );
};

export default Tabs;
