import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "education" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/customers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setFormData({
        name: "",
        email: "",
        education: [],
      });
      Swal.fire({
        icon: "success",
        title: "Customer added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen">
      <h1 className="text-center text-2xl p-4 bg-gray-400">Add New Customer</h1>
      <form
        className="max-w-md mx-auto mt-8 border border-2 border-gray-600 p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="education"
          >
            Education (comma-separated)
          </label>
          <input
            type="text"
            id="education"
            name="education"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., School, College, University"
            value={formData.education.join(",")}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
