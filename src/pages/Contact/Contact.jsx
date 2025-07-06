// import { Typography, Row, Col, Card, Carousel, Space, Button } from "antd";
// import {
//   HomeOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   FacebookOutlined,
// } from "@ant-design/icons";
// import "./Contact.css";
// import qttv from "../../assets/quytrinhtuvan.png";
// import contact from "../../assets/contact.jpg";

// import maps from "../../assets/maps.png";
// import "../../assets/font.css";

// const { Title, Paragraph } = Typography;

// const Contact = () => {
//   return (
//     <div className="contact-page">
//       {/* Hero Section */}
//       <section className="contact-hero">
//         <div className="half-circle-container">
//           <div className="half-circle">
//             <img src={contact} alt="Nhan vien tu van" />
//             {/* <div class="text-overlay">
//               <h2>Sonova</h2>
//               <p>Hành trình mang đến giá trị</p>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       <section className="contact-info-section">
//         <div className="contact-info-container">
//           <div className="contact-cards">
//             <div className="contact-card">
//               <div className="contact-icon">
//                 <PhoneOutlined />
//               </div>
//               <h3
//                 className="contact-title"
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "20px",
//                   fontFamily: "UTM Americana",
//                 }}
//               >
//                 SỐ ĐIỆN THOẠI
//               </h3>
//               <p
//                 className="contact-details"
//                 style={{
//                   fontWeight: "400",
//                   fontSize: "18px",
//                   fontFamily: "Gilroy",
//                 }}
//               >
//                 0908051111
//               </p>
//             </div>

//             <div className="contact-card">
//               <div className="contact-icon">
//                 <MailOutlined />
//               </div>
//               <h3
//                 className="contact-title"
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "20px",
//                   fontFamily: "UTM Americana",
//                 }}
//               >
//                 GMAIL
//               </h3>
//               <p
//                 className="contact-details"
//                 style={{
//                   fontWeight: "400",
//                   fontSize: "18px",
//                   fontFamily: "Gilroy",
//                 }}
//               >
//                 musican@sonova.vn
//               </p>
//             </div>

//             <div
//               className="contact-card"
//               onClick={() =>
//                 window.open("https://www.facebook.com/nentangsonova", "_blank")
//               }
//             >
//               <div className="contact-icon">
//                 <FacebookOutlined />
//               </div>
//               <h3
//                 className="contact-title"
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "20px",
//                   fontFamily: "UTM Americana",
//                 }}
//               >
//                 FACEBOOK
//               </h3>
//               <p
//                 className="contact-details"
//                 style={{
//                   fontWeight: "400",
//                   fontSize: "18px",
//                   fontFamily: "Gilroy",
//                 }}
//               >
//                 nentangsonova
//               </p>
//             </div>
//             <div className="contact-card">
//               <div className="contact-icon">
//                 <HomeOutlined />
//               </div>
//               <h3
//                 className="contact-title"
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "20px",
//                   fontFamily: "UTM Americana",
//                 }}
//               >
//                 ĐỊA CHỈ
//               </h3>
//               <p
//                 className="contact-details"
//                 style={{
//                   fontWeight: "400",
//                   fontSize: "18px",
//                   fontFamily: "Gilroy",
//                 }}
//               >
//                 22A, D.379, P. Tăng
//                 <br />
//                 Nhơn Phú, TP. Thủ Đức
//               </p>
//             </div>
//           </div>

//           <div className="map-container">
//             <div className="map-wrapper">
//               <img src={maps} alt="SONOVA Location Map" className="map-image" />
//               <div className="map-overlay">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.90782164367445!2d106.78910288995819!3d10.847605109075374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752714f9d41861%3A0x5e912f6df633586a!2zVHJ1bmcgVMOibSDDgm0gTmjhuqFjIE11c2ljIEdhcmRlbg!5e0!3m2!1svi!2s!4v1749088144395!5m2!1svi!2s"
//                   width="100%"
//                   height="400"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   className="google-map"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section class="consultation-section">
//         <div class="consultation-container">
//           <div class="consultation-content">
//             <div class="consultation-form-wrapper">
//               <h2 className="h2a" style={{ color: "#1e3a5f" }}>
//                 Bạn cần tư vấn?
//               </h2>

//               <form class="consultation-form">
//                 <div class="form-row">
//                   <div class="form-group">
//                     <label for="fullname" className="h5g">
//                       Họ tên:
//                     </label>
//                     <input
//                       type="text"
//                       id="fullname"
//                       name="fullname"
//                       placeholder="Nhập tên của bạn"
//                       required
//                     />
//                   </div>
//                   <div class="form-group">
//                     <label for="phone" className="h5g">
//                       Số điện thoại:
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       placeholder="+84"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div class="form-group">
//                   <label for="email" className="h5g">
//                     Email:
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Nhập email của bạn"
//                     required
//                   />
//                 </div>

//                 <div class="form-group">
//                   <label for="consultation-type" className="h5g">
//                     Nhu cầu tư vấn:
//                   </label>
//                   <select
//                     id="consultation-type"
//                     name="consultation-type"
//                     required
//                   >
//                     <option value="">Chọn một danh mục</option>
//                     <option value="piano-basic">Piano cơ bản</option>
//                     <option value="piano-advanced">Piano nâng cao</option>
//                     <option value="guitar-basic">Guitar cơ bản</option>
//                     <option value="guitar-advanced">Guitar nâng cao</option>
//                     <option value="vocal">Thanh nhạc</option>
//                     <option value="music-theory">Lý thuyết âm nhạc</option>
//                     <option value="other">Khác</option>
//                   </select>
//                 </div>

//                 <div class="form-group">
//                   <label for="notes" className="h5g">
//                     Ghi chú (nếu có):
//                   </label>
//                   <textarea
//                     id="notes"
//                     name="notes"
//                     rows="6"
//                     placeholder="Nhập thêm thông tin bạn muốn chúng tôi biết để quá trình tư vấn hiệu quả hơn"
//                   ></textarea>
//                 </div>

//                 <button type="submit" class="submit-btn">
//                   Gửi
//                 </button>
//               </form>
//             </div>

//             <div class="process-flow-wrapper">
//               {/* <h2 class="process-title">QUY TRÌNH NHẬN TƯ VẤN</h2>
        
//         <div class="process-steps">
//           <div class="process-step">
//             <div class="step-content">
//               <div class="step-image">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTORi_ctKAgrFQ4bbUeHwIjv21VCBG7yuv4pQ&s" alt="Fill information" />
//               </div>
//               <div class="step-info">
//                 <div class="step-header">
//                   <span class="step-label">BƯỚC</span>
//                   <span class="step-number">1.</span>
//                 </div>
//                 <h3 class="step-title">ĐIỀN THÔNG TIN</h3>
//                 <p class="step-description">Nhập họ tên, số điện thoại và nhu cầu tư vấn.</p>
//               </div>
//             </div>
//           </div>

//           <div class="process-step">
//             <div class="step-content">
//               <div class="step-image">
//                 <img src="https://cdn.citymapia.com/kochi/g-joseph-and-associates/15750/portfolio.jpg?biz=2427" alt="Receive consultation" />
//               </div>
//               <div class="step-info">
//                 <div class="step-header">
//                   <span class="step-label">BƯỚC</span>
//                   <span class="step-number">2.</span>
//                 </div>
//                 <h3 class="step-title">NHẬN TƯ VẤN</h3>
//                 <p class="step-description">Đội ngũ SONOVA sẽ gọi điện để tư vấn khóa học phù hợp.</p>
//               </div>
//             </div>
//           </div>

//           <div class="process-step">
//             <div class="step-content">
//               <div class="step-image">
//                 <img src="https://cms.luatvietnam.vn/uploaded/Images/Original/2019/05/23/thanh-toan-bang-the-ngan-hang_2305145132.jpg" alt="Payment" />
//               </div>
//               <div class="step-info">
//                 <div class="step-header">
//                   <span class="step-label">BƯỚC</span>
//                   <span class="step-number">3.</span>
//                 </div>
//                 <h3 class="step-title">THANH TOÁN</h3>
//                 <p class="step-description">Chọn hình thức thanh toán và hoàn tất học phí.</p>
//               </div>
//             </div>
//           </div>

//           <div class="process-step">
//             <div class="step-content">
//               <div class="step-image">
//                 <img src="https://t3.ftcdn.net/jpg/02/01/30/82/360_F_201308263_ylhTkL69sCEDKWXlXu2S4rumX4JZqb4f.jpg" alt="Complete" />
//               </div>
//               <div class="step-info">
//                 <div class="step-header">
//                   <span class="step-label">BƯỚC</span>
//                   <span class="step-number">4.</span>
//                 </div>
//                 <h3 class="step-title">HOÀN TẤT</h3>
//                 <p class="step-description">Xác nhận thông tin, nhận tài liệu và bắt đầu hành trình âm nhạc!</p>
//               </div>
//             </div>
//           </div>
//         </div> */}

//               <img
//                 src={qttv}
//                 alt="Quy trình tư vấn"
//                 className="process-image"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;








import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Carousel,
  Space,
  Button,
  Form, // Import Form from Ant Design
  Input, // Import Input from Ant Design
  Select, // Import Select from Ant Design
  App
} from "antd";
import {
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "./Contact.css";
import qttv from "../../assets/quytrinhtuvan.png";
import contact from "../../assets/contact.jpg";

import maps from "../../assets/maps.png";
import "../../assets/font.css";

const { Title, Paragraph } = Typography;
const { Option } = Select; // Destructure Option from Select

const Contact = () => {
  const {message} = App.useApp(); // Use message from Ant Design for notifications
  const [form] = Form.useForm(); // Initialize Ant Design form hook
  const [consultationTopics, setConsultationTopics] = useState([]);
  const hasFetchedTopics = useRef(false);

  // Fetch consultation topics when component mounts
  useEffect(() => {
    if (hasFetchedTopics.current) return; // Prevent re-fetching on re-renders
    hasFetchedTopics.current = true;

    const fetchConsultationTopics = async () => {
      try {
        const response = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationTopic"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API returns a structure like { "$id": "1", "$values": [...] }
        setConsultationTopics(data.$values || []);
      } catch (error) {
        console.error("Error fetching consultation topics:", error);
        message.error("Không thể tải danh mục tư vấn.");
      }
    };

    fetchConsultationTopics();
  }, []); // Empty dependency array means this runs once on mount

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const payload = {
      fullname: values.fullname,
      contactNumber: values.contactNumber,
      email: values.email,
      note: values.note || "", // `note` can be empty string if not provided
      consultationTopicId: values.consultationTopicId,
    };

    try {
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        message.success("Yêu cầu tư vấn của bạn đã được gửi thành công!");
        form.resetFields(); // Clear form fields on success
      } else {
        const errorData = await response.json();
        console.error("API submission error:", errorData);
        message.error(`Gửi yêu cầu thất bại: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Network or submission error:", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu tư vấn. Vui lòng thử lại.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Vui lòng điền đầy đủ và đúng định dạng các trường bắt buộc.");
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="half-circle-container">
          <div className="half-circle">
            <img src={contact} alt="Nhan vien tu van" />
          </div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="contact-info-container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <PhoneOutlined />
              </div>
              <h3
                className="contact-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "UTM Americana",
                }}
              >
                SỐ ĐIỆN THOẠI
              </h3>
              <p
                className="contact-details"
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                }}
              >
                0908051111
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MailOutlined />
              </div>
              <h3
                className="contact-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "UTM Americana",
                }}
              >
                GMAIL
              </h3>
              <p
                className="contact-details"
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                }}
              >
                musican@sonova.vn
              </p>
            </div>

            <div
              className="contact-card"
              onClick={() =>
                window.open("https://www.facebook.com/nentangsonova", "_blank")
              }
            >
              <div className="contact-icon">
                <FacebookOutlined />
              </div>
              <h3
                className="contact-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "UTM Americana",
                }}
              >
                FACEBOOK
              </h3>
              <p
                className="contact-details"
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                }}
              >
                nentangsonova
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <HomeOutlined />
              </div>
              <h3
                className="contact-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "UTM Americana",
                }}
              >
                ĐỊA CHỈ
              </h3>
              <p
                className="contact-details"
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                }}
              >
                22A, D.379, P. Tăng
                <br />
                Nhơn Phú, TP. Thủ Đức
              </p>
            </div>
          </div>

          <div className="map-container">
            <div className="map-wrapper">
              <img src={maps} alt="SONOVA Location Map" className="map-image" />
              <div className="map-overlay">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.895315354964!2d106.7725916744883!3d10.817757989332214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752601d368e737%3A0x6b2b7b5c1c0e3a6c!2zMjJBLCBExrCah_iIMzU5LCBQLiBUxINuZyBOaMW7oW4gUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIEPDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1719572459998!5m2!1svi!2s" // Updated to a valid embed link
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="google-map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-section">
        <div className="consultation-container">
          <div className="consultation-content">
            <div className="consultation-form-wrapper">
              <h2 className="h2a" style={{ color: "#1e3a5f" }}>
                Bạn cần tư vấn?
              </h2>

              {/* Ant Design Form */}
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="consultation-form" // Reuse your CSS class if needed
              >
                <div className="form-row">
                  <Form.Item
                    name="fullname"
                    label={<span className="h5g">Họ tên:</span>}
                    rules={[{ required: true, message: "Vui lòng nhập họ tên của bạn!" }]}
                    className="form-group" // Reuse your CSS class
                  >
                    <Input placeholder="Nhập tên của bạn" />
                  </Form.Item>

                  <Form.Item
                    name="contactNumber"
                    label={<span className="h5g">Số điện thoại:</span>}
                    rules={[
                      { required: true, message: "Vui lòng nhập số điện thoại!" },
                      { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }, // Basic phone number validation
                    ]}
                    className="form-group"
                  >
                    <Input placeholder="+84" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label={<span className="h5g">Email:</span>}
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                  className="form-group"
                >
                  <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item
                  name="consultationTopicId"
                  label={<span className="h5g">Nhu cầu tư vấn:</span>}
                  rules={[{ required: true, message: "Vui lòng chọn nhu cầu tư vấn!" }]}
                  className="form-group"
                >
                  <Select placeholder="Chọn một danh mục">
                    {consultationTopics.map((topic) => (
                      <Option key={topic.consultationTopicId} value={topic.consultationTopicId}>
                        {topic.consultationTopicName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="note"
                  label={<span className="h5g">Ghi chú (nếu có):</span>}
                  className="form-group"
                >
                  <Input.TextArea
                    rows={6}
                    placeholder="Nhập thêm thông tin bạn muốn chúng tôi biết để quá trình tư vấn hiệu quả hơn"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="submit-btn">
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className="process-flow-wrapper">
              <img
                src={qttv}
                alt="Quy trình tư vấn"
                className="process-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;