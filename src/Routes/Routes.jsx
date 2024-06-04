import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";


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
        },
        {
            path:"/sign-up",
            element:<SignUp></SignUp>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"*",
            element:<NotFoundPage></NotFoundPage>
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