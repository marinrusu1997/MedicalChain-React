import React, { Component } from 'react';
import TopNavigation from './components/topNavigation';
import './index.css';

export class AdminMainPage extends Component {
   render() {
      return (
         <div className="flexible-content">
            <TopNavigation onSignOut={this.props.onSignOut} onResync={this.props.onResync} />
         </div>
      );
   }
}