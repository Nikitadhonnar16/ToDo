import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCheckCircle, BsCursor } from "react-icons/bs";
import "../assets/css/EditView.css";
import { calculateAge } from "./calculateAge";

const EditView = ({ updateData, onChange, onSave, onCancel, isEdited }) => {
  const buttonStyle = {
    cursor: isEdited ? "pointer" : "not-allowed",
  };

  return (
    <form
      className="row List-view justify-content-center align-items-center mt-4 p-2 border border-1 w-50 rounded-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <div className="col-3">
        <img
          src={updateData.picture}
          style={{ width: "80px", borderRadius: "50%" }}
          alt=""
        />
      </div>
      <div className="col-6 text-start fs-6 fw-medium">{`${updateData.first} ${updateData.last}`}</div>
      <div className="col-3 text-end">
        <FaChevronUp size={20} />
      </div>

      <div className="col-12 List-view-inner">
        <div className="row">
          <div className="col-4">
            <div className="label"> Age</div>
            <input
              type="text"
              className="rounded-4 input-style"
              name="age"
              value={calculateAge(updateData.dob) || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-4">
            <div className="label">Gender</div>
            <select
              className="input-style2 rounded-4"
              name="gender"
              value={updateData.gender || ""}
              onChange={onChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Rather not say">Rather not say</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-4">
            <div className="label">Country</div>
            <input
              type="text"
              className="input-style2 rounded-4"
              name="country"
              value={updateData.country || ""}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row-6 my-2">
          <div className="label mb-1">Description</div>
          <textarea
            rows={5}
            className="input-style3 rounded-4 p-2"
            name="description"
            value={updateData.description || ""}
            onChange={onChange}
          />
        </div>
        <div className="row-6 d-flex justify-content-end gap-3 me-2 my-1">
          <div className="close-icon" onClick={onCancel}>
            <IoCloseCircleOutline size={25} />
          </div>
          <button
            type="submit"
            className="save-icon buttonStyle"
            disabled={!isEdited}
          >
            <BsCheckCircle
              size={20}
              style={{ color: isEdited ? "green" : "#aaf78d" }}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditView;
