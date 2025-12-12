import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

// Default values for the form fields
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // State to manage form input values
  const [formFields, setFormFields] = useState(defaultFormFields); // implicit type inference
  const { email, password } = formFields;

  // Resets the form fields to their default values
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handles sign in with Google popup
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // Handles form submission for email/password sign in
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission behavior

    try {
      // Attempts to sign in with email and password
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields(); // Resets form on successful sign in
    } catch (error) {
      // Logs error if sign in fails
      console.log('user sign in failed', error);
    }
  };

  // Handles changes to form input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Updates the corresponding field in state
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        {/* Password input field */}
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          {/* Button to submit the form and sign in */}
          <Button type='submit'>Sign In</Button>
          {/* Button to sign in with Google */}
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
