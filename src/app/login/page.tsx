'use client'

import React from 'react'
import axios from 'axios'
import { getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';

const Login = () => {
    console.log(process.env)

    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USERPOOL,
          userPoolClientId: process.env.NEXT_PUBLIC_CLIENTID,
          identityPoolId: process.env.NEXT_PUBLIC_IDENTITY
        },
      },
    });

    const onSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const values = new FormData(e.target)
        axios.post("https://nnztsu4muk.execute-api.ap-southeast-1.amazonaws.com/login", {
            username: values.get("username"),
            password: values.get("password")
        })
        .then((data) => {
            console.log("Login", data)
            return getCurrentUser()
        })
        .then((data) => {
            console.log("Session", data)
        })
        .catch(console.error)
    }

    return (
        <form onSubmit={onSubmit}>
            <input name='username' placeholder='username'></input>
            <input type="password" name='password' placeholder='password'></input>
            <button type='submit' value="submit">Submit</button>
        </form>
    )
}

export default Login