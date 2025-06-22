import { Typography, Row, Col, Card, Carousel, Space, Button } from "antd";
import { HomeOutlined, PhoneOutlined, MailOutlined, FacebookOutlined } from '@ant-design/icons'
import "./Contact.css";
import chohoang from "../../assets/chohoang.png";
import maps from "../../assets/maps.png";

const { Title, Paragraph } = Typography;

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="half-circle-container">
          <div className="half-circle">
            <img src={chohoang} alt="Piano Player" />
            <div class="text-overlay">
              <h2>Sonova</h2>
              <p>Hành trình mang đến giá trị</p>
            </div>
          </div>
        </div>
      </section>



<section className="contact-info-section">
      <div className="contact-info-container">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">
              <HomeOutlined />
            </div>
            <h3 className="contact-title">ĐỊA CHỈ</h3>
            <p className="contact-details">
              22A, D.379, P. Tăng<br />
              Nhơn Phú, TP. Thủ Đức
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <PhoneOutlined />
            </div>
            <h3 className="contact-title">SỐ ĐIỆN THOẠI</h3>
            <p className="contact-details">0908051111</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <MailOutlined />
            </div>
            <h3 className="contact-title">GMAIL</h3>
            <p className="contact-details">musican@sonova.vn</p>
          </div>

          <div className="contact-card" onClick={() => window.open("https://www.facebook.com/nentangsonova", "_blank")}>
            <div className="contact-icon">
              <FacebookOutlined />
            </div>
            <h3 className="contact-title">FACEBOOK</h3> 
            <p className="contact-details">nentangsonova</p>
          </div>
        </div>

        <div className="map-container">
          <div className="map-wrapper">
            <img src={maps} alt="SONOVA Location Map" className="map-image" />
            <div className="map-overlay">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.90782164367445!2d106.78910288995819!3d10.847605109075374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752714f9d41861%3A0x5e912f6df633586a!2zVHJ1bmcgVMOibSDDgm0gTmjhuqFjIE11c2ljIEdhcmRlbg!5e0!3m2!1svi!2s!4v1749088144395!5m2!1svi!2s"
                width="100%" 
                height="400" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="google-map">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>



    <section class="consultation-section">
  <div class="consultation-container">
    <div class="consultation-content">
      <div class="consultation-form-wrapper">
        <h2 class="form-title">Bạn cần tư vấn?</h2>
        
        <form class="consultation-form">
          <div class="form-row">
            <div class="form-group">
              <label for="fullname">Họ tên:</label>
              <input type="text" id="fullname" name="fullname" placeholder="Nhập tên của bạn" required/>
            </div>
            <div class="form-group">
              <label for="phone">Số điện thoại:</label>
              <input type="tel" id="phone" name="phone" placeholder="+84" required/>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Nhập email của bạn" required/>
          </div>
          
          <div class="form-group">
            <label for="consultation-type">Nhu cầu tư vấn:</label>
            <select id="consultation-type" name="consultation-type" required>
              <option value="">Chọn một danh mục</option>
              <option value="piano-basic">Piano cơ bản</option>
              <option value="piano-advanced">Piano nâng cao</option>
              <option value="guitar-basic">Guitar cơ bản</option>
              <option value="guitar-advanced">Guitar nâng cao</option>
              <option value="vocal">Thanh nhạc</option>
              <option value="music-theory">Lý thuyết âm nhạc</option>
              <option value="other">Khác</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="notes">Ghi chú (nếu có):</label>
            <textarea id="notes" name="notes" rows="6" placeholder="Nhập thêm thông tin bạn muốn chúng tôi biết để quá trình tư vấn hiệu quả hơn"></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Gửi</button>
        </form>
      </div>


      <div class="process-flow-wrapper">
        <h2 class="process-title">QUY TRÌNH NHẬN TƯ VẤN</h2>
        
        <div class="process-steps">
          <div class="process-step">
            <div class="step-content">
              <div class="step-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTORi_ctKAgrFQ4bbUeHwIjv21VCBG7yuv4pQ&s" alt="Fill information" />
              </div>
              <div class="step-info">
                <div class="step-header">
                  <span class="step-label">BƯỚC</span>
                  <span class="step-number">1.</span>
                </div>
                <h3 class="step-title">ĐIỀN THÔNG TIN</h3>
                <p class="step-description">Nhập họ tên, số điện thoại và nhu cầu tư vấn.</p>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-content">
              <div class="step-image">
                <img src="https://cdn.citymapia.com/kochi/g-joseph-and-associates/15750/portfolio.jpg?biz=2427" alt="Receive consultation" />
              </div>
              <div class="step-info">
                <div class="step-header">
                  <span class="step-label">BƯỚC</span>
                  <span class="step-number">2.</span>
                </div>
                <h3 class="step-title">NHẬN TƯ VẤN</h3>
                <p class="step-description">Đội ngũ SONOVA sẽ gọi điện để tư vấn khóa học phù hợp.</p>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-content">
              <div class="step-image">
                <img src="https://cms.luatvietnam.vn/uploaded/Images/Original/2019/05/23/thanh-toan-bang-the-ngan-hang_2305145132.jpg" alt="Payment" />
              </div>
              <div class="step-info">
                <div class="step-header">
                  <span class="step-label">BƯỚC</span>
                  <span class="step-number">3.</span>
                </div>
                <h3 class="step-title">THANH TOÁN</h3>
                <p class="step-description">Chọn hình thức thanh toán và hoàn tất học phí.</p>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-content">
              <div class="step-image">
                <img src={chohoang} alt="Complete" />
              </div>
              <div class="step-info">
                <div class="step-header">
                  <span class="step-label">BƯỚC</span>
                  <span class="step-number">4.</span>
                </div>
                <h3 class="step-title">HOÀN TẤT</h3>
                <p class="step-description">Xác nhận thông tin, nhận tài liệu và bắt đầu hành trình âm nhạc!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      </div>
    );
};

export default Contact;  