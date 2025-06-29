"use client"

import { Typography, Button } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./Schedule.css"

const { Title, Text } = Typography

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0) // 0-3 for weeks 1-4
  const [currentMonth, setCurrentMonth] = useState("12/2025")

  // Sample schedule data for 4 weeks
  const scheduleData = {
    week1: {
      "8:00-9:30": {
        monday: "K01-PI-CB-01",
        tuesday: "",
        wednesday: "K01-PI-CB-01",
        thursday: "",
        friday: "K01-PI-CB-01",
        saturday: "",
        sunday: "",
      },
      "10:00-11:30": {
        monday: "",
        tuesday: "K01-GU-CB-02",
        wednesday: "",
        thursday: "K01-GU-CB-02",
        friday: "",
        saturday: "K01-GU-CB-02",
        sunday: "",
      },
      "14:00-17:30": {
        monday: "",
        tuesday: "",
        wednesday: "K01-PI-NC",
        thursday: "",
        friday: "",
        saturday: "K01-GU-NC",
        sunday: "",
      },
    },
    week2: {
      "8:00-9:30": {
        monday: "K01-PI-CB-01",
        tuesday: "",
        wednesday: "K01-PI-CB-01",
        thursday: "",
        friday: "K01-PI-CB-01",
        saturday: "",
        sunday: "",
      },
      "10:00-11:30": {
        monday: "",
        tuesday: "K01-GU-CB-02",
        wednesday: "",
        thursday: "K01-GU-CB-02",
        friday: "K01-GU-CB-02",
        saturday: "K01-GU-CB-02",
        sunday: "",
      },
      "14:00-17:30": {
        monday: "",
        tuesday: "",
        wednesday: "K01-PI-NC",
        thursday: "",
        friday: "",
        saturday: "K01-GU-NC",
        sunday: "",
      },
    },
    week3: {
      "8:00-9:30": {
        monday: "K01-PI-CB-01",
        tuesday: "",
        wednesday: "K01-PI-CB-01",
        thursday: "",
        friday: "K01-PI-CB-01",
        saturday: "",
        sunday: "",
      },
      "10:00-11:30": {
        monday: "",
        tuesday: "K01-GU-CB-02",
        wednesday: "",
        thursday: "K01-GU-CB-02",
        friday: "",
        saturday: "K01-GU-CB-02",
        sunday: "",
      },
      "14:00-17:30": {
        monday: "",
        tuesday: "",
        wednesday: "K01-PI-NC",
        thursday: "",
        friday: "",
        saturday: "K01-GU-NC",
        sunday: "",
      },
    },
    week4: {
      "8:00-9:30": {
        monday: "K01-PI-CB-01",
        tuesday: "",
        wednesday: "K01-PI-CB-01",
        thursday: "",
        friday: "K01-PI-CB-01",
        saturday: "",
        sunday: "",
      },
      "10:00-11:30": {
        monday: "",
        tuesday: "K01-GU-CB-02",
        wednesday: "",
        thursday: "K01-GU-CB-02",
        friday: "",
        saturday: "K01-GU-CB-02",
        sunday: "",
      },
      "14:00-17:30": {
        monday: "",
        tuesday: "",
        wednesday: "K01-PI-NC",
        thursday: "",
        friday: "",
        saturday: "K01-GU-NC",
        sunday: "",
      },
    },
  }

  const timeSlots = ["8:00-9:30", "10:00-11:30", "14:00-17:30"]

  // Different dates for each week
  const weekDates = {
    0: [
      // Week 1
      { key: "monday", label: "Thứ 2", time: "02/12" },
      { key: "tuesday", label: "Thứ 3", time: "03/12" },
      { key: "wednesday", label: "Thứ 4", time: "04/12" },
      { key: "thursday", label: "Thứ 5", time: "05/12" },
      { key: "friday", label: "Thứ 6", time: "06/12" },
      { key: "saturday", label: "Thứ 7", time: "07/12" },
      { key: "sunday", label: "Chủ nhật", time: "08/12" },
    ],
    1: [
      // Week 2
      { key: "monday", label: "Thứ 2", time: "09/12" },
      { key: "tuesday", label: "Thứ 3", time: "10/12" },
      { key: "wednesday", label: "Thứ 4", time: "11/12" },
      { key: "thursday", label: "Thứ 5", time: "12/12" },
      { key: "friday", label: "Thứ 6", time: "13/12" },
      { key: "saturday", label: "Thứ 7", time: "14/12" },
      { key: "sunday", label: "Chủ nhật", time: "15/12" },
    ],
    2: [
      // Week 3
      { key: "monday", label: "Thứ 2", time: "16/12" },
      { key: "tuesday", label: "Thứ 3", time: "17/12" },
      { key: "wednesday", label: "Thứ 4", time: "18/12" },
      { key: "thursday", label: "Thứ 5", time: "19/12" },
      { key: "friday", label: "Thứ 6", time: "20/12" },
      { key: "saturday", label: "Thứ 7", time: "21/12" },
      { key: "sunday", label: "Chủ nhật", time: "22/12" },
    ],
    3: [
      // Week 4
      { key: "monday", label: "Thứ 2", time: "23/12" },
      { key: "tuesday", label: "Thứ 3", time: "24/12" },
      { key: "wednesday", label: "Thứ 4", time: "25/12" },
      { key: "thursday", label: "Thứ 5", time: "26/12" },
      { key: "friday", label: "Thứ 6", time: "27/12" },
      { key: "saturday", label: "Thứ 7", time: "28/12" },
      { key: "sunday", label: "Chủ nhật", time: "29/12" },
    ],
  }

  const weekKeys = ["week1", "week2", "week3", "week4"]
  const weekTitles = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => (prev > 0 ? prev - 1 : 3))
  }

  const handleNextWeek = () => {
    setCurrentWeek((prev) => (prev < 3 ? prev + 1 : 0))
  }

  // Function to determine if this is today's column (entire day)
  const isTodayColumn = (dayKey) => {
    // For demo purposes, highlighting Wednesday as today
    return dayKey === "wednesday"
  }

  const renderCurrentWeekSchedule = () => {
    const weekKey = weekKeys[currentWeek]
    const weekTitle = weekTitles[currentWeek]
    const weekData = scheduleData[weekKey]
    const daysOfWeek = weekDates[currentWeek]

    return (
      <div className="schedule-week-section">
        <Title level={3} className="schedule-week-title">
          {weekTitle}
        </Title>
        <div className="schedule-table-wrapper">
          {/* Header Row */}
          <div className="schedule-table-header">
            <div className="schedule-time-header">Thời gian</div>
            {daysOfWeek.map((day) => (
              <div
                key={day.key}
                className={`schedule-day-header ${isTodayColumn(day.key) ? "schedule-today-column" : ""}`}
              >
                <div className="schedule-day-name">{day.label}</div>
                <div className="schedule-day-date">{day.time}</div>
              </div>
            ))}
          </div>

          {/* Time Slot Rows */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="schedule-table-row">
              <div className="schedule-time-cell">{timeSlot}</div>
              {daysOfWeek.map((day) => {
                const classCode = weekData[timeSlot][day.key]
                const isTodayCol = isTodayColumn(day.key)

                return (
                  <div
                    key={day.key}
                    className={`schedule-class-cell ${classCode ? "schedule-has-class" : ""} ${isTodayCol ? "schedule-today-column" : ""}`}
                  >
                    {classCode && <span className="schedule-class-code">{classCode}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="schedule-main-page">
      <div className="schedule-main-container">
        <Title level={1} className="schedule-page-title">
          Thời khóa biểu
        </Title>

        {/* Week Navigation */}
        <div className="schedule-month-navigation">
          <Button type="primary" icon={<LeftOutlined />} onClick={handlePrevWeek} className="schedule-nav-button" />
          <div className="schedule-current-month">
            {weekTitles[currentWeek]} - Tháng {currentMonth}
          </div>
          <Button type="primary" icon={<RightOutlined />} onClick={handleNextWeek} className="schedule-nav-button" />
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

export default Schedule
