import axios from 'axios'
import React from 'react'
import avatar from '../image/images.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  let [MovesList, SetMovesList] = useState([])
  let [TvList, SetTvList] = useState([])
  let [PeopleList, SetPeopleList] = useState([])

  useEffect(() => {
    DbData('movie', SetMovesList)
    DbData("tv", SetTvList)
    DbData("person", SetPeopleList)
  }, [])
  async function DbData(type, callBack) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=96c769b9652b0d78b08dceeea53dca76`)
    callBack(data.results.slice(0, 10))
  }
  return (
    <>
      <div className='row my-3 g-3 align-items-center'>
        <div className='col-md-4'>
          <div className='bord w-25'></div>
          <h2 className='my-3'>Trending <br />movies <br />to watch now</h2>
          <div className='bord'></div>
        </div>
        {MovesList.map((moves) =>
       
          <div key={moves.id} className='col-md-2'>
              <Link to={"/MoveDetalis/" + moves.id}>
            <div className='items'>
              <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + moves.poster_path} art={moves.title} />
              <h3 className='h6'>{moves.title}</h3>
            </div>
            </Link>
          </div>
        )}

      </div>
      <div className='row my-3 g-3 align-items-center'>
        <div className='col-md-4'>
          <div className='bord w-25'></div>
          <h2 className='my-3'>Trending <br />Tv <br />to watch now</h2>
          <div className='bord'></div>
        </div>
        {TvList.map((tv) =>
          <div key={tv.id} className='col-md-2'>
            <div className='items'>
              <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} art={tv.name} />
              <h3 className='h6'>{tv.name}</h3>
            </div>
          </div>
        )}

      </div>
      <div className='row my-3 g-3 align-items-center'>
        <div className='col-md-4'>
          <div className='bord w-25'></div>
          <h2 className='my-3'>Trending <br />People <br />to watch now</h2>
          <div className='bord'></div>
        </div>
        {PeopleList.map((People) =>
          <div key={People.id} className='col-md-2'>
            <div className='items'>
              {People.profile_path != null ?
                <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + People.profile_path} art={People.name} />
                :
                <img className='w-100' src={avatar} art={People.name} />
              }
              <h3 className='h6'>{People.name}</h3>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
