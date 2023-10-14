import { useState, useEffect } from 'react';
import {useNavigate,useParams } from 'react-router-dom'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { useGetSingleUserByIdMutation, useRegisterMutation, useUpdateMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'react-hot-toast'
import {BASE_URL} from '../services/helper'

import axios from 'axios';
const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
  heardAbout: '',
  city: 'Mumbai',
  state: '',
};

const statesData = ['Gujarat', 'Maharashtra', 'Karnataka'];

const EditUser = () => {
  const [getSingleUserById] = useGetSingleUserByIdMutation()
  // const [updateUser] = useUpdateMutation()
  // console.log(mutation)

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  useEffect(() => {
    const getUserById =  async () =>{
         try {
          const res = await axios.get(`http://localhost:5000/api/user/${id}`)
          console.log(res)
         
         if(res.status === 200){
          setFormData({
            name : res.data.name,
            email : res.data.email,
            phone : res.data.phone,
            gender : res.data.gender,
            city : res.data.city,
            state : res.data.state,
          })
         }
         } catch (error) {
           console.log(error)
         }
    }
     getUserById()

  }, [id])


const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const editData = {
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        city: formData.city,
        state: formData.state
      } 
    const res = await axios.put(`${BASE_URL}/api/user/${id}`,editData)
      toast.success("User updated successfully..")
      navigate('/list')
      dispatch(setCredentials({...res}))
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

   
  };
  return (
    <div className="min-h-[50vh] py-10 flex items-center justify-center">
 
    
    <div className="w-[600px] bg-blackBg p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-semibold mb-4 text-purple-400">User Edit Form</h1>

      <form onSubmit={submitHandler} className='flex item-center flex-col gap-6'>
      <div className="mb-4">
        <label className="block text-childText  font-sm mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-[40%] ml-4 px-2 bg-authBg border rounded py-2 px-3 text-childText leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </label>
        </div>
 

        <div className="mb-4">
        <label className="block text-childText text-sm  mb-2">
          Phone:
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-[40%] ml-4 px-2 bg-authBg border rounded py-2 px-3 text-childText leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>

      <div className="flex items-center justify-center gap-4">
        <label className="block text-childText text-sm  mb-2">Gender:</label>
        <label className="block flex gap-2 text-childText text-sm  mb-2">
          Male
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
            
          />
        </label>
        <label className="block flex gap-2 text-childText text-sm  mb-2">
          Female
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
        </label>
        <label className="block flex gap-2 text-childText text-sm  mb-2">
          Others
          <input
            type="radio"
            name="gender"
            value="Others"
            checked={formData.gender === 'Others'}
            onChange={handleChange}
          />
        </label>
      </div>


      <div className="mb-4">
        <label className="block text-childText text-sm  mb-2">
          City:
          <select name="city" value={formData.city} 
          onChange={handleChange}
          className="w-[50%] ml-2 px-2 bg-authBg border rounded py-2 px-3 text-childText leading-tight focus:outline-none focus:shadow-outline">
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </label>
        </div>
      
        <div className="mb-4">
        <label className="block text-childText text-sm ] mb-2">
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-[40%] ml-4 px-2 bg-authBg border rounded py-2 px-3 text-childText leading-tight focus:outline-none focus:shadow-outline"
            list="states"
          />
          <datalist id="states">
            {statesData.map((state, index) => (
              <option key={index} value={state} />
            ))}
          </datalist>
        </label>
      </div>

        <Button type="submit"
      >Update</Button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
