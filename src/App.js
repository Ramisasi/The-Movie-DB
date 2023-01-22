import './App.css';
import {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom'
import MasterLayout from './MasterLayout/MasterLayout'
import Home from './Home/Home'
import About from './About/About'
import Movies from './Movies/Movies'
import NetWorkes from './NetWorkes/NetWorkes'
import People from './People/People'
import Tv from './Tv/Tv'
import Login from './Login/Login'
import Register from './Register/Register'
import NotFount from './NotFounf/NotFount'
import jwt from 'jwt-decode'
import { useState , useEffect} from 'react';
import MoveDetalis from './MoveDetalis/MoveDetalis';

function App() {
  let [SaveUser, SetSaveUser] = useState(null)
  useEffect(()=>{
    if( localStorage.getItem("Token") != null)
    {
      SaveUserData()
    }
  },[])
  function SaveUserData() {
    let token = localStorage.getItem("Token")
    let Data = jwt(token)
    SetSaveUser(Data)
    //console.log(Data);
  }
  function ProtactRouter(props){
    if(localStorage.getItem("Token") == null)
    {
      return <Navigate to={"/login"} />
    }
    else{
      return props.children
    }
  }
  function logOut()
  {
    localStorage.removeItem("Token")
    SetSaveUser(null)
    return <Navigate to={"/login"} />
  }
  let Routers = createBrowserRouter([
    {
      path:'/' ,element :<MasterLayout userToken={SaveUser} logOut={logOut}/>,children:[
        {path:'/', element:<ProtactRouter><Home/></ProtactRouter>},
        {path:'Home', element:<ProtactRouter><Home/></ProtactRouter>},
        {path:'About', element:<ProtactRouter><About/></ProtactRouter>},
        {path:'Movies', element:<ProtactRouter><Movies/></ProtactRouter>},
        {path:'MoveDetalis/:id', element:<ProtactRouter><MoveDetalis/></ProtactRouter>},
        {path:'NetWorkes', element:<ProtactRouter><NetWorkes/></ProtactRouter>},
        {path:'People', element:<ProtactRouter><People/></ProtactRouter>},
        {path:'Tv', element:<ProtactRouter><Tv/></ProtactRouter>},
        {path:'login', element:<Login userToken={SaveUserData}/>},
        {path:'Register', element:<Register/>},
        {path:'*', element:<NotFount/>}
      ]
    }
  ])
  return (
   <RouterProvider router={Routers}/>
  )
}

export default App;
