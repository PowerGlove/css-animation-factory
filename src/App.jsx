import React from "react";
import {Helmet} from "react-helmet";
import AnimationContainer from './app/AnimationContainer.jsx';
import ElementEditor from './app/ElementEditor.jsx';
import ElementsContainer from './app/ElementsContainer.jsx';
import Preview from './app/Preview.jsx';
import { convertCamelToKebabCase } from './util/StringUtil.js';
import "./App.scss";

export default class App extends React.Component {

  constructor() {
    super();

    // start here
    // const style = {
    //   position: 'absolute',
    //   borderRadius: '100%',
    //   background: 'blue',
    //   width: '50px',
    //   height: '50px',
    //   animationName: 'ball',
    //   animationDuration: '4s',
    //   animationIterationCount: 'infinite',
    //   animationDirection: 'normal',
    //   animationTimingFunction: 'linear'
    // };

    // const style2 = {
    //   position: 'absolute',
    //   borderRadius: '100%',
    //   background: 'red',
    //   width: '50px',
    //   height: '50px',
    //   animationName: 'ball',
    //   animationDuration: '4s',
    //   animationDelay: '2s',
    //   animationIterationCount: 'infinite',
    //   animationDirection: 'normal',
    //   animationTimingFunction: 'linear'
    // };

    // const keyframes = {
    //   '0%': {
    //     background: 'blue',
    //     transform: 'rotate(0deg) translateX(150px) rotate(0deg)',
    //   },
    //   '50%': {
    //     background: 'purple',
    //     transform: 'rotate(180deg) translateX(150px) rotate(-180deg)',
    //   },
    //   '100%': {
    //     background: 'blue',
    //     transform: 'rotate(360deg) translateX(150px) rotate(-360deg)'
    //   }
    // };

    this.state = {
      // activeElement: null,
      activeElement: 0,
      // Each Element and Keyfreames
      elements: [
        {
          name: 'ball',
          props: {
            position: 'absolute',
            borderRadius: '100%',
            background: 'blue',
            width: '50px',
            height: '50px',
            animationName: 'ball',
            animationDuration: '4s',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            animationTimingFunction: 'linear'
          },
          keyframes: {
            '0%': {
              background: 'blue',
              transform: 'rotate(0deg) translateX(150px) rotate(0deg)',
            },
            '50%': {
              background: 'purple',
              transform: 'rotate(180deg) translateX(150px) rotate(-180deg)',
            },
            '100%': {
              background: 'blue',
              transform: 'rotate(360deg) translateX(150px) rotate(-360deg)'
            }
          }   
        },
        // {
        //   name: 'ball',
        //   css: this.getElementCSS('ball', {
        //     position: 'absolute',
        //     borderRadius: '100%',
        //     background: 'blue',
        //     width: '50px',
        //     height: '50px',
        //     animationName: 'ball',
        //     animationDuration: '4s',
        //     animationIterationCount: 'infinite',
        //     animationDirection: 'normal',
        //     animationTimingFunction: 'linear'
        //   }),
        //   keyframes: this.getKeyframesCSS('ball', {
        //     '0%': {
        //       background: 'blue',
        //       transform: 'rotate(0deg) translateX(150px) rotate(0deg)',
        //     },
        //     '50%': {
        //       background: 'purple',
        //       transform: 'rotate(180deg) translateX(150px) rotate(-180deg)',
        //     },
        //     '100%': {
        //       background: 'blue',
        //       transform: 'rotate(360deg) translateX(150px) rotate(-360deg)'
        //     }
        //   })          
        // },
        {
          name: 'ball2',
          css: this.getElementCSS('ball2', {
            position: 'absolute',
            borderRadius: '100%',
            background: 'red',
            width: '50px',
            height: '50px',
            animationName: 'ball',
            animationDuration: '4s',
            animationDelay: '2s',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            animationTimingFunction: 'linear'
          })
        }
      ],
      showElementContainer: true
    };

    // this.handleElementPropChange = this.handleElementPropChange.bind(this);
    this.handleSelectElement = this.handleSelectElement.bind(this);
    this.handleShowContainer = this.handleShowContainer.bind(this);
    this.handleHideContainer = this.handleHideContainer.bind(this);
    this.handleUpdateElements = this.handleUpdateElements.bind(this);
    this.handleUpdateElement = this.handleUpdateElement.bind(this);
  }

//   convertCamelToKebabCase(str) {
//     const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
// // console.log(camelToSnakeCase('animationName')); // <--- convert obs to this format... for style
//     return camelToSnakeCase(str);
//   }

  getCSSfromStyleObj(style, formatter) {
    let css = '';
    Object.keys(style).forEach((attr) => {
      // console.log(attr);
      if (formatter) {
        css += formatter(convertCamelToKebabCase(attr), style[attr]);
      } else {
        css += `${convertCamelToKebabCase(attr)}: ${style[attr]};\n`;
      }
    });

    return css;
  }


  
  // CSS goes into app HEAD STYLE tag
  getDisplayCSS() {
    let displayCSS = '';
    this.state.elements.forEach((element) => {
      const { css, keyframes, name, props } = element;

      // Convert props to CSS
      if (props) {
        let block = props;
        if (!_.isString(props)) {
          block = this.getCSSfromStyleObj(props);
        } 
        
        displayCSS += this.createCSSBlock(`.${name}`, block);
      }

      // keyframes
      if (keyframes) {
        let block = keyframes;
        if (!_.isString(keyframes)) {
          block = this.getKeyframesCSS(name, keyframes); 
        }

        displayCSS += this.createCSSBlock(`@keyframes ${name}`, block);
      }
    });

    // console.log('getCSS', css);
    return displayCSS;
  };

  // getCSSfromStyleObj(styleProps) {
  //   return this.getCSSfromStyleObj(styleProps);
  // }

  // here ....
  getElementCSS(name, style) {
    let css = '';
    // css += `.${name} {\n`;
    css += this.getCSSfromStyleObj(style);
    // css += `}\n`; 

    return css;
  }

  createCSSBlock(blockName, cssBlock) {
    return `${blockName} {\n${cssBlock}}\n`;
  }

  getKeyframesCSS(name, keyframes) {
    let css = '';

    Object.keys(keyframes).forEach((keyframe, i) => {
      const formatter = (attr, value) => {
        return `  ${attr}: ${value};\n`;
      };

      if (i > 0) {
        css += '\n';
      }
      css += this.createCSSBlock(keyframe, this.getCSSfromStyleObj(keyframes[keyframe], formatter));

      // console.log('keyframeCSS', keyframeCSS, keyframe, keyframes, name);
    });



    // css = this.createCSSBlock(`@keyframes ${name}`, css);


    // css += `.${name} {\n`;
    // css += this.getCSSfromStyleObj(style);
    // css += `}\n`; 

    // console.log('getKeyframesCSS', css);

    return css;
  }

  getElementCSSKeyframes() {

  }

  getKeyframes(keyframes) {
    let css = '';
    keyframes.forEach((keyframe) => {
      css += keyframe;
    });

    return css;
  }

  handleSelectElement(index) {
    this.setState((prevState) => {
      let activeElement;
      if (prevState.activeElement === index) {
        activeElement = null
      } else {
        activeElement = index;
      }

      return {
        activeElement
      }
    });
  }

  handleShowContainer() {
    this.setState({showElementContainer: true});
  }

  handleHideContainer() {
    this.setState({showElementContainer: false});
  }

  // new
  handleUpdateElements(element) {
    this.handleHideContainer();

    this.setState((prevState) => {
      return {
        elements: [
          ...prevState.elements,
          element
        ]
      };
    });
  }

  handleUpdateElement(element, index) {
    // this.handleHideContainer();

    this.setState((prevState) => {
      const newElements = [
        ...prevState.elements
      ];

      newElements[index] = {
        ...newElements[index],
        ...element
      };
      
      return {
        elements: newElements
      };
    });
  }

  render() {
    const { activeElement, elements } = this.state;

    const containerSpacing = 20;
    const elContainerWidth = 350;
    const previewContainerWidth = elContainerWidth - containerSpacing;


    return (
      <div>    
        <Helmet>
          <style>{ this.getDisplayCSS() }</style>
          <meta charSet="utf-8" />
          <title>CSS Animation Factory</title>
        </Helmet>
        <Preview previewContainerWidth={ previewContainerWidth } elements={ elements }  />
        <ElementsContainer 
          activeElement={ activeElement }
          onClick={ this.handleSelectElement }
          elements={ elements } 
        />
        <ElementEditor 
          elContainerWidth={ elContainerWidth }
          elementProps={ elements[activeElement] }
          visible={ this.state.showElementContainer } 
          onChange={ (props) => { this.handleUpdateElement(props, activeElement) } }
          onSubmit={ this.handleUpdateElements } 
        />
        <AnimationContainer />
        
      </div>
    );
  }
}
