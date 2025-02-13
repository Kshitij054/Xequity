import React , {useState} from "react";
import styles from '../Login/Login.module.css';
import Login_icon from '../assets/investor.png'; 
import Email_icon from '../assets/emailIcon.png'; 
import Password_icon from '../assets/password_icon.png'; 
import axios from 'axios'
import {useNavigate} from "react-router-dom";
function SignUp()
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [FinalPassword,setFinalPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (name) {
            if (password !== FinalPassword ) {
                alert("Your password is not matching");
            } 
            else if(  password.length == 0  ) {
                alert("Enter the password");
            } else {
                axios.post('http://localhost:3001/register', { name, email, password })
                    .then(result => {
                        console.log(result)
                        navigate('/login')
                    })
                    .catch(err => console.log(err));
            }
        } else {
            alert("Please enter your name");
        }
    };
    
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}>Sign Up</div>

                <div className={styles.underline}></div>

            </div>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <img src={Login_icon} className={styles.iccon} alt="" style={{ height: '25px', width: 'auto' }} />
                    <input type="text" placeholder="Name"  value={name}  onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.input}>
                    <img className={styles.iccon} src={Email_icon} alt="" />
                    <input type="email" placeholder="Email ID"  value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.input}>
                    <img src={Password_icon} className={styles.iccon} alt="" style={{ height: '25px', width: 'auto' }} />
                    <input type="text" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.input}>
                    <img src={Password_icon} className={styles.iccon} alt="" style={{ height: '25px', width: 'auto' }} />
                    <input type="text" placeholder="Confirm Password" value={FinalPassword}
                        onChange={(e) => setFinalPassword(e.target.value)}/>
                </div>
            </div>
            <div className={styles.submit_container}>

                <div className={styles.submit} onClick={handleSubmit}>
                    Sign Up
                </div>
            </div>
        </div>
    );

}
export default SignUp