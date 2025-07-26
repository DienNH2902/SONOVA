// "use client"

// import { Typography, Button } from "antd"
// import { LeftOutlined, RightOutlined } from "@ant-design/icons"
// import { useState } from "react"
// import "./Schedule.css"

// const { Title, Text } = Typography

// const Schedule = () => {
//   const [currentWeek, setCurrentWeek] = useState(0) // 0-3 for weeks 1-4
//   const [currentMonth, setCurrentMonth] = useState("12/2025")

//   // Sample schedule data for 4 weeks
//   const scheduleData = {
//     week1: {
//       "8:00-9:30": {
//         monday: "K01-PI-CB-01",
//         tuesday: "",
//         wednesday: "K01-PI-CB-01",
//         thursday: "",
//         friday: "K01-PI-CB-01",
//         saturday: "",
//         sunday: "",
//       },
//       "10:00-11:30": {
//         monday: "",
//         tuesday: "K01-GU-CB-02",
//         wednesday: "",
//         thursday: "K01-GU-CB-02",
//         friday: "",
//         saturday: "K01-GU-CB-02",
//         sunday: "",
//       },
//       "14:00-17:30": {
//         monday: "",
//         tuesday: "",
//         wednesday: "K01-PI-NC",
//         thursday: "",
//         friday: "",
//         saturday: "K01-GU-NC",
//         sunday: "",
//       },
//     },
//     week2: {
//       "8:00-9:30": {
//         monday: "K01-PI-CB-01",
//         tuesday: "",
//         wednesday: "K01-PI-CB-01",
//         thursday: "",
//         friday: "K01-PI-CB-01",
//         saturday: "",
//         sunday: "",
//       },
//       "10:00-11:30": {
//         monday: "",
//         tuesday: "K01-GU-CB-02",
//         wednesday: "",
//         thursday: "K01-GU-CB-02",
//         friday: "K01-GU-CB-02",
//         saturday: "K01-GU-CB-02",
//         sunday: "",
//       },
//       "14:00-17:30": {
//         monday: "",
//         tuesday: "",
//         wednesday: "K01-PI-NC",
//         thursday: "",
//         friday: "",
//         saturday: "K01-GU-NC",
//         sunday: "",
//       },
//     },
//     week3: {
//       "8:00-9:30": {
//         monday: "K01-PI-CB-01",
//         tuesday: "",
//         wednesday: "K01-PI-CB-01",
//         thursday: "",
//         friday: "K01-PI-CB-01",
//         saturday: "",
//         sunday: "",
//       },
//       "10:00-11:30": {
//         monday: "",
//         tuesday: "K01-GU-CB-02",
//         wednesday: "",
//         thursday: "K01-GU-CB-02",
//         friday: "",
//         saturday: "K01-GU-CB-02",
//         sunday: "",
//       },
//       "14:00-17:30": {
//         monday: "",
//         tuesday: "",
//         wednesday: "K01-PI-NC",
//         thursday: "",
//         friday: "",
//         saturday: "K01-GU-NC",
//         sunday: "",
//       },
//     },
//     week4: {
//       "8:00-9:30": {
//         monday: "K01-PI-CB-01",
//         tuesday: "",
//         wednesday: "K01-PI-CB-01",
//         thursday: "",
//         friday: "K01-PI-CB-01",
//         saturday: "",
//         sunday: "",
//       },
//       "10:00-11:30": {
//         monday: "",
//         tuesday: "K01-GU-CB-02",
//         wednesday: "",
//         thursday: "K01-GU-CB-02",
//         friday: "",
//         saturday: "K01-GU-CB-02",
//         sunday: "",
//       },
//       "14:00-17:30": {
//         monday: "",
//         tuesday: "",
//         wednesday: "K01-PI-NC",
//         thursday: "",
//         friday: "",
//         saturday: "K01-GU-NC",
//         sunday: "",
//       },
//     },
//   }

//   const timeSlots = ["8:00-9:30", "10:00-11:30", "14:00-17:30"]

//   // Different dates for each week
//   const weekDates = {
//     0: [
//       // Week 1
//       { key: "monday", label: "Thứ 2", time: "02/12" },
//       { key: "tuesday", label: "Thứ 3", time: "03/12" },
//       { key: "wednesday", label: "Thứ 4", time: "04/12" },
//       { key: "thursday", label: "Thứ 5", time: "05/12" },
//       { key: "friday", label: "Thứ 6", time: "06/12" },
//       { key: "saturday", label: "Thứ 7", time: "07/12" },
//       { key: "sunday", label: "Chủ nhật", time: "08/12" },
//     ],
//     1: [
//       // Week 2
//       { key: "monday", label: "Thứ 2", time: "09/12" },
//       { key: "tuesday", label: "Thứ 3", time: "10/12" },
//       { key: "wednesday", label: "Thứ 4", time: "11/12" },
//       { key: "thursday", label: "Thứ 5", time: "12/12" },
//       { key: "friday", label: "Thứ 6", time: "13/12" },
//       { key: "saturday", label: "Thứ 7", time: "14/12" },
//       { key: "sunday", label: "Chủ nhật", time: "15/12" },
//     ],
//     2: [
//       // Week 3
//       { key: "monday", label: "Thứ 2", time: "16/12" },
//       { key: "tuesday", label: "Thứ 3", time: "17/12" },
//       { key: "wednesday", label: "Thứ 4", time: "18/12" },
//       { key: "thursday", label: "Thứ 5", time: "19/12" },
//       { key: "friday", label: "Thứ 6", time: "20/12" },
//       { key: "saturday", label: "Thứ 7", time: "21/12" },
//       { key: "sunday", label: "Chủ nhật", time: "22/12" },
//     ],
//     3: [
//       // Week 4
//       { key: "monday", label: "Thứ 2", time: "23/12" },
//       { key: "tuesday", label: "Thứ 3", time: "24/12" },
//       { key: "wednesday", label: "Thứ 4", time: "25/12" },
//       { key: "thursday", label: "Thứ 5", time: "26/12" },
//       { key: "friday", label: "Thứ 6", time: "27/12" },
//       { key: "saturday", label: "Thứ 7", time: "28/12" },
//       { key: "sunday", label: "Chủ nhật", time: "29/12" },
//     ],
//   }

//   const weekKeys = ["week1", "week2", "week3", "week4"]
//   const weekTitles = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]

//   const handlePrevWeek = () => {
//     setCurrentWeek((prev) => (prev > 0 ? prev - 1 : 3))
//   }

//   const handleNextWeek = () => {
//     setCurrentWeek((prev) => (prev < 3 ? prev + 1 : 0))
//   }

//   // Function to determine if this is today's column (entire day)
//   const isTodayColumn = (dayKey) => {
//     // For demo purposes, highlighting Wednesday as today
//     return dayKey === "wednesday"
//   }

//   const renderCurrentWeekSchedule = () => {
//     const weekKey = weekKeys[currentWeek]
//     const weekTitle = weekTitles[currentWeek]
//     const weekData = scheduleData[weekKey]
//     const daysOfWeek = weekDates[currentWeek]

//     return (
//       <div className="schedule-week-section">
//         <Title level={3} className="schedule-week-title">
//           {weekTitle}
//         </Title>
//         <div className="schedule-table-wrapper">
//           {/* Header Row */}
//           <div className="schedule-table-header">
//             <div className="schedule-time-header">Thời gian</div>
//             {daysOfWeek.map((day) => (
//               <div
//                 key={day.key}
//                 className={`schedule-day-header ${isTodayColumn(day.key) ? "schedule-today-column" : ""}`}
//               >
//                 <div className="schedule-day-name">{day.label}</div>
//                 <div className="schedule-day-date">{day.time}</div>
//               </div>
//             ))}
//           </div>

//           {/* Time Slot Rows */}
//           {timeSlots.map((timeSlot) => (
//             <div key={timeSlot} className="schedule-table-row">
//               <div className="schedule-time-cell">{timeSlot}</div>
//               {daysOfWeek.map((day) => {
//                 const classCode = weekData[timeSlot][day.key]
//                 const isTodayCol = isTodayColumn(day.key)

//                 return (
//                   <div
//                     key={day.key}
//                     className={`schedule-class-cell ${classCode ? "schedule-has-class" : ""} ${isTodayCol ? "schedule-today-column" : ""}`}
//                   >
//                     {classCode && <span className="schedule-class-code">{classCode}</span>}
//                   </div>
//                 )
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="schedule-main-page">
//       <div className="schedule-main-container">
//         <Title level={1} className="schedule-page-title">
//           Thời khóa biểu
//         </Title>

//         {/* Week Navigation */}
//         <div className="schedule-month-navigation">
//           <Button type="primary" icon={<LeftOutlined />} onClick={handlePrevWeek} className="schedule-nav-button" />
//           <div className="schedule-current-month">
//             {weekTitles[currentWeek]} - Tháng {currentMonth}
//           </div>
//           <Button type="primary" icon={<RightOutlined />} onClick={handleNextWeek} className="schedule-nav-button" />
//         </div>

//         {/* Legend */}
//         <div className="schedule-legend">
//           <Text className="schedule-legend-title">Chú thích</Text>
//           <div className="schedule-legend-item">
//             <div className="schedule-legend-color schedule-today-color"></div>
//             <Text className="schedule-legend-text">Hôm nay</Text>
//           </div>
//         </div>

//         {/* Current Week Schedule */}
//         <div className="schedule-weeks-container">{renderCurrentWeekSchedule()}</div>
//       </div>
//     </div>
//   )
// }

// export default Schedule


// "use client"

// import { Typography, Button, Spin, Alert } from "antd"
// import { LeftOutlined, RightOutlined } from "@ant-design/icons"
// import { useState, useEffect, useMemo } from "react"
// import "./Schedule.css" // Đảm bảo file CSS này tồn tại và chứa các style cần thiết
// import moment from 'moment'; // Cần cài đặt: npm install moment

// const { Title, Text } = Typography

// // API Base URL - Mày nên đặt cái này vào biến môi trường (environment variable)
// const API_BASE_URL = "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api";

// const Schedule = () => {
//     const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0); // Index cho lịch trình tháng (scheduleId)
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Raw data from APIs
//     const [schedules, setSchedules] = useState([]);
//     const [weeks, setWeeks] = useState([]);
//     const [timeslots, setTimeslots] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [classSessions, setClassSessions] = useState([]);

//     // Fetched data state
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 // Fetch all data concurrently
//                 const [
//                     schedulesRes,
//                     weeksRes,
//                     timeslotsRes,
//                     classesRes,
//                     classSessionsRes,
//                 ] = await Promise.all([
//                     fetch(`${API_BASE_URL}/Schedule`).then((res) => res.json()),
//                     fetch(`${API_BASE_URL}/Week`).then((res) => res.json()),
//                     fetch(`${API_BASE_URL}/Timeslot`).then((res) => res.json()),
//                     fetch(`${API_BASE_URL}/Class`).then((res) => res.json()),
//                     fetch(`${API_BASE_URL}/ClassSession`).then((res) => res.json()),
//                 ]);

//                 setSchedules(schedulesRes);
//                 setWeeks(weeksRes);
//                 setTimeslots(timeslotsRes);
//                 setClasses(classesRes);
//                 setClassSessions(classSessionsRes);

//                 // Set initial schedule index to the current month if available
//                 const currentMonth = moment().format('YYYY-MM-01');
//                 const initialSchedule = schedulesRes.findIndex(s => s.monthYear === currentMonth);
//                 if (initialSchedule !== -1) {
//                     setCurrentScheduleIndex(initialSchedule);
//                 } else if (schedulesRes.length > 0) {
//                     setCurrentScheduleIndex(0); // Fallback to first schedule if current month not found
//                 }

//             } catch (err) {
//                 console.error("Failed to fetch schedule data:", err);
//                 // @ts-ignore
//                 setError("Không thể tải dữ liệu lịch trình. Vui lòng thử lại sau.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array means this runs once on mount

//     // Memoize processed schedule data for current month/scheduleId
//     const processedScheduleData = useMemo(() => {
//         if (!schedules.length || !weeks.length || !timeslots.length || !classes.length || !classSessions.length) {
//             return {};
//         }

//         const currentSchedule = schedules[currentScheduleIndex];
//         if (!currentSchedule) return {};

//         const scheduleWeeks = weeks.filter(week => week.schedule_id === currentSchedule.scheduleId);
//         const timeSlotMap = new Map(timeslots.map(ts => [ts.timeslotId, `${ts.startTime.substring(0, 5)}-${ts.endTime.substring(0, 5)}`]));
//         const classMap = new Map(classes.map(cls => [cls.classId, cls.classCode]));

//         // Initialize a structure similar to scheduleData sample
//         const newScheduleData = {};
//         const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
//         const timeSlotKeys = Array.from(timeSlotMap.values()).sort(); // Ensure consistent order for time slots

//         scheduleWeeks.forEach(week => {
//             const weekKey = `week${week.week_number}`; // e.g., 'week1', 'week2'
//             newScheduleData[weekKey] = {};

//             timeSlotKeys.forEach(tsKey => {
//                 newScheduleData[weekKey][tsKey] = {};
//                 daysOfWeek.forEach(dayKey => {
//                     newScheduleData[weekKey][tsKey][dayKey] = ""; // Initialize empty
//                 });
//             });

//             // Populate with class sessions
//             classSessions.forEach(session => {
//                 if (session.weekId === week.week_id) {
//                     const sessionDate = moment(session.date);
//                     const dayKey = daysOfWeek[sessionDate.day() === 0 ? 6 : sessionDate.day() - 1]; // Monday=0, Sunday=6 in moment().day()
//                     const timeRange = timeSlotMap.get(session.timeSlotId);
//                     const classCode = classMap.get(session.classId);

//                     if (timeRange && dayKey && classCode) {
//                         // Concatenate class code and session number
//                         newScheduleData[weekKey][timeRange][dayKey] = `${classCode} (Buổi ${session.sessionNumber})`;
//                     }
//                 }
//             });
//         });

//         return {
//             data: newScheduleData,
//             timeSlots: timeSlotKeys,
//             weekDates: scheduleWeeks.map(week => ({
//                 id: week.week_id,
//                 number: week.week_number,
//                 startDate: moment(week.day_of_week), // Using day_of_week as the starting date of the week
//                 dates: Array(7).fill(null).map((_, i) => ({
//                     key: daysOfWeek[i],
//                     label: moment().day(i + 1).format('ddd'), // 'Thứ 2', 'Thứ 3', ...
//                     time: moment(week.day_of_week).add(i, 'days').format('DD/MM')
//                 }))
//             }))
//         };
//     }, [schedules, weeks, timeslots, classes, classSessions, currentScheduleIndex]);


//     const handlePrevWeek = () => {
//         // Decrement currentScheduleIndex to move to the previous month's schedule
//         setCurrentScheduleIndex((prev) => (prev > 0 ? prev - 1 : schedules.length - 1)); // Wrap around
//     };

//     const handleNextWeek = () => {
//         // Increment currentScheduleIndex to move to the next month's schedule
//         setCurrentScheduleIndex((prev) => (prev < schedules.length - 1 ? prev + 1 : 0)); // Wrap around
//     };

//     const isTodayColumn = (dateString, dayKey) => {
//         const today = moment().startOf('day');
//         const cellDate = moment(dateString, 'DD/MM').year(moment().year()); // Assume current year for simple comparison
//         return today.isSame(cellDate, 'day');
//     };

//     const renderCurrentWeekSchedule = () => {
//         if (!processedScheduleData.data || !schedules[currentScheduleIndex]) {
//             return null; // Data not ready
//         }

//         // We need to map `weekDates` from processedScheduleData to `currentWeek` for consistent display
//         // Since we are iterating schedules by `currentScheduleIndex`, let's get the corresponding week number for display
//         const currentScheduleMonthYear = moment(schedules[currentScheduleIndex].monthYear).format('MM/YYYY');
        
//         // Find the week data corresponding to the current schedule index.
//         // Assuming schedules[currentScheduleIndex] maps to the first week of that month.
//         // This part might need refinement based on how your `Week` API is truly structured
//         // If `week_number` in `Week` API directly corresponds to the week within a month, we need to adapt.
//         // For simplicity, let's assume `processedScheduleData.weekDates[0]` represents the first week shown for the current schedule.
        
//         // For UI consistency with the old code, we will iterate `week1`
//         // However, the `weekDates` in `processedScheduleData` now contains dates for weeks associated with `currentScheduleIndex`
//         const displayWeekData = processedScheduleData.weekDates[0]; // Assuming we display the first available week for the current month schedule

//         if (!displayWeekData) return null; // No week data found for this schedule

//         const daysOfWeekForDisplay = displayWeekData.dates; // Days of the week for the first week of the current schedule
//         const currentWeekScheduleData = processedScheduleData.data[`week${displayWeekData.number}`]; // Get data for this specific week

//         return (
//             <div className="schedule-week-section">
//                 <Title level={3} className="schedule-week-title">
//                     Tuần {displayWeekData.number}
//                 </Title>
//                 <div className="schedule-table-wrapper">
//                     {/* Header Row */}
//                     <div className="schedule-table-header">
//                         <div className="schedule-time-header">Thời gian</div>
//                         {daysOfWeekForDisplay.map((day) => (
//                             <div
//                                 key={day.key}
//                                 className={`schedule-day-header ${isTodayColumn(day.time) ? "schedule-today-column" : ""}`}
//                             >
//                                 <div className="schedule-day-name">{day.label}</div>
//                                 <div className="schedule-day-date">{day.time}</div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Time Slot Rows */}
//                     {processedScheduleData.timeSlots.map((timeSlot) => (
//                         <div key={timeSlot} className="schedule-table-row">
//                             <div className="schedule-time-cell">{timeSlot}</div>
//                             {daysOfWeekForDisplay.map((day) => {
//                                 const classInfo = currentWeekScheduleData?.[timeSlot]?.[day.key] || "";
//                                 const isTodayCol = isTodayColumn(day.time);

//                                 return (
//                                     <div
//                                         key={day.key}
//                                         className={`schedule-class-cell ${classInfo ? "schedule-has-class" : ""} ${isTodayCol ? "schedule-today-column" : ""}`}
//                                     >
//                                         {classInfo && <span className="schedule-class-code">{classInfo}</span>}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     if (isLoading) {
//         return (
//             <div className="schedule-main-page">
//                 <div className="schedule-main-container" style={{ textAlign: 'center', padding: '50px' }}>
//                     <Spin size="large" tip="Đang tải lịch trình..." />
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="schedule-main-page">
//                 <div className="schedule-main-container" style={{ padding: '20px' }}>
//                     <Alert message="Lỗi" description={error} type="error" showIcon />
//                 </div>
//             </div>
//         );
//     }

//     if (!schedules.length) {
//         return (
//             <div className="schedule-main-page">
//                 <div className="schedule-main-container" style={{ padding: '20px', textAlign: 'center' }}>
//                     <Text>Không có lịch trình nào được tìm thấy.</Text>
//                 </div>
//             </div>
//         );
//     }

//     const currentScheduleMonthYearDisplay = schedules[currentScheduleIndex] ? moment(schedules[currentScheduleIndex].monthYear).format('MM/YYYY') : '';

//     return (
//         <div className="schedule-main-page">
//             <div className="schedule-main-container">
//                 <Title level={1} className="schedule-page-title">
//                     Thời khóa biểu
//                 </Title>

//                 {/* Week Navigation */}
//                 <div className="schedule-month-navigation">
//                     <Button
//                         type="primary"
//                         icon={<LeftOutlined />}
//                         onClick={handlePrevWeek}
//                         className="schedule-nav-button"
//                     />
//                     <div className="schedule-current-month">
//                         {schedules[currentScheduleIndex]?.note || `Lịch trình tháng ${currentScheduleMonthYearDisplay}`}
//                     </div>
//                     <Button
//                         type="primary"
//                         icon={<RightOutlined />}
//                         onClick={handleNextWeek}
//                         className="schedule-nav-button"
//                     />
//                 </div>

//                 {/* Legend */}
//                 <div className="schedule-legend">
//                     <Text className="schedule-legend-title">Chú thích</Text>
//                     <div className="schedule-legend-item">
//                         <div className="schedule-legend-color schedule-today-color"></div>
//                         <Text className="schedule-legend-text">Hôm nay</Text>
//                     </div>
//                 </div>

//                 {/* Current Week Schedule */}
//                 <div className="schedule-weeks-container">{renderCurrentWeekSchedule()}</div>
//             </div>
//         </div>
//     );
// };

// export default Schedule;


// "use client"

// import { Typography, Button, Spin, message } from "antd"
// import { LeftOutlined, RightOutlined } from "@ant-design/icons"
// import { useState, useEffect, useRef } from "react"
// import "./Schedule.css"

// const { Title, Text } = Typography

// const Schedule = () => {
//   const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0)
//   const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
//   const [loading, setLoading] = useState(true)

//   // API Data States
//   const [schedules, setSchedules] = useState([])
//   const [weeks, setWeeks] = useState([])
//   const [days, setDays] = useState([])
//   const [timeslots, setTimeslots] = useState([])
//   const [classes, setClasses] = useState([]) // Thêm state cho Classes
//   const [classSessions, setClassSessions] = useState([])

//   const hasFetchedData = useRef(false)

//   // Fixed week structure - Monday to Sunday with dayIndex for Date.getDay()
//   const weekDaysStructure = [
//     { key: "Monday", label: "Thứ 2", dayIndex: 1 },
//     { key: "Tuesday", label: "Thứ 3", dayIndex: 2 },
//     { key: "Wednesday", label: "Thứ 4", dayIndex: 3 },
//     { key: "Thursday", label: "Thứ 5", dayIndex: 4 },
//     { key: "Friday", label: "Thứ 6", dayIndex: 5 },
//     { key: "Saturday", label: "Thứ 7", dayIndex: 6 },
//     { key: "Sunday", label: "Chủ nhật", dayIndex: 0 }, // Sunday is 0
//   ]

//   // Fetch all API data
//   const fetchAllData = async () => {
//     try {
//       setLoading(true)
//       const [schedulesRes, weeksRes, daysRes, timeslotsRes, classSessionsRes, classesRes] = await Promise.all([
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Schedule"),
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Week"),
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Day"),
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Timeslot"),
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession"),
//         fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class"), // Fetch Class API
//       ])

//       const [schedulesData, weeksData, daysData, timeslotsData, classSessionsData, classesData] = await Promise.all([
//         schedulesRes.json(),
//         weeksRes.json(),
//         daysRes.json(),
//         timeslotsRes.json(),
//         classSessionsRes.json(),
//         classesRes.json(), // Parse Class API response
//       ])

//       setSchedules(Array.isArray(schedulesData) ? schedulesData : [])
//       setWeeks(Array.isArray(weeksData) ? weeksData : [])
//       setDays(Array.isArray(daysData) ? daysData : [])
//       setTimeslots(Array.isArray(timeslotsData) ? timeslotsData : [])
//       setClasses(Array.isArray(classesData) ? classesData : []) // Set Classes state
//       setClassSessions(Array.isArray(classSessionsData) ? classSessionsData : [])

//       // Sort schedules by monthYear
//       const sortedSchedules = Array.isArray(schedulesData) ? [...schedulesData].sort((a, b) => new Date(a.monthYear).getTime() - new Date(b.monthYear).getTime()) : [];
//       setSchedules(sortedSchedules);

//     } catch (error) {
//       console.error("Error fetching schedule data:", error)
//       message.error("Không thể tải dữ liệu thời khóa biểu")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (!hasFetchedData.current) {
//       hasFetchedData.current = true
//       fetchAllData()
//     }
//   }, [])

//   // Helper function to format time
//   const formatTime = (timeString) => {
//     if (!timeString) return ""
//     return timeString.substring(0, 5) // Get HH:MM from HH:MM:SS
//   }

//   // Get current schedule
//   const getCurrentSchedule = () => {
//     return schedules[currentScheduleIndex] || null
//   }

//   // Get current month/year for display
//   const getCurrentMonthYear = () => {
//     const currentSchedule = getCurrentSchedule()
//     if (!currentSchedule) return "Đang tải..." // Changed default
//     const date = new Date(currentSchedule.monthYear)
//     const month = (date.getMonth() + 1).toString().padStart(2, "0")
//     const year = date.getFullYear()
//     return `${month}/${year}`
//   }

//   // Get weeks for current schedule and sort them by week number
//   const getCurrentScheduleWeeks = () => {
//     const currentSchedule = getCurrentSchedule()
//     if (!currentSchedule) return []
//     return weeks
//       .filter((week) => week.scheduleId === currentSchedule.scheduleId)
//       .sort((a, b) => a.weekNumberInMonth - b.weekNumberInMonth)
//   }

//   const getWeekNumbers = () => {
//     const scheduleWeeks = getCurrentScheduleWeeks()
//     // Lấy weekNumberInMonth từ các tuần và loại bỏ trùng lặp, sau đó sắp xếp
//     const weekNumbers = [...new Set(scheduleWeeks.map((week) => week.weekNumberInMonth))].sort((a, b) => a - b);
//     return weekNumbers
//   }

//   // Helper function to get day key from date (e.g., "Monday", "Tuesday")
//   const getDayKeyFromDate = (dateString) => {
//     const date = new Date(dateString);
//     const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
//     const dayStructure = weekDaysStructure.find((day) => day.dayIndex === dayIndex);
//     return dayStructure ? dayStructure.key : null;
//   };

//   // Get days for current week with proper structure (Monday to Sunday)
//   const getCurrentWeekDays = () => {
//     const scheduleWeeks = getCurrentScheduleWeeks();
//     const weekNumbers = getWeekNumbers();
//     const currentWeekNum = weekNumbers[currentWeekIndex];

//     if (currentWeekNum === undefined) return weekDaysStructure.map(day => ({ ...day, date: null, weekId: null, formattedDate: "" }));

//     const currentWeekData = scheduleWeeks.find(week => week.weekNumberInMonth === currentWeekNum);

//     if (!currentWeekData || !currentWeekData.days) {
//       return weekDaysStructure.map(day => ({ ...day, date: null, weekId: null, formattedDate: "" }));
//     }

//     // Create a map of day keys to actual day data from API (DayType)
//     const dayMap = {};
//     currentWeekData.days.forEach(day => {
//         const dayKey = getDayKeyFromDate(day.dateOfDay); // Dùng dateOfDay để lấy dayKey
//         if (dayKey) {
//             dayMap[dayKey] = day;
//         }
//     });

//     // Return structured week with all days (Monday to Sunday), filling with data if available
//     return weekDaysStructure.map((dayStructure) => {
//         const dayFromApi = dayMap[dayStructure.key];
//         return {
//             ...dayStructure,
//             date: dayFromApi?.dateOfDay || null, // Sử dụng dateOfDay từ DayType
//             weekId: dayFromApi?.weekId || null, // Lấy weekId từ DayType
//             dayId: dayFromApi?.dayId || null, // Thêm dayId
//             formattedDate: dayFromApi?.dateOfDay ? formatDateForDisplay(dayFromApi.dateOfDay) : "--/--",
//         };
//     });
//   };

//   // Format date for display
//   const formatDateForDisplay = (dateString) => {
//     const date = new Date(dateString)
//     const day = date.getDate().toString().padStart(2, "0")
//     const month = (date.getMonth() + 1).toString().padStart(2, "0")
//     return `${day}/${month}`
//   }

//   // Check if today column
//   const isTodayColumn = (dayInfo) => {
//     if (!dayInfo.date) return false;
//     const today = new Date();
//     const dayDate = new Date(dayInfo.date);
//     today.setHours(0, 0, 0, 0);
//     dayDate.setHours(0, 0, 0, 0);
//     return today.getTime() === dayDate.getTime();
//   };

//   // Build schedule data structure
//   const buildScheduleData = () => {
//     const currentWeekDays = getCurrentWeekDays()
//     const scheduleData = {}

//     // Initialize schedule structure with fixed time slots and days
//     const sortedTimeslots = [...timeslots].sort((a, b) => a.startTime.localeCompare(b.startTime));
//     sortedTimeslots.forEach((timeslot) => {
//       const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`
//       scheduleData[timeKey] = {}
//       weekDaysStructure.forEach((dayStructure) => {
//         scheduleData[timeKey][dayStructure.key] = ""
//       })
//     })

//     // Fill in class sessions
//     currentWeekDays.forEach((dayInfo) => {
//       if (!dayInfo.dayId) return

//       const dayClassSessions = classSessions.filter((session) => session.dayId === dayInfo.dayId)

//       dayClassSessions.forEach((session) => {
//         const timeslot = timeslots.find((ts) => ts.timeslotId === session.timeSlotId)
//         const classInfo = classes.find((cls) => cls.classId === session.classId) // Tìm kiếm thông tin lớp từ mảng classes

//         if (timeslot) {
//           const timeKey = `${formatTime(timeslot.startTime)}-${formatTime(timeslot.endTime)}`
          
//           let classCodeToDisplay = "Lớp N/A"; 
//           // Ưu tiên session.classCode nếu có và không phải là "string"
//           if (session.classCode && session.classCode !== "string") {
//             classCodeToDisplay = session.classCode;
//           } else if (classInfo?.classCode) { // Fallback dùng classInfo.classCode nếu session.classCode lỗi
//             classCodeToDisplay = classInfo.classCode;
//           }

//           const sessionInfo = `${classCodeToDisplay} - Buổi ${session.sessionNumber}`

//           const dayKey = getDayKeyFromDate(dayInfo.date)
//           if (dayKey && scheduleData[timeKey]) {
//             scheduleData[timeKey][dayKey] = sessionInfo
//           }
//         }
//       })
//     })

//     return scheduleData
//   }

//   // Navigation handlers
//   const handlePrevWeek = () => {
//     const weekNumbers = getWeekNumbers();
//     if (currentWeekIndex > 0) {
//       setCurrentWeekIndex(currentWeekIndex - 1);
//     } else {
//       if (currentScheduleIndex > 0) {
//         setCurrentScheduleIndex(currentScheduleIndex - 1);
//         const prevScheduleId = schedules[currentScheduleIndex - 1]?.scheduleId;
//         if (prevScheduleId !== undefined) {
//             const prevScheduleWeeks = weeks.filter(week => week.scheduleId === prevScheduleId);
//             const prevWeekNumbers = [...new Set(prevScheduleWeeks.map(week => week.weekNumberInMonth))].sort((a, b) => a - b);
//             if (prevWeekNumbers.length > 0) {
//                 setCurrentWeekIndex(prevWeekNumbers.length - 1);
//             } else {
//                 setCurrentWeekIndex(0);
//             }
//         } else {
//              setCurrentWeekIndex(0);
//         }
//       } else {
//         message.info("Bạn đang ở tuần đầu tiên của thời khóa biểu đầu tiên.");
//       }
//     }
//   };

//   const handleNextWeek = () => {
//     const weekNumbers = getWeekNumbers();
//     if (currentWeekIndex < weekNumbers.length - 1) {
//       setCurrentWeekIndex(currentWeekIndex + 1);
//     } else {
//       if (currentScheduleIndex < schedules.length - 1) {
//         setCurrentScheduleIndex(currentScheduleIndex + 1);
//         setCurrentWeekIndex(0);
//       } else {
//         message.info("Bạn đang ở tuần cuối cùng của thời khóa biểu cuối cùng.");
//       }
//     }
//   };

//   const renderCurrentWeekSchedule = () => {
//     const weekNumbers = getWeekNumbers();
//     const currentWeekNumber = weekNumbers[currentWeekIndex];
//     const weekTitle = `Tuần ${currentWeekNumber || 'N/A'}`;

//     const currentWeekDays = getCurrentWeekDays();
//     const scheduleData = buildScheduleData();
//     const timeSlots = timeslots
//       .sort((a, b) => a.startTime.localeCompare(b.startTime))
//       .map((ts) => `${formatTime(ts.startTime)}-${formatTime(ts.endTime)}`);

//     if (!currentWeekNumber || currentWeekDays.every(d => !d.date) || timeSlots.length === 0) {
//       return (
//         <div style={{ textAlign: 'center', padding: '50px 0' }}>
//           <Text type="secondary">Không có dữ liệu thời khóa biểu cho tuần này.</Text>
//         </div>
//       );
//     }

//     return (
//       <div className="schedule-week-section">
//         <Title level={3} className="schedule-week-title">
//           {weekTitle}
//         </Title>
//         <div className="schedule-table-wrapper">
//           {/* Header Row */}
//           <div className="schedule-table-header">
//             <div className="schedule-time-header">Thời gian</div>
//             {currentWeekDays.map((dayInfo) => (
//               <div
//                 key={dayInfo.key}
//                 className={`schedule-day-header ${isTodayColumn(dayInfo) ? "schedule-today-column" : ""}`}
//               >
//                 <div className="schedule-day-name">{dayInfo.label}</div>
//                 <div className="schedule-day-date">{dayInfo.formattedDate || "--/--"}</div>
//               </div>
//             ))}
//           </div>

//           {/* Time Slot Rows */}
//           {timeSlots.map((timeSlot) => (
//             <div key={timeSlot} className="schedule-table-row">
//               <div className="schedule-time-cell">{timeSlot}</div>
//               {currentWeekDays.map((dayInfo) => {
//                 const classInfo = scheduleData[timeSlot] ? scheduleData[timeSlot][dayInfo.key] : "";
//                 const isTodayCol = isTodayColumn(dayInfo);
//                 return (
//                   <div
//                     key={`${timeSlot}-${dayInfo.key}`}
//                     className={`schedule-class-cell ${classInfo ? "schedule-has-class" : ""} ${isTodayCol ? "schedule-today-column" : ""}`}
//                   >
//                     {classInfo && <span className="schedule-class-code">{classInfo}</span>}
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };


//   if (loading) {
//     return (
//       <div className="schedule-main-page">
//         <div className="schedule-main-container">
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "400px",
//             }}
//           >
//             <Spin size="large" tip="Đang tải thời khóa biểu..." />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (schedules.length === 0) {
//     return (
//       <div className="schedule-main-page">
//         <div className="schedule-main-container">
//           <Title level={1} className="schedule-page-title">
//             Thời khóa biểu
//           </Title>
//           <div style={{ textAlign: 'center', padding: '50px 0' }}>
//             <Text type="danger">Không có dữ liệu thời khóa biểu nào được tìm thấy.</Text>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const weekNumbersForCurrentSchedule = getWeekNumbers();
//   const currentWeekNumberToDisplay = weekNumbersForCurrentSchedule[currentWeekIndex] || 'N/A';

//   return (
//     <div className="schedule-main-page">
//       <div className="schedule-main-container">
//         <Title level={1} className="schedule-page-title">
//           Thời khóa biểu
//         </Title>

//         {/* Week Navigation */}
//         <div className="schedule-month-navigation">
//           <Button
//             type="primary"
//             icon={<LeftOutlined />}
//             onClick={handlePrevWeek}
//             className="schedule-nav-button"
//             disabled={currentScheduleIndex === 0 && currentWeekIndex === 0}
//           />
//           <div className="schedule-current-month">
//             Tuần {currentWeekNumberToDisplay} - Tháng {getCurrentMonthYear()}
//           </div>
//           <Button
//             type="primary"
//             icon={<RightOutlined />}
//             onClick={handleNextWeek}
//             className="schedule-nav-button"
//             disabled={
//               currentScheduleIndex === schedules.length - 1 &&
//               currentWeekIndex === (weekNumbersForCurrentSchedule.length - 1)
//             }
//           />
//         </div>

//         {/* Legend */}
//         <div className="schedule-legend">
//           <Text className="schedule-legend-title">Chú thích</Text>
//           <div className="schedule-legend-item">
//             <div className="schedule-legend-color schedule-today-color"></div>
//             <Text className="schedule-legend-text">Hôm nay</Text>
//           </div>
//         </div>

//         {/* Current Week Schedule */}
//         <div className="schedule-weeks-container">{renderCurrentWeekSchedule()}</div>
//       </div>
//     </div>
//   )
// }

// export default Schedule


"use client"

import { Typography, Button, Spin, message } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import "./Schedule.css" // Đảm bảo CSS file này tồn tại và được cấu hình đúng

const { Title, Text } = Typography

const Schedule = () => {
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

          const sessionInfo = `${classCodeToDisplay} - Buổi ${session.sessionNumber}`

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
        message.info("Mày đang ở tuần đầu tiên của thời khóa biểu đầu tiên rồi.")
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
        message.info("Mày đang ở tuần cuối cùng của thời khóa biểu cuối cùng rồi.")
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

export default Schedule