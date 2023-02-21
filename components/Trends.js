import { useSelector } from 'react-redux';

import Image from 'next/image';
import styles from '../styles/Trends.module.css';
import Publications from './Publications';




function Trends() {
	
	const likes = useSelector((state) => state.likes.value);

  let trends = <p>No Trends</p>;
  if (likes.length > 0) {
    trends = likes.map((data, i) => {
      return <Publications key={i} {...data} isLiked />;
    });
  }

	return (
			<div className={styles.container}>
				<h2 className={styles.title}>Bookmarks</h2>
				<div className={styles.articlesContainer}>
					{trends}
				</div>
			</div>

	);
}

export default Trends;
