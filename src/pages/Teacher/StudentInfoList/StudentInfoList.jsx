"use client"

import { Typography, Table, Button } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./StudentInfoList.css"

const { Title } = Typography

const StudentInfoList = () => {
  const navigate = useNavigate()

  const studentData = [
    {
      key: 1,
      stt: 1,
      name: "Nguyễn Văn An",
      birthDate: "01/01/2020",
      phone: "0912345678",
      email: "nguyenvanvan@gmail.com",
    },
    {
      key: 2,
      stt: 2,
      name: "Trần Thị Bích Ngọc",
      birthDate: "05/07/2015",
      phone: "0934567890",
      email: "tranthichngoc@gmail.com",
    },
    {
      key: 3,
      stt: 3,
      name: "Lê Hoàng Phương",
      birthDate: "22/06/2018",
      phone: "0909123456",
      email: "lehoangphuong@gmail.com",
    },
    {
      key: 4,
      stt: 4,
      name: "Đỗ Hồng Ánh",
      birthDate: "19/09/2013",
      phone: "0935678901",
      email: "dohonganh@gmail.com",
    },
    {
      key: 5,
      stt: 5,
      name: "Phạm Minh Tuấn",
      birthDate: "03/02/2012",
      phone: "0967890123",
      email: "phamminhtuan@gmail.com",
    },
    {
      key: 6,
      stt: 6,
      name: "Vũ Hải Đăng",
      birthDate: "07/08/2011",
      phone: "0978901234",
      email: "vuhaidang@gmail.com",
    },
    {
      key: 7,
      stt: 7,
      name: "Hoàng Phúc Khang",
      birthDate: "table body",
      phone: "0935678901",
      email: "hoangphuckhang@gmail.com",
    },
    {
      key: 8,
      stt: 8,
      name: "Bùi Thu Hà",
      birthDate: "16/06/2008",
      phone: "0978901234",
      email: "buituha@gmail.com",
    },
    {
      key: 9,
      stt: 9,
      name: "Nguyễn Thanh Hương",
      birthDate: "12/11/2010",
      phone: "0967890123",
      email: "nguyenthanhhuong@gmail.com",
    },
    {
      key: 10,
      stt: 10,
      name: "Lý Mai Thảo",
      birthDate: "table body",
      phone: "0935678901",
      email: "lymaithao@gmail.com",
    },
    {
      key: 11,
      stt: 11,
      name: "Phạm Văn Anh",
      birthDate: "29/10/2007",
      phone: "0967890123",
      email: "phamvananh@gmail.com",
    },
    {
      key: 12,
      stt: 12,
      name: "Trịnh Minh Nhật",
      birthDate: "19/09/2013",
      phone: "0978901234",
      email: "trinhminhhat@gmail.com",
    },
    {
      key: 13,
      stt: 13,
      name: "Nguyễn Đức Huy",
      birthDate: "25/12/2016",
      phone: "0967890123",
      email: "phamvananh@gmail.com",
    },
    {
      key: 14,
      stt: 14,
      name: "Hoàng Gia Bảo",
      birthDate: "22/06/2018",
      phone: "0978901234",
      email: "3nguyenduchuy@gmail.com",
    },
  ]

  const handleBack = () => {
    navigate("/teacher/class-detail-student-info")
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      className: "student-info-stt-column",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      className: "student-info-name-column",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
      align: "center",
      className: "student-info-birth-column",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      align: "center",
      className: "student-info-phone-column",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "student-info-email-column",
    },
  ]

  return (
    <div className="student-info-list-page">
      <div className="student-info-list-container">
        {/* Header */}
        <div className="student-info-page-header">
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="student-info-back-button">
            Trở về
          </Button>
          <Title level={1} className="student-info-page-title">
            Lớp K01 - PI - CB - 01
          </Title>
        </div>

        {/* Student Information Table */}
        <div className="student-info-table-section">
          <Table
            columns={columns}
            dataSource={studentData}
            pagination={false}
            className="student-info-table"
            size="middle"
          />
        </div>
      </div>
    </div>
  )
}

export default StudentInfoList
