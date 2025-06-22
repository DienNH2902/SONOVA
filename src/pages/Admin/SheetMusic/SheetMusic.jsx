"use client"

import { Typography, Table, Checkbox, Input, Button, Space, Pagination } from "antd"
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./SheetMusic.css"

const { Title } = Typography

const SheetMusic = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([1, 2])
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample sheet music data
  const sheetMusicData = [
    {
      key: 1,
      stt: 1,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 2,
      stt: 2,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 3,
      stt: 3,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 4,
      stt: 4,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 5,
      stt: 5,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 6,
      stt: 6,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 7,
      stt: 7,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
    {
      key: 8,
      stt: 8,
      songName: "Moonlight Sonata",
      composer: "Ludwig van Beethoven",
      genre: "Nhạc cổ điển",
      image: "/api/placeholder/80/80",
      quantity: 4,
    },
  ]

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
    },
    {
      title: "Tên bài hát",
      dataIndex: "songName",
      key: "songName",
      width: 180,
    },
    {
      title: "Tác giả",
      dataIndex: "composer",
      key: "composer",
      width: 180,
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
      width: 140,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      align: "center",
      render: (image) => (
        <div className="image-container">
          <img src={image || "/placeholder.svg"} alt="Sheet music cover" className="sheet-image" />
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center",
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
        setSelectedRowKeys(sheetMusicData.map((item) => item.key))
      } else {
        setSelectedRowKeys([])
      }
    },
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(sheetMusicData.map((item) => item.key))
    } else {
      setSelectedRowKeys([])
    }
  }

  const handleAddSheet = () => {
    console.log("Add new sheet music")
    // Handle adding new sheet music logic here
  }

  return (
    <div className="sheet-music-page">
      <div className="sheet-music-container">
        <Title level={1} className="page-title">
          Sheet nhạc
        </Title>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-left">
            <Checkbox
              checked={selectedRowKeys.length === sheetMusicData.length}
              indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < sheetMusicData.length}
              onChange={handleSelectAll}
              className="select-checkbox"
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
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSheet} className="add-button">
              Thêm
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={sheetMusicData}
            rowSelection={rowSelection}
            pagination={false}
            className="sheet-music-table"
            size="middle"
          />
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={100}
            pageSize={10}
            showSizeChanger={false}
            onChange={setCurrentPage}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  )
}

export default SheetMusic
