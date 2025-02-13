import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import axios from "axios";

export const Hero = ({ email, name, description }) => {
  const [profilePic, setProfilePic] = useState("");  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/photo/${email}`);
        setProfilePic(response.data.profilePic); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setLoading(false);
      }
    };

    fetchProfilePic();
  }, [email]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.investor_type}>
          <div className={styles.investor_list}>
            <button className={styles.tag}>Angel Investor</button>
            <button className={styles.tag}>Venture Capitalist</button>
            <button className={styles.tag}>Corporate Investor</button>
            <button className={styles.tag}>Hedge Fund</button>
            <button className={styles.tag}>Impact Investor</button>
          </div>
        </div>
        
        <a href={`mailto:${email}`} className={styles.contactBtn}>
          Connect +
        </a>
      </div>

      {loading ? (
        <div className={styles.heroImg}>Loading...</div>
      ) : (
        <img
          src={profilePic || "http://localhost:3001/uploads/Investor.jpg"}
          alt="Profile"
          className={styles.heroImg}
        />
      )}
      
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
