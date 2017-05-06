import React from 'react';
import { errorProvider } from './Login'
import { capitalizeWord } from '../../helpers/stringHelpers'

export const ErrorPage = (props) => {
	const regex = /.com/
	const provider = capitalizeWord(errorProvider.replace(regex, ''));

	const back = <span onClick={() => props.history.goBack()}>click here</span>
	return (
		<div>
			An account has already been created with the email address linked to your {provider} account.
			Please {back} to go back.
		</div>
	)
}
