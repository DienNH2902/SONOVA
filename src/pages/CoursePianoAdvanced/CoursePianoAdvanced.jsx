import { Typography, Row, Col, Card, Carousel, Space, Button } from "antd";
import "../Course/Course.css";
import pianocb from "../../assets/pianocb.png";
import pianoad1 from "../../assets/pianoad1.png";
import pianoad2 from "../../assets/pianoad2.png";
import gvhd from "../../assets/gvhd.png";
import cholienhetuvan from "../../assets/cholienhetuvan.png";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const CoursePianoAdvanced = () => {
  const navigate = useNavigate();
  return (
    <div className="course-page">
      {/* Hero Section */}
      <section className="course-hero">
        <div class="half-circle-container">
          <div class="half-circle">
            <img src={pianocb} alt="Piano Player" />
            {/* <div class="text-overlay">
              <h2>Sonova</h2>
              <p>Hành trình mang đến giá trị</p>
            </div> */}
          </div>
        </div>
      </section>

      <section className="course-schedule-section">
        <div className="course-schedule-container">
          <div className="course-schedule-header">
            <h2 className="schedule-title">Lịch khai giảng</h2>
            <p className="schedule-note">
              Các lớp sẽ đóng đăng ký khi đủ số lượng học viên để đảm bảo chất
              lượng nên nếu bạn muốn học đã đúng, mong bạn thông cảm, hoặc liên
              hệ chúng mình để được hỗ trợ tốt nhất nhé!
            </p>
          </div>

          <div className="course-cards">
            <div className="course-card">
              <div className="course-image-container">
                <img
                  src={pianoad1}
                  alt="Piano hands close-up"
                  className="course-image"
                />
                <div className="course-overlay">
                  <h3 className="course-name-class">KHÓA PIANO NÂNG CAO</h3>
                  <p className="course-date">THÁNG 03/2025</p>
                </div>
              </div>

              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text-class">Học từ 04/03 đến 31/05</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🕔</span>
                  <div className="detail-text-group">
                    <span className="detail-text-class">Tối thứ 3: 18h - 19h30</span>
                    <span className="detail-text-class">Tối thứ 6: 18h - 19h30</span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📚</span>
                  <span className="detail-text-class">14 buổi học</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text-class">
                    Địa điểm: 55-299, đường 379, phường Tăng Nhơn Phú A, thành
                    phố Thủ Đức, TP.HCM
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span className="detail-text-class">Học phí: 2.500.000 VND</span>
                </div>
              </div>

              <button className="course-button full" onClick={() => navigate('/contact')}>Đã đủ học viên</button>
            </div>

            <div className="course-card">
              <div className="course-image-container">
                <img
                  src={pianoad2}
                  alt="Child playing piano"
                  className="course-image"
                />
                <div className="course-overlay">
                  <h3 className="course-name-class">KHÓA PIANO NÂNG CAO</h3>
                  <p className="course-date">THÁNG 04/2025</p>
                </div>
              </div>

              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text-class">Học từ 13/04 đến 08/06</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🕔</span>
                  <div className="detail-text-group">
                    <span className="detail-text-class">Tối thứ 4: 18h - 19h30</span>
                    <span className="detail-text-class">
                      Chiều thứ 7: 15h - 17h30
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📚</span>
                  <span className="detail-text-class">14 buổi học</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text-class">
                    Địa điểm: 55-299, đường 379, phường Tăng Nhơn Phú A, thành
                    phố Thủ Đức, TP.HCM
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span className="detail-text-class">Học phí: 2.500.000 VND</span>
                </div>
              </div>

              <button className="course-button" onClick={() => navigate('/contact')}>Đăng ký tư vấn</button>
            </div>
          </div>
        </div>
      </section>

      <section className="curriculum-section">
        <div className="curriculum-container">
          <h2 className="curriculum-title">Giáo trình khóa học</h2>

          <div className="curriculum-table-container">
            <table className="curriculum-table">
              <thead>
                <tr>
                  <th className="lesson-column">Buổi</th>
                  <th className="content-column">Nội dung</th>
                  <th className="goal-column">Mục tiêu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Buổi 1</td>
                  <td>Giới thiệu đàn piano và lý thế nhạc</td>
                  <td>Cảm nghĩ đúng, đặt tay, sử dụng ngón tay, kỹ thuật</td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 2</td>
                  <td>Nhịp điệu phím đàn và nốt nhạc</td>
                  <td>Học vị trí các nốt trên đàn và bàn nhạc</td>
                </tr>
                <tr>
                  <td>Buổi 3</td>
                  <td>Kỹ thuật chạy ngón cơ bản</td>
                  <td>
                    Luyện tập ngón với bài tập đơn giản (5 ngón, C major scale)
                  </td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 4</td>
                  <td>Chơi giai điệu đơn giản</td>
                  <td>Thực hành đọc nốt và chơi bảng tay phải</td>
                </tr>
                <tr>
                  <td>Buổi 5</td>
                  <td>Hợp âm cơ bản</td>
                  <td>
                    Giới thiệu hợp âm trưởng, hợp âm thứ, cách đánh hợp âm
                  </td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 6</td>
                  <td>Phối hợp hai tay</td>
                  <td>Tập chơi giai điệu tay phải và hợp âm tay trái</td>
                </tr>
                <tr>
                  <td>Buổi 7</td>
                  <td>Hiệp điệu và tiết tấu</td>
                  <td>
                    Luyện tập điểm nhấn, giữ nhịp giai điệu với các kỹ thuật
                  </td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 8</td>
                  <td>Chơi bài hát đơn giản</td>
                  <td>Ứng dụng các kỹ năng đã học vào một bài hát cơ bản</td>
                </tr>
                <tr>
                  <td>Buổi 9</td>
                  <td>Kỹ hiệu nhạc lý quan trọng</td>
                  <td>Học về dấu nhấn dài, dấu hóa, dấu lặng</td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 10</td>
                  <td>Chuyển hợp âm mượt mà</td>
                  <td>Luyện cách chuyển đổi hợp âm mượt và đúng nhịp</td>
                </tr>
                <tr>
                  <td>Buổi 11</td>
                  <td>Cách đánh pedal cơ bản</td>
                  <td>Giới thiệu và hướng dẫn sử dụng pedal sustain</td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 12</td>
                  <td>Cải thiện kỹ thuật và cảm âm</td>
                  <td>
                    Nghe và chơi lại các giai điệu đơn giản, phát triển cảm âm
                  </td>
                </tr>
                <tr>
                  <td>Buổi 13</td>
                  <td>Chuẩn bị bài biểu diễn</td>
                  <td>Luyện tập một bài nhạc hoàn chỉnh theo ý thích</td>
                </tr>
                <tr className="alternate-row">
                  <td>Buổi 14</td>
                  <td>Biểu diễn và đánh giá</td>
                  <td>
                    Trình diễn bài đã luyện, nhận xét và hướng dẫn cải thiện
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="instructor-section">
        <div class="instructor-container">
          <h2 class="instructor-title">
            Giảng viên hướng dẫn
            <span class="instructor-subtitle">lớp mình đâu?</span>
          </h2>

          <div class="instructor-content">
            <div class="instructor-image">
              <img
                src={gvhd}
                alt="Giảng viên và học sinh"
              />
            </div>

            <div class="instructor-description">
              <p>
                <span style={{ fontSize: "24px" }}>👋</span>
                Xin chào, mình là An
              </p>
              <p>
                Mình là giảng viên dạy âm nhạc tại các trường THCS và THPT, với
                hơn 10 năm kinh nghiệm giảng dạy. Công việc này không chỉ mang
                lại cho mình niềm vui mà còn giúp mình có cơ hội chia sẻ kiến
                thức và đam mê âm nhạc với các bạn học sinh.
              </p>

              <p>
                Trong suốt hành trình giảng dạy, mình đã có cơ hội làm việc với
                nhiều thế hệ học sinh, chứng kiến sự trưởng thành của các em qua
                từng bài học. Điều này thôi thúc mình không ngừng tìm tòi, sáng
                tạo những phương pháp giảng dạy hiệu quả để giúp các em phát
                triển kỹ năng, mà còn nuôi dưỡng tâm hồn, xây dựng và sự tự tin.
              </p>

              <p>
                Bên cạnh công dạy, mình cũng không ngừng tìm hiểu, nghiên cứu
                các phương pháp giảng dạy hiện đại để giúp học sinh hiểu cần âm
                nhạc một cách dễ dàng và thú vị hơn.
              </p>

              <p>
                Mình tin rằng mỗi người đều có thể năng cảm thụ và tạo hiện âm
                nhạc theo cách riêng của mình. Vì vậy, trong khóa học này, mình
                sẽ đồng hành cùng các bạn, giúp các bạn khám phá và phát triển
                thế năng của bản thân một cách tối ưu.
              </p>

              <p class="instructor-highlight">
                Rất mong được cùng các bạn bắt đầu hành trình học đây cùm mình
                và ý nghĩa! 🎵
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="target-audience-section">
        <div class="target-container">
          <h2 class="target-title">Khóa học này dành cho ai?</h2>

          <p class="target-intro">
            Khóa học sẽ giúp học viên phát triển kỹ thuật tay, vững vàng, hiểu
            cấu trúc về âm nhạc và nâng cao khả năng biểu diễn một cách tự tin
            và chuyên nghiệp.
          </p>

          <div class="target-list">
            <div class="target-item">
              <span class="check-icon">✓</span>
              Học viên đã hoàn thành chương trình piano cơ bản và muốn phát
              triển kỹ năng chuyên sâu.
            </div>

            <div class="target-item">
              <span class="check-icon">✓</span>
              Học sinh, sinh viên chuyên ngành âm nhạc hoặc có định hướng thi
              vào các trường Trung - Phổ thông.
            </div>

            <div class="target-item">
              <span class="check-icon">✓</span>
              Người chơi ban chuyên hoặc chuyên nghiệp muốn luyện tập thuật, tốc
              độ, cảm xúc và phong cách trình diễn.
            </div>

            <div class="target-item">
              <span class="check-icon">✓</span>
              Những ai muốn chinh phục các tác phẩm phức tạp hơn, mở rộng thể
              loại từ cổ điển, jazz đến hiện đại năng cao.
            </div>
          </div>
        </div>
      </section>

      <section class="faq-section">
        <div class="faq-container">
          <h2 class="faq-title">Câu hỏi thường gặp</h2>

          <div class="faq-list">
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>
                  Mình thấy các khóa cấp khối giảng đều đã full học viên, có
                  cách nào để mình học luôn được không?
                </span>
                <span class="faq-icon">▼</span>
              </div>
              <div class="faq-answer">
                <p>
                  Khi các lớp đã đầy, bạn có thể đăng ký vào danh sách chờ.
                  Chúng tôi sẽ ưu tiên liên hệ với bạn khi có suất trống hoặc
                  khi mở lớp mới. Ngoài ra, bạn cũng có thể tham khảo các khóa
                  học online hoặc lớp học riêng với giảng viên.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>
                  Mình đã đăng ký rồi nhưng thi khối giảng bận không học được,
                  mình phải làm sao?
                </span>
                <span class="faq-icon">▼</span>
              </div>
              <div class="faq-answer">
                <p>
                  Bạn có thể liên hệ với chúng tôi để chuyển sang lớp khác có
                  lịch học phù hợp hoặc tạm hoãn khóa học. Chúng tôi sẽ hỗ trợ
                  bạn tìm giải pháp tốt nhất mà không mất phí đăng ký.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>
                  Mình đã học qua Piano nhưng không biết rõ trình độ mình có
                  thích hợp để học khóa này không?
                </span>
                <span class="faq-icon">▼</span>
              </div>
              <div class="faq-answer">
                <p>
                  Chúng tôi có buổi đánh giá trình độ miễn phí để xác định khóa
                  học phù hợp nhất với bạn. Bạn có thể đăng ký lịch hẹn để được
                  giảng viên tư vấn trực tiếp về trình độ và lộ trình học tập.
                </p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>
                  Khóa học có hỗ trợ bài giảng, tài liệu online không?
                </span>
                <span class="faq-icon">▼</span>
              </div>
              <div class="faq-answer">
                <p>
                  Có, tất cả học viên sẽ được cung cấp tài liệu học tập online,
                  video bài giảng và có thể truy cập hệ thống học tập 24/7. Bạn
                  cũng sẽ nhận được sheet nhạc và bài tập thực hành qua email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-consultation-section">
        <div class="contact-container">
          <div class="contact-content">
            <div class="contact-text">
              <h2 class="contact-title-course">Đăng ký học ngay</h2>
              <p class="contact-description">
                Để hiểu rõ hơn về khóa học và đảm bảo đây là quyết định của của
                mình, bạn hãy dành ít phút điền form tư vấn. Đội ngũ tư vấn sẽ
                nhận được liên hệ, giải đáp mọi thắc mắc và giúp bạn chọn lộ
                trình học phù hợp nhất!
              </p>
              <div class="contact-hotline">
                <p>
                  Hoặc liên hệ <strong>Hotline</strong> để được hỗ trợ sớm nhất:{" "}
                  <strong>0375044354</strong>
                </p>
              </div>
              <button class="consultation-btn" onClick={() => navigate("/contact")}>Đăng ký học ngay</button>
            </div>
            <div class="contact-illustration">
              <img
                src={cholienhetuvan}
                alt="Consultation illustration"
                class="illustration-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursePianoAdvanced;
