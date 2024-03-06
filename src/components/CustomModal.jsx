import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showmodal, setShowModal }) => {
  const allUsers = useSelector((state) => state.app.users);
  const singleUser = allUsers.find((el) => el.id === id);

  if (!singleUser) {
    return null; // Return null if singleUser is not found
  }

  const { name, email, age, gender } = singleUser;

  const handleClose = () => {
    if (showmodal) {
      setShowModal(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClose} className="modalBackground">
      <div onClick={handleModalClick} className="modalContainer">
        <button onClick={handleClose} className="btn-close">
          Close
        </button>
        <h2>{name}</h2>
        <h5>{email}</h5>
        <h5>{age}</h5>
        <h6>{gender}</h6>
      </div>
    </div>
  );
};

export default CustomModal;
