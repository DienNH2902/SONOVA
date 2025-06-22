"use client"

import { Typography, Table, Checkbox, Input, Select, Button, Tag, Space, Pagination } from "antd"
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./StudentInfo.css"

const { Title } = Typography
const { Option } = Select

const StudentInfo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([1, 2])
  const [searchText, setSearchText] = useState("")
  const [classFilter, setClassFilter] = useState("Tất cả")
  const [statusFilter, setStatusFilter] = useState("Tất cả")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample student data
  const studentData = [
    {
      key: 1,
      stt: 1,
      name: "David",
      username: "david123",
      phone: "0799294324",
      class: "K01-PI-CB-01",
      status: "completed",
    },
    {
      key: 2,
      stt: 2,
      name: "Scott",
      username: "scott123",
      phone: "0900676932",
      class: "K01-PI-CB-01",
      status: "completed",
    },
    {
      key: 3,
      stt: 3,
      name: "Xelina",
      username: "xelina123",
      phone: "0203066567",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 4,
      stt: 4,
      name: "Chuatin",
      username: "chuatin123",
      phone: "0945732127",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 5,
      stt: 5,
      name: "Noobita",
      username: "noobi123",
      phone: "0703938271",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 6,
      stt: 6,
      name: "Leona",
      username: "leona123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 7,
      stt: 7,
      name: "Emma",
      username: "emma123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 8,
      stt: 8,
      name: "Ladmira",
      username: "ladmira123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 9,
      stt: 9,
      name: "Puma",
      username: "puma123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 10,
      stt: 10,
      name: "Havana",
      username: "havana123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 11,
      stt: 11,
      name: "Heri",
      username: "heri123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 12,
      stt: 12,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 13,
      stt: 13,
      name: "Choe",
      username: "choe123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 14,
      stt: 14,
      name: "Kristina",
      username: "kristina123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 15,
      stt: 15,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "studying",
    },
    {
      key: 16,
      stt: 16,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "registered",
    },
    {
      key: 17,
      stt: 17,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "registered",
    },
    {
      key: 18,
      stt: 18,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "registered",
    },
    {
      key: 19,
      stt: 19,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "registered",
    },
    {
      key: 20,
      stt: 20,
      name: "Donan",
      username: "donan123",
      phone: "0704656232",
      class: "K01-PI-CB-01",
      status: "registered",
    },
  ]

  const getStatusTag = (status) => {
    const statusConfig = {
      completed: { color: "default", text: "Đã xong" },
      studying: { color: "success", text: "Đang học" },
      registered: { color: "warning", text: "Đã đăng ký" },
    }

    const config = statusConfig[status] || { color: "default", text: "Unknown" }
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 120,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 120,
    },
    {
      title: "Lớp học",
      dataIndex: "class",
      key: "class",
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" className="action-btn view-btn" />
          <Button type="text" icon={<EditOutlined />} size="small" className="action-btn edit-btn" />
          <Button type="text" icon={<DeleteOutlined />} size="small" className="action-btn delete-btn" />
        </Space>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        setSelectedRowKeys(studentData.map((item) => item.key))
      } else {
        setSelectedRowKeys([])
      }
    },
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(studentData.map((item) => item.key))
    } else {
      setSelectedRowKeys([])
    }
  }

  return (
    <div className="student-info-page">
      <div className="student-info-container">
        <Title level={1} className="page-title">
          THÔNG TIN
        </Title>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-left">
            <Checkbox
              checked={selectedRowKeys.length === studentData.length}
              indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < studentData.length}
              onChange={handleSelectAll}
              className="select-all-checkbox"
            >
              Đã chọn {selectedRowKeys.length}
            </Checkbox>

            <Checkbox className="select-all-text">Chọn tất cả</Checkbox>

            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-right">
            <div className="filter-group">
              <span className="filter-label">Lớp học:</span>
              <Select value={classFilter} onChange={setClassFilter} className="filter-select">
                <Option value="Tất cả">Tất cả</Option>
                <Option value="K01-PI-CB-01">K01-PI-CB-01</Option>
                <Option value="K01-GU-CB-02">K01-GU-CB-02</Option>
              </Select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Trạng thái:</span>
              <Select value={statusFilter} onChange={setStatusFilter} className="filter-select">
                <Option value="Tất cả">Tất cả</Option>
                <Option value="completed">Đã xong</Option>
                <Option value="studying">Đang học</Option>
                <Option value="registered">Đã đăng ký</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={studentData}
            rowSelection={rowSelection}
            pagination={false}
            className="student-table"
            size="middle"
          />
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={200}
            pageSize={20}
            showSizeChanger={false}
            onChange={setCurrentPage}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  )
}

export default StudentInfo
