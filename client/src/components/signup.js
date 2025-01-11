import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import { useAuthContext } from "../hooks/useAuthContext";
import './signup.css';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verify_password, setVerifyPassword] = useState("");
    const [passwordVisible, setPasswordVisibility] = useState(false);
    
    //custome hook to handle the user context
    const {state, dispatch} = useAuthContext();
    
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    // Navigation
    const nav = useNavigate();

    const signUp = async (event) => {
        event.preventDefault();
        
        if (email.length > 0 && password.length > 0 && verify_password.length > 0) {
            try {
                const response = await fetch('http://localhost:3001/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    }, 
                    body: JSON.stringify({ email, password, verified_password: verify_password }),
                    credentials: 'include'
                });
                
                if (response.ok) {
                    nav('/profile');
                    dispatch({
                        type: 'LOGIN', 
                        payload: {
                            email: email
                        }})
                }
            } catch (error) {
                console.log('ERROR', error);
            }
        } else {
            console.log('Fill in all fields');
        }
    };

    return (props.trigger) ? (
        <div className="signup-body">
            <Form className="signup-inner" onSubmit={signUp}>
                <CloseButton className="close-button" onClick={() => props.setTrigger(false)} />
                <div>
                    <p className="signup-sign">Sign up</p>
                </div>
                <Form.Group className="textBox" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email . . ." 
                        autoComplete="email" 
                        onChange={(event) => setEmail(event.target.value)} 
                    />
                    <Form.Text className="email-assurance">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <div className="password-body">
                    <Form.Group className="textBox" controlId="formPassword">
                        <Form.Control 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Password" 
                            onChange={(event) => setPassword(event.target.value)} 
                        />
                    </Form.Group>
                    <motion.span
                        className="password-eye"
                        onClick={togglePasswordVisibility}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {passwordVisible ? <EyeFill /> : <EyeSlashFill />}
                    </motion.span>
                </div>
                <Form.Group className="textBox" controlId="formVerifyPassword">
                    <Form.Control 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="Verify Password" 
                        onChange={(event) => setVerifyPassword(event.target.value)} 
                    />
                </Form.Group>
                <div className="bottom-options">
                    <Form.Group className="check-box" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button className="submitButton-signup" variant="primary" type="submit">
                        Sign up
                    </Button>
                </div>
            </Form>
        </div>
    ) : "";
}

export default Signup;
