import React from 'react';
import PropTypes from 'prop-types';
import ProfileInput from './ProfileInput'
import ProfileLabel from './ProfileLabel'

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			fullName: props.fullName,
			email: props.email,
			birthday: props.birthday,
			loc: props.location,
			weight: props.weight,
			visibility: props.visibility,
			touched: {
				fullName: false,
				email: false,
				birthday: false,
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
		const { fullName, email, birthday, loc: location, weight, visibility } = this.state;

		const infoObj = {
			fullName,
			email,
			birthday,
			location,
			weight,
			visibility
		}

		this.props.setProfileInfo(infoObj);
		this.setState({ edit: false })
		this.unTouch();
	}

	unTouch = () => {
		let touched = {};

		for (let key of Object.keys(this.state.touched)) {
			touched[key] = false;
		}

		this.setState({ touched });
	}

	handleChange = (e, name) => {
		const val = e.target.value;
		
		if (name === 'visibility') {
				this.setState({
					visibility: this.state.visibility === "off" ? "on" : "off",
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
					<p>{this.props.birthday}</p>
					<p>{this.props.location}</p>
					<p>{this.props.weight} lbs</p>
					<p>Public profile: {this.props.visibility}</p>
				</div>
				<button className="btn profile-button" onClick={() => this.editProfile()}>EDIT</button>
			</div>
		)

		const editProfile = (
			<div className="app-profile">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<form onSubmit={this.saveProfile} className="profile-info-form">
					<ProfileLabel name="fullName" text="Full Name:" />
					<ProfileInput value={!this.state.fullName && this.state.touched.fullName === false ? this.props.fullName : this.state.fullName} name="fullName" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="email" text="Email:" />
					<ProfileInput value={!this.state.email && this.state.touched.email === false ? this.props.email : this.state.email} name="email" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="birthday" text="Birthday:" />
					<ProfileInput value={!this.state.birthday && this.state.touched.birthday === false ? this.props.birthday : this.state.birthday} name="birthday" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="loc" text="Location:" />
					<ProfileInput value={!this.state.loc && this.state.touched.loc === false ? this.props.loc : this.state.loc} name="loc" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="weight" text="Weight:" />
					<ProfileInput value={!this.state.weight && this.state.touched.weight === false ? this.props.weight : this.state.weight} name="weight" type="number" handleChange={this.handleChange} />

					<ProfileLabel name="visibility" text="Public Profile" />
					<ProfileInput value={this.state.visibility} name="visibility" type="checkbox" handleChange={this.handleChange} />
				</form>
				<button className="btn profile-edit-button" type="submit" onClick={() => this.saveProfile()}>Save</button>
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
