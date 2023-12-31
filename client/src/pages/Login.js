import React, { useEffect } from 'react'
import {Form,Input,message} from "antd";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";

//this function will be called when foem is submitted

const Login = () => {
    const navigate=useNavigate();
    const submitHandler=async (values)=>{
        try{
            const {data}=await axios.post('/users/login',values);
            message.success("login successful");
            localStorage.setItem('user',JSON.stringify({...data.user,password:""}));
            navigate('/');
        }catch(error){
            message.error(`${error}`);
        }
    }
    //if user is already logged In go to homepage
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/")
        }
    },[navigate]);
  return (
    <>
        <div className=' login-page d-flex align-items-center justify-content-center '>
        <Form layout='vertical' onFinish={submitHandler} >
            <h1>Login form</h1>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-center'>
                 <Link to="/register">signup</Link>
                 <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
        </div>
    </>
  )
}

export default Login