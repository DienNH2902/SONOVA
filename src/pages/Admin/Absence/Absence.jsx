"use client"

import { Typography, Table, Checkbox, Button } from "antd"
import { useState } from "react"
import "./Absence.css"

const { Title } = Typography

const Absence = () => {
  const [contactedStudents, setContactedStudents] = useState([])

  // Sample absent students data
  const absentStudentsData = [
    {
      key: 1,
      stt: 1,
      name: "David",
      phone: "0793826634",
      email: "david@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 2,
      stt: 2,
      name: "Scott",
      phone: "0793822354",
      email: "scott123@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 3,
      stt: 3,
      name: "Xelina",
      phone: "0793826634",
      email: "xelina@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 4,
      stt: 4,
      name: "Chuatin",
      phone: "0793822354",
      email: "scott123@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 5,
      stt: 5,
      name: "Noobita",
      phone: "0793822354",
      email: "xelina@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 6,
      stt: 6,
      name: "Leona",
      phone: "0793826634",
      email: "david@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 7,
      stt: 7,
      name: "Emma",
      phone: "0793826634",
      email: "david@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 8,
      stt: 8,
      name: "Ladmira",
      phone: "0793822354",
      email: "xelina@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 9,
      stt: 9,
      name: "Puma",
      phone: "0793826634",
      email: "scott123@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 10,
      stt: 10,
      name: "Havana",
      phone: "0793822354",
      email: "xelina@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 11,
      stt: 11,
      name: "Heri",
      phone: "0793822354",
      email: "scott123@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 12,
      stt: 12,
      name: "Donan",
      phone: "0793826634",
      email: "scott123@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 13,
      stt: 13,
      name: "Choe",
      phone: "0793822354",
      email: "david@gmail.com",
      class: "K01-PI-CB-01",
    },
    {
      key: 14,
      stt: 14,
      name: "Kristina",
      phone: "0793826634",
      email: "xelina@gmail.com",
      class: "K01-PI-CB-01",
    },
  ]

  const handleContactedChange = (studentKey, checked) => {
    if (checked) {
      setContactedStudents([...contactedStudents, studentKey])
    } else {
      setContactedStudents(contactedStudents.filter((key) => key !== studentKey))
    }
  }

  const handleConfirm = () => {
    console.log("Confirmed contacted students:", contactedStudents)
    // Handle confirmation logic here
    // You might want to send this data to your backend
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Lớp học",
      dataIndex: "class",
      key: "class",
      width: 150,
    },
    {
      title: "Xác nhận đã liên lạc",
      key: "contacted",
      width: 180,
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={contactedStudents.includes(record.key)}
          onChange={(e) => handleContactedChange(record.key, e.target.checked)}
          className="contact-checkbox"
        />
      ),
    },
  ]

  return (
    <div className="absence-page">
      <div className="absence-container">
        <Title level={1} className="page-title">
          VẮNG
        </Title>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={absentStudentsData}
            pagination={false}
            className="absence-table"
            size="middle"
          />
        </div>

        {/* Confirm Button */}
        <div className="confirm-container">
          <Button type="primary" onClick={handleConfirm} className="confirm-button" size="large">
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Absence
