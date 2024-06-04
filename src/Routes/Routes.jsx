import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>,
        },
        {
            path: "/contact-us",
            element:<ContactUs></ContactUs>
        }
        
      ]
    },

    // dashboard
    {
        path: "/dashboard",
        element: 
          <Dashboard></Dashboard>,
        children: [
          // normal user routes
          {

          },
        ]
      }
  ]);

  export default router