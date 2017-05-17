import React from 'react';
import { errorProvider } from './Login'
import { capitalizeWord } from '../../helpers/stringHelpers'
import * as router from 'connected-react-router'
import { Link } from 'react-router-dom'

export const ErrorPage = (props) => {
	const regex = /.com/
	let provider = ""
	if (errorProvider) {
		provider = capitalizeWord(errorProvider.replace(regex, ''));
	}

	const back = <Link className="error-page__go-back" to="/">click here</Link>

	return (
		<div className="error-page">
			<h1 className="error-page__header">Error</h1>
			<p className="error-page__p">An account has already been created with the email address linked to your {provider} account.
			Please {back} to go back.</p>
		</div>
	)
}
