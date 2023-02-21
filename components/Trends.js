import { useSelector } from 'react-redux';

import Image from 'next/image';
import styles from '../styles/Trends.module.css';
import Timbers from './Timbers';





function Trends() {
	
	const timbers = useSelector((state) => state.likes.value);

 

	return (

			<div className={styles.trendsContainer}>
				<div>
					
				</div>
			</div>

	);
}

export default Trends;
