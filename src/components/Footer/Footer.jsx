import { Layout, Row, Col, Typography } from "antd"
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons"
import "./Footer.css"

const { Footer: AntFooter } = Layout
const { Title, Text } = Typography

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <Row className="row">
          <Col className="col">
            <div className="footer-logo">
              <Title level={3} className="footer-logo-text">
                SONOVA
              </Title>
            </div>
          </Col>

          <Col>
            <div className="footer-section-first">
              <Title level={5} className="footer-title">
                Thông tin liên hệ
              </Title>
              <div className="footer-info">
                <Text className="footer-text">
                  <strong>Địa chỉ:</strong> 299 Đường 379 phường Tăng Nhơn Phú A, Thành phố Thủ Đức, TP.HCM
                </Text>
                <br />
                <Text className="footer-text">
                  <strong>Email:</strong> musicadm@sonova.vn
                </Text>
                <br />
                <Text className="footer-text">
                  <strong>Hotline:</strong> 0909863921
                </Text>
              </div>
            </div>
          </Col>

          <Col>
            <div className="footer-section">
              <Title level={5} className="footer-title">
                Tổng quan
              </Title>
              <div className="footer-links">
                <div>
                  <a href="/about" className="footer-link">
                    Giới thiệu
                  </a>
                </div>
                <div>
                  <a href="/courses" className="footer-link">
                    Các khóa học
                  </a>
                </div>
                <div>
                  <a href="/contact" className="footer-link">
                    Liên hệ & Tư vấn
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className="footer-section">
              <Title level={5} className="footer-title">
                Các khóa học
              </Title>
              <div className="footer-links">
                <div>
                  <a href="/courses/piano" className="footer-link">
                    Piano căn bản
                  </a>
                </div>
                <div>
                  <a href="/courses/piano-advanced" className="footer-link">
                    Piano nâng cao
                  </a>
                </div>
                <div>
                  <a href="/courses/guitar" className="footer-link">
                    Guitar căn bản
                  </a>
                </div>
                <div>
                  <a href="/courses/guitar-advanced" className="footer-link">
                    Guitar nâng cao
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className="footer-section">
              <Title level={5} className="footer-title">
                Mạng xã hội
              </Title>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <FacebookOutlined /> Facebook
                </a>
                <a href="#" className="social-link">
                  <YoutubeOutlined /> Youtube
                </a>
                <a href="#" className="social-link">
                  <span className="tiktok-icon">♪</span> Tiktok
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AntFooter>
  )
}

export default Footer
