import React, { useEffect, useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAllMutation } from '../redux/usersApiSlice'
import { Loader } from 'lucide-react'
 
const Home = () => {
  const [getAll, {isLoading}] = useGetAllMutation()
  const {userInfo} = useSelector((state)=>state.auth)
  const [users,setUsers] = useState([])

  useEffect(() => {
      const getAllUsers = async () =>{
        try {
          const res = await getAll()
          setUsers(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getAllUsers()
  }, [])
  if(isLoading) return <Loader/>

  
  return (
    <div className='w-[80%]  flex items-center justify-center mt-5 mx-auto'>
        <div className='w-full h-[400px] text-gray-600'
       > 
            {userInfo ? <img className="w-full h-[400px] mt-10 object-contain" 
            src="/newusers.svg" /> :
            <img className="w-full h-[500px] object-contain" 
            src="/login-bg.svg" />}

           {userInfo ? (
            <Link to="/list">
            <Button>Go to Users list</Button>
          </Link>
           )
           :
           (<Link to="/signup">
              <Button>Get Started</Button>
            </Link>)
            }

        </div>
    </div>
  )
}

export default Home