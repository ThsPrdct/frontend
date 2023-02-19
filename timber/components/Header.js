import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { Modal } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';



function Header() {
	const [date, setDate] = useState('2050-11-22T23:59:59');
	const [isModalVisible, setIsModalVisible] = useState(false);
	
	const [signUpUsername, setSignUpUsername] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");

	const [signInUsername, setSignInUsername] = useState("");
	const [signInPassword, setSignInPassword] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const handleRegister = () => {
    fetch ("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
			if (data.result) {
				dispatch(login(signUpUsername))
				setSignUpUsername("");
				setSignUpPassword("");
			}
        })
	}

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleConnection= () => {
    fetch ("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signInUsername, password: signInPassword }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
			if (data.result) {
				dispatch(login(signInUsername))
				setSignInUsername("");
				setSignInPassword("");
			}
        })
	}

	useEffect(() => {
		setDate(new Date());
	}, []);


	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	let modalContent;
	if (!user.isConnected) {
	 modalContent = (
		<div className={styles.registerContainer}>
			<div className={styles.registerSection}>
				<p>Sign-up</p>	
				<input 
            	type="text" 
            	placeholder="Username" 
            	id="signUpUsername" 
            	onChange={(e)   => setSignUpUsername(e.target.value)} 
            	value={signUpUsername}
            	/>						
            	<input 
            	type="password" 
           	 	placeholder="Password" 
           	 	id="signUpPassword" 
            	onChange={(e)   => setSignUpPassword(e.target.value)} 
            	value={signUpPassword}
            />		
            <button id="register" onClick={() => handleRegister()}>
				Register
			</button>
			</div>
			<div className={styles.registerSection}>
				<p>Sign-in</p>				
				<input 
            	type="text" 
            	placeholder="Username" 
            	id="signInUsername" 
            	onChange={(e)   => setSignInUsername(e.target.value)} 
            	value={signInUsername}
            	/>						
            	<input 
            	type="password" 
           	 	placeholder="Password" 
           	 	id="signInPassword" 
            	onChange={(e)   => setSignInPassword(e.target.value)} 
            	value={signInPassword}
            />		
            <button id="register" onClick={() => handleConnection()}>
				Connect
			</button>
			</div>
			
		</div>
		
	);
	 }

	let userSection;
	if (user.isConnected) {
		userSection = (
			<div className={styles.logoutSection}>
				<p>Welcome {user.username} /</p>
				<button onClick={ () => handleLogout()}>Logout</button>
			</div>
		);
	} else {

	if (isModalVisible) {
		userSection = <FontAwesomeIcon icon={faXmark} onClick={() => showModal()} className={styles.userSection} />;
	} else {
		userSection = <FontAwesomeIcon icon={faUser} onClick={() => showModal()} className={styles.userSection} />;
	}
}


	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Moment className={styles.date} date={date} format="MMM Do YYYY" />
				<h1 className={styles.title}>Morning News</h1>
				{userSection}
			</div>

			<div className={styles.linkContainer}>
				<Link href="/"><span className={styles.link}>Articles</span></Link>
				<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
			</div>

			{isModalVisible && <div id="react-modals">
				<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
					{modalContent}
				</Modal>
			</div>}
		</header >
	);
	
}

export default Header;


/*
const handleSubmit = () => {
		if (isRegister) {
			router.post('/signup', {
				username: userReg,
				password: passwordReg
			})
			.then(res => {
				if (res.data.result) {
					setIsRegister(false);
					setIsSignedIn(true);
					
				}
			})
			.catch(err => {
				console.log(err);
			});
		} else {
			router.post('/signin', {
				username: userLog,
				password: passwordLog
			})
			.then(res => {
				if (res.data.result) {
					setIsSignedIn(true);
					
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	};
	 */


 
