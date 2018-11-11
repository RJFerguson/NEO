import React, { Component } from 'react';
import './styles/landing.css';
import _ from 'lodash';

class Page extends Component {

   constructor(props) {
     super(props)
   }

   render() {
      return (
         <div className="landing-page">
           <h1>Neo</h1>
           <div className="ring ring-1"/>
           <div className="ring ring-2"/>
           <div className="ring ring-3"/>
           <div className="ring ring-4"/>
           {_.range(360).map(i =>
             <div className="line" style={{ transform: `rotate(${i}deg)`}}/>
           )}
           <div className="bottom-feeder">
              <h3>
                The first a.i. compliance protocol
              </h3>
          </div>
       </div>
     )
   }
}

// const ConnectedHome = connect()(Page);

export default Page;
