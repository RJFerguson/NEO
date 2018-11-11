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
        <h3>{data.key}</h3>
        <h3>{data.more_info}</h3>
      </div>
    )
  }
}

export default Card;
