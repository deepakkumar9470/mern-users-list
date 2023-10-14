import React,{useEffect, useState} from 'react'
import {Facebook, Github,Twitter,Youtube,Pencil} from 'lucide-react'
import { Link ,useNavigation,useParams} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../services/helper';


const Profile = () => {
    
	const [user,setUser] = useState({})

	const navigate = useNavigation()
	const {id} = useParams()	     
	useEffect(() => {
		const getUserById =  async () =>{
			 try {
			  const res = await axios.get(`${BASE_URL}/api/user/${id}`)
			 if(res.status === 200){
			  setUser(res.data)
			 }
			 } catch (error) {
			   console.log(error)
			 }
		}
		 getUserById()
	
	  }, [id])
  return (

    <div className="w-[50%] flex flex-col items-center justify-center mt-20 mx-auto p-5 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
	  <div className='flex items-center gap-4 relative'>
      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-32 h-32 mx-auto object-cover rounded-full bg-gray-500 aspect-square" />
      <Link to={`/edit/${user?._id}`}>
      <Pencil className='w-4 h-4 absolute top-4 right-[-10px] cursor-pointer
      rounded-md text-gray-100 hover:text-violet-400' />
      </Link>
      </div>
	<div className="space-y-4 text-center divide-y divide-gray-700">
		<div className="my-2 space-y-1">
			<h2 className="text-xl font-semibold sm:text-2xl">{user?.name} , <span className='text-[10px] text-gray-300'>{user?.gender}</span> </h2>
			<p className="px-5 text-xs sm:text-base text-gray-400">{user?.email}</p>
			<span className="px-5 text-xs sm:text-base text-gray-400">{user?.city} , {user?.state}</span>
		</div>
		<div className="flex justify-center pt-2 space-x-4 align-center">
			<Link rel="noopener noreferrer" to="/" aria-label="GitHub" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
            <Facebook />
			</Link>
			<Link rel="noopener noreferrer" to="/" aria-label="Dribble" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
          
            <Github />
			</Link>
			<Link rel="noopener noreferrer" to="/" aria-label="Twitter" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
            <Twitter />
			</Link>
			<Link rel="noopener noreferrer" to="/" aria-label="Email" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
            <Youtube />
			</Link>
		</div>
	</div>
</div>

        


  )
}

export default Profile