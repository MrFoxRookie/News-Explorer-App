import { useState, useEffect } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";
import SuccessMessage from "./SuccessMessage";

function Auth({ isOpen }) {
  const [mode, setMode] = useState("signin");

  useEffect(() => {
    if (isOpen) {
      setMode("signin");
    }
  }, [isOpen]);

  return (
    <div className="auth">
      {mode === "signin" && <SignIn onSignUpClick={() => setMode("signup")} />}

      {mode === "signup" && (
        <SignUp
          onSignInClick={() => setMode("signin")}
          onSignUpSuccess={() => setMode("success")}
          // onSignUpSubmit={(e) => {
          //   e.preventDefault();
          //   setMode("success");
          // }}
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
