import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
        &nbsp;
        <p style={{color : '#883704'}}>MyBurger App</p>
    </div>
);

export default logo;

//we can set the height of logo by passing props also like this
//<div className={classes.Logo} style={{height: props.height}}>