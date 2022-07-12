import './AuthFormButton.css';

export default function AuthFormButton ({buttonTitle}) {
  return (
    <button className="auth-form-button" type="submit">{buttonTitle}</button>
  );
}
