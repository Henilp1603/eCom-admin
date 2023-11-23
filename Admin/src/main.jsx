import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {ProductProvider} from "./Context/ProductContext.jsx";
import {UserProvider} from "./Context/UserContext.jsx";
import {OrderProvider} from "./Context/OrderContext.jsx";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer/>
      <UserProvider>
        <ProductProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ProductProvider>
      </UserProvider>
    
  </React.StrictMode>
);
