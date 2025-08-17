"use client"

import { useState, useEffect } from "react"
import { Button, Spin, App } from "antd"
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import jsPDF from "jspdf"
import "./Sheet.css"
// import html2canvas from "html2canvas"

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

  const handleDownload = async () => {
  if (!sheetMusic || !sheetMusic.sheets || sheetMusic.sheets.length === 0) {
    message.error("Không có sheet nhạc để tải xuống.")
    return
  }

  const hide = message.loading("Đang tạo file PDF...", 0)

  try {
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Sử dụng Promise.all để tải tất cả ảnh cùng lúc
    const imagePromises = sheetMusic.sheets.map(async (sheet) => {
      try {
        const res = await fetch(sheet.sheetUrl, { headers: getAuthHeaders() })
        if (!res.ok) {
          throw new Error(`Tải ảnh thất bại: ${res.status}`)
        }
        const blob = await res.blob()
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const img = new Image()
            img.onload = () => resolve({ dataUrl: reader.result, width: img.width, height: img.height, type: blob.type })
            img.onerror = reject
            img.src = reader.result
          }
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.error("Lỗi khi tải ảnh:", error)
        throw error // Re-throw để Promise.all bắt lỗi
      }
    })

    const images = await Promise.all(imagePromises)

    for (let i = 0; i < images.length; i++) {
      const { dataUrl, width, height, type } = images[i]

      const scale = Math.min(pageWidth / width, pageHeight / height)
      const renderW = width * scale
      const renderH = height * scale
      const x = (pageWidth - renderW) / 2
      const y = (pageHeight - renderH) / 2

      if (i > 0) doc.addPage()

      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, pageWidth, pageHeight, "F")

      const fmt = type.includes("png") ? "PNG" : "JPEG"
      doc.addImage(dataUrl, fmt, x, y, renderW, renderH)
    }

    doc.save(`${sheetMusic.musicName.replace(/ /g, "_")}.pdf`)
    hide()
    message.success("Tải xuống sheet nhạc thành công!")
  } catch (error) {
    console.error("Lỗi khi tạo file PDF:", error)
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
