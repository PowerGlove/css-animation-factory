import React from "react";
import ReactDOM from "react-dom";
import App from './app/App.jsx';

const data = {
  // CSS Classes
  // Classes will be agnostic to elements, keeps true to orginal HTML/CSS Paradigms and also benefits of app flexibility
  classes: {
    'animation-std': {
      animationName: 'orbit',
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      animationDirection: 'normal',
      animationTimingFunction: 'linear'
    },
    ball: {
      position: 'absolute',
      borderRadius: '100%',
      background: 'blue',
      width: '50px',
      height: '50px'
    },
    classThree: {}
  },
  keyframes: {
    orbit: {
      '0%': {
        background: 'blue',
        transform: 'rotate(0deg) translateX(150px) rotate(0deg)',
      },
      '50%': {
        background: 'orange',
        transform: 'rotate(180deg) translateX(150px) rotate(-180deg)',
      },
      '100%': {
        background: 'blue',
        transform: 'rotate(360deg) translateX(150px) rotate(-360deg)'
      }
    }
  },
  // Each Element and Keyfreames
  // TODO: Change to 'items', items can be 'element' or 'group' type
  elements: [
    {
      name: 'ball',
      classes: ['animation-std', 'ball'],
    }
  ]
};

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App data={ data } />, wrapper) : false;