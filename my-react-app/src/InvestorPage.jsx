import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";

const InvestorPage = () => {
    const { email } = useParams(); 
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        
        fetch(`http://localhost:3001/profile/${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "Success") {
                    setProfile(data.profile);
                } else {
                    console.error("Profile not found");
                }
            })
            .catch((err) => console.error(err));
    }, [email]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            
            <Hero  email={email} name={profile.firstName} description={profile.description} />
            <Experience email={email} experience={profile.experience} />
            <About email={email} education={profile.education} />
            
        </div>
    );
};

export default InvestorPage;
