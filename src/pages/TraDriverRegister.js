
import React from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function TraDriverRegister() {
  const navigate = useNavigate();
  const { Option } = Select;

  const onFinish = async (values) => {
    console.log('Received values of form', values);


    try {
      const response = await axios.post('/api/employee/Driveregister', values);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/TraDriverDetailsDisplay');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");

    }
  };

  return (
    <Layout>
      <div className="annform">
        <div className="AnnHRSup_form box p-3">
          <h3 className='title'>CREATE DRIVER ACCOUNT</h3>
          <Form layout='vertical' onFinish={onFinish}>
            <div className="form-row">
              <div className="item">
                <Form.Item
                  label='Driver Name'
                  name='driName'
                  rules={[
                    { required: true, message: 'Please enter Driver Name' }
                  ]}
                >
                  <Input placeholder='Driver Name' />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <div className="item">
                <Form.Item
                  label='Driver Email'
                  name='driEmail'
                  rules={[
                    { type: 'email', message: 'Please enter a valid email' },
                    { required: true, message: 'Please enter Driver Email' }
                  ]}
                >
                  <Input placeholder='Driver Email' />
                </Form.Item>
              </div>
              <div className="item">
                <Form.Item
                  name="Type"
                  label="Work Experience"
                  rules={[{ required: true, message: 'Please select Work Experience' }]}
                >
                  <Select placeholder="Select Work Experience">
                    <Option value="year0-5">0-5 years</Option>
                    <Option value="year6-10">6-10 years</Option>
                    <Option value="year10above">above 10 years</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <div className="item">
                <Form.Item
                  label="Select Register Date"
                  name="regdate"
                  rules={[{ required: true, message: 'Please select Register Date' }]}
                >
                  <DatePicker className="date" />
                </Form.Item>
              </div>
            </div>
            <div className="item">
              <Form.Item
                label='Driver Phone Number'
                name='driPnum'
                rules={[
                  { required: true, message: 'Please enter Phone Number' },
                  { pattern: /^[0-9]+$/, message: 'Please enter a valid Phone Number' }
                ]}
              >
                <Input placeholder='Phone Number' />
              </Form.Item>
            </div>
            <div className="Button-cons">
              <Button className='primary-button my-2' htmlType='submit'>Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default TraDriverRegister;

