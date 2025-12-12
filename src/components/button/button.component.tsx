import { FC, ButtonHTMLAttributes } from 'react';
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

// Enum for different button style types
export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
}

// Helper function to select the correct styled button component based on buttonType
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

// Props type for the Button component, extending default button attributes
export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES; // Type of button style
  isLoading?: boolean; // If true, button is disabled (e.g., during loading)
} & ButtonHTMLAttributes<HTMLButtonElement>; // intersect with default button attributes

// Button component definition
const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  // Select the correct styled button component
  const CustomButton = getButton(buttonType);
  // Render the button, disabling it if isLoading is true
  return <CustomButton disabled={isLoading} {...otherProps}>{children}</CustomButton>;
};

export default Button;
