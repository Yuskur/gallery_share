import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link , useLocation} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import SearchBar from "../components/search-bar";
import './styles/landing-page.css';
import { useAuthContext } from "../hooks/useAuthContext";

function Landing() {
    const location = useLocation();

    const {state} = useAuthContext();

    console.log(state);

    return(
        <div className="landingPage-body">
            <div className="topBar">
                <div className="nav-bar">
                    <p className="nav-bar-text">Create</p>
                    <p className="nav-bar-text">Art</p>
                    <p className="nav-bar-text">Photos</p>
                    <p className="nav-bar-text">Sculptures</p>
                    <p className="nav-bar-text">Collections</p>
                </div>
                <div className="search-body-l">
                    <SearchBar />
                </div>
            </div>
            <div className="landingPage-content">
                <div className="intro-slides wrapper">
                    <Carousel className="introduction-slides">
                        <Carousel.Item interval={5000}>
                            <img 
                                className="d-block w-100"
                                src="./images-stock/sunflower.png"
                                alt="sunflower patch"
                            />
                            <Carousel.Caption>
                                <h1 className="intro-slides-text">Pursue creation</h1>
                                <p className="intro-slides-text">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img 
                                className="d-block w-100"
                                src="./images-stock/woman_on_boat.png"
                                alt="city night"
                            />
                            <Carousel.Caption>
                                <h1 className="intro-slides-text">Find your click</h1>
                                <p className="intro-slides-text">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img 
                                className="d-block w-100"
                                src="./images-stock/woman_looking_out.png"
                                alt="woman looking out of window"
                            />
                            <Carousel.Caption>
                                <h1 className="intro-slides-text">Flourish in the beauty</h1>
                                <p className="intro-slides-text">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="byp">
                    <div className="byp-title">
                        <h1 className="byp-title-text">Build Your Portfolio Today</h1>
                    </div>
                    <div className="byp-p-body">
                        <p className="byp-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                         laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <div className="city-night-body">
                    <img className="city-night" src="./images-stock/city_night.png" alt="city night"/>
                    <div className="city-night-info-body">
                        
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div>
                    
                </div>
            </footer>
        </div>
    );
}

export default Landing;