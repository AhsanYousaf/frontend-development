import React from "react";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gray-200">
      <h1 className="text-center p-4 text-2xl bg-gray-300">
        Welcome to the CRM Systems
      </h1>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col justify-center gap-4 items-center">
          <button className="bg-green-300 p-2 border border-green-600 rounded-md" onClick={()=>navigate('/add-customer')}>Add Customers</button>
          <button className="bg-blue-300 p-2 border border-blue-600 rounded-md" onClick={()=>navigate('/show-customers')}>List Customers</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
