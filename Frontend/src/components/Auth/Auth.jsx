import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SuccessMessage from "./SuccessMessage";

function Auth({ isOpen, closeForm }) {
  const [mode, setMode] = useState("signin");

  useEffect(() => {
    if (isOpen) {
      setMode("signin");
    }
  }, [isOpen]);

  return (
    <div className="auth">
      {mode === "signin" && (
        <SignIn onSignUpClick={() => setMode("signup")} closeForm={closeForm} />
      )}

      {mode === "signup" && (
        <SignUp
          onSignInClick={() => setMode("signin")}
          onSignUpSuccess={() => setMode("success")}
        />
      )}

      {mode === "success" && (
        <SuccessMessage
          onSignInClick={() => {
            setMode("signin");
          }}
        />
      )}
    </div>
  );
}

export default Auth;
