import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer } from './sign-up-form.styles';

// Default values for the sign up form fields
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // State to hold the values of the form fields
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Destructure the form fields for easy access
  const { displayName, email, password, confirmPassword } = formFields;

  // Resets the form fields to their default values
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handles form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      // Create user with email and password using Firebase utility
      const { user } = (await createAuthUserWithEmailAndPassword(
        email,
        password
      ))!;

      // Create a user document in Firestore with the display name
      await createUserDocumentFromAuth(user, { displayName });
      // Reset the form after successful sign up
      resetFormFields();
    } catch (error) {
      // Handle error if email is already in use
      if ((error as any).code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        // Log any other errors
        console.log('user creation encountered an error', error);
      }
    }
  };

  // Handles changes to any of the form input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update the corresponding field in the form state
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* Display Name input field */}
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

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

        {/* Confirm Password input field */}
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        {/* Submit button */}
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

// 
// Explanation of main parts:
// - The component manages form state for user sign up using useState.
// - On submit, it checks if passwords match, then creates a user in Firebase Auth and Firestore.
// - handleChange updates the form state as the user types.
// - resetFormFields clears the form after successful sign up.
// - Each input is a controlled component, bound to state and updated via handleChange.
//
