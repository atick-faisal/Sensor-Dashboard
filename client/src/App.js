import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './App.css';
import temp from './assets/temp.svg';
import hum from './assets/hum.svg';
import light from './assets/light.svg';

// interval between refresh
const interval = 3000;

class App extends Component {
	constructor() {
		super();
		this.state = {
			sensors: []
		}
	}

	// when component fetched reset the timer
	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	  }

	// send get reuest every 1sec
	componentDidMount() {
		this.timer = setInterval(() => this.getValues(), interval);
	}

	// get the values from the response and set the state
	getValues() {
		//fetch('localhost:5000/api/sensors')
		fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/sensor-dashboard-fyqrv/service/http/incoming_webhook/webhook0')
		.then(res => res.json())
		.then(sensors => this.setState({sensors}, function() {
			console.log('sensors fetched...', sensors);
			if(process.env.PORT) {
				console.log('Im on github');
			} else {
				console.log('im on localhost');
			}
		}));
	}

	render() {
		return(
		<div className="App">
			<div className="container">

				<h1>Sensor Dashboard</h1>

				<div className="card_container topbar">
					<div className="card">
						<div className="icon"><img src={temp} alt="hot_icon" width="40vw"/></div>
						<div className="title"><h2>Temperature</h2></div>
						<div className="value"><h2>{this.state.sensors.map(sensor => sensor.temp)[this.state.sensors.length - 1]}</h2></div>
					</div>
					<div className="card">
						<div className="icon"><img src={hum} alt="hum_icon" width="40vw"/></div>
						<div className="title"><h2>Humidity</h2></div>
						<div className="value"><h2>{this.state.sensors.map(sensor => sensor.hum)[this.state.sensors.length - 1]}</h2></div>
					</div>
					<div className="card">
						<div className="icon"><img src={light} alt="light_icon" width="40vw"/></div>
						<div className="title"><h2>Ambient Light</h2></div>
						<div className="value"><h2>{this.state.sensors.map(sensor => sensor.light)[this.state.sensors.length - 1]}</h2></div>
					</div>
				</div>
				
				<div className="card_container">
					<div className="card">
						<div className="chart" height="600px">
							<Line data = {{
								//labels: this.state.sensors.map(sensor => sensor.Date.split()),
								labels: [1, 2, 3, 4, 5, 6],
								datasets: [{
									label: 'Temperature',
									data: this.state.sensors.map(sensor => sensor.temp),
									backgroundColor: 'rgba(54, 162, 235, 0.2)',

									borderColor: 'rgba(54, 162, 235, 1)',
									borderWidth: 1
								}]
							}}
							height={250}
							options = {{
								responsive: true,
								responsiveAnimationDuration: 400,
								maintainAspectRatio: false,
								scales: {
									xAxes: [{ 
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
										},
									}],
									yAxes: [{
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
											},
									}],
								}
							}}/>
						</div>
					</div>

					<div className="card">
					<div className="chart">
							<Bar data = {{
								//labels: this.state.sensors.map(sensor => sensor.id),
								labels: [1, 2, 3, 4, 5, 6],
								datasets: [{
									label: 'Humidity',
									data: this.state.sensors.map(sensor => sensor.hum),
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'
									],
									borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'
									],
									borderWidth: 1
								}]
							}}
							height={250}
							options = {{
								responsive: true,
								responsiveAnimationDuration: 400,
								maintainAspectRatio: false,
								scales: {
									xAxes: [{ 
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
										},
									}],
									yAxes: [{
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
											},
									}],
								}
							}}/>
						</div>
					</div>
					
					<div className="card">
					<div className="chart">
							<Line data = {{
								//labels: this.state.sensors.map(sensor => sensor.id),
								labels: [1, 2, 3, 4, 5, 6],
								datasets: [{
									label: 'Ambient Light',
									data: this.state.sensors.map(sensor => sensor.light),
									backgroundColor: 
										'rgba(75, 192, 192, 0.2)',
									borderColor:
										'rgba(75, 192, 192, 1)',
									borderWidth: 1
								},
								{
									label: 'Temperature',
									data: this.state.sensors.map(sensor => sensor.temp),
									backgroundColor: 'rgba(54, 162, 235, 0.1)',

									borderColor: 'rgba(54, 162, 235, 1)',
									borderWidth: 1
								}]
							}}
							height={250}
							options = {{
								responsive: true,
								responsiveAnimationDuration: 400,
								maintainAspectRatio: false,
								scales: {
									xAxes: [{ 
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
										},
									}],
									yAxes: [{
										gridLines: {
											display: false,
											color: "#666"
										},
										ticks: {
											fontColor: "#999"
											},
									}],
								}
							}}/>
						</div>
					</div>
				</div>
			</div>
			<footer>
				<a href="https://github.com/atick-faisal/Sensor-Dashboard">Documentation</a>
				&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;
				<a href="https://github.com/atick-faisal/Sensor-Dashboard/blob/master/api_reference.md">Reference</a>
				<p>&copy; Atick Faisal, 2019</p>
			</footer>
		</div>
		);
	}
}

export default App;
