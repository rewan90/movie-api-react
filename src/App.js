import { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import RootLayout from './Components/RootLayout/RootLayout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import InverseProtectedRoute from './Components/InverseProtectedRoute/InverseProtectedRoute';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import About from './Components/About/About';
import Tv from './Components/Tv/Tv';
import Movies from './Components/Movies/Movies';
import Profile from './Components/Profile/Profile';
import People from './Components/people/people';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline } from 'react-detect-offline';
import { AuthContext } from './context/AuthenticationContext';


function App() {
  let{userData,setUserData} = useContext(AuthContext);

  //reload handel
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      saveUserData();
    }

  },[])

function saveUserData(){
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken=jwtDecode(encodedToken);
  setUserData(decodedToken); 
}

let routers = createBrowserRouter([
  {path:'/', element: <RootLayout userData={userData}/>, children:[
    {path:'login', element: <InverseProtectedRoute><Login saveUserData={saveUserData}/></InverseProtectedRoute>},
    {path:'register', element: <InverseProtectedRoute  userData={userData}><Register/></InverseProtectedRoute>},
    {index:true, element: <Home/>},
    {path:'about', element: <ProtectedRoute  userData={userData}><About/></ProtectedRoute>},
    {path:'tv', element: <ProtectedRoute  userData={userData}><Tv/></ProtectedRoute>},
    {path:'movies', element: <ProtectedRoute  userData={userData}><Movies/></ProtectedRoute>},
    {path:'people', element: <ProtectedRoute  userData={userData}><People/></ProtectedRoute>},
    {path:'profile', element: <ProtectedRoute><Profile userData={userData}/></ProtectedRoute>},
    {path:'itemdetails/:id/:media_type', element: <ItemDetails/>},
    {path:'*', element: <ErrorPage/>}
    
  ]}
])

  return<>
  <div>
      <Offline> 
      <div className='offline'>
       You Are offline 
       </div>
 </Offline>
  </div>
  
    <RouterProvider router={routers}/>

  </>
  
  
}

export default App;
