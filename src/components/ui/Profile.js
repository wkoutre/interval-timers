import React from 'react';
import PropTypes from 'prop-types';
import ProfileInput from './ProfileInput'
import ProfileLabel from './ProfileLabel'
import * as timeFuncs from '../../timeHelpers'
import * as colors from '../../css/colors'

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

	saveProfile = (e) => {
		e.preventDefault();

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

	canSubmit = () => {
		const { fullName, email, weight } = this.state;

		return fullName !== "" && email !== "" && weight !== "";
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
		
		let touched = {...this.state.touched};
		touched[name] = true;

		this.setState({
			[name]: val,
			touched
		})
	}

	handleToggle = () => this.setState({ visibility: !this.state.visibility });

	render() {

		const { photoURL, fullName, email, birthday, location, weight, visibility } = this.props;

		const toggleOn = {
			"border": `2px solid ${colors.green} `,
			"color": colors.green
		}

		const toggleOff = {
			"border": `2px solid ${colors.red} `,
			"color": colors.red
		}
		const toggle = (
			<span style={this.state.visibility ? toggleOn : toggleOff} onClick={() => this.handleToggle()} className="visibility-toggle">
				{
					this.state.visibility ?
					"ON" :
					"OFF"
				}
			</span>
		)

		const staticProfile = (

			<div className="app-profile__static">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<div className="profile-info">
					<p>{fullName}</p>
					<p>{email}</p>
					<p>{birthday ? `${timeFuncs.findAge(birthday)} years old` : 'No Birthday Set'}</p>
					<p>{location ? location : "No location set"}</p>
					<p>{weight ? `${weight} lbs` : "No Weight Set"}</p>
					<p>Public profile: {visibility ? "ON" : "OFF"}</p>
				</div>
				<button className="profile-edit-button" onClick={() => this.editProfile()}>EDIT</button>
			</div>
		)

		// Yes, I'm aware this is an anti-pattern of React/Redux but... it's just how I've decided to implement it, because for some reason, I decided to make the action for this form happen onSubmit, rather than onChange like the other forms in this project

		const editProfile = (
			<div className="app-profile__edit">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<form onSubmit={(e) => this.saveProfile(e)} className="profile-info-form">
					<div className="profile-edit__section">
						<ProfileLabel required={true} name="fullName" text="Full Name:" />
						<ProfileInput value={!this.state.fullName && this.state.touched.fullName === false ? this.props.fullName : this.state.fullName} name="fullName" type="text" handleChange={this.handleChange} />
					</div>
					<div className="profile-edit__section">
						<ProfileLabel name="email" text="Email:" />
						<ProfileInput required={true} value={!this.state.email && this.state.touched.email === false ? this.props.email : this.state.email} name="email" type="text" handleChange={this.handleChange} />
					</div>
					<div className="profile-edit__section">
						<ProfileLabel name="birthday" text="Birthday:" />
						<ProfileInput value={!this.state.birthday && this.state.touched.birthday === false ? this.props.birthday : this.state.birthday} name="birthday" type="date" handleChange={this.handleChange} />
					</div>
					<div className="profile-edit__section">
						<ProfileLabel name="loc" text="Location:" />
						<ProfileInput value={!this.state.loc && this.state.touched.loc === false ? this.props.loc : this.state.loc} name="loc" type="text" handleChange={this.handleChange} />
					</div>
					<div className="profile-edit__section">
						<ProfileLabel required={true} name="weight" text="Weight:" />
						<ProfileInput value={!this.state.weight && this.state.touched.weight === false ? this.props.weight : this.state.weight} name="weight" type="number" handleChange={this.handleChange} />
					</div>
					<div className="profile-edit__section">
						<ProfileLabel name="visibility" text="Public Profile:" />
						{toggle}
					</div>
					<button disabled={!this.canSubmit()} className="profile-save-button" type="submit" onClick={(e) => this.saveProfile(e)}>SAVE</button>
				</form>
			</div>
		)

		return (
			<div className="app-profile">
				{ !this.state.edit ?
					staticProfile :
					editProfile
				}
			</div>
		)
	}
}

export default Profile;
