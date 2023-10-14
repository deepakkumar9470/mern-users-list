
import { useState, useEffect } from 'react';
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
 
 
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login Successfully')
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
  

      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div>
            <Link href="/">
                <h3 className="text-4xl font-bold text-purple-600">
                    Login
                </h3>
            </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-blackBg shadow-md sm:max-w-md sm:rounded-lg">
            <form onSubmit={submitHandler}>
            
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-childText undefined"
                    >
                        Email
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full mt-1 bg-authBg text-childText border-gray-300 py-2 rounded-md shadow-sm "
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-childText undefined"
                    >
                        Password
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full bg-authBg mt-1 text-childText border-gray-300 py-2 rounded-md shadow-sm "
                        />
                    </div>
                </div>
                {isLoading && <Loader />}
             
                <div className="flex items-center justify-end mt-4">
                    <Link
                        className="text-sm text-mainText"
                        to="/signup"
                    >
                        Don't have an account? {" "}{" "} Signup
                    </Link>
                    <Button
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
      </div>
 
    

   
  )
}

export default Login