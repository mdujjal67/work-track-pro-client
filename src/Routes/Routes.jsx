import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoutes";
import AllEmployee from "../Pages/Dashboard/AdminPanel/AllEmployee";
import AdminRoute from "./AdminRoutes";
import WorkSheet from "../Pages/Dashboard/EmployeePanel/WorkSheet/WorkSheet";
import EmployeeList from "../Pages/Dashboard/HRPanel/EmployeeList/EmployeeList";
import Progress from "../Pages/Dashboard/HRPanel/Progress/Progress";
import HRRoutes from "./HRRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Details from "../Pages/Dashboard/HRPanel/Details/Details";
import PaymentHistory from "../Pages/Dashboard/EmployeePanel/PaymentHistory";
import Messages from "../Pages/Dashboard/AdminPanel/Messages/Messages";


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
            path: "/forget-password",
            element: <ForgetPassword></ForgetPassword>
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
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>,
        children: [
          // admin routes
          {
            path:'all-employee-list',
            element:<AdminRoute>
                <AllEmployee></AllEmployee>
            </AdminRoute>
          },
          {
            path:'messages',
            element:<AdminRoute>
                <Messages></Messages>
            </AdminRoute>
          },
          
        //   employee routes
        {
            path:'work-sheet',
            element: <EmployeeRoutes>
                <WorkSheet></WorkSheet>
            </EmployeeRoutes>,
        },
        {
            path: 'payment-history',
            element: <PaymentHistory></PaymentHistory>
        },

        // hr routes
        {
            path: 'employee-list',
            element: <HRRoutes>
                <EmployeeList></EmployeeList>
            </HRRoutes>,
        },
        {
            path: 'progress',
            element: <HRRoutes>
                <Progress></Progress>
            </HRRoutes>,
        },
        {
            path: 'details/:email',
            element: <HRRoutes>
                <Details></Details>
            </HRRoutes>
        }
        ]
      }
  ]);

  export default router