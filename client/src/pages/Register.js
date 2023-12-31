import React, { useEffect } from 'react'
import {Form,Input, message} from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import axios from "axios";


const Register = () => {
    const navigate=useNavigate();
    //on submitting form this will be called
    const submitHandler=async (values)=>{
        try{
            await axios.post('/users/register', values);
            message.success("Registeration successful");
            navigate('/login');
        }catch(error){
            message.error("Registeration failed, invalid username or password")
        }
}
//prevent registration for already logged in user
useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate("/")
    }
},[navigate]);
  return (
    <>
    <div className=' register-page d-flex align-items-center justify-content-center'>
        <Form layout='vertical' onFinish={submitHandler} >
            <h1>Registeration form</h1>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-center'>
                 <Link to="/login">already registered click here to login</Link>
                 <button className='btn btn-primary'>signup</button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Register