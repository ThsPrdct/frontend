import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { removeAllLikes } from "../reducers/likes";
import { Modal } from "antd";

function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const router = useRouter();

  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
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
          <div
            className={`${styles.card} ${isFlipped ? styles.isFlipped : ""}`}
          >
            <div className={`${styles.card__face} ${styles.card__face__front}`}>
              <h1>Sign In</h1>

              <input
                type="text"
                placeholder="Username"
                id="signInUsername"
                onChange={(e) => setSignInUsername(e.target.value)}
                value={signInUsername}
              />
              <input
                type="password"
                placeholder="Password"
                id="signInPassword"
                onChange={(e) => setSignInPassword(e.target.value)}
                value={signInPassword}
              />
              <button
                className={styles.card__signIn}
                id="connection"
                onClick={() => handleConnection()}
              >
                Sign in
              </button>

              <button
                onClick={() => toggleCard()}
                className={styles.card__flip}
              >
                Don't have an account?
              </button>
            </div>
            <div className={`${styles.card__face} ${styles.card__face__back}`}>
              <h1>Sign Up</h1>

              <input
                type="text"
                placeholder="Username"
                id="signUpUsername"
                onChange={(e) => setSignUpUsername(e.target.value)}
                value={signUpUsername}
              />
              <input
                type="password"
                placeholder="Password"
                id="signUpPassword"
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              />
              <button
                className={styles.card__signUp}
                onClick={() => handleRegister()}
              >
                Sign Up
              </button>

              <button
                onClick={() => toggleCard()}
                className={styles.card__flip}
              >
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
