import React, { Component } from 'react';

import Card from '../Card/Card';
import Manager from '../../manager/Manager';
import decisions from '../../mock/decisions';

import './index.css';

class Discover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      decisions
    };

    this.nodes = [];
    this.manager = new Manager();
  }

  componentDidMount() {
    this.manager.init(this.rootNode);
    setTimeout(() => {
      this.setState({ loading: false });
      this.manager.initNodes(this.nodes);
    }, 500);
  }

  render() {
    const { decisions, loading } = this.state;
    return (
      <div className="App"
           ref={(n => this.rootNode = n)}>
        {loading
          ? <h1>Loading...</h1>
          : decisions.map((decision, i) => (
            <div key={i} ref={n => this.nodes[i] = n}>
              <Card data={decision} />
            </div>
          ))}
      </div>
    );
  }
}

export default Discover;
