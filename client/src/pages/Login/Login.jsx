import React, { useEffect, useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      let info = res.data;
      let token = info.accessToken;
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // Usman's Testing Purpose Don't Uncomment
      // console.log(res.data);
      // console.log(token);
      // Here i have set the cookie using document.cookie
      document.cookie = `accessToken = ${token} path=/ `;

      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login">
      <div className="left">
        {/* image is placed on left side  */}
      </div>
      <div className="pl-[12%] right">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold">Sign in</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <span>{error && error.message}</span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
