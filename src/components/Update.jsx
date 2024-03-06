import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/UserDetailsSlice";
import { Parallax } from "react-parallax";
import wolf from '../images/blue-morpho-butterfly.png'
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    age: "",
    gender: true,
  });

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === id);

      setFormValue(singleUser);
    }
  }, [users, id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    navigate("/read");
  };

  const handleback = () => {
    navigate("/read");
  };
  return (
    <div>
      <Parallax bgImage={wolf}>
        <div className="content ">
      <div className="text-content-update">
        <h2 className="my-2 fs-1 mt-5">Update User Details</h2>
        
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fs-1" >Name</label>
            <input
              type="text"
              className="form-control"
              value={formValue.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fs-1">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fs-1">Age</label>
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
              checked={formValue.gender === "male"}
            />
            <label className="form-check-label fs-1">Male-♂️</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              id="flexRadioDefault2"
              onChange={handleChange}
              checked={formValue.gender === "female"}
            />
            <label className="form-check-label fs-1">Female-♀️</label>
          </div>
          <button type="submit" className="btn btn-primary mx-5 ">
            Submit
          </button>
          <button className="btn btn-primary" onClick={handleback}>Back</button>
        </form>
        
      </div>
      </div>
      </Parallax>
      
    </div>
  );
};

export default Update;
