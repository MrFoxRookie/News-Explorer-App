function SuccessMessage({ onSignInClick }) {
  return (
    <div className="success-message">
      <h2 className="success-message__title">
        Registration successfully completed!
      </h2>
      <a className="success-message__signin" onClick={onSignInClick}>
        Sign in
      </a>
    </div>
  );
}

export default SuccessMessage;
