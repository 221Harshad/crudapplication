import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/UserDetailsSlice";
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import boy from "../images/man_on_mountain.png";
import "../App.css";
const Create = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = 400; // Adjust this value based on your content length and desired effect
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    age: "",
    gender: true,
  });
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const blurValue = 100 - (scrollPosition / maxScroll) * 100;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log(e.target);
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("..formvalue", formValue);
    dispatch(createUser(formValue));
    navigate("/read");
  };

  return (
    <div>
      <Parallax bgImage={boy} blur={{ min: -1, max: blurValue }} strength={300}>
        <div className="content">
          <div className="text-content">
            <h2 className="my-2 fs-1">User Details</h2>
            <form className="w-50 mx-auto fs-1" onSubmit={handleSubmit}>
              <div className="mb-3 ">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formValue.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formValue.age}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <label className="form-check-label">Male-♂️</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  id="flexRadioDefault2"
                  onChange={handleChange}
                />
                <label className="form-check-label">Female-♀️</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Create;
