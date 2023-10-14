import { useState, useEffect } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'react-hot-toast'
import Button from '../components/Button';
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

const SignUp = () => {
  const [register,{isLoading}] = useRegisterMutation()

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const {userInfo} = useSelector((state)=>state.auth)

useEffect(() => {
  if(userInfo){
    navigate('/')
  }
  
}, [navigate,userInfo])

const submitHandler = async (e) => {
    e.preventDefault();
    try {
       
      const res = await register(formData).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('Registration Successfully')
      navigate('/login')
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

   
  };
  return (
    <div className="min-h-[50vh] py-10 flex flex-col items-center justify-center">
     <div className='mb-2'>
            <Link href="/">
                <h3 className="text-4xl font-bold text-purple-600">
                    SignUp
                </h3>
            </Link>
        </div>
     <div className="w-[600px] bg-blackBg p-8 rounded-lg shadow-lg">

     
      <form onSubmit={submitHandler} className='flex item-center flex-col gap-6'>
       <div className="mb-2">
        <label className="block text-childText  font-sm mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
            required
          />
        </label>
        </div>
       
        <div className="mb-2">
        <label className="block text-childText  font-sm mb-2">
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
            required
          />
        </label >
        </div>
        <div className="mb-2">
        <label className="block text-childText  font-sm mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
            required
          />
        </label>
        </div>
       
        <div className="mb-2">
        <label className="block text-childText font-sm mb-2">
          Phone:
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
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

          <div className="flex items-center justify-center gap-4">
          <label className="block text-childText text-sm  mb-2">How did you hear about this?</label>
          <label className="block flex gap-2 text-childText text-sm  mb-2">
            LinkedIn
            <input
              type="checkbox"
              name="heardAbout"
              value="LinkedIn"
              checked={formData.heardAbout.includes('LinkedIn')}
              onChange={handleChange}
            />
          </label>
          <label className="block flex gap-2 text-childText text-sm  mb-2">
            Friends
            <input
              type="checkbox"
              name="heardAbout"
              value="Friends"
              checked={formData.heardAbout.includes('Friends')}
              onChange={handleChange}
            />
          </label>
          <label className="block flex gap-2 text-childText text-sm  mb-2">
            Job Portal
            <input
              type="checkbox"
              name="heardAbout"
              value="Job Portal"
              checked={formData.heardAbout.includes('Job Portal')}
              onChange={handleChange}
            />
          </label>
          <label className="block flex gap-2 text-childText text-sm  mb-2">
            Others
            <input
              type="checkbox"
              name="heardAbout"
              value="Others"
              checked={formData.heardAbout.includes('Others')}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4"> 
        <label  className="block text-childText text-sm  mb-2">
          City:
          <select
          className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
           name="city" value={formData.city} onChange={handleChange}>
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
            className="block w-full mt-1 px-2 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
            list="states"
          />
          <datalist id="states">
            {statesData.map((state, index) => (
              <option key={index} value={state} />
            ))}
          </datalist>
        </label>
        </div>
        
        <div className="flex items-center justify-center mt-4">
                    <Link
                        className="text-sm text-mainText"
                        to="/login"
                    >
                        Alreday User? {" "}{" "} Login here
                    </Link>
                    <Button
                        type="submit"
                    >
                        Signup
                    </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
