import React, { Component, forwardRef, useRef, useImperativeHandle  } from 'react';
import Octicon, {LogoGithub} from '@primer/octicons-react'
import git from '../images/GitHub-Mark-Light-32px.png';
import injectSheet from 'react-jss';
import withStyles from "react-jss";
import PropTypes from "prop-types";


const styles = {
    description: {
        color: 'rgb(255, 255, 255, 0.8)',
        textAlign: 'left',
        fontWeight: '400',
        fontSize: '1.5rem',
        lineHeight: '50px',
        marginTop: '30px'
    },
    link: {
        cursor: 'pointer',
        background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)',
        color: '#F1F1F1',
        borderRadius: '7px',
        border: '0px', 
        fontWeight: 700,
        userSelect: 'none',
        fontSize: '15px',
        textDecoration: 'none',
        letterSpacing: '2px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        float: 'left',
        padding: '1rem 1.0rem',
        fontSize: '13px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
    },
};


const Container = ({projectName, video, p1, p2, p3, caption, gitLink, website, link, details, p2b, p3b, clas, href}) =>  {

    return(
        <div class="body">
            <div class="projects">
                <div className="links">
                    <a className="li" href="/">&larr; Back</a>
                </div>
                <a class="github" href={gitLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" fill="rgb(255,255,255)"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                </a>
                <h1 className="first2" id="title">{projectName}</h1>
                <h2 className="caption" id="pCaption">{caption}</h2>
                <a href={link}>
                    {website}
                </a>
                <div>
                    <video src={video} width="100%" height="auto" autoPlay loop muted playsInline></video>
                </div>
                <h3 style = {styles.description} className="projectDescription">{p1}</h3>
                <h3 style = {styles.description} className="projectDescription">{p2}</h3>
                <h3 style = {styles.description} className="projectDescription">{p2b}</h3>
                <h3 style = {styles.description} className="projectDescription">{p3}<a class={clas} href={href}>{details}</a>{p3b}</h3>
                <h3 style = {styles.description} className="projectDescription"></h3>
                <h3 style = {styles.description} className="projectDescription"></h3>
            </div>
        </div>
    )
};

const Description = injectSheet(styles)(Container);

export default Description;