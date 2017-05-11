import React from 'react';
import PropTypes from 'prop-types';
import ProfileInput from './ProfileInput'
import ProfileLabel from './ProfileLabel'

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			fullName: "",
			email: "",
			dob: "",
			loc: "",
			weight: 0,
			public: "off",
			touched: {
				fullName: false,
				email: false,
				dob: false,
				loc: false,
				weight: false
			}
		}
	}

	editProfile = () => {
		const edit = true;
		this.setState({ edit })
	}

	saveProfile = () => {
		console.log(`DO THE REDUX STUFF TO SAVE EVERYTHING. THEN UPDATE THE STATIC RENDER TO GRAB THE PROPS FROM THE USER DETAILS THAT ARE DISPATCHED ON EDIT`);		
		this.setState({ edit: false })
	}

	handleChange = (e, name) => {
		const val = e.target.value;
		console.log(`e`, e);
		
		if (name === 'public') {
				this.setState({
					public: this.state.public === "off" ? "on" : "off",
				})
		} else {
			let touched = {...this.state.touched};
			touched[name] = true;

			this.setState({
				[name]: val,
				touched
			})
		}
	}

	render() {

		const staticProfile = (
			<div className="app-profile">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<div className="profile-info">
					<p>{this.props.fullName}</p>
					<p>{this.props.email}</p>
					<p>June 14, 1992</p>
					<p>Fremont, CA</p>
					<p>155</p>
					<p>Public</p>
				</div>
				<button onClick={() => this.editProfile()}>EDIT</button>
			</div>
		)

		const editProfile = (
			<div className="app-profile">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<form className="profile-info">
					<ProfileLabel name="fullName" text="Full Name:" />
					<ProfileInput value={!this.state.fullName && this.state.touched.fullName === false ? this.props.fullName : this.state.fullName} name="fullName" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="email" text="Email:" />
					<ProfileInput value={!this.state.email && this.state.touched.email === false ? this.props.email : this.state.email} name="email" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="dob" text="Birthday:" />
					<ProfileInput value={!this.state.dob && this.state.touched.dob === false ? this.props.dob : this.state.dob} name="dob" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="loc" text="Location:" />
					<ProfileInput value={!this.state.loc && this.state.touched.loc === false ? this.props.loc : this.state.loc} name="loc" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="weight" text="Weight:" />
					<ProfileInput value={!this.state.weight && this.state.touched.weight === false ? this.props.weight : this.state.weight} name="weight" type="number" handleChange={this.handleChange} />

					<ProfileLabel name="public" text="Public Profile" />
					<ProfileInput value={this.state.public} name="public" type="checkbox" handleChange={this.handleChange} />
					<button type="submit" onClick={() => this.saveProfile()}>Save</button>
				</form>
			</div>
		)

		return (
			<div>
				{ !this.state.edit ?
					staticProfile :
					editProfile
				}
			</div>
		)
	}
}

export default Profile;
