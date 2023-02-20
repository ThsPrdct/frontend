import { useState } from 'react';
import styles from '../styles/Home.module.css';

function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleCard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className={styles.container}>
      <div className={styles.scene}>
        <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
          <div className={`${styles.card__face} ${styles.card__face__front}`}>
        
                <h1>Sign In</h1>
              
                  <input type="text" placeholder="UserName" />
                  <input type="password" placeholder="Password" />
                  <button className={styles.card__signIn}>Sign In</button>
                  
                
           
            <button onClick={() => toggleCard()} className={styles.card__flip}>Don't have an account?</button>
            </div>
          <div className={`${styles.card__face} ${styles.card__face__back}`}>
          <h1>Sign Up</h1>
                
                  <input type="text" placeholder="UserName" />
                  <input type="password" placeholder="Password" />
                  <button className={styles.card__signUp}>Sign Up</button>
                  
               
            <button onClick={() => toggleCard()} className={styles.card__flip}>Already have an account?</button>
           
              
              </div>
            </div>
          </div>
        </div>
        
        
    
  );
}

export default Home;