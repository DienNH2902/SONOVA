
"use client"

import { Typography, Button, Spin, message } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import "../../Admin/Schedule/Schedule.css" // Đảm bảo CSS file này tồn tại và được cấu hình đúng

const { Title, Text } = Typography

const TeacherSchedule = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0) // Index của tuần hiện tại trong tháng (0-based)
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0) // Index của lịch (tháng) hiện tại (0-based)
  const [loading, setLoading] = useState(true)

  // API Data States
  const [schedules, setSchedules] = useState([])
  const [weeks, setWeeks] = useState([])
  const [timeslots, setTimeslots] = useState([])
  const [classes, setClasses] = useState([])
  const [classSessions, setClassSessions] = useState([])
  // Store fetched days for easier access (since Day API is separate)
  const [days, setDays] = useState([])

  const hasFetchedData = useRef(false)

  // Fixed week structure - Monday to Sunday with dayIndex (0 for Sunday, 1 for Monday)
  // Đây là cấu trúc chuẩn của Date.getDay()
  const weekDaysStructure = [
    { key: "monday", label: "Thứ 2", dayIndex: 1 },
    { key: "tuesday", label: "Thứ 3", dayIndex: 2 },
    { key: "wednesday", label: "Thứ 4", dayIndex: 3 },
    { key: "thursday", label: "Thứ 5", dayIndex: 4 },
    { key: "friday", label: "Thứ 6", dayIndex: 5 },
    { key: "saturday", label: "Thứ 7", dayIndex: 6 },
    { key: "sunday", label: "Chủ nhật", dayIndex: 0 },
  ]

  // Fetch all API data
  const fetchAllData = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [
        schedulesRes,
        weeksRes,
        timeslotsRes,
        classesRes,
        classSessionsRes,
        daysRes, // Fetch Day API as well
      ] = await Promise.all([
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Schedule"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Week"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Timeslot"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Day"), // Fetch Day API
      ])

      const [
        schedulesData,
        weeksData,
        timeslotsData,
        classesData,
        classSessionsData,
        daysData, // Parse Day API response
      ] = await Promise.all([
        schedulesRes.json(),
        weeksRes.json(),
        timeslotsRes.json(),
        classesRes.json(),
        classSessionsRes.json(),
        daysRes.json(), // Parse Day API response
      ])

      setSchedules(Array.isArray(schedulesData) ? schedulesData : [])
      setWeeks(Array.isArray(weeksData) ? weeksData : [])
      setTimeslots(Array.isArray(timeslotsData) ? timeslotsData : [])
      setClasses(Array.isArray(classesData) ? classesData : [])
      setClassSessions(Array.isArray(classSessionsData) ? classSessionsData : [])
      setDays(Array.isArray(daysData) ? daysData : []) // Set Days state

      // Sắp xếp schedules theo monthYear để đảm bảo thứ tự
      const sortedSchedules = Array.isArray(schedulesData)
        ? [...schedulesData].sort(
            (a, b) => new Date(a.monthYear).getTime() - new Date(b.monthYear).getTime(),
          )
        : []
      setSchedules(sortedSchedules)
    } catch (error) {
      console.error("Error fetching schedule data:", error)
      message.error("Không thể tải dữ liệu thời khóa biểu. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      fetchAllData()
    }
  }, [])

  // Helper function to format time from API (HH:MM:SS -> HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) // Get HH:MM
  }

  // Helper function to get day key from date (0=Sunday, 1=Monday, ...)
  // Adjusted to use local date to avoid timezone issues affecting getDay()
  const getDayKeyFromDate = (dateString) => {
    const date = new Date(dateString)
    // Use UTC methods to avoid local timezone shifts changing the day
    const dayOfWeek = date.getUTCDay()
    const dayStructure = weekDaysStructure.find((day) => day.dayIndex === dayOfWeek)
    return dayStructure ? dayStructure.key : null
  }

  // Helper function to format date for display (YYYY-MM-DD -> DD/MM)
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString)
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    return `${day}/${month}`
  }

  // Get current schedule based on currentScheduleIndex
  const getCurrentSchedule = () => {
    return schedules[currentScheduleIndex] || null
  }

  // Get current month/year for display based on current schedule
  const getCurrentMonthYear = () => {
    const currentSchedule = getCurrentSchedule()
    if (!currentSchedule) return "Đang tải..." // Hoặc một giá trị mặc định khác

    const date = new Date(currentSchedule.monthYear)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${month}/${year}`
  }

  // Get weeks for current schedule and sort them by week number
  const getCurrentScheduleWeeks = () => {
    const currentSchedule = getCurrentSchedule()
    if (!currentSchedule) return []

    return weeks
      .filter((week) => week.scheduleId === currentSchedule.scheduleId)
      .sort((a, b) => a.weekNumberInMonth - b.weekNumberInMonth) // Sắp xếp theo weekNumberInMonth
  }

  // Get unique week numbers (assuming weekNumberInMonth is consistent)
  const getWeekNumbers = () => {
    const scheduleWeeks = getCurrentScheduleWeeks()
    // Lấy weekNumberInMonth từ các tuần và loại bỏ trùng lặp, sau đó sắp xếp
    const weekNumbers = [...new Set(scheduleWeeks.map((week) => week.weekNumberInMonth))].sort(
      (a, b) => a - b,
    )
    return weekNumbers
  }

  // Get days for current week with proper structure (Monday to Sunday)
  const getCurrentWeekDays = () => {
    const currentScheduleWeeks = getCurrentScheduleWeeks()
    const weekNumbers = getWeekNumbers()
    const currentWeekNum = weekNumbers[currentWeekIndex] // Lấy weekNumberInMonth thực tế

    if (currentWeekNum === undefined)
      return weekDaysStructure.map((day) => ({
        ...day,
        date: null,
        // formattedDate is not needed in this component, but keeping it for consistency if needed elsewhere
        formattedDate: "",
        weekId: null,
        dayId: null,
      }))

    const currentWeekData = currentScheduleWeeks.find(
      (week) => week.weekNumberInMonth === currentWeekNum,
    )

    // Tạo một map để dễ dàng truy cập Day data từ API theo dayIndex
    const apiDaysMap = new Map()
    if (currentWeekData && currentWeekData.days) {
      currentWeekData.days.forEach((apiDay) => {
        const date = new Date(apiDay.dateOfDay)
        const dayOfWeek = date.getUTCDay() // Lấy ngày trong tuần theo UTC
        apiDaysMap.set(dayOfWeek, apiDay)
      })
    }

    // Kết hợp cấu trúc tuần cố định với dữ liệu ngày từ API
    const structuredDays = weekDaysStructure.map((dayStructure) => {
      const dayFromApi = apiDaysMap.get(dayStructure.dayIndex)
      return {
        ...dayStructure,
        date: dayFromApi?.dateOfDay || null,
        weekId: dayFromApi?.weekId || null,
        dayId: dayFromApi?.dayId || null,
        formattedDate: dayFromApi?.dateOfDay
          ? formatDateForDisplay(dayFromApi.dateOfDay)
          : "--/--",
      }
    })

    // Sắp xếp lại để Thứ 2 (dayIndex: 1) đứng đầu, sau đó đến Thứ 3, ..., Chủ nhật (dayIndex: 0)
    // Logic này để đảm bảo thứ tự hiển thị luôn là Thứ 2 -> Chủ Nhật
    structuredDays.sort((a, b) => {
      const aIndex = a.dayIndex === 0 ? 7 : a.dayIndex // Coi Chủ nhật là ngày thứ 7+1 để nó về cuối
      const bIndex = b.dayIndex === 0 ? 7 : b.dayIndex
      return aIndex - bIndex
    })

    return structuredDays
  }

  // Build schedule data structure
  const buildScheduleData = () => {
    const currentWeekDays = getCurrentWeekDays()
    const scheduleData = {}

    // Initialize schedule structure with fixed time slots and days
    const sortedTimeslots = [...timeslots].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    )
    sortedTimeslots.forEach((timeslot) => {
      const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`
      scheduleData[timeKey] = {}

      // Initialize all days of the week with empty string
      weekDaysStructure.forEach((dayStructure) => {
        scheduleData[timeKey][dayStructure.key] = ""
      })
    })

    // Fill in class sessions
    currentWeekDays.forEach((dayInfo) => {
      if (!dayInfo.dayId) return // Skip if no actual day data for this structure's day

      // Filter class sessions for this specific dayId
      const dayClassSessions = classSessions.filter((session) => session.dayId === dayInfo.dayId)

      dayClassSessions.forEach((session) => {
        const timeslot = timeslots.find((ts) => ts.timeslotId === session.timeSlotId)
        const classInClasses = classes.find((cls) => cls.classId === session.classId) // Tìm kiếm thông tin lớp từ mảng classes

        if (timeslot) {
          const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`

          let classCodeToDisplay = "Lớp N/A"

          // Ưu tiên session.classCode nếu nó tồn tại và KHÔNG PHẢI là chuỗi "string" (case-insensitive)
          if (
            session.classCode &&
            typeof session.classCode === "string" &&
            session.classCode.toLowerCase() !== "string"
          ) {
            classCodeToDisplay = session.classCode
          } else if (classInClasses?.classCode) {
            // Fallback dùng classCode từ API Class nếu session.classCode lỗi hoặc là "string"
            classCodeToDisplay = classInClasses.classCode
          }

          const sessionInfo = `${classCodeToDisplay}`
          // const sessionInfo = `${classCodeToDisplay} - Buổi ${session.sessionNumber}`
          const dayKey = getDayKeyFromDate(dayInfo.date) // date ở đây là dateOfDay của DayType
          if (dayKey && scheduleData[timeKey]) {
            scheduleData[timeKey][dayKey] = sessionInfo
          }
        }
      })
    })

    return scheduleData
  }

  // Navigation handlers
  const handlePrevWeek = () => {
    const weekNumbers = getWeekNumbers() // Lấy số tuần của tháng hiện tại
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    } else {
      // Đã ở tuần đầu tiên của tháng hiện tại, thử chuyển sang tháng trước
      if (currentScheduleIndex > 0) {
        setCurrentScheduleIndex(currentScheduleIndex - 1) // Chuyển sang tháng trước
        // Sau khi chuyển tháng, cần cập nhật lại currentWeekIndex
        // Lấy số tuần của tháng MỚI (tháng trước đó)
        const prevScheduleId = schedules[currentScheduleIndex - 1]?.scheduleId
        if (prevScheduleId !== undefined) {
          const prevScheduleWeeks = weeks.filter((week) => week.scheduleId === prevScheduleId)
          const prevWeekNumbers = [...new Set(prevScheduleWeeks.map((week) => week.weekNumberInMonth))].sort(
            (a, b) => a - b,
          )
          if (prevWeekNumbers.length > 0) {
            setCurrentWeekIndex(prevWeekNumbers.length - 1) // Đặt về tuần cuối cùng của tháng trước đó
          } else {
            setCurrentWeekIndex(0) // Nếu tháng trước không có tuần nào, về 0
          }
        } else {
          setCurrentWeekIndex(0) // Nếu không tìm thấy schedule trước đó, về 0
        }
      } else {
        // Đã ở tuần đầu tiên của lịch đầu tiên, không làm gì cả
        message.info("Bạn đang ở tuần đầu tiên của thời khóa biểu đầu tiên rồi.")
      }
    }
  }

  const handleNextWeek = () => {
    const weekNumbers = getWeekNumbers() // Lấy số tuần của tháng hiện tại
    if (currentWeekIndex < weekNumbers.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    } else {
      // Đã ở tuần cuối cùng của tháng hiện tại, thử chuyển sang tháng tiếp theo
      if (currentScheduleIndex < schedules.length - 1) {
        setCurrentScheduleIndex(currentScheduleIndex + 1) // Chuyển sang tháng tiếp theo
        setCurrentWeekIndex(0) // Luôn về tuần đầu tiên của tháng tiếp theo
      } else {
        // Đã ở tuần cuối cùng của lịch cuối cùng, không làm gì cả
        message.info("Bạn đang ở tuần cuối cùng của thời khóa biểu cuối cùng rồi.")
      }
    }
  }

  // Check if today
  const isTodayColumn = (dayInfo) => {
    if (!dayInfo.date) return false
    const today = new Date()
    const dayDate = new Date(dayInfo.date)
    // Đặt giờ, phút, giây, mili giây về 0 để so sánh chỉ ngày
    today.setHours(0, 0, 0, 0)
    dayDate.setHours(0, 0, 0, 0)
    return today.getTime() === dayDate.getTime()
  }

  const renderCurrentWeekSchedule = () => {
    const weekNumbers = getWeekNumbers()
    const currentWeekNumber = weekNumbers[currentWeekIndex] // Sử dụng currentWeekIndex
    // const weekTitle = `Tuần ${currentWeekNumber || 'N/A'}`; // Bỏ cái này đi vì sẽ hiển thị ở trên

    const currentWeekDays = getCurrentWeekDays()
    const scheduleData = buildScheduleData()
    const timeSlots = timeslots
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
      .map((ts) => `${formatTime(ts.startTime)}-${formatTime(ts.endTime)}`)

    // Kiểm tra nếu không có dữ liệu để hiển thị
    if (!currentWeekNumber || currentWeekDays.every((d) => !d.date) || timeSlots.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Text type="secondary">Không có dữ liệu thời khóa biểu cho tuần này.</Text>
        </div>
      )
    }

    return (
      <div className="schedule-week-section">
        {/* <Title level={3} className="schedule-week-title">
          {weekTitle} // Bỏ dòng này đi
        </Title> */}
        <div className="schedule-table-wrapper">
          {/* Header Row */}
          <div className="schedule-table-header">
            <div className="schedule-time-header">Thời gian</div>
            {currentWeekDays.map((dayInfo) => (
              <div
                key={dayInfo.key}
                className={`schedule-day-header ${
                  isTodayColumn(dayInfo) ? "schedule-today-column" : ""
                }`}
              >
                <div className="schedule-day-name">{dayInfo.label}</div>
                {/* <div className="schedule-day-date">{dayInfo.formattedDate || "--/--"}</div> // Bỏ dòng này đi */}
              </div>
            ))}
          </div>

          {/* Time Slot Rows */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="schedule-table-row">
              <div className="schedule-time-cell">{timeSlot}</div>
              {currentWeekDays.map((dayInfo) => {
                const cellClassInfo = scheduleData[timeSlot]
                  ? scheduleData[timeSlot][dayInfo.key]
                  : ""
                const isTodayCol = isTodayColumn(dayInfo)
                return (
                  <div
                    key={`${timeSlot}-${dayInfo.key}`} // Key duy nhất hơn
                    className={`schedule-class-cell ${
                      cellClassInfo ? "schedule-has-class" : ""
                    } ${isTodayCol ? "schedule-today-column" : ""}`}
                  >
                    {cellClassInfo && <span className="schedule-class-code">{cellClassInfo}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="schedule-main-page">
        <div className="schedule-main-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" tip="Đang tải thời khóa biểu..." />
          </div>
        </div>
      </div>
    )
  }

  // Nếu không có schedule nào
  if (schedules.length === 0) {
    return (
      <div className="schedule-main-page">
        <div className="schedule-main-container">
          <Title level={1} className="schedule-page-title">
            Thời khóa biểu
          </Title>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="danger">Không có dữ liệu thời khóa biểu nào được tìm thấy.</Text>
          </div>
        </div>
      </div>
    )
  }

  // Lấy thông tin tuần để hiển thị "Từ ngày ... đến ngày ..."
  const weekNumbersForCurrentSchedule = getWeekNumbers()
  const currentWeekNumberToDisplay = weekNumbersForCurrentSchedule[currentWeekIndex] || "N/A"

  const currentWeekDays = getCurrentWeekDays();
  let startDate = "N/A";
  let endDate = "N/A";

  if (currentWeekDays.length > 0) {
      // Lấy ngày đầu tiên và cuối cùng có dữ liệu thực tế
      const actualDates = currentWeekDays
                            .filter(day => day.date)
                            .map(day => new Date(day.date))
                            .sort((a, b) => a.getTime() - b.getTime());
      
      if (actualDates.length > 0) {
          startDate = formatDateForDisplay(actualDates[0].toISOString());
          endDate = formatDateForDisplay(actualDates[actualDates.length - 1].toISOString());
      }
  }


  return (
    <div className="schedule-main-page">
      <div className="schedule-main-container">
        <Title level={1} className="schedule-page-title">
          Thời khóa biểu
        </Title>

        {/* Week Navigation */}
        <div className="schedule-month-navigation">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={handlePrevWeek}
            className="schedule-nav-button"
            disabled={currentScheduleIndex === 0 && currentWeekIndex === 0} // Disable nếu ở tuần đầu tiên của lịch đầu tiên
          />
          <div className="schedule-current-month">
            Tuần {currentWeekNumberToDisplay} -  ({startDate} - {endDate}) - Tháng {getCurrentMonthYear()}
          </div>
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={handleNextWeek}
            className="schedule-nav-button"
            disabled={
              currentScheduleIndex === schedules.length - 1 &&
              currentWeekIndex === weekNumbersForCurrentSchedule.length - 1
            } // Disable nếu ở tuần cuối cùng của lịch cuối cùng
          />
        </div>

        {/* Legend */}
        <div className="schedule-legend">
          <Text className="schedule-legend-title">Chú thích</Text>
          <div className="schedule-legend-item">
            <div className="schedule-legend-color schedule-today-color"></div>
            <Text className="schedule-legend-text">Hôm nay</Text>
          </div>
        </div>

        {/* Current Week Schedule */}
        <div className="schedule-weeks-container">{renderCurrentWeekSchedule()}</div>
      </div>
    </div>
  )
}

export default TeacherSchedule