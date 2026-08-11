"use client";

import React, { useState } from "react";
import styled from "styled-components";

type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type Mode = "login" | "register" | "forgot";

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fdfdfd;
    padding: 30px;
    width: 450px;
    max-width: 100%;
    border-radius: 20px;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    transition: 0.2s ease-in-out;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 45px;
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  .span:hover {
    text-decoration: underline;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .button-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }

  .error {
    background: #fff1f1;
    border: 1px solid #ffd4d4;
    color: #d62828;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
  }

  .success {
    background: #effcf3;
    border: 1px solid #c9f2d4;
    color: #18864b;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
  }

  .password-button {
    background: transparent;
    border: none;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
  }

  .password-button:hover {
    color: #151717;
  }

  .password-button svg {
    width: 20px;
    height: 20px;
  }

  .social-buttons {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .social-buttons .btn {
    flex: 1;
  }

  @media (max-width: 500px) {
    .form {
      padding: 22px;
      width: 100%;
    }

    .social-buttons {
      flex-direction: column;
    }
  }
`;

export default function Signin() {
  const [mode, setMode] = useState<Mode>("login");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const updateField =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((previous) => ({
        ...previous,
        [field]: e.target.value,
      }));

      setError("");
      setSuccess("");
    };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("verdea-users") || "[]"
    );

    // LOGIN
    if (mode === "login") {
      const user = storedUsers.find(
        (item) =>
          item.email.toLowerCase() === form.email.toLowerCase() &&
          item.password === form.password
      );

      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      const loggedInUser = {
        name: user.name,
        email: user.email,
        phone: user.phone,
      };

      /*
       * اول sessionStorage قبلی را پاک می‌کنیم
       * تا وضعیت‌های قدیمی باعث مشکل نشوند.
       */
      sessionStorage.removeItem("verdea-current-user");

      /*
       * اگر Remember me فعال باشد،
       * کاربر در localStorage باقی می‌ماند.
       */
      if (rememberMe) {
        localStorage.setItem(
          "verdea-current-user",
          JSON.stringify(loggedInUser)
        );
      } else {
        sessionStorage.setItem(
          "verdea-current-user",
          JSON.stringify(loggedInUser)
        );

        /*
         * اگر قبلاً localStorage لاگین شده بود،
         * پاکش می‌کنیم.
         */
        localStorage.removeItem("verdea-current-user");
      }

      /*
       * این event به Navbar اطلاع می‌دهد
       * که وضعیت Login تغییر کرده است.
       */
      window.dispatchEvent(new Event("verdea-auth-change"));

      setSuccess(`Welcome back, ${user.name}!`);

      setLoading(false);
      return;
    }

    // REGISTER
    if (mode === "register") {
      if (
        !form.name ||
        !form.email ||
        !form.phone ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      const alreadyExists = storedUsers.some(
        (user) =>
          user.email.toLowerCase() ===
          form.email.toLowerCase()
      );

      if (alreadyExists) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }

      const newUser: User = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      const updatedUsers = [...storedUsers, newUser];

      localStorage.setItem(
        "verdea-users",
        JSON.stringify(updatedUsers)
      );

      setSuccess("Your account has been created successfully.");

      setForm({
        name: "",
        email: form.email,
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setMode("login");

      setLoading(false);
      return;
    }

    // FORGOT PASSWORD
    if (mode === "forgot") {
      const userExists = storedUsers.some(
        (user) =>
          user.email.toLowerCase() ===
          form.email.toLowerCase()
      );

      if (!userExists) {
        setError("No account was found with this email.");
        setLoading(false);
        return;
      }

      setSuccess(
        "A password recovery link has been sent to your email."
      );

      setLoading(false);
    }
  };

  return (
    <StyledWrapper className="mt-20 mx-auto px-4">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        {/* TITLE */}

        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold">
            {mode === "login"
              ? "Welcome Back"
              : mode === "register"
              ? "Create Account"
              : "Reset Password"}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {mode === "login"
              ? "Sign in to your Verdea account"
              : mode === "register"
              ? "Create your Verdea account"
              : "Enter your email to recover your account"}
          </p>
        </div>

        {/* REGISTER NAME */}

        {mode === "register" && (
          <>
            <div className="flex-column">
              <label>Full Name</label>
            </div>

            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your name"
                value={form.name}
                onChange={updateField("name")}
                required
              />
            </div>

            <div className="flex-column">
              <label>Phone</label>
            </div>

            <div className="inputForm">
              <input
                type="tel"
                className="input"
                placeholder="Enter your phone"
                value={form.phone}
                onChange={updateField("phone")}
                required
              />
            </div>
          </>
        )}

        {/* EMAIL */}

        <div className="flex-column">
          <label>Email</label>
        </div>

        <div className="inputForm">
          <svg
            height={20}
            viewBox="0 0 32 32"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m30.853 13.87a15 15 0 0 0-29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0-1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1-4.158-.759v-10.856a1 1 0 0 0-2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6z" />
          </svg>

          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            value={form.email}
            onChange={updateField("email")}
            required
          />
        </div>

        {/* PASSWORD */}

        {mode !== "forgot" && (
          <>
            <div className="flex-column">
              <label>Password</label>
            </div>

            <div className="inputForm">
              <svg
                height={20}
                viewBox="-64 0 512 512"
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
              </svg>

              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Enter your Password"
                value={form.password}
                onChange={updateField("password")}
                required
              />

              <button
                type="button"
                className="password-button"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
              >
                {showPassword ? (
                  <svg
                    className="mb-2"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M288 144c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 176c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
                    <path d="M571.5 244.7C557.7 211.7 528.6 162.9 484.8 122.5 438.7 79.9 372.6 32 288 32S137.3 79.9 91.2 122.5C47.4 162.9 18.3 211.7 4.5 244.7c-6 14.5-6 30.1 0 44.6 13.8 33 42.9 81.8 86.7 122.2C137.3 454.1 203.4 480 288 480s150.7-25.9 196.8-68.5c43.8-40.4 72.9-89.2 86.7-122.2 6-14.5 6-30.1 0-44.6zM288 432c-134.9 0-214.8-103.6-235.7-176C73.2 183.6 153.1 80 288 80s214.8 103.6 235.7 176C502.8 328.4 422.9 432 288 432z" />
                  </svg>
                ) : (
                  <svg
                    className="mb-2"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M288 32C207.2 32 142.5 68.8 95.4 112.6 48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm0 400c-134.9 0-214.8-103.6-235.7-176C73.2 183.6 153.1 80 288 80s214.8 103.6 235.7 176C502.8 328.4 422.9 432 288 432z" />
                    <path d="M425 353.9L222.1 151c-10.7-10.7-28.1-10.7-38.8 0s-10.7 28.1 0 38.8L386.2 392.7c10.7 10.7 28.1 10.7 38.8 0s10.7-28.1 0-38.8z" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}

        {/* CONFIRM PASSWORD */}

        {mode === "register" && (
          <>
            <div className="flex-column">
              <label>Confirm Password</label>
            </div>

            <div className="inputForm">
               <svg
                height={20}
                viewBox="-64 0 512 512"
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
              </svg>
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="input"
                placeholder="Confirm your Password"
                value={form.confirmPassword}
                onChange={updateField(
                  "confirmPassword"
                )}
                required
              />
            </div>
          </>
        )}

        {/* REMEMBER / FORGOT */}

        {mode === "login" && (
          <div className="flex-row">
            <div>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              <label> Remember me</label>
            </div>

            <button
              type="button"
              className="span"
              onClick={() => {
                setMode("forgot");
                setError("");
                setSuccess("");
              }}
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        {/* SUBMIT */}

        <button
          className="button-submit"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Sign In"
            : mode === "register"
            ? "Create Account"
            : "Send Recovery Link"}
        </button>

        {/* SWITCH LOGIN / REGISTER */}

        {mode !== "forgot" && (
          <p className="p">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              className="span"
              onClick={() => {
                setMode(
                  mode === "login"
                    ? "register"
                    : "login"
                );

                setError("");
                setSuccess("");
              }}
            >
              {mode === "login"
                ? "Sign Up"
                : "Sign In"}
            </button>
          </p>
        )}

        {/* BACK TO LOGIN */}

        {mode === "forgot" && (
          <button
            type="button"
            className="span"
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
          >
            Back to Sign In
          </button>
        )}

        {/* SOCIAL LOGIN */}

        {mode === "login" && (
          <>
            <p className="p">
              Or Continue With
            </p>

            <div className="social-buttons">
              <button
                className="btn google"
                type="button"
                onClick={() =>
                  setError(
                    "Google authentication is not connected."
                  )
                }
              >
                <svg
                  version="1.1"
                  width={20}
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    style={{ fill: "#FBBB00" }}
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"
                  />

                  <path
                    style={{ fill: "#518EF8" }}
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                  />

                  <path
                    style={{ fill: "#28B446" }}
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                  />

                  <path
                    style={{ fill: "#F14336" }}
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"
                  />
                </svg>

                Google
              </button>

              <button
                className="btn apple"
                type="button"
                onClick={() =>
                  setError(
                    "Apple authentication is not connected."
                  )
                }
              >
                <svg
                  version="1.1"
                  height={20}
                  width={20}
                  viewBox="0 0 22.773 22.773"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />

                  <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                </svg>

                Apple
              </button>
            </div>
          </>
        )}
      </form>
    </StyledWrapper>
  );
}