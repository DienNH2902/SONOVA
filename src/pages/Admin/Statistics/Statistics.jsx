import { Typography, Row, Col, Card, Button, Statistic } from "antd"
import { ArrowUpOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { Line } from "@ant-design/charts"
import "./Statistics.css"

const { Title, Text } = Typography

const Statistics = () => {
  // Data for the first chart - Student registration trend
  const studentTrendData = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 12 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 18 },
    { month: "May", value: 22 },
    { month: "Jun", value: 25 },
  ]

  // Data for Piano revenue analysis
  const pianoRevenueData = [
    { month: "Jan", value: 20000000 },
    { month: "Feb", value: 22000000 },
    { month: "Mar", value: 24000000 },
    { month: "Apr", value: 25000000 },
    { month: "May", value: 27000000 },
    { month: "Jun", value: 28000000 },
  ]

  // Data for Guitar revenue analysis
  const guitarRevenueData = [
    { month: "Jan", value: 15000000 },
    { month: "Feb", value: 15000000 },
    { month: "Mar", value: 16000000 },
    { month: "Apr", value: 17000000 },
    { month: "May", value: 18000000 },
    { month: "Jun", value: 20000000 },
  ]

  // Configuration for the first chart
  const studentConfig = {
    data: studentTrendData,
    height: 200,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#FFD700",
        stroke: "#FFD700",
      },
    },
    line: {
      style: {
        stroke: "#FFD700",
        lineWidth: 3,
      },
    },
    smooth: true,
    yAxis: {
      min: 0,
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineDash: [4, 4],
          },
        },
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#FFD700",
          fill: "#FFD700",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  }

  // Configuration for Piano revenue chart
  const pianoRevenueConfig = {
    data: pianoRevenueData,
    height: 200,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#1890ff",
        stroke: "#1890ff",
      },
    },
    line: {
      style: {
        stroke: "#1890ff",
        lineWidth: 3,
      },
    },
    smooth: true,
    yAxis: {
      min: 0,
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineDash: [4, 4],
          },
        },
      },
      label: {
        formatter: (v) => {
          return `${v / 1000}k`
        },
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum) => {
        return { name: datum.month, value: formatCurrency(datum.value) }
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#1890ff",
          fill: "#1890ff",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
    area: {
      style: {
        fill: "l(270) 0:#1890ff33 1:#1890ff11",
      },
    },
  }

  // Configuration for Guitar revenue chart
  const guitarRevenueConfig = {
    data: guitarRevenueData,
    height: 200,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#52c41a",
        stroke: "#52c41a",
      },
    },
    line: {
      style: {
        stroke: "#52c41a",
        lineWidth: 3,
      },
    },
    smooth: true,
    yAxis: {
      min: 0,
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineDash: [4, 4],
          },
        },
      },
      label: {
        formatter: (v) => {
          return `${v / 1000}k`
        },
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum) => {
        return { name: datum.month, value: formatCurrency(datum.value) }
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#52c41a",
          fill: "#52c41a",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
    area: {
      style: {
        fill: "l(270) 0:#52c41a33 1:#52c41a11",
      },
    },
  }

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="statistics-page">
      <div className="statistics-container">
        <Title level={1} className="page-title">
          Thống kê
        </Title>

        {/* Monthly Statistics Section */}
        <div className="section">
          <div className="section-header">
            <Text className="section-title">Thống kê tháng</Text>
            <div className="month-selector">
              <Button type="primary" icon={<ArrowLeftOutlined />} className="month-nav-btn" />
              <Text className="current-month">Tháng 12/2023</Text>
              <Button type="primary" icon={<ArrowRightOutlined />} className="month-nav-btn" />
            </div>
          </div>

          <Row gutter={[24, 24]} className="stats-cards">
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <div className="stat-icon student-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.90625 20.2491C3.82775 18.6531 5.1537 17.3278 6.75 16.4064C8.3463 15.485 10.1547 15 12 15C13.8453 15 15.6537 15.4851 17.25 16.4065C18.8463 17.3279 20.1722 18.6533 21.0938 20.2493"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-content">
                  <Text className="stat-label">Tổng số học sinh</Text>
                  <Title level={3} className="stat-value">
                    120
                  </Title>
                  <div className="stat-change positive">
                    <ArrowUpOutlined />
                    <Text>+10% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <div className="stat-icon revenue-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 1V23"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-content">
                  <Text className="stat-label">Doanh thu tháng</Text>
                  <Title level={3} className="stat-value">
                    48.000.000 VND
                  </Title>
                  <div className="stat-change positive">
                    <ArrowUpOutlined />
                    <Text>+6.7% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <div className="stat-icon new-student-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 8V14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 11H17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-content">
                  <Text className="stat-label">Học viên mới</Text>
                  <Title level={3} className="stat-value">
                    15
                  </Title>
                  <div className="stat-change positive">
                    <ArrowUpOutlined />
                    <Text>+20% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <div className="stat-icon registration-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-content">
                  <Text className="stat-label">Số lượng đăng ký tư vấn</Text>
                  <Title level={3} className="stat-value">
                    20
                  </Title>
                  <div className="stat-change positive">
                    <ArrowUpOutlined />
                    <Text>+5% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Student Registration Trend Section */}
        <div className="section chart-section">
          <div className="section-header">
            <Text className="section-title">Xu hướng đăng ký học viên</Text>
            <div className="month-selector">
              <Button type="primary" icon={<ArrowLeftOutlined />} className="month-nav-btn" />
              <Text className="current-month">Tháng 12/2023</Text>
              <Button type="primary" icon={<ArrowRightOutlined />} className="month-nav-btn" />
            </div>
          </div>

          <div className="chart-container">
            <Line {...studentConfig} />
          </div>

          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Học viên mới" value={15} />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Khóa học hoàn thành" value={3} />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Piano Revenue Analysis Section */}
        <div className="section chart-section">
          <div className="section-header">
            <Text className="section-title">Phân tích doanh thu Piano</Text>
            <div className="month-selector">
              <Button type="primary" icon={<ArrowLeftOutlined />} className="month-nav-btn" />
              <Text className="current-month">Tháng 12/2023</Text>
              <Button type="primary" icon={<ArrowRightOutlined />} className="month-nav-btn" />
            </div>
          </div>

          <div className="chart-container">
            <Line {...pianoRevenueConfig} />
          </div>

          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Doanh thu Piano" value="28.000.000 VND" />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic
                  title="Tăng"
                  value="3.7%"
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="so với tháng trước"
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Guitar Revenue Analysis Section */}
        <div className="section chart-section">
          <div className="section-header">
            <Text className="section-title">Phân tích doanh thu Guitar</Text>
            <div className="month-selector">
              <Button type="primary" icon={<ArrowLeftOutlined />} className="month-nav-btn" />
              <Text className="current-month">Tháng 12/2023</Text>
              <Button type="primary" icon={<ArrowRightOutlined />} className="month-nav-btn" />
            </div>
          </div>

          <div className="chart-container">
            <Line {...guitarRevenueConfig} />
          </div>

          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Doanh thu Guitar" value="20.000.000 VND" />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic
                  title="Tăng"
                  value="11.1%"
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="so với tháng trước"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Statistics
