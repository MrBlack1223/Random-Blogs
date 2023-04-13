import { useParams, useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react';

import CustomInput from '../components/input.js';
import { UserContext } from '../userContext.js';

import './loginPage.css'
function LoginScreen() {

    const {user,setUser} = useContext(UserContext);

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        password: ''
    })
    const [isSignIn, setIsSignIn] = useState(true)
    const inputs = isSignIn ? [{
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Username",
        errorMessage:
          "Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
      }] 
      : 
      [
        {
          id: 1,
          name: "name",
          type: "text",
          placeholder: "Username",
          errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
          label: "Username",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          id: 3,
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password",
          pattern: values.password,
          required: true,
        },
      ];
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      const newUser = {
        name: values.name,
        password : values.password
        }
        const res = await fetch(`https://random-blogs-api.onrender.com/user/${isSignIn ? 'signin' : 'signup'}`,{
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(newUser)
        })
        .catch(error => {
            console.log(error)
        })
        if(res.status === 200 && !isSignIn)
        {
            setIsSignIn(true)
        }
        if(res.status === 200 && isSignIn)
        {
            localStorage.setItem('username', values.name)
            setUser(values.name)
            navigate('/')
        }
        if(res.status === 500)console.log('użyykownik juz istnieje')

    };

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    
    return ( 
    <div className='loginScreenContainer'>
        <form className='loginScreenForm' onSubmit = {handleSubmit}>
            <h2 className='registerFormHeader'>{isSignIn ? "LOGIN" : "REGISTER"}</h2>
            {inputs.map((input)=>{
                return <CustomInput 
                    key = {input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                />
            })}
            <button className='registerButtonSubmit'>SUBMIT</button>
            <h3 className = 'loginInfoMsg' onClick = {()=>{setIsSignIn(prev=>!prev)}}>{isSignIn ? "Need an account?" : "Have an account?"}</h3>
        </form>
    </div>
      
    );
  }
  
  export default LoginScreen;