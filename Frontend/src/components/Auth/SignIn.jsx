function SignIn({ onSignUpClick }) {
  return (
    <form className="auth__form">
      <h2 className="auth__title">Sign In</h2>
      <label htmlFor="email" className="auth__label">
        Email
      </label>
      <input type="email" placeholder="Email" className="auth__input" />
      <label htmlFor="Password" className="auth__label">
        Password
      </label>
      <input type="password" placeholder="Contraseña" className="auth__input" />

      <button type="submit" className="auth__submit-buttom">
        Sign in
      </button>

      <p className="auth__switch">
        or{" "}
        <span
          className="auth__link-text"
          onClick={onSignUpClick}
          role="button"
          tabIndex={0}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}

export default SignIn;
