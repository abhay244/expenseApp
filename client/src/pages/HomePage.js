import React,{useState,useEffect} from 'react'
import { Form, Input, Modal, Table, message } from 'antd'
import Layout from '../components/Layout/Layout'

import axios from 'axios';

const HomePage = () => {
  const [showModal, setShowModal]=useState(false);
  const [allTransactions,setAllTransactons]=useState([]);
  const getAllTransactions=async()=>{
    try {
      const user=JSON.parse(localStorage.getItem('user'));
      const res=await axios.post('/transactions/getAllTransactions',{userId:user._id});
      setAllTransactons(res.data.transactions);
      console.log(res.data.transactions);
    } catch (error) {
      console.log(error);
      message.error("error in fetching transactions");
    }
  }
  useEffect(()=>{
    getAllTransactions();
  },[])
  const submitHandler=async (values)=>{
    try {
      const user=JSON.parse(localStorage.getItem('user'));
      const {data}=await axios.post('/transactions/addTransaction',{userId:user._id,...values});
      setShowModal(false);
      message.success("Transaction added successfilly");
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  // table columns
  const columns=[
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Description',
      dataIndex:'description'
    },
    {
      title:'Referance',
      dataIndex:'referance'
    },
    {
      title:'Actions',
    }
  ]
  return (
    <Layout>
        <div className='filters'>
            <div>range filters</div>
            <div>
              <button className="btn btn-primary" onClick={ ()=>setShowModal(true)}>AddNew</button>
            </div>
        </div>
        <div className='content'>
          <Table columns={columns} dataSource={allTransactions}/>
        </div>
        <Modal title="Add Transaction" open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
           <Form layout='vertical' onFinish={submitHandler}>
              <Form.Item label="Amount" name="amount">
                <Input type="Number" />
              </Form.Item>
              <Form.Item label="description" name="description">
                <Input  type="string"/>
              </Form.Item>
              <Form.Item label="category" name="category">
                <Input  type="string"/>
              </Form.Item>
              <Form.Item label="referance" name="referance">
                <Input  type="string"/>
              </Form.Item>
              <Form.Item label="date" name="date">
                <Input  type="string"/>
              </Form.Item>
              <button className='btn btn-primary'>Add</button>
           </Form>

        </Modal>
    </Layout>
  )
}

export default HomePage