import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './containers/HomePage/Home';

const Routes = () => {
	return (		
		  <BrowserRouter>
		      <Route exact path="/" component={HomePage} /> 
		  </BrowserRouter> 		   
		)
}

export default Routes;