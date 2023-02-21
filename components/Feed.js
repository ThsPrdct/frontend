import { useSelector } from 'react-redux';
import Head from 'next/head';
import styles from '../styles/Feed.module.css';
import Trends from './Trends';
import Publications from './Publications';

function Feed() {
    const likes  = useSelector((state) => state.likes.value);


  let publications = <p>No Trends Yet</p>;
  if (likes.length > 0) {
    publications = likes.map((data, i) => {
      return <Publications key={i} {...data} isLiked />;
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
                    <Trends />
                </div>
				<div className={styles.publicationContainer}>
					{publications}
				</div>
			</div>
		</div>

	);
}

export default Feed;
