import React from "react";
import AnimationContainer from './app/AnimationContainer.jsx';
import ElementContainer from './app/ElementContainer.jsx';
import ElementsContainer from './app/ElementsContainer.jsx';
import "./App.scss";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeElement: null,
      elements: [
        {
          name: 'one'
        },
        {
          name: 'two'
        }
      ],
      showElementContainer: true
    };

    this.handleSelectElement = this.handleSelectElement.bind(this);
    this.handleShowContainer = this.handleShowContainer.bind(this);
    this.handleHideContainer = this.handleHideContainer.bind(this);
    this.handleUpdateElements = this.handleUpdateElements.bind(this);
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

  render() {
    return (
      <div>    
        <ElementsContainer 
          activeElement={ this.state.activeElement }
          onClick={ this.handleSelectElement }
          elements={ this.state.elements } 
        />
        <ElementContainer 
          visible={ this.state.showElementContainer } 
          onSubmit={ this.handleUpdateElements } 
        />
        <AnimationContainer />
      </div>
    );
  }
}
