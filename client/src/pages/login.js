import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import './styles/login.css';
import Signup from "../components/signup";
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
    const nav = useNavigate();
    const [passwordVisible, setPasswordVisibiltiy] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useAuthContext();
    const togglePasswordVisibility = () => {
        setPasswordVisibiltiy(!passwordVisible);
    }
    const goSignUp = () => {
        setSignUpClicked(true);
    }

    //Handle login functionality
    const login = async (event) => {
        event.preventDefault();

        console.log('Email: ', email);
        console.log('Password: ', password);

        if (email.length > 0 && password.length > 0){
            try{
                const response = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({email: email, password: password}),
                    credentials: 'include'
                });

                if(response.ok){
                    nav('/profile');
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            email: email
                        }
                    })
                    console.log(state);
                } 
            } catch(error){
                console.log('ERROR', error);
            }
        }
    }

    return(
        <div className="login-body">
            <div className="half-display">
                <img className="login-stock" src="/images-stock/split_face.png" alt="vintage car portrait"/>
            </div>
            <div className="authLogin-body">
                <div>
                    <p className="login-sign">Login</p>
                </div>
                <Form>
                    <Form.Group className="textBox">
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email . . ." 
                        autoComplete="email" name="email" 
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Text className="email-assurance">
                            We'll never share your email with anyone else
                        </Form.Text>
                    </Form.Group>
                    <div className="password-body">
                        <Form.Group className="textBox" controlId="formBasicPassword">
                            <Form.Control 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Password" 
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <motion.span
                            className="password-eye"
                            onClick={togglePasswordVisibility}
                            whileHover={{scale: 1.2}}
                            whileTap={{ scale: 0.9 }}
                        >
                            {passwordVisible ? <EyeFill /> : <EyeSlashFill />}
                        </motion.span>
                    </div>
                    <div className="bottom-options">
                        <Form.Group className="check-box" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button className="submitButton-login" variant="primary" type="submit" onClick={login}>
                            Login
                        </Button>
                    </div>
                </Form>
                <div className="signup-sign">
                    <p className="dont-have-acc">Don't have an account? </p> <p className="signup-text" onClick={goSignUp}>Sign Up</p>
                </div>
                <Signup trigger={signUpClicked} setTrigger={setSignUpClicked}/>
            </div>
        </div>
    );
}

export default Login;