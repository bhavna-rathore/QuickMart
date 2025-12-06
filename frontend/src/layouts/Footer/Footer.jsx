import React from 'react'
import styles from'./Footer.module.css'
import { AiFillGithub,AiFillLinkedin } from 'react-icons/ai';

export default function 
() {
  return (
 <div className={styles.wrapper}>
      <div className={styles.container}>

        <h3 className={styles.heading}>Connect with me</h3>

        {/* Social Icons */}
        <div className={styles.socialRow}>
          <a
            href="https://www.linkedin.com/in/bhavna-16-rathore"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <AiFillLinkedin className={styles.icon} />
          </a>

          <a
            href="https://github.com/bhavna-rathore"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <AiFillGithub className={styles.icon} />
          </a>
        </div>

        {/* Branding text */}
        <p className={styles.description}>
          Unleash your gaming potential with Game Nexus — your ultimate destination for all things gaming.
          Join us and embark on an epic journey like never before.
        </p>

        <div className={styles.divider}></div>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Game Nexus • Built by Bhavna Rathore
        </p>

      </div>
    </div>
  );
}
