"use client"
import { useState, useEffect } from "react"
import { Button, Modal, Image, message } from "antd"
import { HeartFilled, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./Favorite.css"

const Favorite = () => {
  const navigate = useNavigate()
  const [favoriteSheetMusic, setFavoriteSheetMusic] = useState([])
  const [allSheetMusic, setAllSheetMusic] = useState([]) // State mới để lưu tất cả sheet nhạc
  const [loading, setLoading] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(null)

  // Helper to get headers with Authorization token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn.")
      navigate('/login');
      return {}
    }
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  // Fetch all sheet music to get full details
  const fetchAllSheetMusic = async () => {
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic",
        {
          headers: getAuthHeaders(),
        }
      )
      if (response.ok) {
        const data = await response.json()
        setAllSheetMusic(data)
      } else {
         throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error fetching all sheet music:", error)
      // Không hiển thị lỗi cho lần fetch nền này
    }
  }

  // Fetch user favorites (list of favorite IDs)
  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/UserFavoriteSheet/my-favorites",
        {
          headers: getAuthHeaders(),
        }
      )
      if (!response.ok) {
        if (response.status === 401) {
          message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
          navigate("/login")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFavoriteSheetMusic(data.favoriteSheetMusics || [])
    } catch (error) {
      message.error("Không thể tải dữ liệu yêu thích")
      console.error("Error fetching user favorites:", error)
    }
  }

  // Toggle favorite status
  const toggleFavorite = async (sheetMusicId) => {
    try {
      const formData = new FormData()
      formData.append("sheetMusicId", sheetMusicId)

      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/UserFavoriteSheet/toggle/${sheetMusicId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        },
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      message.success(result.message)

      // Refresh cả hai danh sách để cập nhật trạng thái và số lượt thích
      fetchUserFavorites()
      fetchAllSheetMusic()
    } catch (error) {
      message.error("Không thể cập nhật trạng thái yêu thích")
      console.error("Error toggling favorite:", error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setLoading(true)
      // Lấy cả hai danh sách cùng lúc
      Promise.all([fetchUserFavorites(), fetchAllSheetMusic()]).finally(() => {
        setLoading(false)
      })
    } else {
      message.info("Vui lòng đăng nhập để xem mục yêu thích của bạn.")
      navigate("/login")
    }
  }, [navigate])
  
  // Tạo danh sách yêu thích có đầy đủ chi tiết bằng cách lọc từ allSheetMusic
  const favoriteSheetMusicIds = new Set(favoriteSheetMusic.map((fav) => fav.sheetMusicId))
  const detailedFavoriteSheetMusic = allSheetMusic.filter((sheet) => favoriteSheetMusicIds.has(sheet.sheetMusicId))


  const handleCardClick = (sheet) => {
    setSelectedSheet(sheet)
    setIsDetailModalVisible(true)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="favorite-page">
      {/* Header */}
      <div className="favorite-header">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button-favorite" type="text">
          Quay lại
        </Button>
        <h1 className="page-title-favorite">Mục yêu thích của bạn</h1>
      </div>

      {/* Content */}
      <div className="favorite-content">
        {loading ? (
          <p>Đang tải...</p>
        ) : detailedFavoriteSheetMusic.length === 0 ? ( // Sử dụng danh sách chi tiết để kiểm tra
          <div className="empty-state">
            <div className="empty-icon">♪</div>
            <h3>Chưa có bài nhạc yêu thích</h3>
            <p>Hãy khám phá và thêm những bài nhạc bạn yêu thích vào danh sách này</p>
            <Button
              type="primary"
              onClick={() => navigate("/student/sheet-music")}
              className="explore-button"
            >
              Khám phá ngay
            </Button>
          </div>
        ) : (
          <div className="favorite-grid">
            {/* Sử dụng danh sách chi tiết để hiển thị */}
            {detailedFavoriteSheetMusic.map((sheet) => (
              <div key={sheet.sheetMusicId} className="favorite-card" onClick={() => handleCardClick(sheet)}>
                <div className="card-image">
                  <img src={sheet.coverUrl || "/placeholder.svg"} alt={sheet.musicName} />
                  <div
                    className="heart-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(sheet.sheetMusicId)
                    }}
                  >
                    <HeartFilled className="heart-filled" />
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="song-title">{sheet.musicName}</h3>
                  <p className="composer">{sheet.composer}</p>
                  {/* <div className="genre-tags">
                    {sheet.genres?.map((genre) => (
                      <span key={genre.genreId} className="genre-tag">
                        {genre.genreName}
                      </span>
                    ))}
                  </div>
                  <div className="favorite-info">
                    <span className="favorite-count">❤️ {sheet.favoriteCount} lượt thích</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {/* <Modal
        title={selectedSheet?.musicName}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
        className="sheet-detail-modal"
      >
        {selectedSheet && (
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-info">
                <h3>{selectedSheet.musicName}</h3>
                <p>Tác giả: {selectedSheet.composer}</p>
                <p>Số lượng sheet: {selectedSheet.sheetQuantity}</p>
                <p>Lượt yêu thích: {selectedSheet.favoriteCount}</p>
              </div>
            </div>
            <div className="sheets-container">
              <h4>Danh sách Sheet</h4>
              <div className="sheets-list">
                {selectedSheet.sheets?.map((sheet, index) => (
                  <div key={sheet.sheetId} className="sheet-item">
                    <div className="sheet-image-container">
                      <Image
                        src={sheet.sheetUrl || "/placeholder.svg"}
                        alt={`Sheet ${index + 1}`}
                        className="sheet-image"
                      />
                    </div>
                    <div className="sheet-info">
                      <h5>Sheet {index + 1}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal> */}

      <Modal
        // title={selectedSheet?.musicName}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
        className="student-sheet-music-sheet-detail-modal"
      >
        {selectedSheet && (
          <div className="student-sheet-music-modal-content">
            <div className="student-sheet-music-modal-header">
              <div className="student-sheet-music-modal-info">
                <h3>{selectedSheet.musicName}</h3>
                <p>Tác giả: {selectedSheet.composer}</p>
                <p>Số lượng sheet: {selectedSheet.sheetQuantity}</p>
                <p>Lượt yêu thích: {selectedSheet.favoriteCount}</p>
              </div>
            </div>
            <div className="student-sheet-music-sheets-container">
              <h4>Danh sách Sheet</h4>
              <div className="student-sheet-music-sheets-list">
                {selectedSheet.sheets?.map((sheet, index) => (
                  <div
                    key={sheet.sheetId}
                    className="student-sheet-music-sheet-item"
                  >
                    <div className="student-sheet-music-sheet-image-container">
                      <Image
                        src={sheet.sheetUrl || "/placeholder.svg"}
                        alt={`Sheet ${index + 1}`}
                        className="student-sheet-music-sheet-image"
                      />
                    </div>
                    <div className="student-sheet-music-sheet-info">
                      <h5>Sheet {index + 1}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Favorite