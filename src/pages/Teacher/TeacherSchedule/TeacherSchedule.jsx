"use client"

import { Typography, Button, Spin, message } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import "../../Admin/Schedule/Schedule.css"

const { Title, Text } = Typography

const TeacherSchedule = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const [schedules, setSchedules] = useState([])
  const [weeks, setWeeks] = useState([])
  const [timeslots, setTimeslots] = useState([])
  const [classes, setClasses] = useState([])
  const [classSessions, setClassSessions] = useState([])
  const [days, setDays] = useState([])

  const [teacherClassIds, setTeacherClassIds] = useState([])

  const hasFetchedData = useRef(false)

  const weekDaysStructure = [
    { key: "monday", label: "Thứ 2", dayIndex: 1 },
    { key: "tuesday", label: "Thứ 3", dayIndex: 2 },
    { key: "wednesday", label: "Thứ 4", dayIndex: 3 },
    { key: "thursday", label: "Thứ 5", dayIndex: 4 },
    { key: "friday", label: "Thứ 6", dayIndex: 5 },
    { key: "saturday", label: "Thứ 7", dayIndex: 6 },
    { key: "sunday", label: "Chủ nhật", dayIndex: 0 },
  ]

  const getTeacherClassIds = () => {
    try {
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        if (userData.role === "teacher" && userData.classIds) {
          setTeacherClassIds(userData.classIds)
          return userData.classIds
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error)
      return []
    }
    return []
  }

  const fetchAllData = async () => {
    try {
      setLoading(true)

      const teacherClassIds = getTeacherClassIds()

      const [
        schedulesRes,
        weeksRes,
        timeslotsRes,
        classesRes,
        classSessionsRes,
        daysRes,
      ] = await Promise.all([
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Schedule"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Week"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Timeslot"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession"),
        fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Day"),
      ])

      const [
        schedulesData,
        weeksData,
        timeslotsData,
        classesData,
        classSessionsData,
        daysData,
      ] = await Promise.all([
        schedulesRes.json(),
        weeksRes.json(),
        timeslotsRes.json(),
        classesRes.json(),
        classSessionsRes.json(),
        daysRes.json(),
      ])

      const filteredClassSessions = (Array.isArray(classSessionsData) ? classSessionsData : []).filter(
        (session) => teacherClassIds.includes(session.classId),
      )

      const filteredClasses = (Array.isArray(classesData) ? classesData : []).filter(
        (cls) => teacherClassIds.includes(cls.classId),
      )

      const dayIdsOfTeacherClasses = [...new Set(filteredClassSessions.map((session) => session.dayId))]
      const filteredDays = (Array.isArray(daysData) ? daysData : []).filter((day) =>
        dayIdsOfTeacherClasses.includes(day.dayId),
      )

      const weekIdsOfTeacherClasses = [...new Set(filteredDays.map((day) => day.weekId))]
      const filteredWeeks = (Array.isArray(weeksData) ? weeksData : []).filter((week) =>
        weekIdsOfTeacherClasses.includes(week.weekId),
      )

      const scheduleIdsOfTeacherClasses = [...new Set(filteredWeeks.map((week) => week.scheduleId))]
      const filteredSchedules = (Array.isArray(schedulesData) ? schedulesData : []).filter(
        (schedule) => scheduleIdsOfTeacherClasses.includes(schedule.scheduleId),
      )

      setSchedules(filteredSchedules)
      setWeeks(filteredWeeks)
      setTimeslots(Array.isArray(timeslotsData) ? timeslotsData : [])
      setClasses(filteredClasses)
      setClassSessions(filteredClassSessions)
      setDays(filteredDays)

      const sortedSchedules = Array.isArray(filteredSchedules)
        ? [...filteredSchedules].sort(
            (a, b) => new Date(a.monthYear).getTime() - new Date(b.monthYear).getTime(),
          )
        : []
      setSchedules(sortedSchedules)

      setCurrentScheduleIndex(0)
      setCurrentWeekIndex(0)

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

  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5)
  }

  const getDayKeyFromDate = (dateString) => {
    const date = new Date(dateString)
    const dayOfWeek = date.getUTCDay()
    const dayStructure = weekDaysStructure.find((day) => day.dayIndex === dayOfWeek)
    return dayStructure ? dayStructure.key : null
  }

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString)
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    return `${day}/${month}`
  }

  const getCurrentSchedule = () => {
    return schedules[currentScheduleIndex] || null
  }

  const getCurrentMonthYear = () => {
    const currentSchedule = getCurrentSchedule()
    if (!currentSchedule) return "Đang tải..."

    const date = new Date(currentSchedule.monthYear)
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    const year = date.getUTCFullYear()
    return `${month}/${year}`
  }

  const getCurrentScheduleWeeks = () => {
    const currentSchedule = getCurrentSchedule()
    if (!currentSchedule) return []

    return weeks
      .filter((week) => week.scheduleId === currentSchedule.scheduleId)
      .sort((a, b) => a.weekNumberInMonth - b.weekNumberInMonth)
  }

  const getWeekNumbers = () => {
    const scheduleWeeks = getCurrentScheduleWeeks()
    const weekNumbers = [...new Set(scheduleWeeks.map((week) => week.weekNumberInMonth))].sort(
      (a, b) => a - b,
    )
    return weekNumbers
  }

  const getCurrentWeekDays = () => {
    const currentScheduleWeeks = getCurrentScheduleWeeks()
    const weekNumbers = getWeekNumbers()
    const currentWeekNum = weekNumbers[currentWeekIndex]

    if (currentWeekNum === undefined)
      return weekDaysStructure.map((day) => ({
        ...day,
        date: null,
        formattedDate: "",
        weekId: null,
        dayId: null,
      }))

    const currentWeekData = currentScheduleWeeks.find(
      (week) => week.weekNumberInMonth === currentWeekNum,
    )

    const apiDaysMap = new Map()
    if (currentWeekData && currentWeekData.days) {
      const daysInCurrentWeek = days.filter(d => d.weekId === currentWeekData.weekId)
      daysInCurrentWeek.forEach((apiDay) => {
        const date = new Date(apiDay.dateOfDay)
        const dayOfWeek = date.getUTCDay()
        apiDaysMap.set(dayOfWeek, apiDay)
      })
    }

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

    structuredDays.sort((a, b) => {
      const aIndex = a.dayIndex === 0 ? 7 : a.dayIndex
      const bIndex = b.dayIndex === 0 ? 7 : b.dayIndex
      return aIndex - bIndex
    })

    return structuredDays
  }

  const buildScheduleData = () => {
    const currentWeekDays = getCurrentWeekDays()
    const scheduleData = {}

    const sortedTimeslots = [...timeslots].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    )
    sortedTimeslots.forEach((timeslot) => {
      const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`
      scheduleData[timeKey] = {}

      weekDaysStructure.forEach((dayStructure) => {
        scheduleData[timeKey][dayStructure.key] = ""
      })
    })

    currentWeekDays.forEach((dayInfo) => {
      if (!dayInfo.dayId) return

      const dayClassSessions = classSessions.filter((session) => session.dayId === dayInfo.dayId)

      dayClassSessions.forEach((session) => {
        const timeslot = timeslots.find((ts) => ts.timeslotId === session.timeSlotId)
        const classInClasses = classes.find((cls) => cls.classId === session.classId)

        if (timeslot && classInClasses) {
          const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`

          let classCodeToDisplay = classInClasses.classCode

          const sessionInfo = `${classCodeToDisplay}`
          const dayKey = getDayKeyFromDate(dayInfo.date)
          if (dayKey && scheduleData[timeKey]) {
            scheduleData[timeKey][dayKey] = sessionInfo
          }
        }
      })
    })

    return scheduleData
  }

  const handlePrevWeek = () => {
    const weekNumbers = getWeekNumbers()
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    } else {
      if (currentScheduleIndex > 0) {
        setCurrentScheduleIndex(currentScheduleIndex - 1)
        const prevScheduleId = schedules[currentScheduleIndex - 1]?.scheduleId
        if (prevScheduleId !== undefined) {
          const prevScheduleWeeks = weeks.filter((week) => week.scheduleId === prevScheduleId)
          const prevWeekNumbers = [...new Set(prevScheduleWeeks.map((week) => week.weekNumberInMonth))].sort(
            (a, b) => a - b,
          )
          if (prevWeekNumbers.length > 0) {
            setCurrentWeekIndex(prevWeekNumbers.length - 1)
          } else {
            setCurrentWeekIndex(0)
          }
        } else {
          setCurrentWeekIndex(0)
        }
      } else {
        message.info("Bạn đang ở tuần đầu tiên của thời khóa biểu đầu tiên rồi.")
      }
    }
  }

  const handleNextWeek = () => {
    const weekNumbers = getWeekNumbers()
    if (currentWeekIndex < weekNumbers.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    } else {
      if (currentScheduleIndex < schedules.length - 1) {
        setCurrentScheduleIndex(currentScheduleIndex + 1)
        setCurrentWeekIndex(0)
      } else {
        message.info("Bạn đang ở tuần cuối cùng của thời khóa biểu cuối cùng rồi.")
      }
    }
  }

  const isTodayColumn = (dayInfo) => {
    if (!dayInfo.date) return false
    const today = new Date()
    const dayDate = new Date(dayInfo.date)
    today.setHours(0, 0, 0, 0)
    dayDate.setHours(0, 0, 0, 0)
    return today.getTime() === dayDate.getTime()
  }

  const renderCurrentWeekSchedule = () => {
    const weekNumbers = getWeekNumbers()
    const currentWeekNumber = weekNumbers[currentWeekIndex]

    const currentWeekDays = getCurrentWeekDays()
    const scheduleData = buildScheduleData()
    const timeSlots = timeslots
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
      .map((ts) => `${formatTime(ts.startTime)}-${formatTime(ts.endTime)}`)

    if (!currentWeekNumber || currentWeekDays.every((d) => !d.date) || timeSlots.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Text type="secondary">Không có dữ liệu thời khóa biểu cho tuần này.</Text>
        </div>
      )
    }

    return (
      <div className="schedule-week-section">
        <div className="schedule-table-wrapper">
          <div className="schedule-table-header">
            <div className="schedule-time-header">Thời gian</div>
            {currentWeekDays.map((dayInfo) => (
              <div
                key={dayInfo.key}
                className={`schedule-day-header ${isTodayColumn(dayInfo) ? "schedule-today-column" : ""}`}
              >
                <div className="schedule-day-name">{dayInfo.label}</div>
              </div>
            ))}
          </div>
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
                    key={`${timeSlot}-${dayInfo.key}`}
                    className={`schedule-class-cell ${cellClassInfo ? "schedule-has-class" : ""} ${isTodayCol ? "schedule-today-column" : ""}`}
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

  if (schedules.length === 0) {
    return (
      <div className="schedule-main-page">
        <div className="schedule-main-container">
          <Title level={1} className="schedule-page-title">
            Thời khóa biểu
          </Title>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="danger">
              Không có dữ liệu thời khóa biểu nào được tìm thấy cho các lớp của bạn.
            </Text>
          </div>
        </div>
      </div>
    )
  }

  const weekNumbersForCurrentSchedule = getWeekNumbers()
  const currentWeekNumberToDisplay = weekNumbersForCurrentSchedule[currentWeekIndex] || "N/A"

  const currentWeekDays = getCurrentWeekDays()
  let startDate = "N/A"
  let endDate = "N/A"

  if (currentWeekDays.length > 0) {
    const actualDates = currentWeekDays
      .filter((day) => day.date)
      .map((day) => new Date(day.date))
      .sort((a, b) => a.getTime() - b.getTime())

    if (actualDates.length > 0) {
      startDate = formatDateForDisplay(actualDates[0].toISOString())
      endDate = formatDateForDisplay(actualDates[actualDates.length - 1].toISOString())
    }
  }

  return (
    <div className="schedule-main-page">
      <div className="schedule-main-container">
        <Title level={1} className="schedule-page-title">
          Thời khóa biểu
        </Title>

        <div className="schedule-month-navigation">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={handlePrevWeek}
            className="schedule-nav-button"
            disabled={currentScheduleIndex === 0 && currentWeekIndex === 0}
          />
          <div className="schedule-current-month">
            Tuần {currentWeekNumberToDisplay} - ({startDate} - {endDate}) - Tháng{" "}
            {getCurrentMonthYear()}
          </div>
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={handleNextWeek}
            className="schedule-nav-button"
            disabled={
              currentScheduleIndex === schedules.length - 1 &&
              currentWeekIndex === weekNumbersForCurrentSchedule.length - 1
            }
          />
        </div>

        <div className="schedule-legend">
          <Text className="schedule-legend-title">Chú thích</Text>
          <div className="schedule-legend-item">
            <div className="schedule-legend-color schedule-today-color"></div>
            <Text className="schedule-legend-text">Hôm nay</Text>
          </div>
        </div>

        <div className="schedule-weeks-container">{renderCurrentWeekSchedule()}</div>
      </div>
    </div>
  )
}

export default TeacherSchedule