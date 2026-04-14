import { useState } from "react";

function SignUp({ onSignInClick, onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1234/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          onSignUpSuccess();
          setErrors({ email: "", password: "", username: "" });
        } else {
          const newErrors = { email: "", password: "", username: "" };
          if (data.error.toLowerCase().includes("email")) {
            newErrors.email = data.error;
          } else if (data.error.toLowerCase().includes("password")) {
            newErrors.password = data.error;
          } else if (data.error.toLowerCase().includes("username")) {
            newErrors.username = data.error;
          }

          setErrors(newErrors);
          console.log("Error:", data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <h2 className="auth__title">Sign Up</h2>

      <label htmlFor="email" className="auth__label">
        Email
      </label>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="auth__input"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="auth__error">{errors.email} </p>}

      <label htmlFor="password" className="auth__label">
        Password
      </label>
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        className="auth__input"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="username" className="auth__label">
        Username
      </label>
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="auth__input"
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <p className="auth__error">{errors.username}</p>}

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
