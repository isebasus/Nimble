import React, { Component, forwardRef, useRef, useImperativeHandle  } from 'react';
import injectSheet from 'react-jss';
import withStyles from "react-jss";
import PropTypes from "prop-types";


const styles = {
    description: {
        color: 'rgb(0, 0, 0, 0.8)',
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
        <div className="descriptionBody">
            <div className="links">
                <a className="li" href="/">&larr; Back</a>
            </div>
            <div className="box" id="laa">
                
            </div>
            <h1 className="first2" id="title">{projectName}</h1>
            <h2 className="caption" id="pCaption">{caption}</h2>
            <h3 style = {styles.description} className="projectDescription">{p1}</h3>
            <h3 style = {styles.description} className="projectDescription">{p2}</h3>
            <h3 style = {styles.description} className="projectDescription">{p2b}</h3>
            <h3 style = {styles.description} className="projectDescription">{p3}<a class={clas} href={href}>{details}</a>{p3b}</h3>
            <h3 style = {styles.description} className="projectDescription"></h3>
            <h3 style = {styles.description} className="projectDescription"></h3>
        </div>
    )
};

const Description = injectSheet(styles)(Container);

export default Description;