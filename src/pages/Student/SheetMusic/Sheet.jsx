"use client"

import { useState, useEffect } from "react"
import { Button, Spin, App } from "antd"
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
// Không cần jsPDF, html2canvas nữa
import "./Sheet.css"

const Sheet = () => {
  const { message } = App.useApp();

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

  // Tải ZIP thay vì PDF
  const handleDownload = async () => {
    if (!id) {
      message.error("Không tìm thấy ID bài nhạc để tải xuống.")
      return
    }

    const hide = message.loading("Đang tải file ZIP...", 0)

    try {
      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic/${id}/download-all-sheets`,
        {
          // Chỉ gửi Authorization, KHÔNG gửi Content-Type cho GET
          headers: {
            ...getAuthHeaders(),
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Lấy tên file từ Content-Disposition nếu có
      const cd = response.headers.get("content-disposition") || ""
      let filename = `${sheetMusic?.musicName?.replace(/ /g, "_") || "sheet_music"}.zip`
      const matchSimple = cd.match(/filename="?([^"]+)"?/i)
      const matchUtf8 = cd.match(/filename\*=UTF-8''([^;]+)/i)
      if (matchUtf8 && matchUtf8[1]) {
        try {
          filename = decodeURIComponent(matchUtf8[1])
        } catch {
          filename = matchUtf8[1]
        }
      } else if (matchSimple && matchSimple[1]) {
        filename = matchSimple[1]
      }
      if (!filename.toLowerCase().endsWith(".zip")) {
        filename += ".zip"
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      hide()
      message.success("Tải xuống sheet nhạc (ZIP) thành công!")
    } catch (error) {
      console.error("Lỗi khi tải xuống:", error)
      hide()
      message.error("Lỗi khi tải xuống. Vui lòng thử lại.")
    }
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
