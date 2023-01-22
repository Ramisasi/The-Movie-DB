import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'


export default function Login({userToken}) {
  let [ErrerValidtion, SetErrerValidtion] = useState([])
  let [userData, SetUserData] = useState({
    email: "",
    password: "",
  })
  let [ErrerApi, SetErrerApi] = useState("")
  let Navigate = useNavigate()
  let [Loading, SetLoading] = useState(false)
  
  function Validtion() {
    let Sceama = joi.object({
      email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required().pattern(new RegExp(/^[A-Z][a-z]{2,10}[0-9]?$/))
    })
    return Sceama.validate(userData, { abortEarly: false })
  }

  function AddUser(e) {
    let MyUser = { ...userData };
    MyUser[e.target.name] = e.target.value;
    SetUserData(MyUser);
  }
  async function SubmitForm(e) {
    e.preventDefault() 
    let error = Validtion()
    if (error?.error) {
      SetErrerValidtion(error.error.details)
    }
    else {
      SetLoading(true)
      SetErrerValidtion([])
      let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", userData)
      SetLoading(false)
      if (data.message == "success") {
        Navigate("/Home")
        localStorage.setItem("Token", data.token)
        userToken()
      }
      else {
        SetErrerApi(data.message)
      }
    }
  }
  return (
    <div>
      <h2>Login</h2>
      {ErrerValidtion.length <= 0 ? '' : ErrerValidtion.map((el ,i)=> <div key={i} className='alert alert-danger my-2'>{el.message}</div>)}
      {ErrerApi == '' ? '' : <div className='alert alert-danger my-2'>{ErrerApi}</div>}

      <form onSubmit={SubmitForm}>
        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='email' id='email' />
        </div>
        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='password' id='password' />
        </div>
        <div className='my-2'>
          {Loading ?
            <button className='btn btn-outline-info'>
              <i className='fa-solid fa-spinner fa-spin'></i>
            </button>
            :
            <button type='Submit' className='btn btn-outline-info'>Login</button>
          }
        </div>
      </form>
    </div>
  )
}
