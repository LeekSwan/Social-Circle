import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'



class AddFriend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			friendcount: ''
		}
	}

	
	

	

	//Handles add friend button 
	fetchUserData(e) {
		axios.get(`/api/user/:secret`) 
	}



	render() {
		return (
			<div>
				<h2>Social Circle</h2>
				<h5>Hi (user name)! Add your friends below.</h5>

				<input type="AddFriend" value="Add Friend" onSubmit={this.fetchUserData}/>

				<h5>{this.props.location.pathname}</h5>
				<h5>Total Count</h5>
				<h5>0</h5>
			</div>
		);
	}

}



export default AddFriend;