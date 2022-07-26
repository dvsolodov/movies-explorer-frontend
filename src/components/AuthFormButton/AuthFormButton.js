import './AuthFormButton.css';

export default function AuthFormButton ({buttonTitle, isDisabled }) {
  return (
    <button className="auth-form-button" type="submit" disabled={isDisabled}>{buttonTitle}</button>
  );
}
