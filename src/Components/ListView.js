import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import "../assets/css/ListView.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Data from "../assets/data/data.json";
import { BsTrash3, BsPencil } from "react-icons/bs";
import EditView from "./EditView";
import { calculateAge } from "./calculateAge";
import { Modal, Button } from "react-bootstrap";

const ListView = () => {
  const [data, setData] = useState(Data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setEditing] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [searchData, setSearchData] = useState("");
  const [isEdited, setEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleState = (id) => {
    setSelectedItem((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    setEditing(id);
    const selectedData = data.find((cur) => cur.id === id);
    setUpdateData(selectedData || {}); // Initialize with the data of the selected item or empty object
  };
  const handleDelete = (id) => {
    setDeleteIndex(id); // Set the ID of the item to be deleted
    setIsModalOpen(true); // Open the modal
  };

  const deleteItem = (id) => {
    const deleteData = data.filter((cur) => cur.id !== id);
    setData(deleteData);
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const filteredData = data.filter((cur) =>
    `${cur.first} ${cur.last}`.toLowerCase().includes(searchData.toLowerCase())
  );

  const handleSave = () => {
    // Update the data in the state
    const updatedList = data.map((cur) =>
      cur.id === updateData.id ? { ...cur, ...updateData } : cur
    );
    setData(updatedList);
    setEditing(null); // Exit editing mode
  };

  const handleCancel = () => {
    setEditing(null); // Cancel editing mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));

    setEdited(true);
  };

  // Render the EditView if editing
  if (isEditing != null) {
    return (
      <EditView
        updateData={updateData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        isEdited={isEdited}
      />
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-12 col-sm-12">
        <h2 className="my-4">List View</h2>

        {/* Search */}
        <div className="search rounded-4 mb-4">
          <IoIosSearch style={{ color: "grey" }} size={20} className="ms-2" />
          <input
            type="text"
            className="ms-3 search-field"
            placeholder="Search user"
            onChange={handleSearch}
            value={searchData}
          />
        </div>

        {/* List Items */}
        {filteredData.map((cur) => (
          <div
            key={cur.id}
            className="row List-view justify-content-center align-items-center mt-4 p-2 border border-1 rounded-4"
            onClick={() => handleState(cur.id)}
          >
            <div className="col-3">
              <img
                src={cur.picture}
                style={{ width: "80px", borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="col-6 text-start fs-6 fw-medium">
              {`${cur.first} ${cur.last}`}
            </div>
            <div className="col-3 text-end">
              {selectedItem === cur.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} style={{ fontWeight: 400 }} />
              )}
            </div>
            {selectedItem === cur.id && (
              <div className="col-12 List-view-inner">
                <div className="row">
                  <div className="col-4">
                    <div className="label"> Age</div>
                    <div className="val">{calculateAge(cur.dob)}</div>
                  </div>
                  <div className="col-4">
                    <div className="label">Gender</div>
                    <div className="val">{cur.gender}</div>
                  </div>
                  <div className="col-4">
                    <div className="label">Country</div>
                    <div className="val">{cur.country}</div>
                  </div>
                </div>
                <div className="row-6 my-3">
                  <div className="label mb-1">Description</div>
                  <div className="val">{cur.description}</div>
                </div>
                <div className="row-6 d-flex justify-content-end gap-3 me-2 my-3">
                  <div className="delete-icon">
                    <BsTrash3 size={18} onClick={() => handleDelete(cur.id)} />
                  </div>
                  <div className="pencil-icon">
                    <BsPencil size={18} onClick={() => handleEdit(cur.id)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Modal  */}
        {isModalOpen && (
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Body closeButton className="modal-body p-4">
              <button
                type="button"
                className="btn-close mt-2 me-2"
                onClick={() => setIsModalOpen(false)}
              ></button>
              Are you sure you want to delete?
            </Modal.Body>
            <div className="d-flex justify-content-end gap-3 me-5 mt-4 mb-3">
              <Button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="delete"
                onClick={() => deleteItem(deleteIndex)}
              >
                Delete
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ListView;
