import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input, DatePicker } from 'antd';
import Layout from '../components/Layout';
import axios from 'axios';
import '../leaveEmp.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Fixed casing for useSelector
import { showLoading, hideLoading } from '../redux/empalerts';
import toast from 'react-hot-toast';

function LeaveHrsupdisplay() { // Changed component name to start with uppercase letter
    const [leaveData, setLeaveData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/employee/getleave', {
                headers: {
                    Authorization: 'Bearer ' + token // Pass token as a parameter
                },
            });
            dispatch(hideLoading());
            setLeaveData(response.data.leave); // Assuming response.data.leave is an array of objects
        } catch (error) {
            console.error(error); // Log the error for debugging
            message.error('Failed to fetch leave data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const changestatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/employee/change_status', {
                leaveid: record._id,
                userid: record.userid,
                status: status
            }, {
                headers: {
                    Authorization: 'Bearer ' + token // Pass token as a parameter
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                fetchData(); // Assuming fetchData function fetches the updated leave data
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
            toast.error("Error changing status.");
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'RangePicker',
            dataIndex: 'RangePicker',
            key: 'RangePicker',
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'Description',
        },
    
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <>
            <div className = "d-flex">
                {record.status === "pending" && <Button type="primary" className="approve" onClick={() => changestatus(record,`approved`)}>Approve</Button>}
                {record.status === "approved" && <Button type="primary" className="reject" onClick={() => changestatus(record,`rejected`)}>Reject</Button>}
                </div>
                <Button type="primary" >Delete</Button>
            </>
        ),
    },
    // Define your table columns here
];

return (
    <Layout>
        
        <Table dataSource={leaveData} columns={columns} />
    </Layout>
);
}

export default LeaveHrsupdisplay;