import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import "../TraForm.css";

function TraBookingUpdate() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [vehicleType, setVehicleType] = useState(null);
  const [isTypeDisabled, setIsTypeDisabled] = useState(true);
  const [isLocationDisabled, setIsLocationDisabled] = useState(true);

  useEffect(() => {
    const fetchbooking = async () => {
      try {
        const response = await axios.get(`/api/employee/getTraBooking2/${id}`);
        if (response.data.success) {
          const data = response.data.Booking;
          form.setFieldsValue({
            EmpName: data.EmpName,
            EmpEmail: data.EmpEmail,
            Type: data.Type,
            location: data.location,
            bookingdate: moment(data.bookingdate),
            Details: data.Details,
          });
          setVehicleType(data.Type); // Set the initial vehicle type
        } else {
          toast.error('Booking not found!');
          navigate('/TraBookingDisplay');
        }
      } catch (error) {
        toast.error('Failed to fetch Booking data!');
      }
    };

    fetchbooking();
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const updatedValues = {
      ...values,
      // Convert bookingdate to the desired format if necessary
      bookingdate: values.bookingdate.format('YYYY-MM-DD'),
    };

    try {
      const response = await axios.put(`/api/employee/updateTraBooking/${id}`, updatedValues);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/TraBookingDisplay'); // Navigate to the desired page after successful update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Function to disable past dates
  const disabledDate = current => {
    // Can not select days before today
    return current && current < moment().startOf('day');
  };

  // Function to dynamically render location options based on selected vehicle type
  const renderLocationOptions = () => {
    if (vehicleType === 'Bus') {
      return (
        <>
          <Option value="BusLocation1">Kollupitiya</Option>
          <Option value="BusLocation2">Moratuwa</Option>
          <Option value="BusLocation3">Panadura</Option>
        </>
      );
    } else if (vehicleType === 'Van') {
      return (
        <>
          <Option value="VanLocation1">Ja-Ela</Option>
          <Option value="VanLocation2">Katunayake</Option>
          <Option value="VanLocation3">Negambo</Option>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <div className="bookform">
        <div className="book_form box p-3">
          <h3 className='booktitle'>Update Booking Details</h3>
          <Form layout='vertical' form={form} onFinish={onFinish}>
            <div className="bookform-row">
              <div className="bookitem">
                <Form.Item label='Employee Name' name='EmpName'>
                  <Input placeholder='Employee Name' />
                </Form.Item>
              </div>
            </div>

            <div className="bookform-row">
              <div className="bookitem">
                <Form.Item label='Employee Email' name='EmpEmail'>
                  <Input placeholder='Employee Email' />
                </Form.Item>
              </div>
              <div className="bookitem">
                <Form.Item name="Type" label="Type">
                  <Select className="Type" placeholder="Select Vehicle type" onChange={setVehicleType} disabled={isTypeDisabled}>
                    <Option value="Bus">Bus</Option>
                    <Option value="Van">Van</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="bookitem">
                <Form.Item name="location" label="Select Location">
                  <Select className="Type" placeholder="Select Location" disabled={isLocationDisabled}>
                    {renderLocationOptions()}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="bookform-row">
              <div className="bookitem">
                <Form.Item label="Booking Date" name="bookingdate">
                  <DatePicker className="date" disabledDate={disabledDate} />
                </Form.Item>
              </div>
            </div>

            <div className="bookitem">
              <Form.Item name="Details" label="Any Other Details">
                <Input.TextArea className='Description' />
              </Form.Item>
            </div>

            <div className="bookButton-cons">
              <Button className='bookprimary-button my-2' htmlType='submit'>Update</Button>
              <Button className='bookprimary-button my-2' onClick={() => navigate(`/TraBookingDisplay`)}>View Details</Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default TraBookingUpdate;

