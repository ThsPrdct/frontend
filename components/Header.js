import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { Modal } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import { useRouter } from 'next/router';




function Header() {
	const [date, setDate] = useState('2050-11-22T23:59:59');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const router = useRouter();
	
	const [signUpUsername, setSignUpUsername] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");

	const [signInUsername, setSignInUsername] = useState("");
	const [signInPassword, setSignInPassword] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	
	



	const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
					setSignUpUsername('');
					setSignUpPassword('');
					setIsModalVisible(false);
					

				
				}
			});
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
        dispatch(login({username: signInUsername, token: data.token}))
        setSignInUsername("");
        setSignInPassword("");    
		setIsModalVisible(false);
		   
					
      }
        })
  };

	useEffect(() => {
		setDate(new Date());
	}, []);

	const handleLogout = () => {
		dispatch(logout());
	  };

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	let modalContent;
	if (!user.isConnected) {
	 modalContent = (
		<div className={styles.registerContainer}>
			<div className={styles.registerSection}>
				
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
            	<button className={styles.card__signIn} id="connection" onClick={() => router.push('/feed') && handleConnection()}>Sign in</button>
			</div>
			</div>
		</div>
		
	);
	 }

	 let userSection;
	 if (user.token) {
		 userSection = (
			 <div className={styles.logoutSection}>
				 <p>Welcome {user.username}</p>
				 <button className={styles.logOutBtn} onClick={() => router.push('/') && handleLogout()}>Logout</button>
			 </div>
		 );
	 } else {
		 if (isModalVisible) {
			 userSection =
				 <div className={styles.headerIcons}>
					 <FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
				 </div>
		 } else {
			 userSection =
				 <div className={styles.headerIcons}>
					 <FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faUser} />
		
				 </div>								
				 
		 }
	 }
				


	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Moment className={styles.date} date={date} format="MMM Do YYYY" />
				<h1 className={styles.title}>TIMBER</h1>
				{userSection}
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


 
