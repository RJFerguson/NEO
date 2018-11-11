import React, { Component } from 'react';
import _ from 'lodash';
import {changePage, handleInputChange} from '../helpers/';

import './styles/landing.css';

class Page extends Component {
   constructor(props) {
     super(props);
     this.state = {
       key:''
     }
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleInputChange = handleInputChange.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const { key } = this.state;
     changePage(`/token/${key}`)
   }

   render() {
      const { key } = this.state;
      return (
         <div className="landing-page">
           <h1>Neo</h1>
           <div className="ring ring-1"/>
           <div className="ring ring-2"/>
           <div className="ring ring-3"/>
           <div className="ring ring-4"/>
           {_.range(360).map(i =>
             <div key={i} className="line" style={{ transform: `rotate(${i}deg)`}}/>
           )}
           <form className="enter-my-key" onSubmit={this.handleSubmit}>
             <label>Enter your Key</label>
             <input name="key" value={key} onChange={this.handleInputChange} placeholder="12134-329af940adf"/>
           </form>
           <div className="bottom-feeder">
             <h3>The first a.i. compliance protocol</h3>
          </div>
       </div>
     )
   }
}

// const ConnectedHome = connect()(Page);

export default Page;
