// "use client"

// import { Typography, Row, Col, Card, Button, Statistic } from "antd"
// import { ArrowUpOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowDownOutlined } from "@ant-design/icons"
// import { Line } from "@ant-design/charts"
// import { useState, useEffect } from "react"
// import "./Statistics.css"

// const { Title, Text } = Typography

// const Statistics = () => {
//   const [statisticsData, setStatisticsData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

//   // Fetch data from API
//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Statistic")
//         const data = await response.json()

//         // Sort data by date
//         const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))
//         setStatisticsData(sortedData)
//         setCurrentWeekIndex(sortedData.length - 1) // Set to latest week
//       } catch (error) {
//         console.error("Error fetching statistics:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStatistics()
//   }, [])

//   // Helper function to format date to week display
//   const formatWeekDisplay = (dateString) => {
//     const date = new Date(dateString)
//     const weekNumber = Math.ceil(date.getDate() / 7)
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()
//     return `Tuần ${weekNumber}/${month}/${year}`
//   }

//   // Helper function to calculate percentage change
//   const calculatePercentageChange = (current, previous) => {
//     if (!previous || previous === 0) return { value: 0, isPositive: true }
//     const change = ((current - previous) / previous) * 100
//     return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 }
//   }

//   // Get current and previous week data
//   const currentWeekData = statisticsData[currentWeekIndex] || {}
//   const previousWeekData = statisticsData[currentWeekIndex - 1] || {}

//   // Calculate changes
//   const studentsChange = calculatePercentageChange(currentWeekData.totalStudents, previousWeekData.totalStudents)
//   const newStudentsChange = calculatePercentageChange(currentWeekData.newStudents, previousWeekData.newStudents)
//   const consultationChange = calculatePercentageChange(
//     currentWeekData.consultationRequestCount,
//     previousWeekData.consultationRequestCount,
//   )

//   // Prepare chart data for student trend
//   const studentTrendData = statisticsData.map((item, index) => ({
//     week: `T${index + 1}`,
//     value: item.totalStudents || 0,
//     date: item.date,
//   }))

//   // Prepare chart data for Piano classes
//   const pianoClassData = statisticsData.map((item, index) => ({
//     week: `T${index + 1}`,
//     value: item.totalPianoClass || 0,
//     date: item.date,
//   }))

//   // Prepare chart data for Guitar classes
//   const guitarClassData = statisticsData.map((item, index) => ({
//     week: `T${index + 1}`,
//     value: item.totalGuitarClass || 0,
//     date: item.date,
//   }))

//   // Configuration for the student trend chart
//   const studentConfig = {
//     data: studentTrendData,
//     height: 200,
//     xField: "week",
//     yField: "value",
//     point: {
//       size: 5,
//       shape: "circle",
//       style: {
//         fill: "#FFD700",
//         stroke: "#FFD700",
//       },
//     },
//     line: {
//       style: {
//         stroke: "#FFD700",
//         lineWidth: 3,
//       },
//     },
//     smooth: true,
//     yAxis: {
//       min: 0,
//       grid: {
//         line: {
//           style: {
//             stroke: "#eee",
//             lineDash: [4, 4],
//           },
//         },
//       },
//     },
//     xAxis: {
//       grid: {
//         line: {
//           style: {
//             stroke: "transparent",
//           },
//         },
//       },
//     },
//     tooltip: {
//       showMarkers: false,
//     },
//     state: {
//       active: {
//         style: {
//           shadowBlur: 4,
//           stroke: "#FFD700",
//           fill: "#FFD700",
//         },
//       },
//     },
//     interactions: [
//       {
//         type: "marker-active",
//       },
//     ],
//   }

//   // Configuration for Piano classes chart
//   const pianoClassConfig = {
//     data: pianoClassData,
//     height: 200,
//     xField: "week",
//     yField: "value",
//     point: {
//       size: 5,
//       shape: "circle",
//       style: {
//         fill: "#1890ff",
//         stroke: "#1890ff",
//       },
//     },
//     line: {
//       style: {
//         stroke: "#1890ff",
//         lineWidth: 3,
//       },
//     },
//     smooth: true,
//     yAxis: {
//       min: 0,
//       grid: {
//         line: {
//           style: {
//             stroke: "#eee",
//             lineDash: [4, 4],
//           },
//         },
//       },
//     },
//     xAxis: {
//       grid: {
//         line: {
//           style: {
//             stroke: "transparent",
//           },
//         },
//       },
//     },
//     tooltip: {
//       showMarkers: false,
//     },
//     state: {
//       active: {
//         style: {
//           shadowBlur: 4,
//           stroke: "#1890ff",
//           fill: "#1890ff",
//         },
//       },
//     },
//     interactions: [
//       {
//         type: "marker-active",
//       },
//     ],
//     area: {
//       style: {
//         fill: "l(270) 0:#1890ff33 1:#1890ff11",
//       },
//     },
//   }

//   // Configuration for Guitar classes chart
//   const guitarClassConfig = {
//     data: guitarClassData,
//     height: 200,
//     xField: "week",
//     yField: "value",
//     point: {
//       size: 5,
//       shape: "circle",
//       style: {
//         fill: "#52c41a",
//         stroke: "#52c41a",
//       },
//     },
//     line: {
//       style: {
//         stroke: "#52c41a",
//         lineWidth: 3,
//       },
//     },
//     smooth: true,
//     yAxis: {
//       min: 0,
//       grid: {
//         line: {
//           style: {
//             stroke: "#eee",
//             lineDash: [4, 4],
//           },
//         },
//       },
//     },
//     xAxis: {
//       grid: {
//         line: {
//           style: {
//             stroke: "transparent",
//           },
//         },
//       },
//     },
//     tooltip: {
//       showMarkers: false,
//     },
//     state: {
//       active: {
//         style: {
//           shadowBlur: 4,
//           stroke: "#52c41a",
//           fill: "#52c41a",
//         },
//       },
//     },
//     interactions: [
//       {
//         type: "marker-active",
//       },
//     ],
//     area: {
//       style: {
//         fill: "l(270) 0:#52c41a33 1:#52c41a11",
//       },
//     },
//   }

//   // Navigation functions
//   const goToPreviousWeek = () => {
//     if (currentWeekIndex > 0) {
//       setCurrentWeekIndex(currentWeekIndex - 1)
//     }
//   }

//   const goToNextWeek = () => {
//     if (currentWeekIndex < statisticsData.length - 1) {
//       setCurrentWeekIndex(currentWeekIndex + 1)
//     }
//   }

//   if (loading) {
//     return <div className="statistics-page">Đang tải dữ liệu...</div>
//   }

//   return (
//     <div className="statistics-page">
//       <div className="statistics-container">
//         <Title level={1} className="page-title">
//           Thống kê
//         </Title>

//         {/* Weekly Statistics Section */}
//         <div className="section">
//           <div className="section-header">
//             <Text className="section-title">Thống kê tuần</Text>
//             <div className="month-selector">
//               <Button
//                 type="primary"
//                 icon={<ArrowLeftOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToPreviousWeek}
//                 disabled={currentWeekIndex === 0}
//               />
//               <Text className="current-month">
//                 {currentWeekData.date ? formatWeekDisplay(currentWeekData.date) : "Không có dữ liệu"}
//               </Text>
//               <Button
//                 type="primary"
//                 icon={<ArrowRightOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToNextWeek}
//                 disabled={currentWeekIndex === statisticsData.length - 1}
//               />
//             </div>
//           </div>
//           <Row gutter={[24, 24]} className="stats-cards">
//             <Col xs={24} sm={12} lg={8}>
//               <Card className="stat-card">
//                 <div className="stat-icon student-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M2.90625 20.2491C3.82775 18.6531 5.1537 17.3278 6.75 16.4064C8.3463 15.485 10.1547 15 12 15C13.8453 15 15.6537 15.4851 17.25 16.4065C18.8463 17.3279 20.1722 18.6533 21.0938 20.2493"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <Text className="stat-label">Tổng số học sinh</Text>
//                   <Title level={3} className="stat-value">
//                     {currentWeekData.totalStudents || 0}
//                   </Title>
//                   <div className={`stat-change ${studentsChange.isPositive ? "positive" : "negative"}`}>
//                     {studentsChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
//                     <Text>{studentsChange.value}% so với tuần trước</Text>
//                   </div>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} lg={8}>
//               <Card className="stat-card">
//                 <div className="stat-icon new-student-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M20 8V14"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M23 11H17"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <Text className="stat-label">Học viên mới</Text>
//                   <Title level={3} className="stat-value">
//                     {currentWeekData.newStudents || 0}
//                   </Title>
//                   <div className={`stat-change ${newStudentsChange.isPositive ? "positive" : "negative"}`}>
//                     {newStudentsChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
//                     <Text>{newStudentsChange.value}% so với tuần trước</Text>
//                   </div>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} lg={8}>
//               <Card className="stat-card">
//                 <div className="stat-icon registration-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div className="stat-content">
//                   <Text className="stat-label">Số lượng đăng ký tư vấn</Text>
//                   <Title level={3} className="stat-value">
//                     {currentWeekData.consultationRequestCount || 0}
//                   </Title>
//                   <div className={`stat-change ${consultationChange.isPositive ? "positive" : "negative"}`}>
//                     {consultationChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
//                     <Text>{consultationChange.value}% so với tuần trước</Text>
//                   </div>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         {/* Student Registration Trend Section */}
//         <div className="section chart-section">
//           <div className="section-header">
//             <Text className="section-title">Xu hướng đăng ký học viên</Text>
//             <div className="month-selector">
//               <Button
//                 type="primary"
//                 icon={<ArrowLeftOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToPreviousWeek}
//                 disabled={currentWeekIndex === 0}
//               />
//               <Text className="current-month">
//                 {currentWeekData.date ? formatWeekDisplay(currentWeekData.date) : "Không có dữ liệu"}
//               </Text>
//               <Button
//                 type="primary"
//                 icon={<ArrowRightOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToNextWeek}
//                 disabled={currentWeekIndex === statisticsData.length - 1}
//               />
//             </div>
//           </div>
//           <div className="chart-container">
//             <Line {...studentConfig} />
//           </div>
//           <Row gutter={[24, 24]} className="chart-summary">
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic title="Học viên mới" value={currentWeekData.newStudents || 0} />
//               </Card>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic
//                   title="Tổng lớp học"
//                   value={(currentWeekData.totalPianoClass || 0) + (currentWeekData.totalGuitarClass || 0)}
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         {/* Piano Classes Analysis Section */}
//         <div className="section chart-section">
//           <div className="section-header">
//             <Text className="section-title">Phân tích lớp học Piano</Text>
//             <div className="month-selector">
//               <Button
//                 type="primary"
//                 icon={<ArrowLeftOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToPreviousWeek}
//                 disabled={currentWeekIndex === 0}
//               />
//               <Text className="current-month">
//                 {currentWeekData.date ? formatWeekDisplay(currentWeekData.date) : "Không có dữ liệu"}
//               </Text>
//               <Button
//                 type="primary"
//                 icon={<ArrowRightOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToNextWeek}
//                 disabled={currentWeekIndex === statisticsData.length - 1}
//               />
//             </div>
//           </div>
//           <div className="chart-container">
//             <Line {...pianoClassConfig} />
//           </div>
//           <Row gutter={[24, 24]} className="chart-summary">
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic title="Lớp học Piano" value={currentWeekData.totalPianoClass || 0} />
//               </Card>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic
//                   title="Tăng"
//                   value={`${calculatePercentageChange(currentWeekData.totalPianoClass, previousWeekData.totalPianoClass).value}%`}
//                   valueStyle={{
//                     color: calculatePercentageChange(currentWeekData.totalPianoClass, previousWeekData.totalPianoClass)
//                       .isPositive
//                       ? "#3f8600"
//                       : "#cf1322",
//                   }}
//                   prefix={
//                     calculatePercentageChange(currentWeekData.totalPianoClass, previousWeekData.totalPianoClass)
//                       .isPositive ? (
//                       <ArrowUpOutlined />
//                     ) : (
//                       <ArrowDownOutlined />
//                     )
//                   }
//                   suffix="so với tuần trước"
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         {/* Guitar Classes Analysis Section */}
//         <div className="section chart-section">
//           <div className="section-header">
//             <Text className="section-title">Phân tích lớp học Guitar</Text>
//             <div className="month-selector">
//               <Button
//                 type="primary"
//                 icon={<ArrowLeftOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToPreviousWeek}
//                 disabled={currentWeekIndex === 0}
//               />
//               <Text className="current-month">
//                 {currentWeekData.date ? formatWeekDisplay(currentWeekData.date) : "Không có dữ liệu"}
//               </Text>
//               <Button
//                 type="primary"
//                 icon={<ArrowRightOutlined />}
//                 className="month-nav-btn"
//                 onClick={goToNextWeek}
//                 disabled={currentWeekIndex === statisticsData.length - 1}
//               />
//             </div>
//           </div>
//           <div className="chart-container">
//             <Line {...guitarClassConfig} />
//           </div>
//           <Row gutter={[24, 24]} className="chart-summary">
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic title="Lớp học Guitar" value={currentWeekData.totalGuitarClass || 0} />
//               </Card>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Card className="summary-card">
//                 <Statistic
//                   title="Tăng"
//                   value={`${calculatePercentageChange(currentWeekData.totalGuitarClass, previousWeekData.totalGuitarClass).value}%`}
//                   valueStyle={{
//                     color: calculatePercentageChange(
//                       currentWeekData.totalGuitarClass,
//                       previousWeekData.totalGuitarClass,
//                     ).isPositive
//                       ? "#3f8600"
//                       : "#cf1322",
//                   }}
//                   prefix={
//                     calculatePercentageChange(currentWeekData.totalGuitarClass, previousWeekData.totalGuitarClass)
//                       .isPositive ? (
//                       <ArrowUpOutlined />
//                     ) : (
//                       <ArrowDownOutlined />
//                     )
//                   }
//                   suffix="so với tuần trước"
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Statistics
"use client"

import { Typography, Row, Col, Card, Button, Statistic } from "antd"
import { ArrowUpOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowDownOutlined } from "@ant-design/icons"
import { Line } from "@ant-design/charts"
import { useState, useEffect } from "react"
import "./Statistics.css"

const { Title, Text } = Typography

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)

  // Helper function to group data by month
  const groupDataByMonth = (data) => {
    const monthlyGroups = {}

    data.forEach((item) => {
      const date = new Date(item.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = {
          monthKey,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          totalStudents: 0,
          newStudents: 0,
          consultationRequestCount: 0,
          totalPianoClass: 0,
          totalGuitarClass: 0,
          monthlyRevenue: 0,
          dataPoints: [],
        }
      }

      // Sum up the values for the month
      monthlyGroups[monthKey].totalStudents = Math.max(monthlyGroups[monthKey].totalStudents, item.totalStudents || 0)
      monthlyGroups[monthKey].newStudents += item.newStudents || 0
      monthlyGroups[monthKey].consultationRequestCount += item.consultationRequestCount || 0
      monthlyGroups[monthKey].totalPianoClass = Math.max(
        monthlyGroups[monthKey].totalPianoClass,
        item.totalPianoClass || 0,
      )
      monthlyGroups[monthKey].totalGuitarClass = Math.max(
        monthlyGroups[monthKey].totalGuitarClass,
        item.totalGuitarClass || 0,
      )
      monthlyGroups[monthKey].monthlyRevenue += item.monthlyRevenue || 0
      monthlyGroups[monthKey].dataPoints.push(item)
    })

    return Object.values(monthlyGroups).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })
  }

  // Fetch data from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Statistic")
        const data = await response.json()

        // Sort data by date
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))
        setStatisticsData(sortedData)

        // Group data by month
        const grouped = groupDataByMonth(sortedData)
        setMonthlyData(grouped)
        setCurrentMonthIndex(grouped.length - 1) // Set to latest month
      } catch (error) {
        console.error("Error fetching statistics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  // Helper function to format month display
  const formatMonthDisplay = (monthData) => {
    if (!monthData) return "Không có dữ liệu"
    return `Tháng ${monthData.month}/${monthData.year}`
  }

  // Helper function to calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return { value: 0, isPositive: true }
    const change = ((current - previous) / previous) * 100
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 }
  }

  // Get current and previous month data
  const currentMonthData = monthlyData[currentMonthIndex] || {}
  const previousMonthData = monthlyData[currentMonthIndex - 1] || {}

  // Calculate changes
  const studentsChange = calculatePercentageChange(currentMonthData.totalStudents, previousMonthData.totalStudents)
  const newStudentsChange = calculatePercentageChange(currentMonthData.newStudents, previousMonthData.newStudents)
  const consultationChange = calculatePercentageChange(
    currentMonthData.consultationRequestCount,
    previousMonthData.consultationRequestCount,
  )

  // Prepare chart data for student trend
  const studentTrendData = monthlyData.map((item, index) => ({
    month: `T${item.month}`,
    value: item.totalStudents || 0,
    monthData: item,
  }))

  // Prepare chart data for Piano classes
  const pianoClassData = monthlyData.map((item, index) => ({
    month: `T${item.month}`,
    value: item.totalPianoClass || 0,
    monthData: item,
  }))

  // Prepare chart data for Guitar classes
  const guitarClassData = monthlyData.map((item, index) => ({
    month: `T${item.month}`,
    value: item.totalGuitarClass || 0,
    monthData: item,
  }))

  // Configuration for the student trend chart
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

  // Configuration for Piano classes chart
  const pianoClassConfig = {
    data: pianoClassData,
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

  // Configuration for Guitar classes chart
  const guitarClassConfig = {
    data: guitarClassData,
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

  // Navigation functions
  const goToPreviousMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonthIndex < monthlyData.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  if (loading) {
    return <div className="statistics-page">Đang tải dữ liệu...</div>
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
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                className="month-nav-btn"
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
              />
              <Text className="current-month">{formatMonthDisplay(currentMonthData)}</Text>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="month-nav-btn"
                onClick={goToNextMonth}
                disabled={currentMonthIndex === monthlyData.length - 1}
              />
            </div>
          </div>
          <Row gutter={[24, 24]} className="stats-cards">
            <Col xs={24} sm={12} lg={8}>
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
                    {currentMonthData.totalStudents || 0}
                  </Title>
                  <div className={`stat-change ${studentsChange.isPositive ? "positive" : "negative"}`}>
                    {studentsChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    <Text>{studentsChange.value}% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
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
                    {currentMonthData.newStudents || 0}
                  </Title>
                  <div className={`stat-change ${newStudentsChange.isPositive ? "positive" : "negative"}`}>
                    {newStudentsChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    <Text>{newStudentsChange.value}% so với tháng trước</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
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
                    {currentMonthData.consultationRequestCount || 0}
                  </Title>
                  <div className={`stat-change ${consultationChange.isPositive ? "positive" : "negative"}`}>
                    {consultationChange.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    <Text>{consultationChange.value}% so với tháng trước</Text>
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
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                className="month-nav-btn"
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
              />
              <Text className="current-month">{formatMonthDisplay(currentMonthData)}</Text>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="month-nav-btn"
                onClick={goToNextMonth}
                disabled={currentMonthIndex === monthlyData.length - 1}
              />
            </div>
          </div>
          <div className="chart-container">
            <Line {...studentConfig} />
          </div>
          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Học viên mới" value={currentMonthData.newStudents || 0} />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic
                  title="Tổng lớp học"
                  value={(currentMonthData.totalPianoClass || 0) + (currentMonthData.totalGuitarClass || 0)}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Piano Classes Analysis Section */}
        <div className="section chart-section">
          <div className="section-header">
            <Text className="section-title">Phân tích lớp học Piano</Text>
            <div className="month-selector">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                className="month-nav-btn"
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
              />
              <Text className="current-month">{formatMonthDisplay(currentMonthData)}</Text>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="month-nav-btn"
                onClick={goToNextMonth}
                disabled={currentMonthIndex === monthlyData.length - 1}
              />
            </div>
          </div>
          <div className="chart-container">
            <Line {...pianoClassConfig} />
          </div>
          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Lớp học Piano" value={currentMonthData.totalPianoClass || 0} />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic
                  title="Tăng"
                  value={`${calculatePercentageChange(currentMonthData.totalPianoClass, previousMonthData.totalPianoClass).value}%`}
                  valueStyle={{
                    color: calculatePercentageChange(
                      currentMonthData.totalPianoClass,
                      previousMonthData.totalPianoClass,
                    ).isPositive
                      ? "#3f8600"
                      : "#cf1322",
                  }}
                  prefix={
                    calculatePercentageChange(currentMonthData.totalPianoClass, previousMonthData.totalPianoClass)
                      .isPositive ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="so với tháng trước"
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Guitar Classes Analysis Section */}
        <div className="section chart-section">
          <div className="section-header">
            <Text className="section-title">Phân tích lớp học Guitar</Text>
            <div className="month-selector">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                className="month-nav-btn"
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
              />
              <Text className="current-month">{formatMonthDisplay(currentMonthData)}</Text>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="month-nav-btn"
                onClick={goToNextMonth}
                disabled={currentMonthIndex === monthlyData.length - 1}
              />
            </div>
          </div>
          <div className="chart-container">
            <Line {...guitarClassConfig} />
          </div>
          <Row gutter={[24, 24]} className="chart-summary">
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic title="Lớp học Guitar" value={currentMonthData.totalGuitarClass || 0} />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="summary-card">
                <Statistic
                  title="Tăng"
                  value={`${calculatePercentageChange(currentMonthData.totalGuitarClass, previousMonthData.totalGuitarClass).value}%`}
                  valueStyle={{
                    color: calculatePercentageChange(
                      currentMonthData.totalGuitarClass,
                      previousMonthData.totalGuitarClass,
                    ).isPositive
                      ? "#3f8600"
                      : "#cf1322",
                  }}
                  prefix={
                    calculatePercentageChange(currentMonthData.totalGuitarClass, previousMonthData.totalGuitarClass)
                      .isPositive ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
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
