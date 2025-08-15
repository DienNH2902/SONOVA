"use client"
import { useState, useEffect } from "react"
import { Button, message } from "antd"
import { HeartFilled, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./Favorite.css"

const Favorite = () => {
  const navigate = useNavigate()
  const [favoriteSheetMusic, setFavoriteSheetMusic] = useState([])
  const [allSheetMusic, setAllSheetMusic] = useState([])
  const [loading, setLoading] = useState(false)

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

      // Refresh both lists to update favorite status and count
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
      // Fetch both lists at the same time
      Promise.all([fetchUserFavorites(), fetchAllSheetMusic()]).finally(() => {
        setLoading(false)
      })
    } else {
      message.info("Vui lòng đăng nhập để xem mục yêu thích của bạn.")
      navigate("/login")
    }
  }, [navigate])
  
  // Create a detailed list of favorites by filtering from allSheetMusic
  const favoriteSheetMusicIds = new Set(favoriteSheetMusic.map((fav) => fav.sheetMusicId))
  const detailedFavoriteSheetMusic = allSheetMusic.filter((sheet) => favoriteSheetMusicIds.has(sheet.sheetMusicId))

  // Navigate to the detail page when a card is clicked
  const handleCardClick = (sheet) => {
    navigate(`/student/sheet-music/${sheet.sheetMusicId}`)
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
        ) : detailedFavoriteSheetMusic.length === 0 ? (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorite
