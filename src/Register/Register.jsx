import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'

export default function Register() {

  let [userData, SetUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  })
  let [ErrerApi, SetErrerApi] = useState("")
  let [ErrerValidtion, SetErrerValidtion] = useState([])
  let Navigate = useNavigate()
  let [Loading, SetLoading] = useState(false)
  function AddUser(e) {
    let MyUser = { ...userData };
    MyUser[e.target.name] = e.target.value;
    SetUserData(MyUser);
  }
  function Validtion() {
    let Sceama = joi.object({
      first_name: joi.string().required().min(3).max(30).alphanum(),
      last_name: joi.string().required().min(3).max(30).alphanum(),
      age: joi.number().required().min(16).max(80),
      email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required().pattern(new RegExp(/^[A-Z][a-z]{2,10}[0-9]?$/))
    })
    return Sceama.validate(userData, { abortEarly: false })
  }
  async function SubmitForm(e) {
    e.preventDefault()
    let error = Validtion()
    
    if (error?.error) {
      SetErrerValidtion(error.error.details)
    }
    else {
      SetErrerValidtion([])
      SetLoading(true)
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup",userData)
        SetLoading(false)
        if(data.message = "success")
        {
          Navigate("/login")
        }
        else{
          SetErrerApi(data.message)
        }
    }
  }
  return (
    <div>
      <h2>Register</h2>
      {ErrerValidtion.length <= 0 ? '' : ErrerValidtion.map((el ,i)=> <div key={i} className='alert alert-danger my-2'>{el.message}</div>)}
      {ErrerApi == '' ? '' : <div className='alert alert-danger my-2'>{ErrerApi}</div>}
      <form onSubmit={SubmitForm}>

        <div className='my-2'>
          <label htmlFor="first_name">first name</label>
          <input type="text" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='first_name' id='first_name' />
        </div>
        <div className='my-2'>
          <label htmlFor="last_name">last name</label>
          <input type="text" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='last_name' id='last_name' />
        </div>
        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='email' id='email' />
        </div>
        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='password' id='password' />
        </div>
        <div className='my-2'>
          <label htmlFor="age">age</label>
          <input type="number" onChange={AddUser} className='form-control mt-2 bg-transparent text-white' name='age' id='age' />
        </div>
        <div className='my-2'>
          {Loading ?

            <button className='btn btn-outline-info'>
              <i className='fa-solid fa-spinner fa-spin'></i>
            </button>
            :
            <button type='Submit' className='btn btn-outline-info'>Register</button>
          }
        </div>
      </form>
    </div>
  )
}
