
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { addLike, removeLike, removeAllLikes } from '../reducers/likes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Publications.module.css'



function Publications(props) {
  const dispatch = useDispatch();

	const handleLikeClick = () => {
		if (!props.token && props.isLiked) {
			dispatch(removeLike(props));
		} else {
			dispatch(addLike(props));
		} 
	}

	let iconStyle = {};
	if (props.isLiked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	return (
		<div className={styles.publications}>
			<div className={styles.publicationHeader}>
				<h3>{props.title}</h3>
				<FontAwesomeIcon icon={faBookmark} onClick={() => handleLikeClick()} style={iconStyle} className={styles.likeIcon} />
			</div>
			<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
			<div className={styles.divider}></div>
			<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
			<p>{props.description}</p>
		</div>
	);
}


export default Publications;