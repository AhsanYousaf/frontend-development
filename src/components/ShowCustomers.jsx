import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ShowCustomers = ({ customers, onDelete, onUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});

  const handleEdit = () => {
    setEditing(true);
    setEditedFields({
      name: customers?.name,
      email: customers?.email,
      education: customers?.education[0],
    });
  };

  const handleSave = (id) => {
    console.log(editedFields);
    setEditing(false);
    axios
      .put(`http://localhost:5000/customers/${id}`, editedFields, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res),
          Swal.fire({
            icon: "success",
            title: "Customer updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Customer deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e, field) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="bg-blue-400 p-6 flex flex-col justify-between items-center rounded-md gap-4 m-auto">
      <div className="flex gap-2">
        {isEditing ? (
          <FaSave
            onClick={() => handleSave(customers?._id)}
            className="cursor-pointer"
          />
        ) : (
          <>
            <FaEdit onClick={handleEdit} className="cursor-pointer" />
            <FaTrash
              onClick={() => handleDelete(customers?._id)}
              className="cursor-pointer"
            />
          </>
        )}
      </div>
      <div className="flex gap-6">
        <div className={isEditing ? "gap-6" : ""}>
          <p>Name:</p>
          <p>Email:</p>
          <p>Education:</p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-6">
              <input
                className="p-1"
                type="text"
                value={editedFields.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              <input
                className="p-1"
                type="text"
                value={editedFields.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
              <input
                className="p-1"
                type="text"
                value={editedFields.education}
                onChange={(e) => handleInputChange(e, "education")}
              />
            </div>
          ) : (
            <>
              <p>{customers?.name}</p>
              <p>{customers?.email}</p>
              <p>{customers?.education[0]}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCustomers;
