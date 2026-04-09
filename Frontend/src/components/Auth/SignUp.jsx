function SignUp({ onSignInClick, onSignUpSubmit }) {
  return (
    <form className="auth__form" onSubmit={onSignUpSubmit}>
      <h2 className="auth__title">Sign Up</h2>

      <label htmlFor="email" className="auth__label">
        Email
      </label>
      <input type="email" placeholder="Email" className="auth__input" />

      <label htmlFor="password" className="auth__label">
        Password
      </label>
      <input type="password" placeholder="Contraseña" className="auth__input" />

      <label htmlFor="username" className="auth__label">
        Username
      </label>
      <input type="text" placeholder="Username" className="auth__input" />

      <button type="submit" className="auth__submit-buttom">
        Sign up
      </button>

      <p className="auth__switch">
        or{" "}
        <span
          className="auth__link-text"
          onClick={onSignInClick}
          role="button"
          tabIndex={0}
        >
          Sign in
        </span>
      </p>
    </form>
  );
}

export default SignUp;
