import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/UserDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import luffy from "../images/firefly.png";
import tangiro from "..//images/butterfly.png";
import { Parallax } from "react-parallax";
import gear from "../images/fly.jpg";
import "../App.css";
const Read = () => {
  const [showmodal, setShowModal] = useState(false);
  const [radioData, setRadioData] = useState("");
  const [id, setId] = useState([]);
  const dispatch = useDispatch();
  const { users, loading, searchUser } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleModal = useCallback(
    (id) => {
      setId(id);
      setShowModal(!showmodal);
    },
    [showmodal, setId, setShowModal]
  );

  const renderValue = useMemo(() => {
    if (loading) {
      return <h2>Loading ...</h2>;
    }

    return users
      .filter((user) => {
        if (searchUser.length === 0) {
          return user;
        }
        return user.name.toLowerCase().includes(searchUser.toLowerCase());
      })
      .filter((el) => {
        if (radioData === "male") {
          return el.gender === radioData;
        } else if (radioData === "female") {
          return el.gender === radioData;
        } else return el;
      })
      .map((user) => (
        <div key={user.id} className="card w-50 mx-auto my-2">
          <div className="card-body">
            <img className="img1" src={luffy} alt="Luffy" />
            <img className="img2" src={tangiro} alt="Luffy" />

            <h5 className="card-title">{user.name}</h5>
            <h6 className="card-subtitle mb-2 ">{user.email}</h6>
            <p className="card-text">{user.gender}</p>

            <button className="card-link" onClick={() => handleModal(user.id)}>
              View
            </button>
            <Link to={`/update/${user.id}`} className="card-link">
              Edit
            </Link>
            <Link
              className="card-link"
              onClick={() => dispatch(deleteUser(user.id))}
            >
              Delete
            </Link>
          </div>
        </div>
      ));
  }, [users, searchUser, radioData, handleModal, dispatch, loading]);

  return (
    <div className="home">
      <Parallax bgImage={gear} strength={-600}>
        <div className="">
          <div className="read-data">
            {showmodal && (
              <CustomModal
                id={id}
                showmodal={showmodal}
                setShowModal={setShowModal}
              />
            )}
            <h1>All Data</h1>

            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value=""
              id="all"
              checked={radioData === ""}
              onChange={(e) => setRadioData(e.target.value)}
            />
            <label htmlFor="all" className="form-check-label">
              All
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              id="male"
              checked={radioData === "male"}
              onChange={(e) => setRadioData(e.target.value)}
            />
            <label htmlFor="male" className="form-check-label">
              Male
            </label>

            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              id="female"
              checked={radioData === "female"}
              onChange={(e) => setRadioData(e.target.value)}
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
            {/* render */}
            {renderValue}
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Read;
