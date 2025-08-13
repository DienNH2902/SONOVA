"use client"
import {
  Typography,
  Table,
  Input,
  Button,
  Space,
  Pagination,
  Modal,
  Form,
  Select,
  Upload,
  Image,
  Card,
  Row,
  Col,
  App,
} from "antd"
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import { useState, useEffect } from "react"
import "./SheetMusic.css"

const { Title } = Typography
const { Option } = Select
const { Dragger } = Upload

const SheetMusic = () => {
  const { message, modal } = App.useApp()
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sheetMusicData, setSheetMusicData] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [selectedSheetMusic, setSelectedSheetMusic] = useState(null)
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [editSheetForm] = Form.useForm()
  const [isEditSheetModalVisible, setIsEditSheetModalVisible] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(null)
  const [isAddSheetModalVisible, setIsAddSheetModalVisible] = useState(false)
  const [addSheetForm] = Form.useForm()

  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false)
  const [isAddGenreModalVisible, setIsAddGenreModalVisible] = useState(false)
  const [addGenreForm] = Form.useForm()
  const [isEditGenreModalVisible, setIsEditGenreModalVisible] = useState(false)
  const [editGenreForm] = Form.useForm()
  const [selectedGenre, setSelectedGenre] = useState(null)

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  // Refactored fetch function to return data, making it easier to use in other functions
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic")
      const data = await response.json()
      const formattedData = data.map((item, index) => ({
        key: item.sheetMusicId,
        stt: index + 1,
        sheetMusicId: item.sheetMusicId,
        songName: item.musicName,
        composer: item.composer,
        genre: item.genres?.map((g) => g.genreName).join(", ") || "Chưa phân loại",
        image: item.coverUrl,
        quantity: item.sheetQuantity,
        favoriteCount: item.favoriteCount,
        sheets: item.sheets,
        genres: item.genres,
      }))
      setSheetMusicData(formattedData)
      return formattedData
    } catch (error) {
      message.error("Không thể tải dữ liệu sheet nhạc")
      console.error("Error fetching sheet music:", error)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Helper function to re-fetch and update the detail modal
  const refetchAndUpdateDetail = async () => {
    const updatedData = await fetchData()
    if (selectedSheetMusic) {
      const newSelected = updatedData.find((item) => item.sheetMusicId === selectedSheetMusic.sheetMusicId)
      setSelectedSheetMusic(newSelected)
    }
  }

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre")
      const data = await response.json()
      setGenres(data)
    } catch (error) {
      message.error("Không thể tải danh sách thể loại")
      console.error("Error fetching genres:", error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchGenres()
  }, [])

  // Create new sheet music
  const handleAddSheet = async (values) => {
    try {
      const formData = new FormData()
      formData.append("musicName", values.musicName)
      formData.append("composer", values.composer)
      formData.append("sheetQuantity", values.sheetQuantity)
      if (values.coverImageFile && values.coverImageFile.length > 0) {
        formData.append("coverImageFile", values.coverImageFile[0].originFileObj)
      }
      if (values.genreIds && values.genreIds.length > 0) {
        values.genreIds.forEach((id) => {
          formData.append("genreIds", id)
        })
      }

      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic",
        {
          method: "POST",
          body: formData,
        },
      )

      if (response.ok) {
        message.success("Thêm sheet nhạc thành công")
        setIsAddModalVisible(false)
        addForm.resetFields()
        await fetchData()
      } else {
        message.error("Không thể thêm sheet nhạc")
      }
    } catch (error) {
      message.error("Lỗi khi thêm sheet nhạc")
      console.error("Error adding sheet music:", error)
    }
  }

  // Update sheet music
  const handleUpdateSheet = async (values) => {
    try {
      const formData = new FormData()
      formData.append("sheetMusicId", selectedSheetMusic.sheetMusicId)
      formData.append("musicName", values.musicName)
      formData.append("composer", values.composer)
      formData.append("sheetQuantity", values.sheetQuantity)
      if (values.coverImageFile && values.coverImageFile.length > 0) {
        formData.append("coverImageFile", values.coverImageFile[0].originFileObj)
      }
      if (values.genreIds && values.genreIds.length > 0) {
        values.genreIds.forEach((id) => {
          formData.append("genreIds", id)
        })
      }

      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic/${selectedSheetMusic.sheetMusicId}`,
        {
          method: "PUT",
          body: formData,
        },
      )

      if (response.ok) {
        message.success("Cập nhật sheet nhạc thành công")
        setIsEditModalVisible(false)
        editForm.resetFields()
        await fetchData()
      } else {
        message.error("Không thể cập nhật sheet nhạc")
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật sheet nhạc")
      console.error("Error updating sheet music:", error)
    }
  }

  // Delete sheet music
  const handleDeleteSheet = async (sheetMusicId) => {
    modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bài nhạc này?",
      onOk: async () => {
        try {
          const response = await fetch(
            `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic/${sheetMusicId}`,
            {
              method: "DELETE",
            },
          )

          if (response.ok) {
            message.success("Xóa sheet nhạc thành công")
            await fetchData()
          } else {
            message.error("Không thể xóa sheet nhạc")
          }
        } catch (error) {
          message.error("Lỗi khi xóa sheet nhạc")
          console.error("Error deleting sheet music:", error)
        }
      },
    })
  }

  // Update individual sheet
  const handleUpdateIndividualSheet = async (values) => {
    try {
      const formData = new FormData()
      formData.append("sheetId", selectedSheet.sheetId)

      if (values.sheetFile && values.sheetFile.fileList && values.sheetFile.fileList.length > 0) {
        formData.append("sheetFile", values.sheetFile.fileList[0].originFileObj)
      } else if (values.sheetFile && values.sheetFile.length > 0) {
        formData.append("sheetFile", values.sheetFile[0].originFileObj)
      } else if (values.sheetFile && values.sheetFile.originFileObj) {
        formData.append("sheetFile", values.sheetFile.originFileObj)
      }

      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Sheet/${selectedSheet.sheetId}`,
        {
          method: "PUT",
          body: formData,
        },
      )

      if (response.ok) {
        message.success("Cập nhật sheet thành công")
        setIsEditSheetModalVisible(false)
        editSheetForm.resetFields()
        // Use the new helper function to refetch and update the detail modal
        await refetchAndUpdateDetail()
      } else {
        message.error("Không thể cập nhật sheet")
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật sheet")
      console.error("Error updating sheet:", error)
    }
  }

  // Add new sheet to existing sheet music
  const handleAddNewSheet = async (values) => {
    try {
      const formData = new FormData()
      formData.append("sheetMusicId", selectedSheetMusic.sheetMusicId)

      if (values.sheetFile && values.sheetFile.fileList && values.sheetFile.fileList.length > 0) {
        formData.append("sheetFile", values.sheetFile.fileList[0].originFileObj)
      } else if (values.sheetFile && values.sheetFile.length > 0) {
        formData.append("sheetFile", values.sheetFile[0].originFileObj)
      } else if (values.sheetFile && values.sheetFile.originFileObj) {
        formData.append("sheetFile", values.sheetFile.originFileObj)
      }

      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Sheet", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        message.success("Thêm sheet mới thành công")
        setIsAddSheetModalVisible(false)
        addSheetForm.resetFields()
        // Use the new helper function to refetch and update the detail modal
        await refetchAndUpdateDetail()
      } else {
        message.error("Không thể thêm sheet mới")
      }
    } catch (error) {
      message.error("Lỗi khi thêm sheet mới")
      console.error("Error adding new sheet:", error)
    }
  }

  // Delete individual sheet
  const handleDeleteIndividualSheet = async (sheetId) => {
    modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sheet này?",
      onOk: async () => {
        try {
          const response = await fetch(
            `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Sheet/${sheetId}`,
            {
              method: "DELETE",
            },
          )

          if (response.ok) {
            message.success("Xóa sheet thành công")
            // Use the new helper function to refetch and update the detail modal
            await refetchAndUpdateDetail()
          } else {
            message.error("Không thể xóa sheet")
          }
        } catch (error) {
          message.error("Lỗi khi xóa sheet")
          console.error("Error deleting sheet:", error)
        }
      },
    })
  }

  // Add new genre
  const handleAddGenre = async (values) => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        message.success("Thêm thể loại thành công")
        setIsAddGenreModalVisible(false)
        addGenreForm.resetFields()
        await fetchGenres()
      } else {
        message.error("Không thể thêm thể loại")
      }
    } catch (error) {
      message.error("Lỗi khi thêm thể loại")
      console.error("Error adding genre:", error)
    }
  }

  // Update genre
  const handleUpdateGenre = async (values) => {
    try {
      const updatedValues = { ...values, genreId: selectedGenre.genreId }
      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre/${selectedGenre.genreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        },
      )
      if (response.ok) {
        message.success("Cập nhật thể loại thành công")
        setIsEditGenreModalVisible(false)
        editGenreForm.resetFields()
        await fetchGenres()
        await fetchData()
      } else {
        message.error("Không thể cập nhật thể loại")
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật thể loại")
      console.error("Error updating genre:", error)
    }
  }

  // Delete genre
  const handleDeleteGenre = async (genreId) => {
    modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa thể loại này?",
      onOk: async () => {
        try {
          const response = await fetch(
            `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre/${genreId}`,
            {
              method: "DELETE",
            },
          )
          if (response.ok) {
            message.success("Xóa thể loại thành công")
            await fetchGenres()
            await fetchData()
          } else {
            message.error("Không thể xóa thể loại")
          }
        } catch (error) {
          message.error("Lỗi khi xóa thể loại")
          console.error("Error deleting genre:", error)
        }
      },
    })
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
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            className="action-btn view-btn"
            onClick={() => {
              setSelectedSheetMusic(record)
              setIsDetailModalVisible(true)
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            className="action-btn edit-btn"
            onClick={() => {
              setSelectedSheetMusic(record)
              editForm.setFieldsValue({
                musicName: record.songName,
                composer: record.composer,
                sheetQuantity: record.quantity,
                genreIds: record.genres?.map((g) => g.genreId) || [],
              })
              setIsEditModalVisible(true)
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            className="action-btn delete-btn"
            onClick={() => handleDeleteSheet(record.sheetMusicId)}
          />
        </Space>
      ),
    },
  ]

  const filteredData = sheetMusicData.filter(
    (item) =>
      item.songName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.composer.toLowerCase().includes(searchText.toLowerCase()),
  )

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    onChange: (info) => {
      console.log("File info:", info)
    },
  }

  return (
    <div className="sheet-music-page">
      <div className="sheet-music-container">
        <Title level={1} className="page-title">
          Sheet nhạc
        </Title>

        {/* Filters Section */}
        <div className="filters-section-sheet">
          <div className="filters-left">
            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input-sheet"
            />
            <Button className="genre-button-sheet" type="primary" onClick={() => setIsGenreModalVisible(true)}>Thể loại nhạc</Button>
          </div>
          <div className="filters-right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalVisible(true)}
              className="add-button-sheet"
            >
              Thêm
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            className="sheet-music-table"
            size="middle"
            loading={loading}
          />
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={10}
            showSizeChanger={false}
            onChange={setCurrentPage}
            className="custom-pagination"
          />
        </div>

        {/* Add Modal */}
        <Modal
          title="Thêm Sheet Nhạc Mới"
          open={isAddModalVisible}
          onCancel={() => {
            setIsAddModalVisible(false)
            addForm.resetFields()
          }}
          footer={null}
          width={600}
        >
          <Form form={addForm} layout="vertical" onFinish={handleAddSheet}>
            <Form.Item
              name="musicName"
              label="Tên bài hát"
              rules={[{ required: true, message: "Vui lòng nhập tên bài hát" }]}
            >
              <Input placeholder="Nhập tên bài hát" />
            </Form.Item>

            <Form.Item
              name="composer"
              label="Tác giả"
              rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
            >
              <Input placeholder="Nhập tên tác giả" />
            </Form.Item>

            <Form.Item
              name="sheetQuantity"
              label="Số lượng sheet"
              rules={[{ required: true, message: "Vui lòng nhập số lượng sheet" }]}
            >
              <Input type="number" placeholder="Nhập số lượng sheet" />
            </Form.Item>

            <Form.Item name="genreIds" label="Thể loại">
              <Select mode="multiple" placeholder="Chọn thể loại" allowClear>
                {genres.map((genre) => (
                  <Option key={genre.genreId} value={genre.genreId}>
                    {genre.genreName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="coverImageFile"
              label="Ảnh bìa"
              rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Chọn ảnh bìa</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
                <Button
                  onClick={() => {
                    setIsAddModalVisible(false)
                    addForm.resetFields()
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Cập Nhật Sheet Nhạc"
          open={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false)
            editForm.resetFields()
          }}
          footer={null}
          width={600}
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdateSheet}>
            <Form.Item
              name="musicName"
              label="Tên bài hát"
              rules={[{ required: true, message: "Vui lòng nhập tên bài hát" }]}
            >
              <Input placeholder="Nhập tên bài hát" />
            </Form.Item>

            <Form.Item
              name="composer"
              label="Tác giả"
              rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
            >
              <Input placeholder="Nhập tên tác giả" />
            </Form.Item>

            <Form.Item
              name="sheetQuantity"
              label="Số lượng sheet"
              rules={[{ required: true, message: "Vui lòng nhập số lượng sheet" }]}
            >
              <Input type="number" placeholder="Nhập số lượng sheet" />
            </Form.Item>

            <Form.Item name="genreIds" label="Thể loại">
              <Select mode="multiple" placeholder="Chọn thể loại" allowClear>
                {genres.map((genre) => (
                  <Option key={genre.genreId} value={genre.genreId}>
                    {genre.genreName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="coverImageFile"
              label="Ảnh bìa mới (tùy chọn)"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Chọn ảnh bìa mới</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
                <Button
                  onClick={() => {
                    setIsEditModalVisible(false)
                    editForm.resetFields()
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Detail Modal */}
        <Modal
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={null}
          width={1200}
          className="detail-modals-sheet"
        >
          {selectedSheetMusic && (
            <div>
              <Title className="detail-modals-sheet" level={2}>{selectedSheetMusic.songName}</Title>
              <div style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Image
                      src={selectedSheetMusic.image || "/placeholder.svg"}
                      alt="Cover"
                      style={{ width: "100%", maxWidth: 200 }}
                    />
                  </Col>
                  <Col span={16} style={{ paddingLeft: 300, textAlign: "left" }}>
                    {/* <Title className="detail-modal-sheet-title" level={3}>{selectedSheetMusic.songName}</Title> */}
                    <p>
                      <strong className="detail-modal-sheet-title">Tác giả:</strong> {selectedSheetMusic.composer}
                    </p>
                    <p>
                      <strong className="detail-modal-sheet-title">Thể loại:</strong> {selectedSheetMusic.genre}
                    </p>
                    <p>
                      <strong className="detail-modal-sheet-title">Số lượng sheet:</strong> {selectedSheetMusic.quantity}
                    </p>
                    <p>
                      <strong className="detail-modal-sheet-title">Lượt yêu thích:</strong> {selectedSheetMusic.favoriteCount}
                    </p>
                  </Col>
                </Row>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Title className="detail-modal-sheet-title" level={4}>Danh sách Sheet</Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddSheetModalVisible(true)}
                  className="add-sheet-btn"
                >
                  Thêm Sheet Mới
                </Button>
              </div>

              <div className="sheets-container">
                <Row gutter={[0, 24]}>
                  {selectedSheetMusic.sheets
                    ?.sort((a, b) => a.sheetId - b.sheetId)
                    ?.map((sheet, index) => (
                      <Col span={24} key={sheet.sheetId}>
                        <Card
                          className="sheet-detail-card"
                          cover={
                            <div className="sheet-detail-image-container">
                              <Image
                                src={sheet.sheetUrl || "/placeholder.svg"}
                                alt={`Sheet ${index + 1}`}
                                className="sheet-detail-image"
                              />
                            </div>
                          }
                          actions={[
                            <EditOutlined
                              key="edit"
                              onClick={() => {
                                setSelectedSheet(sheet)
                                setIsEditSheetModalVisible(true)
                              }}
                              className="sheet-action-icon"
                            />,
                            <DeleteOutlined
                              key="delete"
                              onClick={() => handleDeleteIndividualSheet(sheet.sheetId)}
                              className="sheet-action-icon delete-icon"
                            />,
                          ]}
                        >
                          <Card.Meta title={`Sheet ${index + 1} (ID: ${sheet.sheetId})`} className="sheet-meta" />
                        </Card>
                      </Col>
                    ))}
                </Row>
              </div>
            </div>
          )}
        </Modal>

        {/* Edit Sheet Modal */}
        <Modal
          title="Cập Nhật Sheet"
          open={isEditSheetModalVisible}
          onCancel={() => {
            setIsEditSheetModalVisible(false)
            editSheetForm.resetFields()
          }}
          footer={null}
          width={500}
        >
          <Form form={editSheetForm} layout="vertical" onFinish={handleUpdateIndividualSheet}>
            <Form.Item
              name="sheetFile"
              label="File sheet mới"
              rules={[{ required: true, message: "Vui lòng chọn file sheet mới" }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp hoặc kéo file vào khu vực này để tải lên</p>
                <p className="ant-upload-hint">Hỗ trợ tải lên file ảnh</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
                <Button
                  onClick={() => {
                    setIsEditSheetModalVisible(false)
                    editSheetForm.resetFields()
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Add Sheet Modal */}
        <Modal
          title="Thêm Sheet Mới"
          open={isAddSheetModalVisible}
          onCancel={() => {
            setIsAddSheetModalVisible(false)
            addSheetForm.resetFields()
          }}
          footer={null}
          width={500}
        >
          <Form form={addSheetForm} layout="vertical" onFinish={handleAddNewSheet}>
            <Form.Item
              name="sheetFile"
              label="File sheet mới"
              rules={[{ required: true, message: "Vui lòng chọn file sheet" }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp hoặc kéo file vào khu vực này để tải lên</p>
                <p className="ant-upload-hint">Hỗ trợ tải lên file ảnh</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
                <Button
                  onClick={() => {
                    setIsAddSheetModalVisible(false)
                    addSheetForm.resetFields()
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Genre Modal */}
        <Modal
          title="Quản lý Thể loại nhạc"
          open={isGenreModalVisible}
          onCancel={() => setIsGenreModalVisible(false)}
          footer={null}
          width={600}
        >
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddGenreModalVisible(true)}
            >
              Tạo Thể loại mới
            </Button>
          </div>
          <Table
            dataSource={genres}
            pagination={false}
            columns={[
              {
                title: "ID",
                dataIndex: "genreId",
                key: "genreId",
                width: 60,
                align: "center",
              },
              {
                title: "Tên Thể loại",
                dataIndex: "genreName",
                key: "genreName",
              },
              {
                title: "Thao tác",
                key: "actions",
                width: 120,
                align: "center",
                render: (_, record) => (
                  <Space size="small">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      size="small"
                      className="action-btn edit-btn"
                      onClick={() => {
                        setSelectedGenre(record)
                        editGenreForm.setFieldsValue({
                          genreName: record.genreName,
                        })
                        setIsEditGenreModalVisible(true)
                      }}
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      size="small"
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteGenre(record.genreId)}
                    />
                  </Space>
                ),
              },
            ]}
          />
        </Modal>

        {/* Add Genre Modal */}
        <Modal
          title="Tạo Thể loại nhạc mới"
          open={isAddGenreModalVisible}
          onCancel={() => {
            setIsAddGenreModalVisible(false)
            addGenreForm.resetFields()
          }}
          footer={null}
          width={400}
        >
          <Form form={addGenreForm} layout="vertical" onFinish={handleAddGenre}>
            <Form.Item
              name="genreName"
              label="Tên thể loại"
              rules={[{ required: true, message: "Vui lòng nhập tên thể loại" }]}
            >
              <Input placeholder="Nhập tên thể loại" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tạo
                </Button>
                <Button onClick={() => {
                    setIsAddGenreModalVisible(false)
                    addGenreForm.resetFields()
                }}>
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Genre Modal */}
        <Modal
          title="Cập Nhật Thể loại nhạc"
          open={isEditGenreModalVisible}
          onCancel={() => {
            setIsEditGenreModalVisible(false)
            editGenreForm.resetFields()
          }}
          footer={null}
          width={400}
        >
          <Form form={editGenreForm} layout="vertical" onFinish={handleUpdateGenre}>
            <Form.Item
              name="genreName"
              label="Tên thể loại"
              rules={[{ required: true, message: "Vui lòng nhập tên thể loại" }]}
            >
              <Input placeholder="Nhập tên thể loại" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
                <Button onClick={() => {
                    setIsEditGenreModalVisible(false)
                    editGenreForm.resetFields()
                }}>
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default SheetMusic