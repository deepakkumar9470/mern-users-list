import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllMutation } from "../redux/usersApiSlice";
import { Pencil, Search, Trash, Eye } from "lucide-react";
import { BASE_URL } from "../services/helper";
import Loader from "./Loader";

import axios from "axios";
import { toast } from "react-hot-toast";
const UsersList = () => {
  const [getAll, { isLoading }] = useGetAllMutation();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("A-Z");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await getAll(search, sort);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, [search, sort]);

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/user/${id}`);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("oops user not deleted");
    }
  };
  if (isLoading) return <Loader />;
;
  return (
    <>
      <div className="flex gap-6 justify-between mt-16 p-5">
        <div className="flex items-center">
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full px-4 py-2 text-gray-200 bg-blackBg  rounded-md  focus:outline-none"
              placeholder="Search records by name,email..."
            />
            <button className="px-4 text-white bg-indigo-600 border-l rounded ">
              <Search />
            </button>
          </div>
        </div>
        <div className="relative">
          <select
            className="w-[150px] md:w-[200px] mt-2 p-2.5 text-mainText bg-blackBg border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          >
            <option>Sort by value</option>
            <option
              onClick={() => setSort("A-Z")}
              className="text-childText"
              value={"A-Z"}
            >
              A-Z
            </option>
            <option
              onClick={() => setSort("Z-A")}
              className="text-childText"
              value={"Z-A"}
            >
              Z-A
            </option>
            <option
              onClick={() => setSort("Last Modified")}
              className="text-childText"
              value={"Last Modified"}
            >
              Last modified
            </option>
            <option
              onClick={() => setSort("Last Inserted")}
              className="text-childText"
              value={"Last Inserted"}
            >
              Last Inserted
            </option>
          </select>
        </div>
      </div>
      <div className="w-full relative flex flex-col shadow-lg mb-6 mt-6">
        <div className="block bg-tableBg m-4 p-4 w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border border-solid border-l-0 border-r-0 border-l-mainText">
                <th className="text-childText text-md px-6 py-3">Name</th>
                <th className="text-childText text-md px-6 py-3">Email</th>
                <th className="text-childText  text-md px-6 py-3">Phone</th>
                <th className="text-childText text-md px-6 py-3">City</th>
                <th className="text-childText text-md px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.length > 0 ? (
                users?.map((user) => {
                  return (
                    <>
                      <tr
                        key={user?._id}
                        className="hover:bg-hoverClr transition-all cursor-pointer duration-150"
                      >
                        <td className="text-childText text-base px-6 py-3 cursor-pointer ">
                          {user?.name}
                        </td>
                        <td className="text-childText text-base px-6 py-3">
                          {user?.email}
                        </td>
                        <td className="text-childText text-base px-6 py-3">
                          {user?.phone}
                        </td>
                        <td className="text-childText text-base px-6 py-3">
                          {user?.city}
                        </td>
                        <div className="text-childText flex justify-center">
                          <td className="text-md px-6 py-3">
                            <Link to={`/edit/${user?._id}`}>
                              <Pencil
                                className=" cursor-pointer text-indigo-500"
                                strokeWidth={1}
                                size={20}
                              />
                            </Link>
                          </td>
                          <td className="text-md px-6 py-3">
                            <Link to={`/profile/${user?._id}`}>
                              <Eye
                                className=" cursor-pointer text-green-500"
                                strokeWidth={1}
                                size={20}
                              />
                            </Link>
                          </td>
                          <td className="text-md px-6 py-3">
                            <Trash
                              onClick={() => handleDeleteUser(user?._id)}
                              className="cursor-pointer text-red-500"
                              strokeWidth={1}
                              size={20}
                            />
                          </td>
                        </div>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div className="text-xl text-center font-semibold">
                  No data found{" "}
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersList;
