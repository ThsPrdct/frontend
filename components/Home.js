import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { removeAllLikes } from '../reducers/likes';

function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();
  

  const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

 


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
        
      }
        })
  };


			
	

  

  function toggleCard() {
    setIsFlipped(!isFlipped);
  }

      /*
	let homeSection;
	if (user.token) {
		homeSection = (
      
    )}
*/


  return (
    <div>
      <Head>
        <title>Timber - Home</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.scene}>
          <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
            <div className={`${styles.card__face} ${styles.card__face__front}`}>
              <h1>Sign In</h1>
              <form>
                <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<Link href="/feed"><button className={styles.card__signIn} id="connection" onClick={() => handleConnection}>Sign in</button></Link>
              </form>
              <button onClick={() => toggleCard()} className={styles.card__flip}>
                Don't have an account?
              </button>
            </div>
            <div className={`${styles.card__face} ${styles.card__face__back}`}>
              <h1>Sign Up</h1>
              <form>
                <input
                  type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button className={styles.card__signUp} onClick={handleRegister}>Sign Up</button>
            </form>
            <button onClick={() => toggleCard()} className={styles.card__flip}>Already have an account?</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;