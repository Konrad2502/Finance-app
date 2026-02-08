import "./LoginModal.scss";
import logo from "../../assets/images/logo-large.svg";
import Avatar from "../../assets/images/illustration-authentication.svg";
import logoPasswordHide from "../../assets/images/icon-hide-password.svg";
import logoPassword from "../../assets/images/icon-show-password.svg";
import { useState } from "react";

type Errors = {
  email?: string;
  password?: string;
};

type LoginModalProps = {
  onSuccess: () => void;
};

export default function LoginModal({ onSuccess }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (isSignUp && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    onSuccess();
  };

  return (
    <div className="login">
      {/* LEFT */}
      <div
        className="login__visual"
        style={{ backgroundImage: `url(${Avatar})` }}
      >
        <img className="login__logo" src={logo} alt="Finance logo" />

        <div className="login__visual-content">
          <h1 className="login__headline">
            Keep track of your money and save for your future
          </h1>

          <p className="login__description">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login__content">
        <div className="login__card">
          <h2 className="login__title">Login</h2>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label>Email</label>
              <input
                className={`login__input ${
                  errors.email ? "login__input--error" : ""
                }`}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((p) => ({ ...p, email: undefined }));
                }}
              />
              {errors.email && (
                <span className="login__error">{errors.email}</span>
              )}
            </div>

            <div className="login__field">
              <label>Password</label>
              <div className="login__input-wrap">
                <input
                  className={`login__input ${
                    errors.password ? "login__input--error" : ""
                  }`}
                  type={hidePassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: undefined }));
                  }}
                />

                <button
                  type="button"
                  className="login__input-icon"
                  aria-label="Toggle password visibility"
                  onClick={() => setHidePassword((p) => !p)}
                >
                  <img
                    src={hidePassword ? logoPasswordHide : logoPassword}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              </div>
              {errors.password && (
                <span className="login__error">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="login__button">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="login__footer">
            {isSignUp
              ? "Already have an account ?"
              : "Need to create an account?"}
            <button
              onClick={() => setIsSignUp((p) => !p)}
              className="login__switch"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
