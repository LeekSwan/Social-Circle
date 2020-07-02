import React from 'react';
import axios from 'axios';



class AddFriend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			friendships: []
		}
	}

	
	componentDidMount() {
		axios.get(`/api${this.props.location.pathname}`)
			.then(res => {
				let user = res.data[0]
				this.setState({ 
					firstname: user.firstname, 
					lastname: user.lastname
				});
			})
		// Capitalize the fucking name cause I forgot we passed everything into db as lowercase
	}

	handleAdd() {

	}


	render() {
		return (
			<div>
				<h2>Social Circle</h2>
				<h5>Hi {this.state.firstname} {this.state.lastname}! Add your friends below.</h5>

				<input type="AddFriend" value="Add Friend"/>

				<form onSubmit={this.handleAdd}>
					<input type="submit" value="Submit" />
      	</form>

				<h5>Total Count</h5>
				<h5>0</h5>
			</div>
		);
	}

}



export default AddFriend;