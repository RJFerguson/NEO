import React, { Component } from 'react';

import './Card.css'

class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Card">
        <h1>{data.index}</h1>
      </div>
    )
  }
}

export default Card;
