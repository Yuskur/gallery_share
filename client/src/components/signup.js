import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import {useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import './signup.css';

function Signup(props) {
    const [passwordVisible, setPasswordVisibiltiy] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibiltiy(!passwordVisible);
    }

    return(props.trigger) ? (
        <div className="signup-body">
            <Form className="signup-inner">
                <CloseButton className="close-button" onClick={() => {props.setTrigger(false)}}/>
                <div>
                    <p className="signup-sign">Sign up</p>
                </div>
                <Form.Group className="textBox" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email . . ." autoComplete="email" name="email" id="email"/>
                    <Form.Text className="email-assurance">
                        We'll never share your email with anyone else
                    </Form.Text>
                </Form.Group>
                <div className="password-body">
                    <Form.Group className="textBox" controlId="formBasicPassword">
                        <Form.Control type={passwordVisible ? "text" : "password"} 
                        placeholder="Password" />
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
                    <Form.Group className="textBox" controlId="formBasicPassword">
                        <Form.Control type={passwordVisible ? "text" : "password"} 
                        placeholder="Verify Password" />
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
    ): "";
}

export default Signup;