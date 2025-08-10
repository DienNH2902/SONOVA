
import {
  Typography,
  Table,
  Spin,
  Button,
  Space,
  Card,
  Select,
  App,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Checkbox,
  Tag,
  Tooltip,
} from "antd"
import {
  FilterOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { useState, useEffect, useRef, useMemo } from "react"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
dayjs.extend(isSameOrBefore)
import "./CourseSchedule.css"

const { Title } = Typography
const { Option } = Select

// Mapping for weekdays (ID to Vietnamese name based on your API's definition)
const dayMapToVietnameseById = {
  1: "Thứ 3",
  2: "Thứ 4",
  3: "Thứ 5",
  4: "Thứ 6",
  5: "Thứ 7",
  6: "Chủ nhật",
  7: "Thứ 2",
}

// Mapping for Ant Design Select options
const weekdayOptions = [
  { label: "Thứ 2", value: 1 },
  { label: "Thứ 3", value: 2 },
  { label: "Thứ 4", value: 3 },
  { label: "Thứ 5", value: 4 },
  { label: "Thứ 6", value: 5 },
  { label: "Thứ 7", value: 6 },
  { label: "Chủ nhật", value: 7 },
]

const CourseSchedule = () => {
  const [openingSchedules, setOpeningSchedules] = useState([])
  const [classSessions, setClassSessions] = useState([]) // Dữ liệu từ API ClassSession
  const [loading, setLoading] = useState(true)
  const [subjectFilter, setSubjectFilter] = useState(null)
  const [teacherFilter, setTeacherFilter] = useState(null)
  const [subjects, setSubjects] = useState([]) // Danh sách môn học (InstrumentName)
  const [teachers, setTeachers] = useState([]) // Danh sách tên giảng viên cho filter
  const [availableTeachers, setAvailableTeachers] = useState([]) // Danh sách giảng viên có userId
  const [allUsers, setAllUsers] = useState([]) // Tất cả người dùng để đếm số học viên
  const [rooms, setRooms] = useState([]) // Danh sách phòng học
  const [timeslots, setTimeslots] = useState([]) // Danh sách khung giờ

  const { message: antdMessage, modal: antdModal } = App.useApp()

  // Refs để tránh fetch lại dữ liệu khi component re-render không cần thiết
  const hasFetchedSchedules = useRef(false)
  const hasFetchedTeachers = useRef(false)
  const hasFetchedClassSessions = useRef(false)
  const hasFetchedRooms = useRef(false)
  const hasFetchedTimeslots = useRef(false)

  // States cho modal CẬP NHẬT
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [updateForm] = Form.useForm()

  // States cho modal THÊM MỚI
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isAdvancedClassToAdd, setIsAdvancedClassToAdd] = useState(false) // Xác định là lớp nâng cao khi thêm mới
  const [addForm] = Form.useForm()

  // --- API Fetching Functions ---

  const fetchOpeningSchedules = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/OpeningSchedule",
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (Array.isArray(data)) {
        setOpeningSchedules(data)

        // Extract unique subjects (instrument names)
        const uniqueSubjects = [...new Set(data.map((item) => item.instrument?.instrumentName).filter(Boolean))]
        setSubjects(uniqueSubjects)

        // Extract unique teacher names for filter dropdown
        const allTeacherNamesFromApi = data.map((item) => item.teacherUser?.accountName?.trim()).filter(Boolean)
        const uniqueTeachersForFilter = [...new Set(allTeacherNamesFromApi)]
        setTeachers(uniqueTeachersForFilter)
      } else {
        setOpeningSchedules([])
        setSubjects([])
        setTeachers([])
      }
    } catch (error) {
      console.error("Error fetching opening schedules:", error)
      antdMessage.error("Không thể tải dữ liệu lịch học.")
    } finally {
      setLoading(false)
    }
  }

  const fetchClassSessions = async () => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/ClassSession")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (Array.isArray(data)) {
        setClassSessions(data)
      } else {
        setClassSessions([])
      }
    } catch (error) {
      console.error("Error fetching class sessions:", error)
      // antdMessage.error("Không thể tải dữ liệu buổi học."); // Suppress for less critical data
    }
  }

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        antdMessage.error("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.")
        return
      }

      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/User", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          antdMessage.error("Phiên đăng nhập hết hạn hoặc không có quyền truy cập. Vui lòng đăng nhập lại.")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }

      const users = await response.json()
      if (Array.isArray(users)) {
        const teachersData = users.filter((user) => user.roleId === 2 && !user.isDisabled)
        setAvailableTeachers(teachersData)
        setAllUsers(users)
      } else {
        setAvailableTeachers([])
        setAllUsers([])
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      antdMessage.error(`Không thể tải danh sách người dùng: ${error.message || "Lỗi không xác định"}`)
    }
  }

  const fetchRooms = async () => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Room")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setRooms(data)
      } else {
        setRooms([])
      }
    } catch (error) {
      console.error("Error fetching rooms:", error)
      antdMessage.error("Không thể tải danh sách phòng học.")
    }
  }

  const fetchTimeslots = async () => {
    try {
      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Timeslot")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setTimeslots(data)
      } else {
        setTimeslots([])
      }
    } catch (error) {
      console.error("Error fetching timeslots:", error)
      antdMessage.error("Không thể tải danh sách khung giờ.")
    }
  }

  // --- useEffect Hooks for Initial Data Fetching ---

  useEffect(() => {
    if (hasFetchedSchedules.current) return
    hasFetchedSchedules.current = true
    fetchOpeningSchedules()
  }, [])

  useEffect(() => {
    if (!hasFetchedTeachers.current) {
      hasFetchedTeachers.current = true
      fetchAllUsers()
    }
  }, [])

  useEffect(() => {
    if (!hasFetchedClassSessions.current) {
      hasFetchedClassSessions.current = true
      fetchClassSessions()
    }
  }, [])

  useEffect(() => {
    if (!hasFetchedRooms.current) {
      hasFetchedRooms.current = true
      fetchRooms()
    }
  }, [])

  useEffect(() => {
    if (!hasFetchedTimeslots.current) {
      hasFetchedTimeslots.current = true
      fetchTimeslots()
    }
  }, [])

  // --- Helper Functions ---

  const getActualStudentCount = (classCode) => {
    const classData = classSessions.find((cls) => cls.classCode === classCode)
    if (!classData || !classData.classId) return 0

    const studentsInClass = allUsers.filter(
      (user) => user.roleId === 3 && !user.isDisabled && user.classIds && user.classIds.includes(classData.classId),
    )
    return studentsInClass.length
  }

  // Transform schedule data for table display
  const transformScheduleData = (schedules) => {
    return schedules.map((schedule, index) => {
      const {
        openingDay,
        endDate,
        studentQuantity,
        selectedDayOfWeekIds,
        classCode,
        totalSessions,
        defaultRoomId,
        timeSlotIds,
      } = schedule

      const subjectName = schedule.instrument?.instrumentName || "Không xác định"
      const teacherName = schedule.teacherUser?.accountName?.trim() || "Chưa phân công"
      const actualStudentCount = getActualStudentCount(classCode)

      // Get room code
      const room = rooms.find((r) => r.roomId === defaultRoomId)
      const roomCode = room ? room.roomCode : "N/A"

      // Get time slot string
      let displayTime = ""
      if (Array.isArray(timeSlotIds) && timeSlotIds.length > 0) {
        // Assuming only one timeSlotId for simplicity or picking the first one
        const timeslot = timeslots.find((ts) => ts.timeslotId === timeSlotIds[0])
        if (timeslot) {
          const formattedStartTime = timeslot.startTime.substring(0, 5) // HH:MM
          const formattedEndTime = timeslot.endTime.substring(0, 5) // HH:MM
          displayTime = `(${formattedStartTime} - ${formattedEndTime})`
        }
      }

      // Convert day IDs to Vietnamese names
      let convertedDaysForDisplay = ""
      if (Array.isArray(selectedDayOfWeekIds) && selectedDayOfWeekIds.length > 0) {
        convertedDaysForDisplay = selectedDayOfWeekIds
          .map((id) => dayMapToVietnameseById[id] || `ID ${id}`)
          .join(" - ")
      } else {
        convertedDaysForDisplay = "Chưa có ngày"
      }

      const transformedSchedule = {
        key: schedule.openingScheduleId.toString(),
        stt: index + 1,
        openingScheduleId: schedule.openingScheduleId,
        subject: subjectName,
        teacherName: teacherName,
        classCode: classCode,
        openingDay: openingDay,
        endDate: endDate,
        isAdvancedClass: schedule.isAdvancedClass,
        studentQuantity: studentQuantity,
        actualStudentCount: actualStudentCount,
        instrumentId: schedule.instrumentId,
        selectedDayOfWeekIds: selectedDayOfWeekIds,
        totalSessions: totalSessions, // New field
        defaultRoomId: defaultRoomId, // New field
        timeSlotIds: timeSlotIds, // New field
        displaySchedule: `${convertedDaysForDisplay} ${displayTime}`.trim(),
        displayCapacity: `${actualStudentCount}/${studentQuantity}`,
        displayRoom: roomCode, // New display field for room
      }

      return transformedSchedule
    })
  }

  // Memoized filtered data
  const transformedData = useMemo(
    () => transformScheduleData(openingSchedules),
    [openingSchedules, classSessions, allUsers, rooms, timeslots], // Added new dependencies
  )

  const filteredSchedules = useMemo(() => {
    let filtered = transformedData
    if (subjectFilter) {
      filtered = filtered.filter((schedule) => schedule.subject === subjectFilter)
    }
    if (teacherFilter) {
      filtered = filtered.filter((schedule) => schedule.teacherName === teacherFilter)
    }
    return filtered
  }, [transformedData, subjectFilter, teacherFilter])

  const basicSchedules = useMemo(() => {
    return filteredSchedules.filter((schedule) => !schedule.isAdvancedClass)
  }, [filteredSchedules])

  const advancedSchedules = useMemo(() => {
    return filteredSchedules.filter((schedule) => schedule.isAdvancedClass)
  }, [filteredSchedules])

  const clearFilters = () => {
    setSubjectFilter(null)
    setTeacherFilter(null)
  }

  const getCapacityColor = (capacity) => {
    const [current, total] = capacity.split("/").map(Number)
    const percentage = (current / total) * 100
    if (percentage >= 100) return "red"
    if (percentage >= 80) return "orange"
    if (percentage >= 60) return "gold"
    return "green"
  }

  const getSubjectColor = (subject) => {
    const lowerSubject = subject ? subject.toLowerCase() : ""
    if (lowerSubject.includes("guitar")) return "blue"
    if (lowerSubject.includes("piano")) return "green"
    return "default"
  }

  // --- Update Modal Functions ---
  const handleEdit = (record) => {
    setCurrentRecord(record)
    // Map timeSlotIds to the ID for the form
    const timeSlotIdForForm = record.timeSlotIds && record.timeSlotIds.length > 0 ? record.timeSlotIds[0] : undefined

    updateForm.setFieldsValue({
      ...record,
      openingDay: record.openingDay ? dayjs(record.openingDay) : null,
      endDate: record.endDate ? dayjs(record.endDate) : null,
      teacherName: record.teacherName === "Chưa phân công" ? undefined : record.teacherName,
      scheduleDays: record.selectedDayOfWeekIds, // Use the actual IDs
      defaultRoomId: record.defaultRoomId, // Set room ID
      timeSlotIds: timeSlotIdForForm, // Set single time slot ID
    })
    setIsUpdateModalVisible(true)
  }

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false)
    setCurrentRecord(null)
    updateForm.resetFields()
  }

  const handleUpdateModalOk = async () => {
    try {
      const values = await updateForm.validateFields()

      const currentStudentCount = currentRecord.actualStudentCount
      if (values.studentQuantity < currentStudentCount) {
        antdMessage.error(
          `Sĩ số tối đa không thể nhỏ hơn số học viên hiện tại (${currentStudentCount}). Vui lòng nhập số lớn hơn hoặc bằng ${currentStudentCount}.`,
        )
        return
      }

      const scheduleIdToUpdate = currentRecord.openingScheduleId
      if (!scheduleIdToUpdate) {
        throw new Error("Không tìm thấy ID lịch học để cập nhật.")
      }

      const selectedTeacher = availableTeachers.find((teacher) => teacher.accountName === values.teacherName)
      const teacherUserId = selectedTeacher ? selectedTeacher.userId : null

      if (!teacherUserId && values.teacherName) {
        antdMessage.error("Giảng viên được chọn không hợp lệ. Vui lòng chọn lại.")
        return
      }

      const updatedData = {
        openingScheduleId: scheduleIdToUpdate,
        instrumentId: values.subject === "Piano" ? 2 : 1, // Assuming fixed IDs for instruments
        classCode: values.classCode, // Disabled but still part of payload
        openingDay: values.openingDay ? values.openingDay.format("YYYY-MM-DD") : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
        studentQuantity: values.studentQuantity,
        isAdvancedClass: values.isAdvancedClass || false,
        teacherUserId: teacherUserId,
        selectedDayOfWeekIds: values.scheduleDays, // Array of IDs
        totalSessions: values.totalSessions, // New field
        defaultRoomId: values.defaultRoomId, // New field
        timeSlotIds: values.timeSlotIds ? [values.timeSlotIds] : [], // Array of IDs, only one selected
        // 'schedule' field is removed as per the new API structure implied by `selectedDayOfWeekIds` and `timeSlotIds`
      }

      const response = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/OpeningSchedule/${scheduleIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      )

      if (response.ok) {
        antdMessage.success("Cập nhật lịch học thành công!")
        setIsUpdateModalVisible(false)
        setCurrentRecord(null)
        updateForm.resetFields()
        fetchOpeningSchedules() // Re-fetch all data after successful update
        fetchClassSessions()
        fetchAllUsers()
      } else {
        const errorData = await response.json()
        console.error("Error updating schedule:", errorData)
        if (errorData.errors && errorData.errors.ClassCode && errorData.errors.ClassCode.length > 0) {
          antdMessage.error(`Cập nhật lịch học thất bại: ${errorData.errors.ClassCode[0]}`)
        } else {
          antdMessage.error(
            `Cập nhật lịch học thất bại: ${errorData.message || response.statusText || "Lỗi không xác định"}`,
          )
        }
      }
    } catch (error) {
      console.error("Validation failed or network error:", error)
      if (error.errorFields) {
        antdMessage.error("Vui lòng điền đầy đủ và đúng định dạng các trường.")
      } else {
        antdMessage.error(`Có lỗi xảy ra: ${error.message || "Lỗi không xác định"}`)
      }
    }
  }

  // --- Delete Function ---
  const handleDelete = (record) => {
    if (record.actualStudentCount > 0) {
      antdMessage.error(
        `Không thể xóa lịch học này vì lớp "${record.classCode}" đang có ${record.actualStudentCount} học viên. Vui lòng chuyển học viên sang lớp khác trước khi xóa.`,
      )
      return
    }

    antdModal.confirm({
      title: "Xác nhận xóa lịch học",
      content: `Bạn có chắc chắn muốn xóa lịch học mã lớp "${record.classCode}" của môn "${record.subject}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await fetch(
            `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/OpeningSchedule/${record.openingScheduleId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
          if (response.ok) {
            antdMessage.success("Xóa lịch học thành công!")
            fetchOpeningSchedules()
            fetchClassSessions()
            fetchAllUsers()
          } else {
            const errorData = await response.json()
            console.error("Error deleting schedule:", errorData)
            antdMessage.error(
              `Xóa lịch học thất bại: ${errorData.message || response.statusText || "Lỗi không xác định"}`,
            )
          }
        } catch (error) {
          console.error("Network error during deletion:", error)
          antdMessage.error(`Có lỗi xảy ra khi xóa: ${error.message || "Lỗi không xác định"}`)
        }
      },
    })
  }

  // --- Add New Schedule Modal Functions ---
  const handleAddClass = (type) => {
    addForm.resetFields()
    setIsAdvancedClassToAdd(type === "advanced")
    setIsAddModalVisible(true)
  }

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false)
    addForm.resetFields()
  }

  const handleAddModalOk = async () => {
    try {
      const values = await addForm.validateFields()

      if (!values.scheduleDays || values.scheduleDays.length === 0) {
        antdMessage.error("Vui lòng chọn các ngày học trong tuần.")
        return
      }

      if (!values.timeSlotIds) {
        antdMessage.error("Vui lòng chọn khung giờ học.")
        return
      }

      const selectedTeacher = availableTeachers.find((teacher) => teacher.accountName === values.teacherName)
      const teacherUserId = selectedTeacher ? selectedTeacher.userId : null

      if (!teacherUserId && values.teacherName) {
        antdMessage.error("Giảng viên được chọn không hợp lệ. Vui lòng chọn lại.")
        return
      }

      const newSchedule = {
        classCode: values.classCode,
        openingDay: values.openingDay ? values.openingDay.format("YYYY-MM-DD") : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
        studentQuantity: Number.parseInt(values.studentQuantity, 10),
        isAdvancedClass: isAdvancedClassToAdd,
        teacherUserId: teacherUserId,
        instrumentId: values.subject === "Piano" ? 2 : 1, // Assuming fixed IDs for instruments
        totalSessions: Number.parseInt(values.totalSessions, 10),
        selectedDayOfWeekIds: values.scheduleDays, // Array of IDs
        defaultRoomId: values.defaultRoomId, // Single ID
        timeSlotIds: values.timeSlotIds ? [values.timeSlotIds] : [], // Array of IDs, single selected
      }

      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/OpeningSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSchedule),
        },
      )

      if (response.ok) {
        antdMessage.success("Thêm lịch khai giảng mới thành công!")
        setIsAddModalVisible(false)
        addForm.resetFields()
        fetchOpeningSchedules() // Re-fetch all data after successful add
        fetchClassSessions()
        fetchAllUsers()
      } else {
        const errorData = await response.json()
        console.error("Error adding new schedule:", errorData)
        if (errorData.errors && errorData.errors.ClassCode && errorData.errors.ClassCode.length > 0) {
          antdMessage.error(`Thêm lịch khai giảng thất bại: ${errorData.errors.ClassCode[0]}`)
        } else {
          antdMessage.error(
            `Thêm lịch khai giảng thất bại: ${errorData.message || response.statusText || "Lỗi không xác định"}`,
          )
        }
      }
    } catch (error) {
      console.error("Validation failed or network error:", error)
      if (error.errorFields) {
        antdMessage.error("Vui lòng điền đầy đủ và đúng định dạng các trường.")
      } else {
        antdMessage.error(`Có lỗi xảy ra: ${error.message || "Lỗi không xác định"}`)
      }
    }
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      render: (text, record, index) => <span className="stt-column">{index + 1}</span>,
    },
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
      width: 150,
      render: (text) => (
        <Tag color={getSubjectColor(text)} style={{ fontWeight: 500 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
      width: 120,
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherName",
      key: "teacherName",
      width: 150,
    },
    {
      title: "Ngày khai giảng",
      dataIndex: "openingDay",
      key: "openingDay",
      width: 150,
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
    // {
    //   title: "Lịch học",
    //   dataIndex: "displaySchedule",
    //   key: "displaySchedule",
    //   width: 180,
    //   align: "center",
    //   render: (text) => (
    //     <span
    //       style={{
    //         background: "rgba(30, 58, 95, 0.05)",
    //         padding: "4px 8px",
    //         borderRadius: "4px",
    //         fontSize: "13px",
    //         fontWeight: 500,
    //         color: "#1e3a5f",
    //       }}
    //     >
    //       {text}
    //     </span>
    //   ),
    // },
    {
      title: "Tổng số buổi",
      dataIndex: "totalSessions",
      key: "totalSessions",
      width: 120,
      align: "center",
    },
    // {
    //   title: "Phòng học",
    //   dataIndex: "displayRoom",
    //   key: "displayRoom",
    //   width: 100,
    //   align: "center",
    //   render: (text) => (
    //     <Tag color="cyan" style={{ fontWeight: 500 }}>
    //       {text}
    //     </Tag>
    //   ),
    // },
    {
      title: "Sĩ số",
      dataIndex: "displayCapacity",
      key: "displayCapacity",
      width: 120,
      align: "center",
      render: (text, record) => {
        const [current, total] = text.split("/").map(Number)
        const isFull = current >= total
        return (
          <Tooltip
            title={
              isFull
                ? "Lớp đã đầy"
                : `Còn ${total - current} chỗ trống. Hiện tại: ${current} học viên, Tối đa: ${total} học viên`
            }
          >
            <Tag color={getCapacityColor(text)} style={{ fontWeight: 600, cursor: "help" }}>
              {text}
              {isFull && " 🔴"}
            </Tag>
          </Tooltip>
        )
      },
    },
    
    {
      title: "Hành động",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Sửa lịch học">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="edit-button"
              aria-label="Sửa lịch học"
            />
          </Tooltip>
          <Tooltip title={record.actualStudentCount > 0 ? "Không thể xóa lớp có học viên" : "Xóa lịch học"}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              className="delete-button"
              aria-label="Xóa lịch học"
              disabled={record.actualStudentCount > 0}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" tip="Đang tải dữ liệu lịch học..." />
      </div>
    )
  }

  return (
    <div className="course-schedule-page">
      <div className="course-schedule-container">
        <Title level={1} className="page-title">
          Quản lý Lịch Khai Giảng
        </Title>

        {/* Filter Section */}
        <Card className="filter-section" bordered={false}>
          <Space size="middle" wrap>
            <div className="filter-item">
              <label>Môn học:</label>
              <Select
                placeholder="Chọn môn học"
                style={{ width: 150 }}
                value={subjectFilter}
                onChange={setSubjectFilter}
                allowClear
              >
                {subjects.map((subject) => (
                  <Option key={subject} value={subject}>
                    {subject}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="filter-item">
              <label>Giảng viên:</label>
              <Select
                placeholder="Chọn giảng viên"
                style={{ width: 180 }}
                value={teacherFilter}
                onChange={setTeacherFilter}
                allowClear
              >
                {teachers.map((teacher) => (
                  <Option key={teacher} value={teacher}>
                    {teacher}
                  </Option>
                ))}
              </Select>
            </div>
            <Button icon={<FilterOutlined />} onClick={clearFilters} className="clear-filter-btn">
              Xóa bộ lọc
            </Button>
          </Space>
        </Card>

        {/* Basic Course Schedule Section */}
        <div className="schedule-section">
          <div className="section-header">
            <Title level={3} className="section-title basic-title">
              Lịch học cơ bản
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-button"
              onClick={() => handleAddClass("basic")}
            >
              Thêm lịch khai giảng
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={basicSchedules}
              pagination={{ pageSize: 10 }}
              className="schedule-table"
              size="middle"
            />
            {basicSchedules.length === 0 && !loading && (
              <div className="no-data-message">Không có lịch học cơ bản nào để hiển thị.</div>
            )}
          </div>
        </div>

        {/* Advanced Course Schedule Section */}
        <div className="schedule-section">
          <div className="section-header">
            <Title level={3} className="section-title advanced-title">
              Lịch học nâng cao
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-button"
              onClick={() => handleAddClass("advanced")}
            >
              Thêm lịch khai giảng
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={advancedSchedules}
              pagination={{ pageSize: 10 }}
              className="schedule-table"
              size="middle"
            />
            {advancedSchedules.length === 0 && !loading && (
              <div className="no-data-message">Không có lịch học nâng cao nào để hiển thị.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Opening Schedule Modal */}
      <Modal
        title={isAdvancedClassToAdd ? "THÊM LỚP HỌC NÂNG CAO" : "THÊM LỚP HỌC CƠ BẢN"}
        open={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        footer={[
          <Button key="back" onClick={handleAddModalCancel} icon={<CloseOutlined />}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddModalOk} icon={<PlusOutlined />}>
            Thêm mới
          </Button>,
        ]}
        width={600}
      >
        <Form form={addForm} layout="vertical" name="add_schedule_form">
          <Form.Item name="classCode" label="Mã lớp" rules={[{ required: true, message: "Vui lòng nhập mã lớp" }]}>
            <Input placeholder="Nhập mã lớp" />
          </Form.Item>
          <Form.Item name="subject" label="Môn học" rules={[{ required: true, message: "Vui lòng chọn môn học" }]}>
            <Select placeholder="Chọn môn học">
              <Option value="Piano">Piano</Option>
              <Option value="Guitar">Guitar</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="teacherName"
            label="Giảng viên"
            rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
          >
            <Select placeholder="Chọn giảng viên" loading={availableTeachers.length === 0}>
              {availableTeachers.map((teacher) => (
                <Option key={teacher.userId} value={teacher.accountName}>
                  {teacher.accountName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="openingDay"
              label="Ngày khai giảng"
              rules={[{ required: true, message: "Vui lòng chọn ngày khai giảng" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item
            name="scheduleDays"
            label="Các ngày học trong tuần"
            rules={[{ required: true, message: "Vui lòng chọn các ngày học trong tuần" }]}
          >
            <Select mode="multiple" placeholder="Chọn các ngày học (VD: Thứ 2, Thứ 4)" options={weekdayOptions} />
          </Form.Item>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="defaultRoomId"
              label="Phòng học"
              rules={[{ required: true, message: "Vui lòng chọn phòng học" }]}
            >
              <Select placeholder="Chọn phòng học" loading={rooms.length === 0}>
                {rooms.map((room) => (
                  <Option key={room.roomId} value={room.roomId}>
                    {room.roomCode} (Sức chứa: {room.capacity})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="timeSlotIds"
              label="Khung giờ"
              rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
            >
              <Select placeholder="Chọn khung giờ" loading={timeslots.length === 0}>
                {timeslots.map((slot) => (
                  <Option key={slot.timeslotId} value={slot.timeslotId}>
                    {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="studentQuantity"
              label="Sĩ số tối đa"
              rules={[
                { required: true, message: "Vui lòng nhập sĩ số tối đa" },
                { type: "number", min: 1, message: "Sĩ số tối đa phải lớn hơn 0" },
              ]}
            >
              <InputNumber placeholder="VD: 10" min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="totalSessions"
              label="Tổng số buổi"
              rules={[
                { required: true, message: "Vui lòng nhập tổng số buổi" },
                { type: "number", min: 1, message: "Tổng số buổi phải lớn hơn 0" },
              ]}
            >
              <InputNumber placeholder="VD: 12" min={1} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* Update Opening Schedule Modal */}
      <Modal
        title="Cập nhật Lịch Khai Giảng"
        open={isUpdateModalVisible}
        onOk={handleUpdateModalOk}
        onCancel={handleUpdateModalCancel}
        footer={[
          <Button key="back" onClick={handleUpdateModalCancel} icon={<CloseOutlined />}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateModalOk} icon={<SaveOutlined />}>
            Lưu thay đổi
          </Button>,
        ]}
        width={600}
      >
        <Form form={updateForm} layout="vertical" name="update_schedule_form">
          <Form.Item name="classCode" label="Mã lớp" rules={[{ required: true, message: "Vui lòng nhập mã lớp!" }]}>
            <Input disabled /> 
          </Form.Item>
          <Form.Item name="subject" label="Môn học" rules={[{ required: true, message: "Vui lòng nhập môn học!" }]}>
            <Select placeholder="Chọn môn học" disabled>
              <Option value="Piano">Piano</Option>
              <Option value="Guitar">Guitar</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="teacherName"
            label="Giảng viên"
            rules={[{ required: true, message: "Vui lòng chọn giảng viên!" }]}
          >
            <Select placeholder="Chọn giảng viên" loading={availableTeachers.length === 0}>
              {availableTeachers.map((teacher) => (
                <Option key={teacher.userId} value={teacher.accountName}>
                  {teacher.accountName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="openingDay"
              label="Ngày khai giảng"
              rules={[{ required: true, message: "Vui lòng chọn ngày khai giảng!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item name="scheduleDays" label="Các ngày học trong tuần">
            <Select mode="multiple" placeholder="Chọn các ngày học (VD: Thứ 2, Thứ 4)" options={weekdayOptions} />
          </Form.Item>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="defaultRoomId"
              label="Phòng học"
              rules={[{ required: true, message: "Vui lòng chọn phòng học" }]}
            >
              <Select placeholder="Chọn phòng học" loading={rooms.length === 0}>
                {rooms.map((room) => (
                  <Option key={room.roomId} value={room.roomId}>
                    {room.roomCode} (Sức chứa: {room.capacity})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="timeSlotIds"
              label="Khung giờ"
              rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
            >
              <Select placeholder="Chọn khung giờ" loading={timeslots.length === 0}>
                {timeslots.map((slot) => (
                  <Option key={slot.timeslotId} value={slot.timeslotId}>
                    {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="studentQuantity"
              label="Sĩ số tối đa"
              rules={[
                { required: true, message: "Vui lòng nhập sĩ số!", type: "number" },
                { type: "number", min: 1, message: "Sĩ số tối đa phải lớn hơn 0" },
              ]}
              extra={
                currentRecord && (
                  <span style={{ color: "#666" }}>
                    Hiện tại có {currentRecord.actualStudentCount} học viên trong lớp. Sĩ số tối đa phải ≥{" "}
                    {currentRecord.actualStudentCount}.
                  </span>
                )
              }
            >
              <InputNumber min={currentRecord?.actualStudentCount || 1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="totalSessions"
              label="Tổng số buổi"
              rules={[
                { required: true, message: "Vui lòng nhập tổng số buổi" },
                { type: "number", min: 1, message: "Tổng số buổi phải lớn hơn 0" },
              ]}
            >
              <InputNumber placeholder="VD: 12" min={1} style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item name="isAdvancedClass" valuePropName="checked" label="Là lớp nâng cao?">
            <Checkbox>Lớp nâng cao</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseSchedule


