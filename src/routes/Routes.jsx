import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BrowesBooks from "../pages/BrowesBooks";
import BookDetails from "../pages/BookDetails";
import MyReserve from "../pages/MyReserve";
import PrivateRoutes from "./PrivateRoutes";
import UserProfile from "../pages/UserProfile";
import ChangePassword from "../pages/ChangePassword";
import AdminLayout from "../layout/AdminLayout";
import ManageBook from "../pages/admin/ManageBook";
import EditBook from "../pages/admin/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path:"/books",
          element: <BrowesBooks/>
        },
        {
          path:"/books/:id",
          element:<PrivateRoutes><BookDetails/></PrivateRoutes>
        },
        {
          path:'/reserve/my',
          element:<PrivateRoutes> <MyReserve/> </PrivateRoutes>
        },
        {
          path:'/user/profile',
          element:<PrivateRoutes> <UserProfile/> </PrivateRoutes>
        },
        {
          path:'/change-password',
          element:<PrivateRoutes><ChangePassword/></PrivateRoutes>
        }
    ]
  },
  {
    path:"/admin",
    element: <AdminLayout/>,
    children:[
      {
        path: "manage-book",
        element: <ManageBook/>
      },
      {
        path: "edit/book/:id",
        element:<EditBook/>
      }
    ]

  }
]);

export default router;