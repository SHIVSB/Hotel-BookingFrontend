import axios from "axios";
import React, { useState, useEffect } from "react";
import Loader from "react-spinners/RingLoader";
import Success from "../components/Success";
import Error from "../components/Error";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState()

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      axios
        .post("https://hotelwebsite-backend.herokuapp.com/api/v1/signup", user)
        .then(function (response) {
            setLoading(true);
          if (response.data.success) {
              setLoading(false);
              setSuccess(true);
              setName('');
              setEmail('');
              setPassword('');
              setCpassword('');
            window.location.href = "/login";
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    } else {
      console.log("Passwords dont match");
    }
  }
  return (
    <div>
        {loading && (<Loader/>)}
        {error && (<Error/>)}
        {success && (<Success message='Registration successful'/>)}
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />

            <button
              type="submit"
              onClick={register}
              class="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div class="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div class="text-grey-dark mt-6">
            Already have an account?
            <a
              class="no-underline border-b border-blue text-blue"
              href="/login"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
