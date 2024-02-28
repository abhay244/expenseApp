import React,{useState,useEffect} from 'react'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import Layout from '../components/Layout/Layout'
import moment from 'moment';
import axios from 'axios';

const {RangePicker} =DatePicker;

const HomePage = () => {
  const [showModal, setShowModal]=useState(false);
  const [allTransactions,setAllTransactons]=useState([]);
  const [frequency, setFrequency]=useState("7");
  const [selectedDateRange,setSelectedDateRange]=useState([]);
  const getAllTransactions=async()=>{
    try {
      const user=JSON.parse(localStorage.getItem('user'));
      const res=await axios.post('/transactions/getAllTransactions',{userId:user._id,frequency,selectedDateRange});
      setAllTransactons(res.data.transactions);
      console.log(res.data.transactions);
    } catch (error) {
      console.log(error);
      message.error("error in fetching transactions");
    }
  }
  useEffect(()=>{
    getAllTransactions();
  },[frequency,selectedDateRange])
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
      dataIndex:'date',
      render:(text)=><span>{moment(text).format('YYYY-MM-DD')}</span>,
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
            <div>
              <h6>Select frequency</h6>
              <Select value={frequency} onChange={(values)=>setFrequency(values)} >
                <Select.Option value ="7">1 Week</Select.Option>
                <Select.Option value ="30">1 Month</Select.Option>
                <Select.Option value ="365">1 Year</Select.Option>
                <Select.Option value ="custom">Custom</Select.Option>
              </Select>
              {frequency==='custom' && <RangePicker value={selectedDateRange} onChange={(values)=>setSelectedDateRange(values)} />}
            </div>
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
                <Select>
                  <Select.Option value="mobile">Mobile</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="technology">Technology</Select.Option>
                  <Select.Option value="recharge">Recharge</Select.Option>
                  <Select.Option value="games">Games</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="referance" name="referance">
                <Input  type="string"/>
              </Form.Item>
              <Form.Item label="date" name="date">
                <Input  type="Date"/>
              </Form.Item>
              <button className='btn btn-primary'>Add</button>
           </Form>

        </Modal>
    </Layout>
  )
}

export default HomePage