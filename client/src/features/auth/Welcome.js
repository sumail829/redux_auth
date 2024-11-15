import { useSelector } from "react-redux";
import { selectCurrentToken,selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";
import React from 'react'

const Welcome = () => {
    const user=useSelector(selectCurrentUser)
    const token=useSelector(selectCurrentToken)
   
     const welcome = user? `welcome ${user}!` :'Wlecome!'
     const tokenAbbr=`${token.slice(0,9)}...`
     
     const content=(
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token:{tokenAbbr}</p>
            <p><Link to="/userslist">Go to the user lists</Link></p>
        </section>
     )

  return  content
}

export default Welcome