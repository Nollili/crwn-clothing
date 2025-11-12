import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
	auth,
	// signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.css'

const Authentication = () => {
	useEffect(() => {
		async function fetchData() {
			const response = await getRedirectResult(auth);

			if (response) {
				await createUserDocumentFromAuth(response.user);
			}
		}
		fetchData();
	}, []);

	return (
		<div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
