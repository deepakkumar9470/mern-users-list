import { apiSlice } from './apiSlice';
const USERS_URL = 'http://localhost:5000/api/user/login';
const URL = 'http://localhost:5000';
const DEPLOYED_URL = 'https://user-auth-backend-68nw.onrender.com';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       login:builder.mutation({
        query:(data)=>({
            url : `http://localhost:5000/api/user/login`,
            method : 'POST',
            body : data
        }),
       }),
       logout:builder.mutation({
        query:(data)=>({
            url : `http://localhost:5000/api/user/logout`,
            method : 'POST',
        }),
       }),
       register:builder.mutation({
        query:(data)=>({
            url : `http://localhost:5000/api/user/register`,
            method : 'POST',
            body : data
        }),
       }),
       getAll:builder.mutation({
        query:(search,sort)=>({
            url : `http://localhost:5000/api/user/getall?search=${search}&sort=${sort}`,
            method : 'GET',
        }),
       }),
       getSingleUserById:builder.mutation({
        query:(id)=>({
            url : `http://localhost:5000/api/user/${id}`,
            method : 'GET',
        }),
       }),
       updateUser:builder.mutation({
        query:(id,data)=>({
            url : `http://localhost:5000/api/user/${id}`,
            method : 'PUT',
            body : data
        }),
       }),
       delete:builder.mutation({
        query:(id)=>({
            url : `http://localhost:5000/api/user/${id}`,
            method : 'DELETE',
        }),
       }),
    }),
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,
    useUpdateMutation,useGetAllMutation,useGetSingleUserByIdMutation,useDeleteMutation} = userApiSlice