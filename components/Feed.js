import { useSelector } from 'react-redux';
import Head from 'next/head';
import styles from '../styles/Feed.module.css';
import Trends from './Trends';
import Timbers from './Timbers';

function Feed() {
    const likes  = useSelector((state) => state.likes.value);


  let timbers = <p>No Timbers Yet</p>;
  if (likes.length > 0) {
    timbers = likes.map((data, i) => {
      return <Timbers key={i} {...data} isLiked />;
    });
  }

  let trends = <p>No Trends Yet</p>;
  if (timbers.length > 0) {
    trends = timbers.map((data, i) => {
      return <Trends key={i} {...data} isLiked />;
    });
  }

  

  

  

	return (
		<div>
			<Head>
				<title>Timber - Feed</title>
			</Head>
			<div className={styles.container}>
				<h2 className={styles.title}>Feed</h2>
                <div className={styles.trendsContainer}>
                    {trends}
                </div>
				<div className={styles.publicationContainer}>
					{timbers}
				</div>
			</div>
		</div>

	);
}

export default Feed;
