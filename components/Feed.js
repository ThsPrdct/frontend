import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Feed.module.css";
import Trends from "./Trends";
import Timbers from "./Timbers";
import { useRouter } from "next/router";

function Feed() {
  const [launchedCapsule, setLaunchedCapsule] = useState("");
  const router = useRouter();

  const handleLaunch = () => {
    fetch("http://localhost:3000/launches/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: launchedCapsule,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setLaunchedCapsule("");
        }
      });
  };

  return (
    <div>
      <Head>
        <title>Timber - Feed</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.trendsContainer}>
          <h2 className={styles.trendsTitle}>New Trends</h2>
          <Trends />
        </div>
        <div className={styles.timbersContainer}>
          <h2 className={styles.timbersTitle}>News Feed</h2>
          <Timbers />
        </div>
      </div>
      <div className={styles.addSection}>
        <input
          type="text"
          id="launchedCapsule"
          placeholder="New launch..."
          value={launchedCapsule}
          onChange={(e) => setLaunchedCapsule(e.target.value)}
        />
        <button
          className={styles.launchBtn}
          type="button"
          onClick={handleLaunch}
        >
          Launch
        </button>
      </div>
    </div>
  );
}

export default Feed;
