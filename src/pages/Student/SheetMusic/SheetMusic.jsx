"use client"

import { useState, useEffect } from "react"
import { Input, Button, message } from "antd"
import {
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  LeftOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./SheetMusic.css" // CSS vẫn được import như cũ
import ScrollToTop from "../../../routes/scrollTop"

const StudentSheetMusic = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("Tất cả")
  const [allSheetMusic, setAllSheetMusic] = useState([])
  const [favoriteSheetMusic, setFavoriteSheetMusic] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [popularStartIndex, setPopularStartIndex] = useState(0)
  const [favoriteStartIndex, setFavoriteStartIndex] = useState(0)
  const [showFilteredView, setShowFilteredView] = useState(false)

  // Helper to get headers with Authorization token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") // Giả sử token được lưu ở đây
    if (!token) {
      message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn.")
      navigate("/login")
      return {}
    }
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  // Fetch all sheet music
  const fetchAllSheetMusic = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic",
        {
          headers: getAuthHeaders(),
        },
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAllSheetMusic(data)
    } catch (error) {
      message.error("Không thể tải dữ liệu sheet nhạc")
      console.error("Error fetching sheet music:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user favorites
  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/UserFavoriteSheet/my-favorites",
        {
          headers: getAuthHeaders(),
        },
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFavoriteSheetMusic(data.favoriteSheetMusics || [])
    } catch (error) {
      console.error("Error fetching user favorites:", error)
    }
  }

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre", {
        headers: getAuthHeaders(),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setGenres([{ genreId: 0, genreName: "Tất cả" }, ...data])
    } catch (error) {
      console.error("Error fetching genres:", error)
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

      fetchUserFavorites()
      fetchAllSheetMusic()
    } catch (error) {
      message.error("Không thể cập nhật trạng thái yêu thích")
      console.error("Error toggling favorite:", error)
    }
  }

  const handlePrevFavorite = () => {
    setFavoriteStartIndex((prevIndex) => Math.max(prevIndex - 4, 0))
  }

  const handleNextFavorite = () => {
    setFavoriteStartIndex((prevIndex) => Math.min(prevIndex + 4, favoriteSheetMusic.length - 4))
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchAllSheetMusic()
      fetchUserFavorites()
      fetchGenres()
    } else {
      navigate("/login")
    }
  }, [navigate])

  const isFavorited = (sheetMusicId) => {
    return favoriteSheetMusic.some((fav) => fav.sheetMusicId === sheetMusicId)
  }

  const getPopularSheetMusic = () => {
    return [...allSheetMusic].sort((a, b) => b.favoriteCount - a.favoriteCount)
  }

  const getFilteredSheetMusic = () => {
    let filtered = allSheetMusic

    if (searchText) {
      filtered = filtered.filter(
        (sheet) =>
          sheet.musicName.toLowerCase().includes(searchText.toLowerCase()) ||
          sheet.composer.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (selectedGenre !== "Tất cả") {
      filtered = filtered.filter((sheet) => sheet.genres.some((genre) => genre.genreName === selectedGenre))
    }

    return filtered.sort((a, b) => b.favoriteCount - a.favoriteCount)
  }

  const filteredSheetMusic = getFilteredSheetMusic()
  const popularSheetMusic = getPopularSheetMusic()
  const hasFilters = searchText || showFilteredView

  const favoriteSheetMusicIds = new Set(favoriteSheetMusic.map((fav) => fav.sheetMusicId))
  const detailedFavoriteSheetMusic = allSheetMusic.filter((sheet) => favoriteSheetMusicIds.has(sheet.sheetMusicId))

  const handleCardClick = (sheet) => {
    navigate(`/student/sheet-music/${sheet.sheetMusicId}`)
  }

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName)
    setShowFilteredView(true)
  }

  const handleBack = () => {
    setShowFilteredView(false)
    setSelectedGenre("Tất cả")
    setSearchText("")
  }

  return (

    <div className="student-sheet-music-page">
    <ScrollToTop /> {/* Đặt ngay trong Router */}
      {/* Header */}
      <div className="student-sheet-music-header-section">
        <h1 className="student-sheet-music-main-title">Tìm kiếm sheet nhạc yêu thích của bạn </h1>
        <div className="student-sheet-music-search-container">
          <Input
            className="student-sheet-music-search-input"
            placeholder="Nhập tên bài hát hoặc tên tác giả"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              if (e.target.value) {
                setShowFilteredView(true)
              }
            }}
            size="large"
          />
          <Button type="primary" className="student-sheet-music-search-button" size="large">
            <SearchOutlined />
          </Button>
        </div>
      </div>

      {!hasFilters ? (
        <>
          {/* Popular Music Section */}
          <div className="student-sheet-music-section-sheet">
          <ScrollToTop /> {/* Đặt ngay trong Router */}
            <div className="student-sheet-music-section-header">
              <h2 className="student-h2">Bài nhạc thịnh hành</h2>
            </div>
            <div className="student-sheet-music-music-grid">
              {popularSheetMusic.slice(0, 8).map((sheet) => (
                <div
                  key={sheet.sheetMusicId}
                  className="student-sheet-music-music-card"
                  onClick={() => handleCardClick(sheet)}
                >
                  <div className="student-sheet-music-card-image">
                    <img src={sheet.coverUrl || "/placeholder.svg"} alt={sheet.musicName} />
                    <div
                      className="student-sheet-music-heart-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(sheet.sheetMusicId)
                      }}
                    >
                      {isFavorited(sheet.sheetMusicId) ? (
                        <HeartFilled className="student-sheet-music-heart-filled" />
                      ) : (
                        <HeartOutlined className="student-sheet-music-heart-outline" />
                      )}
                    </div>
                  </div>
                  <div className="student-sheet-music-card-content">
                    <h3 className="student-sheet-music-song-title">{sheet.musicName}</h3>
                    <p className="student-sheet-music-composer">{sheet.composer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genre Filter Section */}
          <div className="student-sheet-music-genre-section">
            <h2 className="student-h2">Tìm theo thể loại</h2>
            <div className="student-sheet-music-genre-buttons">
              {genres.map((genre) => (
                <Button
                  key={genre.genreId}
                  className="student-sheet-music-genre-button"
                  onClick={() => handleGenreClick(genre.genreName)}
                >
                  {genre.genreName}
                </Button>
              ))}
            </div>
          </div>

          {/* User Favorites Section */}
          <div className="student-sheet-music-section-sheet">
            <div className="student-sheet-music-section-header">
              <h2 className="student-h2">Mục yêu thích của bạn</h2>
              <div className="student-sheet-music-navigation-arrows">
                <Button
                  icon={<LeftOutlined />}
                  onClick={handlePrevFavorite}
                  disabled={favoriteStartIndex === 0}
                  className="student-sheet-music-nav-arrow"
                />
                <Button
                  icon={<RightOutlined />}
                  onClick={handleNextFavorite}
                  disabled={favoriteStartIndex + 4 >= detailedFavoriteSheetMusic.length}
                  className="student-sheet-music-nav-arrow"
                />
              </div>
            </div>
            <div className="student-sheet-music-music-grid">
              {detailedFavoriteSheetMusic.slice(favoriteStartIndex, favoriteStartIndex + 4).map((sheet) => (
                <div
                  key={sheet.sheetMusicId}
                  className="student-sheet-music-music-card"
                  onClick={() => handleCardClick(sheet)}
                >
                  <div className="student-sheet-music-card-image">
                    <img src={sheet.coverUrl || "/placeholder.svg"} alt={sheet.musicName} />
                    <div
                      className="student-sheet-music-heart-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(sheet.sheetMusicId)
                      }}
                    >
                      <HeartFilled className="student-sheet-music-heart-filled" />
                    </div>
                  </div>
                  <div className="student-sheet-music-card-content">
                    <h3 className="student-sheet-music-song-title">{sheet.musicName}</h3>
                    <p className="student-sheet-music-composer">{sheet.composer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="student-sheet-music-see-more-container">
              <Button
                type="primary"
                className="student-sheet-music-see-more-button"
                onClick={() => navigate("/student/sheet-music/favorite")}
              >
                Xem thêm
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Filtered view
        <div>
        <ScrollToTop /> {/* Đặt ngay trong Router */}
          <div className="student-sheet-music-genre-filter-bar">
            {/* <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button-favorite" type="text">
              Quay lại
            </Button> */}
            {genres.map((genre) => (
              <Button
                key={genre.genreId}
                className={`student-sheet-music-genre-filter-button ${
                  selectedGenre === genre.genreName ? "student-sheet-music-active" : ""
                }`}
                onClick={() => handleGenreClick(genre.genreName)}
              >
                {genre.genreName}
              </Button>
            ))}
          </div>
          <div className="student-sheet-music-filtered-view">
            <div className="student-sheet-music-main-content">
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button-favorite-home" type="text">
          {/* Quay lại */}
        </Button>
              <div className="student-sheet-music-filtered-section">
                <h2>{selectedGenre}</h2>
                <div className="student-sheet-music-filtered-grid">
                  {filteredSheetMusic.map((sheet) => (
                    <div
                      key={sheet.sheetMusicId}
                      className="student-sheet-music-music-card"
                      onClick={() => handleCardClick(sheet)}
                    >
                      <div className="student-sheet-music-card-image">
                        <img src={sheet.coverUrl || "/placeholder.svg"} alt={sheet.musicName} />
                        <div
                          className="student-sheet-music-heart-icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(sheet.sheetMusicId)
                          }}
                        >
                          {isFavorited(sheet.sheetMusicId) ? (
                            <HeartFilled className="student-sheet-music-heart-filled" />
                          ) : (
                            <HeartOutlined className="student-sheet-music-heart-outline" />
                          )}
                        </div>
                      </div>
                      <div className="student-sheet-music-card-content">
                        <h3 className="student-sheet-music-song-title">{sheet.musicName}</h3>
                        <p className="student-sheet-music-composer">{sheet.composer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="student-sheet-music-sidebar">
              <div className="student-sheet-music-sidebar-section">
                <h3>Thịnh hành</h3>
                <div className="student-sheet-music-sidebar-list">
                  {popularSheetMusic.slice(0, 6).map((sheet, index) => (
                    <div
                      key={sheet.sheetMusicId}
                      className="student-sheet-music-sidebar-item"
                      onClick={() => handleCardClick(sheet)}
                    >
                      <span className="student-sheet-music-item-number">{index + 1}</span>
                      <div className="student-sheet-music-item-info">
                        <p className="student-sheet-music-item-title">{sheet.musicName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="student-sheet-music-sidebar-section">
                <h3>Mục yêu thích</h3>
                <div className="student-sheet-music-sidebar-list">
                  {detailedFavoriteSheetMusic.slice(0, 6).map((sheet, index) => (
                    <div
                      key={sheet.sheetMusicId}
                      className="student-sheet-music-sidebar-item"
                      onClick={() => handleCardClick(sheet)}
                    >
                      <span className="student-sheet-music-item-number">{index + 1}</span>
                      <div className="student-sheet-music-item-info">
                        <p className="student-sheet-music-item-title">{sheet.musicName}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="link"
                  className="student-sheet-music-sidebar-see-more"
                  onClick={() => navigate("/student/sheet-music/favorite")}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentSheetMusic
