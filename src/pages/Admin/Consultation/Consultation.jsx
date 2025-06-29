"use client"

import { Typography, Table, Checkbox } from "antd"
import { useState, useEffect } from "react"
import "./Consultation.css"

const { Title } = Typography

const Consultation = () => {
  const [contactedRequests, setContactedRequests] = useState({})
  const [currentAdmin, setCurrentAdmin] = useState("")

  // Get admin username from localStorage on component mount
  // useEffect(() => {
  //   const adminName = localStorage.getItem("username") || "Admin"
  //   setCurrentAdmin(adminName)
  // }, [])
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentAdmin(user.username)
    }
    setCurrentAdmin
  }, [])

  // Sample consultation requests data
  const consultationData = [
    {
      key: 1,
      stt: 1,
      name: "David",
      phone: "0793826634",
      email: "david@gmail.com",
      consultationNeed: "Guitar nâng cao",
      notes: "",
    },
    {
      key: 2,
      stt: 2,
      name: "Scott",
      phone: "0793822354",
      email: "scott123@gmail.com",
      consultationNeed: "Guitar cơ bản",
      notes: "",
    },
    {
      key: 3,
      stt: 3,
      name: "Xelina",
      phone: "0793826634",
      email: "xelina@gmail.com",
      consultationNeed: "Guitar cơ bản",
      notes: "",
    },
    {
      key: 4,
      stt: 4,
      name: "Chuatin",
      phone: "0793822354",
      email: "scott123@gmail.com",
      consultationNeed: "Guitar nâng cao",
      notes: "",
    },
    {
      key: 5,
      stt: 5,
      name: "Noobita",
      phone: "0793822354",
      email: "xelina@gmail.com",
      consultationNeed: "Piano cơ bản",
      notes: "",
    },
    {
      key: 6,
      stt: 6,
      name: "Leona",
      phone: "0793826634",
      email: "xelina@gmail.com",
      consultationNeed: "Guitar cơ bản",
      notes: "",
    },
    {
      key: 7,
      stt: 7,
      name: "Emma",
      phone: "0793822354",
      email: "scott123@gmail.com",
      consultationNeed: "Piano cơ bản",
      notes: "",
    },
    {
      key: 8,
      stt: 8,
      name: "Ladmira",
      phone: "0793822354",
      email: "xelina@gmail.com",
      consultationNeed: "Guitar nâng cao",
      notes: "",
    },
    {
      key: 9,
      stt: 9,
      name: "Puma",
      phone: "0793826634",
      email: "xelina@gmail.com",
      consultationNeed: "Piano cơ bản",
      notes: "",
    },
    {
      key: 10,
      stt: 10,
      name: "Heri",
      phone: "0793822354",
      email: "scott123@gmail.com",
      consultationNeed: "Piano nâng cao",
      notes: "",
    },
    {
      key: 11,
      stt: 11,
      name: "Donan",
      phone: "0793826634",
      email: "xelina@gmail.com",
      consultationNeed: "Piano nâng cao",
      notes: "",
    },
    {
      key: 12,
      stt: 12,
      name: "Kristina",
      phone: "0793822354",
      email: "scott123@gmail.com",
      consultationNeed: "Guitar cơ bản",
      notes: "",
    },
  ]

  const handleContactedChange = (requestKey, checked) => {
    if (checked) {
      // Store both the contacted status and the admin who confirmed
      setContactedRequests({
        ...contactedRequests,
        [requestKey]: {
          contacted: true,
          confirmedBy: currentAdmin,
          confirmedAt: new Date().toLocaleString("vi-VN"),
        },
      })
    } else {
      // Remove the request from contacted list
      const updatedRequests = { ...contactedRequests }
      delete updatedRequests[requestKey]
      setContactedRequests(updatedRequests)
    }
  }

  const getConsultationTag = (need) => {
    const needConfig = {
      "Guitar nâng cao": "guitar-advanced",
      "Guitar cơ bản": "guitar-basic",
      "Piano nâng cao": "piano-advanced",
      "Piano cơ bản": "piano-basic",
    }

    const className = needConfig[need] || "default"
    return <span className={`consultation-tag ${className}`}>{need}</span>
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
      title: "Nhu cầu tư vấn",
      dataIndex: "consultationNeed",
      key: "consultationNeed",
      width: 180,
      render: (need) => getConsultationTag(need),
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      width: 120,
      render: (notes) => notes || "-",
    },
    {
      title: "Xác nhận đã liên lạc",
      key: "contacted",
      width: 180,
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={contactedRequests[record.key]?.contacted || false}
          onChange={(e) => handleContactedChange(record.key, e.target.checked)}
          className="contact-checkbox"
        />
      ),
    },
    {
      title: "Người xác nhận",
      key: "confirmedBy",
      width: 160,
      align: "center",
      render: (_, record) => {
        const contactInfo = contactedRequests[record.key]
        if (contactInfo?.contacted) {
          return (
            <div className="confirmed-info">
              <div className="confirmed-by">{contactInfo.confirmedBy}</div>
              <div className="confirmed-time">{contactInfo.confirmedAt}</div>
            </div>
          )
        }
        return <span className="not-confirmed">-</span>
      },
    },
  ]

  return (
    <div className="consultation-page">
      <div className="consultation-container">
        <Title level={1} className="page-title">
          Liên hệ tư vấn
        </Title>

        {/* Current Admin Info */}
        <div className="admin-info">
          <span className="admin-label">Đang đăng nhập:</span>
          <span className="admin-name">{currentAdmin}</span>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={consultationData}
            pagination={false}
            className="consultation-table"
            size="middle"
          />
        </div>
      </div>
    </div>
  )
}

export default Consultation
