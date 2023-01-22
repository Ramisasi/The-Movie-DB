import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MoveDetalis() {
  let { id } = useParams()
  let [DetalisData, SetDetalisData] = useState({})

  useEffect(() => {
    GetData(id)
  }, [])
  async function GetData(id) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=96c769b9652b0d78b08dceeea53dca76&language=en-US `)
    SetDetalisData(data)
  }

  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          
        </div>
        <div className='col-md-8'>
        {DetalisData.title}
        </div>
      </div>
    </>
  )
}
