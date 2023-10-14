import { apiSlice } from './apiSlice';

// const URL = 'http://localhost:5000';
const DEPLOYED_URL = 'https://mern-users-list-backend.onrender.com';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       login:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/login`,
            method : 'POST',
            body : data
        }),
       }),
       logout:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/logout`,
            method : 'POST',
        }),
       }),
       register:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/register`,
            method : 'POST',
            body : data
        }),
       }),
       getAll:builder.mutation({
        query:(search,sort)=>({
            url : `${DEPLOYED_URL}/api/user/getall?search=${search}&sort=${sort}`,
            method : 'GET',
        }),
       }),
       getSingleUserById:builder.mutation({
        query:(id)=>({
            url : `${DEPLOYED_URL}/api/user/${id}`,
            method : 'GET',
        }),
       }),
       updateUser:builder.mutation({
        query:(id,data)=>({
            url : `h${DEPLOYED_URL}/api/user/${id}`,
            method : 'PUT',
            body : data
        }),
       }),
       delete:builder.mutation({
        query:(id)=>({
            url : `${DEPLOYED_URL}/api/user/${id}`,
            method : 'DELETE',
        }),
       }),
    }),
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,
    useUpdateMutation,useGetAllMutation,useGetSingleUserByIdMutation,useDeleteMutation} = userApiSlice