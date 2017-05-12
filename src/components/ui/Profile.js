import React from 'react';
import PropTypes from 'prop-types';
import ProfileInput from './ProfileInput'
import ProfileLabel from './ProfileLabel'
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
		
		let touched = {...this.state.touched};
		touched[name] = true;

		this.setState({
			[name]: val,
			touched
		})
	}

	handleToggle = () => {
		console.log(`handling toggle`);
		
		this.setState({ visibility: !this.state.visibility })
	}

	render() {

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
					<p>{this.props.fullName}</p>
					<p>{this.props.email}</p>
					<p>{this.props.birthday}</p>
					<p>{this.props.location}</p>
					<p>{this.props.weight} lbs</p>
					<p>Public profile: {this.props.visibility ? "ON" : "OFF"}</p>
				</div>
				<button className="profile-button" onClick={() => this.editProfile()}>EDIT</button>
			</div>
		)

		const editProfile = (
			<div className="app-profile__edit">
				<div className="profile-photo">
					<img src={this.props.photoURL} alt={`${this.props.fullname} profile picture`}/>
				</div>
				<form onSubmit={this.saveProfile} className="profile-info-form">
					<ProfileLabel name="fullName" text="Full Name:" />
					<ProfileInput value={!this.state.fullName && this.state.touched.fullName === false ? this.props.fullName : this.state.fullName} name="fullName" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="email" text="Email:" />
					<ProfileInput value={!this.state.email && this.state.touched.email === false ? this.props.email : this.state.email} name="email" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="birthday" text="Birthday:" />
					<ProfileInput value={!this.state.birthday && this.state.touched.birthday === false ? this.props.birthday : this.state.birthday} name="birthday" type="date" handleChange={this.handleChange} />

					<ProfileLabel name="loc" text="Location:" />
					<ProfileInput value={!this.state.loc && this.state.touched.loc === false ? this.props.loc : this.state.loc} name="loc" type="text" handleChange={this.handleChange} />

					<ProfileLabel name="weight" text="Weight:" />
					<ProfileInput value={!this.state.weight && this.state.touched.weight === false ? this.props.weight : this.state.weight} name="weight" type="number" handleChange={this.handleChange} />

					<ProfileLabel name="visibility" text="Public Profile:" />
					<span className="profile-input-toggle">
						{toggle}
					</span>
					
				</form>
				<button className="profile-edit-button" type="submit" onClick={() => this.saveProfile()}>SAVE</button>
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
