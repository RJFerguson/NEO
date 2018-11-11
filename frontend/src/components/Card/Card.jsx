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
        <div className="info">
          <div>{data.info.date}</div>
          <div>Code Version {data.info.aiVersion}</div>
        </div>
        <div className="decision">Decision: <span data-approved={data.info.decision.substr(0, 1) == 'A'}>{data.info.decision}</span></div>
        <div className="decisionTitle">Decision Data</div>
        <div className="context">
          <div className="params">
            <div className="label">InputHash:</div>
            <div className="value">${data.info.inputHash}</div>
          </div>
          <div className="params">
            <div className="label">ParameterHash:</div>
            <div className="value">${data.info.parameterHash}</div>
          </div>
        </div>

        <button onClick={this.handleClick}>Copy to Clipboard</button>
      </div>
    )
  }
}

export default Card;
