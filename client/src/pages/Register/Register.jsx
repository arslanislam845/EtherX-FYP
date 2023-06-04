import React, { useEffect, useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const [formErrors, setFormErrors] = useState({}); // new line added

  const validateForm = () => {  // New Function Added
    const errors = {};
  
    if (user.username.trim() === "") {
      errors.username = "Username is required";
    }
  
    if (user.email.trim() === "") {
      errors.email = "Email is required";
    }
  
    if (user.password.trim() === "") {
      errors.password = "Password is required";
    }
  
    if (user.country.trim() === "") {
      errors.country = "Country is required";
    }

    if (user.desc.trim() === "") {
      errors.desc = "Description is required";
    }

    
  
    // Add any additional validation rules for other fields
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateForm()){

     // new line added
    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1 className="text-3xl fond-bold">Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          {formErrors.username && <p className="error">{formErrors.username}</p>}
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          {formErrors.password && <p className="error">{formErrors.password}</p>}

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Pakistan"
            onChange={handleChange}
          />
          {formErrors.country && <p className="error">{formErrors.country}</p>}
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1 className="text-3xl fond-bold">I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {formErrors.desc && <p className="error">{formErrors.desc}</p>}
        </div>
      </form>
    </div>
  );
}

export default Register;