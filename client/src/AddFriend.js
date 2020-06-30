import React from 'react';
import axios from 'axios';



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
	handleAdd(e) {

	}



	render() {
		return (
			<div>
				<h2>Social Circle</h2>
				<h5>Hi (user name)! Add your friends below.</h5>

				<input type="AddFriend" value="Add Friend" onSubmit={this.handleAdd}/>


				<h5>Total Count</h5>
				<h5>0</h5>
			</div>
		);
	}

}

export default AddFriend;