import React, { Component } from 'react';
import './App.css';
import Sensors from './components/sensors/sensors';

class App extends Component {
	render() {
		return(
			<div className="App">
				<Sensors/>
			</div>
		);
	}
}

export default App;
