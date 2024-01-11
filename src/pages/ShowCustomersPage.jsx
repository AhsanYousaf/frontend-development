import React, { useEffect, useState } from "react";
import ShowCustomers from "../components/ShowCustomers";
import axios from "axios";

const ShowCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/customers", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, [customers]);
  
  return (
    <div className="bg-gray-200">
      <h1 className="text-center text-2xl p-4 bg-gray-400">Customer Data</h1>
      <div className="flex justify-center items-center flex-wrap gap-6 w-full h-screen">
        {customers?.map((customer, index) => {
          return (
            <div key={index}>
              <ShowCustomers customers={customer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCustomersPage;
