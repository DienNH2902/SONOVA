"use client"

import { Typography, Collapse, Button } from "antd"
import { LeftOutlined, DownOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./StudentMaterial.css"

const { Title, Text } = Typography
const { Panel } = Collapse

const StudentMaterials = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/student")
  }

  const materialsData = [
    {
      key: "1",
      title: "Giới thiệu đàn Piano",
      content: (
        <div className="piano-materials-content">
          <p>
            Đàn piano là một nhạc cụ có bàn phím, được chơi bằng cách nhấn các phím để tạo ra âm thanh. Piano có 88
            phím, bao gồm 52 phím trắng và 36 phím đen.
          </p>
          <p>Đàn piano được chia thành hai loại chính: piano cơ (acoustic piano) và piano điện (digital piano).</p>
          <ul>
            <li>Piano cơ: Tạo âm thanh thông qua dây đàn và búa đập</li>
            <li>Piano điện: Tạo âm thanh thông qua công nghệ số</li>
          </ul>
        </div>
      ),
    },
    {
      key: "2",
      title: "Tư thế ngồi đàn Piano đúng tầu chuẩn thế giới",
      content: (
        <div className="piano-materials-content">
          <p>Tư thế ngồi đúng là nền tảng quan trọng để chơi piano hiệu quả và tránh chấn thương.</p>
          <h4>Các yếu tố quan trọng:</h4>
          <ul>
            <li>
              <strong>Chiều cao ghế:</strong> Khuỷu tay tạo góc 90 độ khi đặt tay lên bàn phím
            </li>
            <li>
              <strong>Khoảng cách:</strong> Ngồi cách đàn khoảng 1 gang tay
            </li>
            <li>
              <strong>Tư thế lưng:</strong> Thẳng, không dựa vào lưng ghế
            </li>
            <li>
              <strong>Chân:</strong> Đặt phẳng trên sàn hoặc bàn đạp chân
            </li>
            <li>
              <strong>Vai:</strong> Thả lỏng, không căng thẳng
            </li>
            <li>
              <strong>Cổ tay:</strong> Thẳng, không cong lên hoặc xuống
            </li>
          </ul>
          <p>
            <strong>Lưu ý:</strong> Tư thế đúng giúp bạn chơi lâu mà không mệt mỏi và phát triển kỹ thuật tốt hơn.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="piano-materials-page">
      <div className="piano-materials-container">
        {/* Back Button */}
        <div className="piano-materials-back-section">
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="piano-materials-back-button">
            Trở về
          </Button>
        </div>

        {/* Page Title */}
        <div className="piano-materials-header">
          <Title level={1} className="piano-materials-title">
            Giới thiệu đàn piano và tư thế chơi
          </Title>
        </div>

        {/* Materials Section */}
        <div className="piano-materials-section">
          <Title level={3} className="piano-materials-section-title">
            Tài liệu
          </Title>

          <Collapse
            className="piano-materials-collapse"
            expandIcon={({ isActive }) => (
              <DownOutlined rotate={isActive ? 180 : 0} className="piano-materials-expand-icon" />
            )}
            expandIconPosition="end"
          >
            {materialsData.map((item) => (
              <Panel header={item.title} key={item.key} className="piano-materials-panel">
                {item.content}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default StudentMaterials
