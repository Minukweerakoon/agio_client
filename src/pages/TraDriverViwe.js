import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, Button, message} from 'antd';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';


function TraDriverViwe() {
    const navigate = useNavigate();

    const [Dregister, setDregister] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDregister, setCurrentDregister] = useState(null);
    const [filteredDregister, setFilteredDregister] = useState([]);
    const componentPDF = useRef();

    const fetchDregister = async () => {
        try {
            const response = await axios.get('/api/employee/getdrivers');
            const dataWithKey = response.data.drivers.map(item => ({ ...item, key: item._id }));
            setDregister(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error('Failed to fetch drivers');
        }
    };

    useEffect(() => {
        fetchDregister();
    }, []);


    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "VEHICLE DETAILS",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

  

    const columns = [
        {
            title: 'Driver Name',
            dataIndex: 'driName',
            key: 'driName',
        },
        {
            title: 'Driver Email',
            dataIndex: 'driEmail',
            key: 'driEmail',
        },

        {
            title: 'Work Expereance',
            dataIndex: 'Type',
            key: 'Type',
        },
        
        {
            title: 'select Register Date',
            dataIndex: 'regdate',
            key: 'regdate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        
        {
            title: 'Driver PhoneNumber',
            dataIndex: 'driPnum',
            key: 'driPnum',
        },
        
    ];

    return (
        <Layout>
           <div>
            <div ref={componentPDF} style={{ width: '100%' }}>
            <h3>ALL DRIVER DETAILS</h3>
                <Table dataSource={filteredDregister.length > 0 ? filteredDregister : Dregister} columns={columns} />
            </div>
            <Button className="bookdetails"
      
      onClick={generatePDF} // report genarate
    >
      Download Report
    </Button>
        </div>
            
        </Layout>
    );
}

export default TraDriverViwe;
