import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/usersApiSlice";
import { logout } from "../redux/authSlice";
import Button from "./Button";
import toast from "react-hot-toast";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 ">
      <div className="md:flex items-center justify-between bg-navBgNew  py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-mainText"
        >
          <Link to="/">
            Profile
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <X /> : <Menu />}
        </div>

        {userInfo ? (
          <ul
            className={`md:flex gap-4 uppercase md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
           >
           <Link
              to="/"
              className="text-mainText hover:text-gray-400 duration-500"
            >
              HOME
            </Link>
            <Link
              to="/list"
              className="text-mainText hover:text-gray-400 duration-500"
            >
              USERLIST
            </Link>
            <Link
              to="/profile"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              <span>
                {userInfo?.firstName}
              </span>
            </Link>
            <Button logouthandle={logoutHandler}>LOGOUT</Button>
         
          </ul>
        ) : (
          <ul
            className={`md:flex md:items-center gap-4 bg-transparent font-semibold md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            <Link
              to="/login"
              className="text-mainText hover:text-gray-400 duration-500"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="text-mainText hover:text-gray-400 duration-500"
            >
              SIGNUP
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
