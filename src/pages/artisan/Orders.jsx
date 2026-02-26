import React, { useState } from 'react';
import { Badge, Table, Button, Modal, Empty } from 'antd';
import { EyeOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const Orders = () => {
    const [orders, setOrders] = useState([
        {
            id: 'ORD001',
            customer: 'John Doe',
            product: 'Handmade Wooden Chair',
            amount: 15000,
            status: 'completed',
            date: '2024-01-15',
        },
        {
            id: 'ORD002',
            customer: 'Jane Smith',
            product: 'Ceramic Vase Set',
            amount: 8500,
            status: 'pending',
            date: '2024-01-18',
        },
        {
            id: 'ORD003',
            customer: 'Mike Johnson',
            product: 'Leather Handbag',
            amount: 12000,
            status: 'processing',
            date: '2024-01-19',
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const showDetails = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            completed: { color: 'green', icon: <CheckCircleOutlined /> },
            pending: { color: 'orange', icon: <ClockCircleOutlined /> },
            processing: { color: 'blue', icon: <ClockCircleOutlined /> },
        };
        return <Badge status={statusConfig[status].color} text={status.toUpperCase()} />;
    };

    const columns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id' },
        { title: 'Customer', dataIndex: 'customer', key: 'customer' },
        { title: 'Product', dataIndex: 'product', key: 'product' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => `₹${val}` },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => getStatusBadge(status) },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" icon={<EyeOutlined />} onClick={() => showDetails(record)}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1>My Orders</h1>
            {orders.length > 0 ? (
                <Table columns={columns} dataSource={orders} rowKey="id" pagination={{ pageSize: 10 }} />
            ) : (
                <Empty description="No orders found" />
            )}

            <Modal
                title="Order Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedOrder && (
                    <div>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                        <p><strong>Product:</strong> {selectedOrder.product}</p>
                        <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                        <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Orders;