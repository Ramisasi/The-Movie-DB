import React from 'react'
import { Outlet } from 'react-router-dom'
import NaveBar from '../Nave/NaveBar'

export default function MasterLayout({userToken,logOut}) {
  return (
    <>
    <NaveBar userToken={userToken} logOut={logOut}/>
    <div className='container'>
           <Outlet/>
       </div>
       </>
  )
}
