import React, { Component } from 'react';
import _ from 'lodash';
import {changePage, handleInputChange} from '../helpers/';

import './styles/landing.css';

class Page extends Component {

    state = {noteTable: [] };
   constructor(props) {
     super(props);
     this.state = {
       key:'',
       start: '',
       end: ''
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
      const { key, start, end } = this.state;
      return (
         <div className="landing-page">
           <h1>Neo</h1>
           <div className="ring ring-1"/>
           <div className="ring ring-2"/>
           <div className="ring ring-3"/>
           <div className="ring ring-4"/>
           {_.range(360).map(i => <div key={i} className="line" style={{ transform: `rotate(${i}deg)`}}/> )}
           <form className="enter-my-key" onSubmit={this.handleSubmit}>
             <label>Your Key</label>
             <input name="key" value={key} onChange={this.handleInputChange} placeholder="12134-329af940adf"/>
             <label>Start Date</label>
             <input name="start" value={start} onChange={this.handleInputChange} placeholder="11/9/18"/>
             <label>End Date</label>
             <input name="end" value={end} onChange={this.handleInputChange} placeholder="11/11/18"/>
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
