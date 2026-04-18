import { useState } from "react";

function SignIn({ onSignUpClick, closeForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1234/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          closeForm();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <h2 className="auth__title">Sign In</h2>
      <label htmlFor="email" className="auth__label">
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        className="auth__input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="Password" className="auth__label">
        Password
      </label>
      <input
        type="password"
        placeholder="Contraseña"
        className="auth__input"
        onChange={(e) => setPassword(e.target.value)}
      />

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
