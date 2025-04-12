import React from 'react'

const UserCard = ({user}) => {
    // console.log(user);    
    const {_id, firstName, lastName, photoUrl, age, gender, about,skill} = user;

    if(!user) return null;

  return (
    <>
  <div className="card bg-base-100 bg-green-100 w-80 shadow-xl flex mt-20">
  <figure className="px-10 pt-10">
    <img
      src={user.photoUrl}
      alt="photo"
      className="rounded-3xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title ml-0">{firstName +" "+ lastName}</h2>
    {gender && age && <p>{age + " "+ gender}</p>}
    <p>{about}</p>
    <p>{skill}</p>
    <div className="card-actions flex justify-center gap-4">
      <button className="btn bg-pink-300">Interested</button>
      <button className="btn bg-blue-400">Ignored</button>
    </div>
  </div>
</div>
    </>
  )
}

export default UserCard