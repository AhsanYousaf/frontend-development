// import React, { useEffect, useState } from "react";
// import ShowCustomers from "./components/ShowCustomers";
// import AddCustomer from "./components/AddCustomer";
// import axios from "axios";

// function App() {
//   const [customers, setCustomers] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/customers")
//       .then((res) => setCustomers(res.data))
//       .catch((err) => console.log(err));
//   }, [customers]);
//   return (
//     <div className="w-full h-screen">
//       <AddCustomer />
//       <h1 className="text-center text-xl bg-gray-400 p-6 mb-10">
//         Customers Data
//       </h1>
//       <div className="flex justify-center items-center flex-wrap gap-6">
//         {customers?.map((customer, index) => {
//           return (
//             <div key={index}>
//               <ShowCustomers customers={customer} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import Login from "./components/Login";
import Home from "./components/Home";
import ShowCustomersPage from "./pages/ShowCustomersPage";
import AddCustomer from "./components/AddCustomer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/show-customers" element={<ShowCustomersPage />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          {/* <PrivateRoute
            path="/show-customers"
            element={<ShowCustomersPage />}
            isAuthenticated={true} 
          /> */}
          {/* Other public routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
