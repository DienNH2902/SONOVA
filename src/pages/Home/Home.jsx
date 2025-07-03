import { Button, Typography, Row, Col, Card, Carousel, Space } from "antd";
import thayAn from "../../assets/thayAn.png";
import firstHome from "../../assets/firstHome.png";

import "./Home.css";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
    <section className="course-hero">
            <div className="half-circle-container">
              <div className="half-circle">
                <img src={firstHome} alt="Piano Player" />
                {/* <div class="text-overlay">
                  <h2>Sonova</h2>
                  <p>Hành trình mang đến giá trị</p>
                </div> */}
              </div>
            </div>
          </section>

      {/* <section className="hero-section">
  <div className="hero-half hero-left">
    <div className="hero-image-container">
      <img
        src="https://hellosimply.com/blog/wp-content/uploads/2022/10/Untitled-design-56-1200x600.png"
        alt="Child with guitar"
        className="hero-image"
      />
      <div className="hero-logo-overlay">
        <span className="hero-logo-text">SONOVA</span>
      </div>
    </div>
  </div>

  <div className="hero-half hero-right">
    <div className="hero-image-container">
      <img
        src="https://wedowegood-school.edu.vn/wp-content/uploads/2021/07/YoungGirlPlayingPiano-BestAgeToStartPiano-PianoKids-6170ArbutusDrPensacolaFL32504-8445574266-https___www.pianokids.com_.jpg"
        alt="Music theme"
        className="hero-image"
      />
      <div className="hero-right-overlay">
        <Button type="primary" size="large" className="register-button">
          ĐĂNG KÝ TƯ VẤN
        </Button>
        <div className="vertical-text">ÂM NHẠC & ƯỚC MƠ</div>
      </div>
    </div>
  </div>
</section> */}


      {/* <section className="hero-section">
        <div className="hero-content">
          <Row align="middle">
            <Col xs={24} md={12}>
              <div className="hero-left">
                <div className="hero-image-container">
                  <div className="hero-background-shape"></div>
                  <img
                    src="https://i.ytimg.com/vi/Jbxv-yyU0LE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDrpXqrJKWkPVw8RhB_uKBah4TXIw"
                    alt="Child with guitar"
                    className="hero-image"
                  />
                  <div className="hero-logo-overlay">
                    <span className="hero-logo-text">SONOVA</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="hero-right">
                <div className="instrument-grid">
                  <div className="instrument-item">
                    <img src={chohoang} alt="Piano keys" />
                  </div>
                  <div className="instrument-item">
                    <img src={chohoang} alt="Guitar" />
                  </div>
                  <div className="instrument-item">
                    <img src={chohoang} alt="Drums" />
                  </div>
                </div>
                <div className="register-button-container">
                  <Button
                    type="primary"
                    size="large"
                    className="register-button"
                  >
                    ĐĂNG KÝ TƯ VẤN
                  </Button>
                </div>
                <div className="vertical-text">ÂM NHẠC & UỚC MƠ</div>
              </div>
            </Col>
          </Row>
        </div>
      </section> */}

      {/* Main Content Section */}
      <section className="main-content-section">
        <div className="content-container">
          <div className="content-header">
            <Title className="main-title-sonova">
              Sonova
            </Title>
            <Title className="subtitle-sonova">
              Hành trình mang đến gia trị
            </Title>
          </div>

          <div className="content-description">
            <Paragraph className="description-text">
              Chúng tôi không chỉ giảng dạy âm nhạc, mà còn xây dựng hành trình
              giúp bạn khám phá và phát triển tài năng của mình. Với phương pháp
              giảng dạy sáng tạo và đội ngũ giáo viên tận tâm, mỗi khóa học tại
              trung tâm đều hướng đến việc mang lại giá trị thực sự cho học viên
              – từ những kỹ năng cơ bản nhất cho đến khả năng biểu diễn chuyên
              nghiệp. Chúng tôi tin rằng âm nhạc không chỉ là nghệ thuật, mà còn
              là cộng cụ giáo dục phát triển tư duy, cảm xúc và sự năng động,
              hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục âm
              nhạc!
            </Paragraph>
          </div>

          <div className="cta-button-container">
            <Button type="default" size="large" className="learn-more-button">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <div className="courses-container">
          <div className="courses-header">
            <span className="courses-subtitle">Ở đây</span>
            <Title level={2} className="courses-title">
              Dạy gì ta?
            </Title>
            <Paragraph className="courses-description">
              Các khóa học đều được thiết kế với mục đích và các môn đối tượng
              riêng biệt, mỗi người đều có thể gần tìm hiểu, nước kỹ năng kỹ mẻ
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} className="courses-grid">
            <Col xs={24} sm={12} lg={6}>
              <Card className="course-card">
                <div className="course-image" style={{ height: "200px" }}>
                  <img src="https://www.acustica.nl/wp-content/uploads/2017/08/Een-zelfspelende-piano.jpg" alt="Piano basic course" />
                </div>
                <div className="course-content">
                  <Title level={4} className="course-name">
                    PIANO CĂN BẢN
                  </Title>
                  <Paragraph className="course-desc">
                    Lớp học dành cho những người mới bắt đầu, cơ bản từ những gam đơn
                    đơn đến lên?
                  </Paragraph>

                  <div className="course-schedule">
                    <div className="schedule-item">
                      <span className="schedule-date">24/03 - 30/5</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag full">Full</span>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <span className="schedule-date">15/04 - 08/06</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag open">Open</span>
                      </div>
                    </div>
                  </div>

                  <Button className="course-detail-btn">Xem chi tiết</Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="course-card">
                <div className="course-image" style={{ height: "200px" }}>
                  <img src="https://www.acustica.nl/wp-content/uploads/2017/08/Een-zelfspelende-piano.jpg" alt="Piano advanced course" />
                </div>
                <div className="course-content">
                  <Title level={4} className="course-name">
                    PIANO NÂNG CAO
                  </Title>
                  <Paragraph className="course-desc">
                    Lớp học dành cho những người đã có kiến thức, cơ bảntừ những gam
                    đơn đơn đến lên?
                  </Paragraph>

                  <div className="course-schedule">
                    <div className="schedule-item">
                      <span className="schedule-date">24/03 - 30/5</span>
                      <div className="schedule-tags">
                        <span className="tag online">Online</span>
                        <span className="tag full">Full</span>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <span className="schedule-date">15/04 - 08/06</span>
                      <div className="schedule-tags">
                        <span className="tag online">Online</span>
                        <span className="tag open">Open</span>
                      </div>
                    </div>
                  </div>

                  <Button className="course-detail-btn">Xem chi tiết</Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="course-card">
                <div className="course-image" style={{ height: "200px" }}>
                  <img src="https://img.freepik.com/free-photo/acoustic-guitar-close-up-beautiful-colored-background_169016-3530.jpg" alt="Guitar basic course" />
                </div>
                <div className="course-content">
                  <Title level={4} className="course-name">
                    GUITAR CĂN BẢN
                  </Title>
                  <Paragraph className="course-desc">
                    Lớp học dành cho những người mới bắt đầu, cơ bản từ những gam đơn
                    đơn đến lên?
                  </Paragraph>

                  <div className="course-schedule">
                    <div className="schedule-item">
                      <span className="schedule-date">24/03 - 30/5</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag full">Full</span>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <span className="schedule-date">15/04 - 08/06</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag open">Open</span>
                      </div>
                    </div>
                  </div>

                  <Button className="course-detail-btn">Xem chi tiết</Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="course-card">
                <div className="course-image" style={{ height: "200px" }}>
                  <img src="https://img.freepik.com/free-photo/acoustic-guitar-close-up-beautiful-colored-background_169016-3530.jpg" alt="Guitar advanced course" />
                </div>
                <div className="course-content">
                  <Title level={4} className="course-name">
                    GUITAR NÂNG CAO
                  </Title>
                  <Paragraph className="course-desc">
                    Lớp học dành cho những người đã có kiến thức, cơ bảntừ những gam
                    đơn đơn đến lên?
                  </Paragraph>

                  <div className="course-schedule">
                    <div className="schedule-item">
                      <span className="schedule-date">24/03 - 30/5</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag full">Full</span>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <span className="schedule-date">15/04 - 08/06</span>
                      <div className="schedule-tags">
                        <span className="tag offline">Offline</span>
                        <span className="tag open">Open</span>
                      </div>
                    </div>
                  </div>

                  <Button className="course-detail-btn">Xem chi tiết</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <div className="teacher-section">
        <h2 className="teacher-section-title">Giảng viên chúng mình</h2>

        {/* Top section: Image and basic info */}
        <div className="teacher-top">
          <div className="teacher-image">
            <img src={thayAn} alt="Trần Văn An - Piano Teacher" />
          </div>

          <div className="teacher-basic-info">
          <p className="teacher-title-home">Thạc sĩ Thanh nhạc</p>
            <h3 className="teacher-name-home">TRẦN CÔNG THÙY</h3>
            

            <p className="teacher-description">
              Với hơn 10 năm kinh nghiệm trong nghề, giảng viên không chỉ sở hữu
              kiến thức chuyên môn sâu rộng mà còn có phương pháp giảng dạy sáng
              tạo, dễ hiểu, giúp học viên nhanh chóng nắm bắt và yêu thích âm
              nhạc.
            </p>
          </div>
        </div>

        {/* Bottom section: Detailed description */}
        <div className="teacher-bottom">
          <p className="teacher-details-home">
            Giảng viên của chúng tôi là người giàu kinh nghiệm trong việc giảng
            dạy và biểu diễn piano, guitar. Bạn sẽ được dẫn dắt qua từng giai
            đoạn, từ cách đọc hợp âm đến việc chơi các kỹ thuật phức tạp, mang
            đến cho bạn khả năng biểu diễn đa dạng từ nhạc cổ điển đến hiện đại.
          </p>
        </div>
      </div>

      <div className="testimonials-section-home">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Học viên nói gì?</h2>
          <p className="testimonials-subtitle">
            Tại sao những điều có thể kể về những học viên, điều có thể kết nối
            với cả quá trình học tập và học tập, ngay cả khi họ đang học mới
          </p>
        </div>

        {/* <div className="testimonials-grid">
          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 1" />
          </div>

          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 2" />
          </div>

          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 3" />
          </div>

          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 4" />
          </div>

          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 5" />
          </div>

          <div className="testimonial-post">
            <img src={chohoang} alt="Student testimonial 6" />
          </div>
        </div> */}
        <div className="testimonials-carousel">
          {/* <img src={fb} alt="Student feedback" className="testimonial-image" /> */}
        <button className="view-more-btn">Tìm hiểu thêm</button>
        </div>

        {/* <div className="testimonials-footer">
          <button className="view-more-btn">Tìm hiểu thêm</button>
        </div> */}
      </div>

    
    <div className="learning-space-container">
  <div className="learning-space-header">
    <h2 className="main-title-home">Không gian học</h2>
    <h4 className="subtitle-home">trông như nào nhỉ?</h4>
  </div>
      
      <Carousel autoplay effect="fade">
        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://littleschoolofmusic.com/wp-content/uploads/2021/07/Singing-Class-1-scaled.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Hòa Âm Cuộc Sống, Khơi Nguồn Đam Mê.
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Gợi cảm hứng, nhấn mạnh âm nhạc là một phần của cuộc sống và khơi dậy đam mê
              </Paragraph>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  
                >
                  Đăng Ký Ngay
                </Button>
                <Button size="large">Tìm Hiểu Thêm</Button>
              </Space>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://vsoschoolofmusic.ca/wp-content/uploads/2017/10/Guitar-Explorations-mh.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Chất Lượng Thăng Hoa, Tài Năng Tỏa Sáng.
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Nhấn mạnh chất lượng đào tạo và kết quả là sự phát triển của tài năng học viên
              </Paragraph>
              <Button type="primary" size="large">
                Bắt Đầu Lập Kế Hoạch
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://www.ensembleschools.com/wp-content/uploads/2021/03/2-2.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Nơi Giai Điệu Bắt Đầu, Giấc Mơ Cất Cánh.
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Mang tính thơ mộng, thể hiện nơi đây là điểm khởi đầu cho hành trình âm nhạc và hiện thực hóa ước mơ
              </Paragraph>
              <Space>
                <Button type="primary" size="large">
                  Tham Gia Ngay
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="registration-section">
    <button className="register-button">
      Đăng ký học ngay
    </button>
    <p className="register-text">
      Để bắt đầu hành trình âm nhạc của bạn <strong>NGAY HÔM NAY!</strong>
    </p>
  </div>
</div>

      
    </div>
  );
};

export default Home;
