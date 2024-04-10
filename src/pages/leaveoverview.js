import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { Card } from 'antd';


function Leaveoverview() {
    const [totalMedicalLeaves, setTotalMedicalLeaves] = useState(0);
    const [totalGeneralLeaves, setTotalGeneralLeaves] = useState(0);
    const [totalAnnualLeaves, setTotalAnnualLeaves] = useState(0);
    const [showChart, setShowChart] = useState(false); // State to manage chart visibility

    useEffect(() => {
        // Fetch total medical leaves from backend
        axios.get('/api/employee/total-medical-leaves')
            .then(response => {
                setTotalMedicalLeaves(response.data.totalMedicalLeaves);
                // Show chart if total medical leaves are greater than 0
                setShowChart(response.data.totalMedicalLeaves > 0);
            })
            .catch(error => {
                console.error('Error fetching total medical leaves:', error);
            });

        // Fetch total general leaves from backend
        axios.get('/api/employee/total-general-leaves')
            .then(response => {
                setTotalGeneralLeaves(response.data.totalGeneralLeaves);
            })
            .catch(error => {
                console.error('Error fetching total general leaves:', error);
            });

        // Fetch total annual leaves from backend
        axios.get('/api/employee/total-annual-leaves')
            .then(response => {
                setTotalAnnualLeaves(response.data.totalAnnualLeaves);
            })
            .catch(error => {
                console.error('Error fetching total annual leaves:', error);
            });
    }, []);

    // Data for the bar chart
    const barChartData = [
        { name: 'Total Medical Leaves', value: totalMedicalLeaves },
        { name: 'Total General Leaves', value: totalGeneralLeaves },
        { name: 'Total Annual Leaves', value: totalAnnualLeaves },
        // Add more data as needed for other types of leaves
    ];

    // Data for the pie chart
    const pieChartData = [
        { name: 'Medical Leaves', value: totalMedicalLeaves },
        { name: 'General Leaves', value: totalGeneralLeaves },
        { name: 'Annual Leaves', value: totalAnnualLeaves },
    ];

    const leaveTypes = [
        { title: 'General Leave', description: `Total Leaves: ${totalGeneralLeaves}` },
        { title: 'Annual Leave', description: `Total Leaves: ${totalAnnualLeaves}` },
        { title: 'Medical Leave', description: `Total Leaves: ${totalMedicalLeaves}` },
    ];

    return (
        <Layout>
            <div className="leave-types" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {leaveTypes.map((type, index) => (
                    <Card key={index} className="leave-type-card" title={type.title} bordered={false}>
                        <p>{type.description}</p>
                    </Card>
                ))}
            </div>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h4>Leave Overview</h4>
                {showChart && (
                    <div>
                        <BarChart width={600} height={400} data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </div>
                )}
                <div>
                    <h4>Pie Chart</h4>
                    <PieChart width={400} height={400}>
                        <Pie dataKey="value" isAnimationActive={false} data={pieChartData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </Layout>
    );
}

export default Leaveoverview;
