import './App.css'
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ConnectionDetector from './components/ConnectionDetector';
function App() {

  return (
    <ConnectionDetector>
      <Navbar />
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className='my-2'>
        <Outlet />
      </div>
    </ConnectionDetector>
  )
}

export default App
