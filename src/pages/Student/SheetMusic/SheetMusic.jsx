import { useState, useEffect } from "react";
import { Input, Button, Modal, Image, message } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SheetMusic.css"; // CSS vẫn được import như cũ

const StudentSheetMusic = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [allSheetMusic, setAllSheetMusic] = useState([]);
  const [favoriteSheetMusic, setFavoriteSheetMusic] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [favoriteStartIndex, setFavoriteStartIndex] = useState(0);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);

  // Helper to get headers with Authorization token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Giả sử token được lưu ở đây
    if (!token) {
      message.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn.");
      navigate("/login");
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch all sheet music
  const fetchAllSheetMusic = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/SheetMusic",
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllSheetMusic(data);
    } catch (error) {
      message.error("Không thể tải dữ liệu sheet nhạc");
      console.error("Error fetching sheet music:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user favorites
  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/UserFavoriteSheet/my-favorites",
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFavoriteSheetMusic(data.favoriteSheetMusics || []);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Genre",
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGenres([{ genreId: 0, genreName: "Tất cả" }, ...data]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (sheetMusicId) => {
    try {
      const formData = new FormData();
      formData.append("sheetMusicId", sheetMusicId);

      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/UserFavoriteSheet/toggle/${sheetMusicId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      message.success(result.message);

      fetchUserFavorites();
      fetchAllSheetMusic();
    } catch (error) {
      message.error("Không thể cập nhật trạng thái yêu thích");
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllSheetMusic();
      fetchUserFavorites();
      fetchGenres();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const isFavorited = (sheetMusicId) => {
    return favoriteSheetMusic.some((fav) => fav.sheetMusicId === sheetMusicId);
  };

  const getPopularSheetMusic = () => {
    return [...allSheetMusic].sort((a, b) => b.favoriteCount - a.favoriteCount);
  };

  const getFilteredSheetMusic = () => {
    let filtered = allSheetMusic;

    if (searchText) {
      filtered = filtered.filter(
        (sheet) =>
          sheet.musicName.toLowerCase().includes(searchText.toLowerCase()) ||
          sheet.composer.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedGenre !== "Tất cả") {
      filtered = filtered.filter((sheet) =>
        sheet.genres.some((genre) => genre.genreName === selectedGenre)
      );
    }

    return filtered.sort((a, b) => b.favoriteCount - a.favoriteCount);
  };

  const filteredSheetMusic = getFilteredSheetMusic();
  const popularSheetMusic = getPopularSheetMusic();
  const hasFilters = searchText || selectedGenre !== "Tất cả";

  const favoriteSheetMusicIds = new Set(
    favoriteSheetMusic.map((fav) => fav.sheetMusicId)
  );
  const detailedFavoriteSheetMusic = allSheetMusic.filter((sheet) =>
    favoriteSheetMusicIds.has(sheet.sheetMusicId)
  );

  const handleCardClick = (sheet) => {
    setSelectedSheet(sheet);
    setIsDetailModalVisible(true);
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
  };

  const handleNextPopular = () => {
    if (popularStartIndex + 4 < popularSheetMusic.length) {
      setPopularStartIndex(popularStartIndex + 4);
    }
  };

  const handlePrevPopular = () => {
    if (popularStartIndex > 0) {
      setPopularStartIndex(popularStartIndex - 4);
    }
  };

  const handleNextFavorite = () => {
    if (favoriteStartIndex + 4 < detailedFavoriteSheetMusic.length) {
      setFavoriteStartIndex(favoriteStartIndex + 4);
    }
  };

  const handlePrevFavorite = () => {
    if (favoriteStartIndex > 0) {
      setFavoriteStartIndex(favoriteStartIndex - 4);
    }
  };

  return (
    <div className="student-sheet-music-page">
      {/* Header */}
      <div className="student-sheet-music-header-section">
        <h1 className="student-sheet-music-main-title">
          Tìm kiếm sheet nhạc yêu thích của bạn
        </h1>
        <div className="student-sheet-music-search-container">
          <Input
          className="student-sheet-music-search-input"
            placeholder="Nhập tên bài hát hoặc tên tác giả"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            
            size="large"
          />
          <Button
            type="primary"
            className="student-sheet-music-search-button"
            size="large"
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>

      {!hasFilters ? (
        <>
          {/* Popular Music Section */}
          <div className="student-sheet-music-section-sheet">
            <div className="student-sheet-music-section-header">
              <h2 className="student-h2">Bài nhạc thịnh hành</h2>
              <div className="student-sheet-music-navigation-arrows">
                <Button
                  icon={<LeftOutlined />}
                  onClick={handlePrevPopular}
                  disabled={popularStartIndex === 0}
                  className="student-sheet-music-nav-arrow"
                />
                <Button
                  icon={<RightOutlined />}
                  onClick={handleNextPopular}
                  disabled={popularStartIndex + 4 >= popularSheetMusic.length}
                  className="student-sheet-music-nav-arrow"
                />
              </div>
            </div>
            <div className="student-sheet-music-music-grid">
              {popularSheetMusic
                .slice(popularStartIndex, popularStartIndex + 4)
                .map((sheet) => (
                  <div
                    key={sheet.sheetMusicId}
                    className="student-sheet-music-music-card"
                    onClick={() => handleCardClick(sheet)}
                  >
                    <div className="student-sheet-music-card-image">
                      <img
                        src={sheet.coverUrl || "/placeholder.svg"}
                        alt={sheet.musicName}
                      />
                      <div
                        className="student-sheet-music-heart-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(sheet.sheetMusicId);
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
                      <h3 className="student-sheet-music-song-title">
                        {sheet.musicName}
                      </h3>
                      <p className="student-sheet-music-composer">
                        {sheet.composer}
                      </p>
                      {/* <div className="student-sheet-music-genre-tags">
                        {sheet.genres.map((genre) => (
                          <span
                            key={genre.genreId}
                            className="student-sheet-music-genre-tag"
                          >
                            {genre.genreName}
                          </span>
                        ))}
                      </div> */}
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
                  className={`student-sheet-music-genre-button ${
                    selectedGenre === genre.genreName
                      ? "student-sheet-music-active"
                      : ""
                  }`}
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
                  disabled={
                    favoriteStartIndex + 4 >= detailedFavoriteSheetMusic.length
                  }
                  className="student-sheet-music-nav-arrow"
                />
              </div>
            </div>
            <div className="student-sheet-music-music-grid">
              {detailedFavoriteSheetMusic
                .slice(favoriteStartIndex, favoriteStartIndex + 4)
                .map((sheet) => (
                  <div
                    key={sheet.sheetMusicId}
                    className="student-sheet-music-music-card"
                    onClick={() => handleCardClick(sheet)}
                  >
                    <div className="student-sheet-music-card-image">
                      <img
                        src={sheet.coverUrl || "/placeholder.svg"}
                        alt={sheet.musicName}
                      />
                      <div
                        className="student-sheet-music-heart-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(sheet.sheetMusicId);
                        }}
                      >
                        <HeartFilled className="student-sheet-music-heart-filled" />
                      </div>
                    </div>
                    <div className="student-sheet-music-card-content">
                      <h3 className="student-sheet-music-song-title">
                        {sheet.musicName}
                      </h3>
                      <p className="student-sheet-music-composer">
                        {sheet.composer}
                      </p>
                      {/* <div className="student-sheet-music-genre-tags">
                        {sheet.genres.map((genre) => (
                          <span
                            key={genre.genreId}
                            className="student-sheet-music-genre-tag"
                          >
                            {genre.genreName}
                          </span>
                        ))}
                      </div> */}
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
          <div className="student-sheet-music-genre-filter-bar">
            {genres.map((genre) => (
              <Button
                key={genre.genreId}
                className={`student-sheet-music-genre-filter-button ${
                  selectedGenre === genre.genreName
                    ? "student-sheet-music-active"
                    : ""
                }`}
                onClick={() => handleGenreClick(genre.genreName)}
              >
                {genre.genreName}
              </Button>
            ))}
          </div>

          <div className="student-sheet-music-filtered-view">
            <div className="student-sheet-music-main-content">
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
                        <img
                          src={sheet.coverUrl || "/placeholder.svg"}
                          alt={sheet.musicName}
                        />
                        <div
                          className="student-sheet-music-heart-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(sheet.sheetMusicId);
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
                        <h3 className="student-sheet-music-song-title">
                          {sheet.musicName}
                        </h3>
                        <p className="student-sheet-music-composer">
                          {sheet.composer}
                        </p>
                        {/* <div className="student-sheet-music-genre-tags">
                          {sheet.genres.map((genre) => (
                            <span
                              key={genre.genreId}
                              className="student-sheet-music-genre-tag"
                            >
                              {genre.genreName}
                            </span>
                          ))}
                        </div> */}
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
                      <span className="student-sheet-music-item-number">
                        {index + 1}
                      </span>
                      <div className="student-sheet-music-item-info">
                        <p className="student-sheet-music-item-title">
                          {sheet.musicName}
                        </p>
                        {/* <p className="student-sheet-music-item-composer">
                          {sheet.composer}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="student-sheet-music-sidebar-section">
                <h3>Mục yêu thích</h3>
                <div className="student-sheet-music-sidebar-list">
                  {detailedFavoriteSheetMusic
                    .slice(0, 6)
                    .map((sheet, index) => (
                      <div
                        key={sheet.sheetMusicId}
                        className="student-sheet-music-sidebar-item"
                        onClick={() => handleCardClick(sheet)}
                      >
                        <span className="student-sheet-music-item-number">
                          {index + 1}
                        </span>
                        <div className="student-sheet-music-item-info">
                          <p className="student-sheet-music-item-title">
                            {sheet.musicName}
                          </p>
                          {/* <p className="student-sheet-music-item-composer">
                            {sheet.composer}
                          </p> */}
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

      {/* Detail Modal */}
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
  );
};

export default StudentSheetMusic;