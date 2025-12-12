import { InputHTMLAttributes, FC } from 'react';
// Import styled components for styling the input, label, and group container
import { FormInputLabel, Input, Group } from './form-input.styles';

// Define the props for the FormInput component, extending standard input props and adding a label
export type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

// Functional component for a styled form input with a floating label
const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    // Group wraps the input and label together for styling
    <Group>
      {/* Render the input element, spreading all other props */}
      <Input {...otherProps} />
      {/* Conditionally render the label if provided */}
      {label && (
        // The 'shrink' prop determines if the label should float above the input
        <FormInputLabel
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === 'string' &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
