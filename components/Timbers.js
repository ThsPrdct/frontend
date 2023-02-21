
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { addLike, removeLike, removeAllLikes } from '../reducers/likes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Timbers.module.css'



function Timbers(props) {
  const dispatch = useDispatch();


	return (
		<div className={styles.publications}>
			<div className={styles.publicationHeader}>
				
			</div>
			<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
			
		</div>
	);
}


export default Timbers;