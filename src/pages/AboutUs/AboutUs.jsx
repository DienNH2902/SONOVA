import { Typography, Row, Col, Card, Carousel, Space, Button } from "antd";
import "./AboutUs.css";
import chohoang from "../../assets/chohoang.png";
import firstAbout from "../../assets/firstAbout.png";
import thayAn from "../../assets/thayAn.png";
import gtcl1 from "../../assets/gtcl1.png";
import gtcl2 from "../../assets/gtcl2.png";
import gtcl3 from "../../assets/gtcl3.png";
const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div class="half-circle-container">
          <div class="half-circle">
            <img src={firstAbout} alt="Piano Player" />
            {/* <div class="text-overlay">
              <h2>Sonova</h2>
              <p>Hành trình mang đến giá trị</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content">
        <div className="content-container">
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} md={12}>
              <div className="about-image-section">
                <img
                  src="https://usa.yamaha.com/files/YMES-Class-singing-at-piano_0319659f41094489bb16fe362698d7fb.jpg"
                  alt="Music room"
                  className="about-content-image"
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="about-text-section">
                <Title level={2} className="section-title">
                  Chúng mình là...
                </Title>
                <Paragraph className="about-description">
                  <strong>SONOVA</strong> là trung tâm dạy nhạc thuần chủ mà đội
                  hình, với đội hợp âm nhạc và công nghệ để mang đến trải nghiệm
                  học tập hiện đại, thú vị. Tại <strong>SONOVA</strong> tôi xuất
                  hiện giao diện "<strong>Sony</strong>" (âm thanh) và "
                  <strong>Nova</strong>" (sự đổi mới), thể hiện sứ mệnh của
                  chúng tôi trong việc mang đến những trải nghiệm âm nhạc mới mẻ
                  và sáng tạo cho học viên.
                </Paragraph>
                <Paragraph className="about-description">
                  Người sáng lập trung tâm chúng tôi, <strong>SONOVA</strong>{" "}
                  cam kết mang đến những khóa học chuyên sâu với tài liệu phong
                  phú, đảm bảo chất lượng giảng dạy hàng đầu, giúp học viên thực
                  hiện ước mơ trở thành nghệ sĩ âm nhạc, vừa phát triển kỹ năng
                  tổng hợp.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="vision-mission">
        <div className="content-container">
          <Row gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <Card className="vision-card">
                <div className="card-header">
                  <Title level={2} className="card-title">
                    Tầm nhìn
                  </Title>
                  <div className="quote-icon left-quote">"</div>
                </div>
                <Paragraph className="card-content">
                  SONOVA hướng tới trở thành trung tâm âm nhạc hàng đầu Việt
                  Nam, nơi mọi người đều có thể tiếp cận và yêu thích âm nhạc.
                  Chúng tôi mong muốn tạo ra một cộng đồng âm nhạc sôi động và
                  năng động, nơi mà mỗi học viên đều có thể phát triển tài năng
                  và theo đuổi đam mê âm nhạc của mình một cách toàn diện và bền
                  vững.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className="mission-card">
                <div className="card-header">
                  <Title level={2} className="card-title">
                    Sứ mệnh
                  </Title>
                  <div className="quote-icon right-quote">"</div>
                </div>
                <Paragraph className="card-content">
                  SONOVA hướng tới 10 năm trung tâm âm nhạc hàng đầu Việt Nam,
                  nơi mọi người đều có thể tiếp cận và yêu thích âm nhạc. Chúng
                  tôi cam kết mang đến những khóa học chất lượng cao với phương
                  pháp giảng dạy hiện đại, giúp học viên phát triển kỹ năng âm
                  nhạc một cách toàn diện. Chúng tôi tin rằng âm nhạc có thể
                  thay đổi cuộc sống và tạo ra những giá trị tích cực cho cộng
                  đồng.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>


<section className="core-values-section">
  <div className="core-values-container">
    <div className="core-values-header">
      <h2 className="core-values-title">Giá trị cốt lõi</h2>
      <p className="core-values-description">
        SONOVA cam kết mang đến trải nghiệm học nhạc tuyệt vời, giúp học viên phát triển kỹ năng một cách toàn diện, 
        giúp học viên phát triển tài năng theo cách thú vị và hiệu quả nhất.
      </p>
    </div>

    <div className="core-values-grid">
      <div className="value-card">
        <img 
          src={gtcl1}
          alt="Tận tâm - Dedication in music teaching" 
          className="value-image"
        />
      </div>
      
      <div className="value-card">
        <img 
          src={gtcl2}
          alt="Đổi mới - Innovation in music education" 
          className="value-image"
        />
      </div>
      
      <div className="value-card">
        <img 
          src={gtcl3}
          alt="Chất lượng - Quality music instruction" 
          className="value-image"
        />
      </div>
    </div>
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
            <h3 className="teacher-name">TRẦN VĂN AN</h3>
            <p className="teacher-title">Thạc sĩ Thanh nhạc</p>

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
          <p className="teacher-details">
            Giảng viên của chúng tôi là người giàu kinh nghiệm trong việc giảng
            dạy và biểu diễn piano, guitar. Bạn sẽ được dẫn dắt qua từng giai
            đoạn, từ cách đọc hợp âm đến việc chơi các kỹ thuật phức tạp, mang
            đến cho bạn khả năng biểu diễn đa dạng từ nhạc cổ điển đến hiện đại.
          </p>
        </div>
      </div>

      <div className="testimonials-section">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Học viên nói gì?</h2>
          <p className="testimonials-subtitle">
            Tại sao những điều có thể kể về những học viên, điều có thể kết nối
            với cả quá trình học tập và học tập, ngay cả khi họ đang học mới
          </p>
        </div>

        <div className="testimonials-grid">
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
        </div>

        <div className="testimonials-footer">
          <button className="view-more-btn">Tìm hiểu thêm</button>
        </div>
      </div>

    
    <div className="learning-space-container">
  <div className="learning-space-header">
    <h2 className="main-title">Không gian học</h2>
    <h4 className="subtitle">trông như nào nhỉ?</h4>
  </div>
      <h1>Không gian học trong lành không nhỉ?</h1>
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
                Explore The World On Two Wheels
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Join our community of passionate riders and discover new
                adventures
              </Paragraph>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  
                >
                  Join Now
                </Button>
                <Button size="large">Learn More</Button>
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
                Plan Your Next Adventure
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Create detailed trip plans and share them with your riding
                buddies
              </Paragraph>
              <Button type="primary" size="large">
                Start Planning
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
                Travel with your new friends
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Your journeys start here, your stories start here
              </Paragraph>
              <Space>
                <Button type="primary" size="large">
                  Join Us
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="registration-section">
    <button className="register-button">
      Đăng ký tư vấn miễn phí
    </button>
    <p className="register-text">
      Để bắt đầu hành trình âm nhạc của bạn <strong>NGAY HÔM NAY!</strong>
    </p>
  </div>
</div>

    </div>
  );
};

export default AboutUs;
