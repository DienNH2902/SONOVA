"use client"

import { Typography, Table, Checkbox, Input, Select, Button, Tag, Space, Pagination } from "antd"
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useMemo } from "react"
import "./StudentInfo.css"

const { Title } = Typography
const { Option } = Select

const StudentInfo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([1, 2])
  const [searchText, setSearchText] = useState("")
  const [classFilter, setClassFilter] = useState("Tất cả")
  const [statusFilter, setStatusFilter] = useState("Tất cả")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Sample student data with generated student codes
  const studentData = useMemo(
    () => [
      {
        key: 1,
        stt: 1,
        name: "David",
        username: "david123",
        phone: "0799294324",
        class: "K01-PI-CB-01",
        status: "completed",
        studentCode: "K01-0001",
      },
      {
        key: 2,
        stt: 2,
        name: "Scott",
        username: "scott123",
        phone: "0900676932",
        class: "K01-PI-CB-01",
        status: "completed",
        studentCode: "K01-0002",
      },
      {
        key: 3,
        stt: 3,
        name: "Xelina",
        username: "xelina123",
        phone: "0203066567",
        class: "K01-PI-CB-01",
        status: "studying",
        studentCode: "K01-0003",
      },
      {
        key: 4,
        stt: 4,
        name: "Chuatin",
        username: "chuatin123",
        phone: "0945732127",
        class: "K01-GU-CB-02",
        status: "studying",
        studentCode: "K01-0004",
      },
      {
        key: 5,
        stt: 5,
        name: "Noobita",
        username: "noobi123",
        phone: "0703938271",
        class: "K01-GU-CB-02",
        status: "studying",
        studentCode: "K01-0005",
      },
      {
        key: 6,
        stt: 6,
        name: "Leona",
        username: "leona123",
        phone: "0704656232",
        class: "K01-GU-CB-02",
        status: "studying",
        studentCode: "K01-0006",
      },
      {
        key: 7,
        stt: 7,
        name: "Emma",
        username: "emma123",
        phone: "0704656233",
        class: "K01-PI-NC-01",
        status: "studying",
        studentCode: "K01-0007",
      },
      {
        key: 8,
        stt: 8,
        name: "Ladmira",
        username: "ladmira123",
        phone: "0704656234",
        class: "K01-PI-NC-01",
        status: "studying",
        studentCode: "K01-0008",
      },
      {
        key: 9,
        stt: 9,
        name: "Puma",
        username: "puma123",
        phone: "0704656235",
        class: "K01-PI-NC-01",
        status: "studying",
        studentCode: "K01-0009",
      },
      {
        key: 10,
        stt: 10,
        name: "Havana",
        username: "havana123",
        phone: "0704656236",
        class: "K01-GU-NC-02",
        status: "studying",
        studentCode: "K01-0010",
      },
      {
        key: 11,
        stt: 11,
        name: "Heri",
        username: "heri123",
        phone: "0704656237",
        class: "K01-GU-NC-02",
        status: "studying",
        studentCode: "K01-0011",
      },
      {
        key: 12,
        stt: 12,
        name: "Donan",
        username: "donan123",
        phone: "0704656238",
        class: "K01-GU-NC-02",
        status: "studying",
        studentCode: "K01-0012",
      },
      {
        key: 13,
        stt: 13,
        name: "Choe",
        username: "choe123",
        phone: "0704656239",
        class: "K01-PI-CB-01",
        status: "studying",
        studentCode: "K01-0013",
      },
      {
        key: 14,
        stt: 14,
        name: "Kristina",
        username: "kristina123",
        phone: "0704656240",
        class: "K01-PI-CB-01",
        status: "studying",
        studentCode: "K01-0014",
      },
      {
        key: 15,
        stt: 15,
        name: "Alex",
        username: "alex123",
        phone: "0704656241",
        class: "K01-PI-CB-01",
        status: "registered",
        studentCode: "K01-0015",
      },
      {
        key: 16,
        stt: 16,
        name: "Maria",
        username: "maria123",
        phone: "0704656242",
        class: "K01-GU-CB-02",
        status: "registered",
        studentCode: "K01-0016",
      },
      {
        key: 17,
        stt: 17,
        name: "John",
        username: "john123",
        phone: "0704656243",
        class: "K01-GU-CB-02",
        status: "registered",
        studentCode: "K01-0017",
      },
      {
        key: 18,
        stt: 18,
        name: "Sarah",
        username: "sarah123",
        phone: "0704656244",
        class: "K01-PI-NC-01",
        status: "registered",
        studentCode: "K01-0018",
      },
      {
        key: 19,
        stt: 19,
        name: "Mike",
        username: "mike123",
        phone: "0704656245",
        class: "K01-PI-NC-01",
        status: "registered",
        studentCode: "K01-0019",
      },
      {
        key: 20,
        stt: 20,
        name: "Lisa",
        username: "lisa123",
        phone: "0704656246",
        class: "K01-GU-NC-02",
        status: "registered",
        studentCode: "K01-0020",
      },
    ],
    [],
  )

  // Get unique classes for filter options
  const uniqueClasses = useMemo(() => {
    return [...new Set(studentData.map((student) => student.class))]
  }, [studentData])

  // Generate unique student codes
  const generateStudentCode = (classCode, index) => {
    const coursePrefix = classCode.split("-")[0] // Extract K01 from K01-PI-CB-01
    const studentNumber = String(index).padStart(4, "0")
    return `${coursePrefix}-${studentNumber}`
  }

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = studentData

    // Apply class filter
    if (classFilter !== "Tất cả") {
      filtered = filtered.filter((student) => student.class === classFilter)
    }

    // Apply status filter
    if (statusFilter !== "Tất cả") {
      filtered = filtered.filter((student) => student.status === statusFilter)
    }

    // Apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim()
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchLower) ||
          student.username.toLowerCase().includes(searchLower) ||
          student.phone.includes(searchText.trim()) ||
          student.studentCode.toLowerCase().includes(searchLower) ||
          student.class.toLowerCase().includes(searchLower),
      )
    }

    return filtered
  }, [studentData, classFilter, statusFilter, searchText])

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, pageSize])

  // Reset to first page when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1)
    if (filterType === "class") {
      setClassFilter(value)
    } else if (filterType === "status") {
      setStatusFilter(value)
    }
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

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
      title: "Mã học viên",
      dataIndex: "studentCode",
      key: "studentCode",
      width: 120,
      align: "center",
      render: (code) => <span className="student-code">{code}</span>,
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
        setSelectedRowKeys(paginatedData.map((item) => item.key))
      } else {
        setSelectedRowKeys([])
      }
    },
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(paginatedData.map((item) => item.key))
    } else {
      setSelectedRowKeys([])
    }
  }

  const clearFilters = () => {
    setSearchText("")
    setClassFilter("Tất cả")
    setStatusFilter("Tất cả")
    setCurrentPage(1)
  }

  return (
    <div className="student-info-page">
      <div className="student-info-container">
        <Title level={1} className="page-title">
          THÔNG TIN HỌC VIÊN
        </Title>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-left">
            <Checkbox
              checked={selectedRowKeys.length === paginatedData.length && paginatedData.length > 0}
              indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < paginatedData.length}
              onChange={handleSelectAll}
              className="select-all-checkbox"
            >
              Đã chọn {selectedRowKeys.length}
            </Checkbox>
            <Button type="link" onClick={clearFilters} className="clear-filters-btn">
              Xóa bộ lọc
            </Button>
            <Input
              placeholder="Tìm kiếm theo tên, username, SĐT, mã học viên..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters-right">
            <div className="filter-group">
              <span className="filter-label">Lớp học:</span>
              <Select
                value={classFilter}
                onChange={(value) => handleFilterChange("class", value)}
                className="filter-select"
              >
                <Option value="Tất cả">Tất cả</Option>
                {uniqueClasses.map((className) => (
                  <Option key={className} value={className}>
                    {className}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Trạng thái:</span>
              <Select
                value={statusFilter}
                onChange={(value) => handleFilterChange("status", value)}
                className="filter-select"
              >
                <Option value="Tất cả">Tất cả</Option>
                <Option value="completed">Đã xong</Option>
                <Option value="studying">Đang học</Option>
                <Option value="registered">Đã đăng ký</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span>
            Hiển thị {paginatedData.length} / {filteredData.length} học viên
            {filteredData.length !== studentData.length && ` (lọc từ ${studentData.length} tổng cộng)`}
          </span>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={paginatedData}
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
            total={filteredData.length}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={setCurrentPage}
            className="custom-pagination"
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} học viên`}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentInfo
