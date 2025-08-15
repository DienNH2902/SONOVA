"use client"

import { useState, useEffect } from "react"
import { Button, message, Spin } from "antd"
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import "./Sheet.css"

const Sheet = () => {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate()
  const { id } = useParams()
  const [sheetMusic, setSheetMusic] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helper to get headers with Authorization token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn.")
      navigate("/login")
      return {}
    }
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  // Fetch sheet music details
  const fetchSheetMusicDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic/${id}`,
        {
          headers: getAuthHeaders(),
        },
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setSheetMusic(data)
    } catch (error) {
      message.error("Không thể tải dữ liệu sheet nhạc")
      console.error("Error fetching sheet music details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && id) {
      fetchSheetMusicDetails()
    } else {
      navigate("/login")
    }
  }, [id, navigate])

  const handleDownload = () => {
    message.success("Tải xuống sheet nhạc thành công!")
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="sheet-loading-container">
        <Spin size="large" tip="Đang tải sheet nhạc..." />
      </div>
    )
  }

  if (!sheetMusic) {
    return (
      <div className="sheet-error-container">
        <p>Không tìm thấy sheet nhạc</p>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>
    )
  }

  return (
    <div className="sheet-page">
      {/* Header */}
      <div className="sheet-header">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className="sheet-back-button" type="text">
          Trở về
        </Button>

        <Button icon={<DownloadOutlined />} onClick={handleDownload} className="sheet-download-button" type="primary">
          Tải xuống sheet nhạc
        </Button>
      </div>

      {/* Content */}
      <div className="sheet-content">
        {/* Title Section */}
        <div className="sheet-title-section">
          <h1 className="sheet-main-title">{sheetMusic.musicName}</h1>
          <div className="sheet-subtitle">
            <p className="sheet-composer">{sheetMusic.composer}</p>
            
          </div>
        </div>

        {/* Sheet Music Display */}
        <div className="sheet-music-container">
          {sheetMusic.sheets && sheetMusic.sheets.length > 0 ? (
            sheetMusic.sheets.map((sheet, index) => (
              <div key={sheet.sheetId} className="sheet-music-page">
                <img
                  src={sheet.sheetUrl || "/placeholder.svg"}
                  alt={`${sheetMusic.musicName} - Trang ${index + 1}`}
                  className="sheet-music-image"
                />
              </div>
            ))
          ) : (
            <div className="sheet-no-content">
              <p>Không có sheet nhạc để hiển thị</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sheet
