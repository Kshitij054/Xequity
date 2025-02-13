import React, { useEffect, useState } from "react";
import myImage from "./assets/Investor.png";
import styles from "./Investor.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Investor() {
    const [profiles, setProfiles] = useState([]); 
    const [profilePics, setProfilePics] = useState({});
    useEffect(() => {
        fetch("http://localhost:3001/profiles")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "Success") {
                    setProfiles(data.profiles);

                    data.profiles.forEach(profile => {
                        axios.get(`http://localhost:3001/profile/photo/${profile.email}`)
                            .then((response) => {
                                if (response.data.profilePic) {
                                    setProfilePics(prevState => ({
                                        ...prevState,
                                        [profile.email]: response.data.profilePic
                                    }));
                                }
                            })
                            .catch((err) => console.error(`Error fetching image for ${profile.email}`, err));
                    });


                } else {
                    console.error("Failed to fetch profiles");
                }
            })
            .catch((err) => console.error(err));
    }, []);
    
    return (
        <div className={styles.Body}>
            <div>
                <section className={styles.container}>
                    {profiles.map((profile) => (
                        <Link
                            to={`/InvestorPage/${profile.email}`} 
                            className={styles.detailsLink}
                            key={profile.email}
                        >
                            <div className={styles.content}>
                                <img
                                    src={profilePics[profile.email]|| myImage}
                                    alt="Profile"
                                    className={styles.aboutImage}
                                />
                                <ul className={styles.aboutItems}>
                                    <li className={styles.aboutItem}>
                                        <div className={styles.aboutItemText}>
                                            <h3>{profile.firstName || "Anonymous"}</h3>
                                            <p>{profile.headline}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
            <div className={styles.profile}>
                <h3>Trending Products</h3>
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem1}>
                        <div className={styles.aboutItemText}>
                        EpicTopia AI - personal pursuit manager to plan
                        </div>
                    </li>
                    <li className={styles.aboutItem1}>
                        <div className={styles.aboutItemText}>
                        Jasper - Create SEO-optimized content in minutes with AI
                        </div>
                    </li>
                    <li className={styles.aboutItem1}>
                        <div className={styles.aboutItemText}>
                        mandrake - Send Automated Twitter DMs
                        </div>
                    </li>
                    <li className={styles.aboutItem1}>
                        <div className={styles.aboutItemText}>
                            Boardy - Get warm intros to investors, customers, and collaborators
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Investor;
