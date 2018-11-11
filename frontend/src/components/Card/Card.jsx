import React, { Component } from 'react';

import './Card.css'

class Card extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log('>>> CLICKED');
  };

  render() {
    const { data } = this.props;
    return (
      <div className="Card">
        <h3>{data.key}</h3>
        <ul>
          <li>Date: {data.info.date}</li>
          <li>Code Version: {data.info.aiVersion}</li>
          <li>Decision: {data.info.decision}</li>
          <li>Input Hash: {data.info.inputHash}</li>
          <li>Parameter Hash: {data.info.parameterHash}</li>
        </ul>
        <button onClick={this.handleClick}>Copy to Clipboard</button>
      </div>
    )
  }
}

export default Card;
