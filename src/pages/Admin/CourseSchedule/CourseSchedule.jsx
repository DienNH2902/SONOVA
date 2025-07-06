// import { Typography, Table, Button, Tag, Form, App, Modal, Input, DatePicker, Select, Space } from "antd"
// import { PlusOutlined, FilterOutlined } from "@ant-design/icons"
// import "./CourseSchedule.css"
// import { useState } from "react"

// const { Title } = Typography
// const { Option } = Select

// const CourseSchedule = () => {
//   const [basicModalVisible, setBasicModalVisible] = useState(false)
//   const [advancedModalVisible, setAdvancedModalVisible] = useState(false)
//   const [subjectFilter, setSubjectFilter] = useState("")
//   const [teacherFilter, setTeacherFilter] = useState("")
//   const { message } = App.useApp()
//   const [form] = Form.useForm()

//   const handleAddClass = (type) => {
//     if (type === "basic") setBasicModalVisible(true)
//     else setAdvancedModalVisible(true)
//   }

//   const handleModalSubmit = (values) => {
//     message.success("Đã thêm lớp học thành công!")
//     console.log("Submitted class data:", values)
//     form.resetFields()
//     setBasicModalVisible(false)
//     setAdvancedModalVisible(false)
//   }

//   const handleModalCancel = () => {
//     form.resetFields()
//     setBasicModalVisible(false)
//     setAdvancedModalVisible(false)
//   }

//   const clearFilters = () => {
//     setSubjectFilter("")
//     setTeacherFilter("")
//   }

//   // Basic Classes Data
//   const basicClassesData = [
//     {
//       key: "1",
//       stt: 1,
//       subject: "Piano",
//       teacher: "Nguyễn Văn A",
//       classCode: "K01-PI-CB-01",
//       startDate: "01/04/2025",
//       endDate: "30/06/2025",
//       schedule: "Thứ 2, 6 (18:00 - 19:30)",
//       capacity: "6/10",
//     },
//     {
//       key: "2",
//       stt: 2,
//       subject: "Guitar",
//       teacher: "Trần Thị B",
//       classCode: "K01-GU-CB-02",
//       startDate: "15/04/2025",
//       endDate: "15/07/2025",
//       schedule: "Thứ 3, 7 (19:00 - 20:30)",
//       capacity: "9/10",
//     },
//     {
//       key: "3",
//       stt: 3,
//       subject: "Piano",
//       teacher: "Lê Văn C",
//       classCode: "K01-PI-CB-03",
//       startDate: "01/06/2025",
//       endDate: "01/09/2025",
//       schedule: "Thứ 2, 6 (18:00 - 19:30)",
//       capacity: "7/10",
//     },
//     {
//       key: "4",
//       stt: 4,
//       subject: "Guitar",
//       teacher: "Trần Thị B",
//       classCode: "K01-GU-CB-04",
//       startDate: "15/06/2025",
//       endDate: "15/09/2025",
//       schedule: "Thứ 3, 7 (19:00 - 20:30)",
//       capacity: "3/10",
//     },
//     {
//       key: "5",
//       stt: 5,
//       subject: "Piano",
//       teacher: "Nguyễn Văn A",
//       classCode: "K01-PI-CB-05",
//       startDate: "01/08/2025",
//       endDate: "01/11/2025",
//       schedule: "Thứ 2, 6 (18:00 - 19:30)",
//       capacity: "4/10",
//     },
//     {
//       key: "6",
//       stt: 6,
//       subject: "Guitar",
//       teacher: "Phạm Văn D",
//       classCode: "K01-GU-CB-06",
//       startDate: "15/08/2025",
//       endDate: "15/11/2025",
//       schedule: "Thứ 3, 7 (19:00 - 20:30)",
//       capacity: "6/10",
//     },
//   ]

//   // Advanced Classes Data
//   const advancedClassesData = [
//     {
//       key: "1",
//       stt: 1,
//       subject: "Piano",
//       teacher: "Nguyễn Văn A",
//       classCode: "K01-PI-NC-01",
//       startDate: "01/04/2025",
//       endDate: "30/06/2025",
//       schedule: "Thứ 2, 6 (18:00 - 19:30)",
//       capacity: "6/10",
//     },
//     {
//       key: "2",
//       stt: 2,
//       subject: "Guitar",
//       teacher: "Trần Thị B",
//       classCode: "K01-GU-NC-02",
//       startDate: "15/04/2025",
//       endDate: "15/07/2025",
//       schedule: "Thứ 3, 7 (19:00 - 20:30)",
//       capacity: "9/10",
//     },
//   ]

//   // Filter data function
//   const filterData = (data) => {
//     return data.filter((item) => {
//       const matchSubject = !subjectFilter || item.subject === subjectFilter
//       const matchTeacher = !teacherFilter || item.teacher === teacherFilter
//       return matchSubject && matchTeacher
//     })
//   }

//   // Get unique subjects and teachers for filter options
//   const allData = [...basicClassesData, ...advancedClassesData]
//   const subjects = [...new Set(allData.map((item) => item.subject))]
//   const teachers = [...new Set(allData.map((item) => item.teacher))]

//   // Table columns configuration
//   const columns = [
//     {
//       title: "STT",
//       dataIndex: "stt",
//       key: "stt",
//       width: 60,
//       align: "center",
//       className: "stt-column",
//     },
//     {
//       title: "Môn học",
//       dataIndex: "subject",
//       key: "subject",
//       width: 100,
//       render: (text) => (
//         <Tag color={text === "Piano" ? "blue" : "green"} className="subject-tag">
//           {text}
//         </Tag>
//       ),
//     },
//     {
//       title: "Giảng viên",
//       dataIndex: "teacher",
//       key: "teacher",
//       width: 140,
//     },
//     {
//       title: "Mã lớp",
//       dataIndex: "classCode",
//       key: "classCode",
//       width: 140,
//     },
//     {
//       title: "Thời gian",
//       key: "duration",
//       width: 180,
//       render: (_, record) => (
//         <span className="duration-text">
//           {record.startDate} - {record.endDate}
//         </span>
//       ),
//     },
//     {
//       title: "Lịch học",
//       dataIndex: "schedule",
//       key: "schedule",
//       width: 180,
//     },
//     {
//       title: "Số lượng",
//       dataIndex: "capacity",
//       key: "capacity",
//       width: 100,
//       align: "center",
//       render: (text) => {
//         const [current, total] = text.split("/")
//         const percentage = (Number.parseInt(current) / Number.parseInt(total)) * 100
//         let color = "green"
//         if (percentage >= 80) color = "red"
//         else if (percentage >= 60) color = "orange"
//         return <span className={`capacity-text capacity-${color}`}>{text}</span>
//       },
//     },
//   ]

//   return (
//     <div className="course-schedule-page">
//       <div className="course-schedule-container">
//         <Title level={1} className="page-title">
//           Lịch khai giảng
//         </Title>

//         {/* Filter Section */}
//         <div className="filter-section">
//           <Space size="middle" wrap>
//             <div className="filter-item">
//               <label>Môn học:</label>
//               <Select
//                 placeholder="Chọn môn học"
//                 style={{ width: 150 }}
//                 value={subjectFilter}
//                 onChange={setSubjectFilter}
//                 allowClear
//               >
//                 {subjects.map((subject) => (
//                   <Option key={subject} value={subject}>
//                     {subject}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="filter-item">
//               <label>Giảng viên:</label>
//               <Select
//                 placeholder="Chọn giảng viên"
//                 style={{ width: 180 }}
//                 value={teacherFilter}
//                 onChange={setTeacherFilter}
//                 allowClear
//               >
//                 {teachers.map((teacher) => (
//                   <Option key={teacher} value={teacher}>
//                     {teacher}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <Button icon={<FilterOutlined />} onClick={clearFilters} className="clear-filter-btn">
//               Xóa bộ lọc
//             </Button>
//           </Space>
//         </div>

//         {/* Basic Classes Section */}
//         <div className="schedule-section">
//           <div className="section-header">
//             <Title level={2} className="section-title basic-title">
//               LỚP CƠ BẢN
//             </Title>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("basic")}
//               className="add-button"
//             >
//               Thêm
//             </Button>
//           </div>
//           <div className="table-container">
//             <Table
//               columns={columns}
//               dataSource={filterData(basicClassesData)}
//               pagination={false}
//               className="schedule-table"
//               size="middle"
//             />
//           </div>
//         </div>

//         {/* Advanced Classes Section */}
//         <div className="schedule-section">
//           <div className="section-header">
//             <Title level={2} className="section-title advanced-title">
//               LỚP NÂNG CAO
//             </Title>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("advanced")}
//               className="add-button"
//             >
//               Thêm
//             </Button>
//           </div>
//           <div className="table-container">
//             <Table
//               columns={columns}
//               dataSource={filterData(advancedClassesData)}
//               pagination={false}
//               className="schedule-table"
//               size="middle"
//             />
//           </div>
//         </div>

//         {/* Modal Form Shared for Both Types */}
//         <Modal
//           open={basicModalVisible || advancedModalVisible}
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           title={basicModalVisible ? "THÊM LỚP HỌC CƠ BẢN" : "THÊM LỚP HỌC NÂNG CAO"}
//           okText="Xác nhận"
//           cancelText="Hủy"
//         >
//           <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
//             <Form.Item name="classCode" label="Mã lớp" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="subject" label="Môn học" rules={[{ required: true }]}>
//               <Select placeholder="Chọn môn học">
//                 <Option value="Piano">Piano</Option>
//                 <Option value="Guitar">Guitar</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="teacher" label="Giảng viên" rules={[{ required: true }]}>
//               <Select placeholder="Chọn giảng viên">
//                 <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
//                 <Option value="Trần Thị B">Trần Thị B</Option>
//                 <Option value="Lê Văn C">Lê Văn C</Option>
//                 <Option value="Phạm Văn D">Phạm Văn D</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="startDate" label="Khai giảng" rules={[{ required: true }]}>
//               <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//             </Form.Item>
//             <Form.Item name="endDate" label="Kết thúc" rules={[{ required: true }]}>
//               <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//             </Form.Item>
//             <Form.Item name="schedule" label="Lịch học" rules={[{ required: true }]}>
//               <Input placeholder="VD: Thứ 2, 6 (18:00 - 19:30)" />
//             </Form.Item>
//             <Form.Item name="capacity" label="Sức chứa" rules={[{ required: true }]}>
//               <Input placeholder="VD: 10" />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   )
// }

// export default CourseSchedule









// import { useState, useEffect, useRef } from "react";
// import {
//   Button,
//   Switch,
//   Input,
//   Select,
//   Table,
//   Modal,
//   Tag,
//   Card,
//   Space,
//   Form,
//   DatePicker,
//   message,
//   Spin,
// } from "antd";
// import { PlusOutlined, FilterOutlined } from "@ant-design/icons";

// const { Option } = Select;

// export default function CourseSchedulePage() {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subjectFilter, setSubjectFilter] = useState("");
//   const [teacherFilter, setTeacherFilter] = useState("");
//   const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
//   const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   // Mock teachers data (since API doesn't provide teacher info)
//   const teacherMapping = {
//     "Basic Piano": "Nguyễn Văn A",
//     "Advanced Piano": "Nguyễn Văn A",
//     "Basic Guitar": "Trần Thị B",
//     "Advanced Guitar": "Trần Thị B",
//     Piano: "Lê Văn C",
//     Guitar: "Phạm Văn D",
//   };

//   const fetchSchedules = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule"
//       );
//       const data = await response.json();
//       setSchedules(data.$values || []);
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//       message.error("Không thể tải dữ liệu lịch khai giảng");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     fetchSchedules();
//   }, []);

//   const transformScheduleData = (schedules) => {
//     return schedules.map((schedule, index) => ({
//       key: schedule.openingScheduleId.toString(),
//       stt: index + 1,
//       subject: schedule.subject.replace("Basic ", "").replace("Advanced ", ""),
//       teacher: teacherMapping[schedule.subject] || "Chưa phân công",
//       classCode: schedule.classCode,
//       startDate: new Date(schedule.openingDay).toLocaleDateString("vi-VN"),
//       endDate: new Date(schedule.endDate).toLocaleDateString("vi-VN"),
//       schedule: schedule.schedule,
//       capacity: `${Math.floor(schedule.studentQuantity * 0.7)}/${
//         schedule.studentQuantity
//       }`,
//       isAdvanced: schedule.isAdvancedClass,
//     }));
//   };

//   const filterData = (data) => {
//     return data.filter((item) => {
//       const matchSubject = !subjectFilter || item.subject === subjectFilter;
//       const matchTeacher = !teacherFilter || item.teacher === teacherFilter;
//       return matchSubject && matchTeacher;
//     });
//   };

//   const transformedData = transformScheduleData(schedules);
//   const basicClasses = transformedData.filter((item) => !item.isAdvanced);
//   const advancedClasses = transformedData.filter((item) => item.isAdvanced);

//   // Get unique subjects and teachers for filter options
//   const subjects = [...new Set(transformedData.map((item) => item.subject))];
//   const teachers = [...new Set(transformedData.map((item) => item.teacher))];

//   const clearFilters = () => {
//     setSubjectFilter("");
//     setTeacherFilter("");
//   };

//   const getCapacityColor = (capacity) => {
//     const [current, total] = capacity.split("/").map(Number);
//     const percentage = (current / total) * 100;
//     if (percentage >= 80) return "red";
//     if (percentage >= 60) return "orange";
//     return "green";
//   };

//   const getSubjectColor = (subject) => {
//     return subject === "Piano" ? "blue" : "green";
//   };

//   const handleAddClass = (type) => {
//     if (type === "basic") {
//       setIsBasicModalOpen(true);
//     } else {
//       setIsAdvancedModalOpen(true);
//     }
//   };

//   const handleModalSubmit = (values) => {
//     console.log("Form submitted:", values);
//     message.success("Đã thêm lớp học thành công!");
//     form.resetFields();
//     setIsBasicModalOpen(false);
//     setIsAdvancedModalOpen(false);
//     // Refresh data
//     fetchSchedules();
//   };

//   const handleModalCancel = () => {
//     form.resetFields();
//     setIsBasicModalOpen(false);
//     setIsAdvancedModalOpen(false);
//   };

//   const columns = [
//     // {
//     //   title: "STT",
//     //   dataIndex: "stt",
//     //   key: "stt",
//     //   width: 60,
//     //   align: "center",
//     //   render: (text) => <span style={{ fontWeight: 600, color: "#1e3a5f" }}>{text}</span>,
//     // },
//     {
//       title: "Môn học",
//       dataIndex: "subject",
//       key: "subject",
//       width: 100,
//       align: "center",
//       render: (text) => (
//         <Tag color={getSubjectColor(text)} style={{ fontWeight: 500 }}>
//           {text}
//         </Tag>
//       ),
//     },
//     {
//       title: "Giảng viên",
//       dataIndex: "teacher",
//       key: "teacher",
//       width: 140,
//       align: "center",
//     },
//     {
//       title: "Mã lớp",
//       dataIndex: "classCode",
//       key: "classCode",
//       width: 140,
//       align: "center",
//       render: (text) => <span style={{ fontFamily: "monospace" }}>{text}</span>,
//     },
//     {
//       title: "Thời gian",
//       key: "duration",
//       width: 180,
//       align: "center",
//       render: (_, record) => (
//         <span
//           style={{
//             background: "rgba(30, 58, 95, 0.05)",
//             padding: "4px 8px",
//             borderRadius: "4px",
//             fontSize: "13px",
//             fontWeight: 500,
//             color: "#1e3a5f",
//           }}
//         >
//           {record.startDate} - {record.endDate}
//         </span>
//       ),
//     },

//     {
//       title: "Lịch học",
//       dataIndex: "schedule",
//       key: "schedule",
//       width: 180,
//       align: "center",
//       render: (text) => {
//         if (!text) return "";

//         const dayMap = {
//           Mon: "Thứ 2",
//           Tue: "Thứ 3",
//           Wed: "Thứ 4",
//           Thu: "Thứ 5",
//           Fri: "Thứ 6",
//           Sat: "Thứ 7",
//           Sun: "Chủ nhật",
//         };

//         // Split the input like "Mon/Wed 18:00 to 19:30"
//   const parts = text.split(" ");
//   const daysPart = parts[0]; // "Mon/Wed"
//   const startTime = parts[1]; // "18:00"
//   const endTime = parts[3];   // "19:30"

//   const convertedDays = daysPart
//     .split("/")
//     .map((day) => dayMap[day] || day)
//     .join(" / ");

//   return `${convertedDays} (${startTime} - ${endTime})`;
//       },
//     },

//     {
//       title: "Số lượng",
//       dataIndex: "capacity",
//       key: "capacity",
//       width: 100,
//       align: "center",
//       render: (text) => (
//         <Tag color={getCapacityColor(text)} style={{ fontWeight: 600 }}>
//           {text}
//         </Tag>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f5f5f5",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <Spin size="large" />
//           <p style={{ marginTop: 16, color: "#666" }}>Đang tải dữ liệu...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f5f5f5",
//         padding: "32px 16px",
//       }}
//     >
//       <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
//         <h1
//           style={{
//             fontSize: "36px",
//             fontWeight: 600,
//             color: "#1e3a5f",
//             marginBottom: "32px",
//             textAlign: "center",
//           }}
//         >
//           Lịch khai giảng
//         </h1>

//         {/* Filter Section */}
//         <Card style={{ marginBottom: "32px" }}>
//           <Space size="middle" wrap>
//             <div>
//               <label
//                 style={{
//                   fontWeight: 500,
//                   color: "#1e3a5f",
//                   marginRight: "8px",
//                 }}
//               >
//                 Môn học:
//               </label>
//               <Select
//                 placeholder="Chọn môn học"
//                 style={{ width: 150 }}
//                 value={subjectFilter}
//                 onChange={setSubjectFilter}
//                 allowClear
//               >
//                 {subjects.map((subject) => (
//                   <Option key={subject} value={subject}>
//                     {subject}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <label
//                 style={{
//                   fontWeight: 500,
//                   color: "#1e3a5f",
//                   marginRight: "8px",
//                 }}
//               >
//                 Giảng viên:
//               </label>
//               <Select
//                 placeholder="Chọn giảng viên"
//                 style={{ width: 180 }}
//                 value={teacherFilter}
//                 onChange={setTeacherFilter}
//                 allowClear
//               >
//                 {teachers.map((teacher) => (
//                   <Option key={teacher} value={teacher}>
//                     {teacher}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <Button
//               icon={<FilterOutlined />}
//               onClick={clearFilters}
//               style={{
//                 background: "#f5f5f5",
//                 borderColor: "#d9d9d9",
//                 color: "#666",
//               }}
//             >
//               Xóa bộ lọc
//             </Button>
//           </Space>
//         </Card>

//         {/* Basic Classes Section */}
//         <Card style={{ marginBottom: "32px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 fontWeight: 600,
//                 color: "#ffa940",
//                 margin: 0,
//                 letterSpacing: "1px",
//               }}
//             >
//               LỚP CƠ BẢN
//             </h2>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("basic")}
//               style={{
//                 background: "#1e3a5f",
//                 borderColor: "#1e3a5f",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               Thêm
//             </Button>
//           </div>
//           <Table
//             columns={columns}
//             dataSource={filterData(basicClasses)}
//             pagination={false}
//             size="middle"
//             style={{
//               background: "white",
//               borderRadius: "12px",
//               overflow: "hidden",
//               boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
//             }}
//           />
//         </Card>

//         {/* Advanced Classes Section */}
//         <Card>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 fontWeight: 600,
//                 color: "#ffa940",
//                 margin: 0,
//                 letterSpacing: "1px",
//               }}
//             >
//               LỚP NÂNG CAO
//             </h2>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("advanced")}
//               style={{
//                 background: "#1e3a5f",
//                 borderColor: "#1e3a5f",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               Thêm
//             </Button>
//           </div>
//           <Table
//             columns={columns}
//             dataSource={filterData(advancedClasses)}
//             pagination={false}
//             size="middle"
//             style={{
//               background: "white",
//               borderRadius: "12px",
//               overflow: "hidden",
//               boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
//             }}
//           />
//         </Card>

//         {/* Modal Form */}
//         <Modal
//           open={isBasicModalOpen || isAdvancedModalOpen}
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           title={
//             isBasicModalOpen ? "THÊM LỚP HỌC CƠ BẢN" : "THÊM LỚP HỌC NÂNG CAO"
//           }
//           okText="Xác nhận"
//           cancelText="Hủy"
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleModalSubmit}
//             style={{ marginTop: "20px" }}
//           >
//             <Form.Item
//               name="classCode"
//               label="Mã lớp"
//               rules={[{ required: true, message: "Vui lòng nhập mã lớp" }]}
//             >
//               <Input placeholder="Nhập mã lớp" />
//             </Form.Item>

//             <Form.Item
//               name="subject"
//               label="Môn học"
//               rules={[{ required: true, message: "Vui lòng chọn môn học" }]}
//             >
//               <Select placeholder="Chọn môn học">
//                 <Option value="Piano">Piano</Option>
//                 <Option value="Guitar">Guitar</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="teacher"
//               label="Giảng viên"
//               rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
//             >
//               <Select placeholder="Chọn giảng viên">
//                 <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
//                 <Option value="Trần Thị B">Trần Thị B</Option>
//                 <Option value="Lê Văn C">Lê Văn C</Option>
//                 <Option value="Phạm Văn D">Phạm Văn D</Option>
//               </Select>
//             </Form.Item>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "16px",
//               }}
//             >
//               <Form.Item
//                 name="startDate"
//                 label="Khai giảng"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày khai giảng" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 name="endDate"
//                 label="Kết thúc"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày kết thúc" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>
//             </div>

//             <Form.Item
//               name="schedule"
//               label="Lịch học"
//               rules={[{ required: true, message: "Vui lòng nhập lịch học" }]}
//             >
//               <Input placeholder="VD: Thứ 2, 6 (18:00 - 19:30)" />
//             </Form.Item>

//             <Form.Item
//               name="capacity"
//               label="Sức chứa"
//               rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
//             >
//               <Input placeholder="VD: 10" type="number" />
//             </Form.Item>

//             <Form.Item
//   className="is-advanced-switch"
//   name="isAdvanced"
//   label="Lớp nâng cao"
//   valuePropName="checked"
//   style={{ textAlign: 'left' }}
// >
//   <Switch 
//     className="switch-button"
//     style={{ margin: 0 }}
//   />
// </Form.Item>

//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect, useRef } from "react";
// import {
//   Button,
//   Switch, // Không còn dùng Switch cho isAdvanced nữa
//   Input,
//   Select,
//   Table,
//   Modal,
//   Tag,
//   Card,
//   Space,
//   Form,
//   DatePicker,
//   message,
//   Spin,
// } from "antd";
// import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
// // import moment from "moment";

// const { Option } = Select;

// export default function CourseSchedulePage() {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subjectFilter, setSubjectFilter] = useState("");
//   const [teacherFilter, setTeacherFilter] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false); // Gộp 2 state modal thành 1
//   const [isAdvancedClassToAdd, setIsAdvancedClassToAdd] = useState(false); // State để lưu trữ loại lớp khi mở modal
//   const [form] = Form.useForm();

//   // Mock teachers data (since API doesn't provide teacher info)
//   const teacherMapping = {
//     "Basic Piano": "Nguyễn Văn A",
//     "Advanced Piano": "Nguyễn Văn A",
//     "Basic Guitar": "Trần Thị B",
//     "Advanced Guitar": "Trần Thị B",
//     Piano: "Lê Văn C", // Thêm mapping cho subject chỉ có "Piano"
//     Guitar: "Phạm Văn D", // Thêm mapping cho subject chỉ có "Guitar"
//   };

//   const fetchSchedules = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule"
//       );
//       const data = await response.json();
//       setSchedules(data.$values || []);
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//       message.error("Không thể tải dữ liệu lịch khai giảng");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     fetchSchedules();
//   }, []);

//   const transformScheduleData = (schedules) => {
//     return schedules.map((schedule, index) => ({
//       key: schedule.openingScheduleId.toString(),
//       stt: index + 1,
//       // Đảm bảo subject hiển thị là Piano/Guitar, không có Basic/Advanced
//       subject: schedule.subject.replace("Basic ", "").replace("Advanced ", ""),
//       teacher: teacherMapping[schedule.subject] || "Chưa phân công",
//       classCode: schedule.classCode,
//       startDate: new Date(schedule.openingDay).toLocaleDateString("vi-VN"),
//       endDate: new Date(schedule.endDate).toLocaleDateString("vi-VN"),
//       schedule: schedule.schedule,
//       capacity: `${Math.floor(schedule.studentQuantity * 0.7)}/${
//         schedule.studentQuantity
//       }`,
//       isAdvanced: schedule.isAdvancedClass,
//     }));
//   };

//   const filterData = (data) => {
//     return data.filter((item) => {
//       const matchSubject = !subjectFilter || item.subject === subjectFilter;
//       const matchTeacher = !teacherFilter || item.teacher === teacherFilter;
//       return matchSubject && matchTeacher;
//     });
//   };

//   const transformedData = transformScheduleData(schedules);
//   const basicClasses = transformedData.filter((item) => !item.isAdvanced);
//   const advancedClasses = transformedData.filter((item) => item.isAdvanced);

//   // Get unique subjects and teachers for filter options
//   const subjects = [...new Set(transformedData.map((item) => item.subject))];
//   const teachers = [...new Set(transformedData.map((item) => item.teacher))];

//   const clearFilters = () => {
//     setSubjectFilter("");
//     setTeacherFilter("");
//   };

//   const getCapacityColor = (capacity) => {
//     const [current, total] = capacity.split("/").map(Number);
//     const percentage = (current / total) * 100;
//     if (percentage >= 80) return "red";
//     if (percentage >= 60) return "orange";
//     return "green";
//   };

//   const getSubjectColor = (subject) => {
//     return subject === "Piano" ? "blue" : "green";
//   };

//   const handleAddClass = (type) => {
//     form.resetFields(); // Reset form mỗi khi mở modal
//     setIsAdvancedClassToAdd(type === "advanced"); // Set loại lớp
//     setIsModalOpen(true); // Mở modal chung
//   };

//   const handleModalSubmit = async (values) => {
//     // console.log("Form submitted:", values);
//     // message.success("Đã thêm lớp học thành công!");

//     // Xử lý dữ liệu form để gửi lên API
//     const subjectPrefix = isAdvancedClassToAdd ? "Advanced " : "Basic ";
//     const fullSubjectName = subjectPrefix + values.subject; // Ví dụ: "Basic Piano" hoặc "Advanced Guitar"

//     const payload = {
//       subject: fullSubjectName,
//       classCode: values.classCode,
//       openingDay: values.startDate.format("YYYY-MM-DD"), // Format ngày theo YYYY-MM-DD
//       endDate: values.endDate.format("YYYY-MM-DD"), // Format ngày theo YYYY-MM-DD
//       schedule: values.schedule,
//       studentQuantity: parseInt(values.capacity, 10), // Đảm bảo là số nguyên
//       isAdvancedClass: isAdvancedClassToAdd, // Sử dụng state đã set khi mở modal
//     };

//     console.log("Payload to send:", payload);

//     try {
//       const response = await fetch(
//         "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         message.success("Đã thêm lớp học thành công!");
//         setIsModalOpen(false); // Đóng modal
//         fetchSchedules(); // Tải lại dữ liệu
//       } else {
//         const errorData = await response.json();
//         console.error("Error response from API:", errorData);
//         message.error(
//           `Thêm lớp học thất bại: ${errorData.message || response.statusText}`
//         );
//       }
//     } catch (error) {
//       console.error("Error creating schedule:", error);
//       message.error("Có lỗi xảy ra khi thêm lớp học.");
//     }
//   };

//   const handleModalCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   const columns = [
//     // {
//     //    title: "STT",
//     //    dataIndex: "stt",
//     //    key: "stt",
//     //    width: 60,
//     //    align: "center",
//     //    render: (text) => <span style={{ fontWeight: 600, color: "#1e3a5f" }}>{text}</span>,
//     // },
//     {
//       title: "Môn học",
//       dataIndex: "subject",
//       key: "subject",
//       width: 100,
//       align: "center",
//       render: (text) => (
//         <Tag color={getSubjectColor(text)} style={{ fontWeight: 500 }}>
//           {text}
//         </Tag>
//       ),
//     },
//     {
//       title: "Giảng viên",
//       dataIndex: "teacher",
//       key: "teacher",
//       width: 140,
//       align: "center",
//     },
//     {
//       title: "Mã lớp",
//       dataIndex: "classCode",
//       key: "classCode",
//       width: 140,
//       align: "center",
//       render: (text) => <span style={{ fontFamily: "monospace" }}>{text}</span>,
//     },
//     {
//       title: "Thời gian",
//       key: "duration",
//       width: 180,
//       align: "center",
//       render: (_, record) => (
//         <span
//           style={{
//             background: "rgba(30, 58, 95, 0.05)",
//             padding: "4px 8px",
//             borderRadius: "4px",
//             fontSize: "13px",
//             fontWeight: 500,
//             color: "#1e3a5f",
//           }}
//         >
//           {record.startDate} - {record.endDate}
//         </span>
//       ),
//     },

//     {
//       title: "Lịch học",
//       dataIndex: "schedule",
//       key: "schedule",
//       width: 180,
//       align: "center",
//       render: (text) => {
//         if (!text) return "";

//         const dayMap = {
//           Mon: "Thứ 2",
//           Tue: "Thứ 3",
//           Wed: "Thứ 4",
//           Thu: "Thứ 5",
//           Fri: "Thứ 6",
//           Sat: "Thứ 7",
//           Sun: "Chủ nhật",
//         };

//         // Split the input like "Mon/Wed 18:00 to 19:30"
//         const parts = text.split(" ");
//         const daysPart = parts[0]; // "Mon/Wed"
//         const startTime = parts[1]; // "18:00"
//         const endTime = parts[3]; // "19:30"

//         const convertedDays = daysPart
//           .split("/")
//           .map((day) => dayMap[day] || day)
//           .join(" / ");

//         return `${convertedDays} (${startTime} - ${endTime})`;
//       },
//     },

//     {
//       title: "Số lượng",
//       dataIndex: "capacity",
//       key: "capacity",
//       width: 100,
//       align: "center",
//       render: (text) => (
//         <Tag color={getCapacityColor(text)} style={{ fontWeight: 600 }}>
//           {text}
//         </Tag>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f5f5f5",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <Spin size="large" />
//           <p style={{ marginTop: 16, color: "#666" }}>Đang tải dữ liệu...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f5f5f5",
//         padding: "32px 16px",
//       }}
//     >
//       <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
//         <h1
//           style={{
//             fontSize: "36px",
//             fontWeight: 600,
//             color: "#1e3a5f",
//             marginBottom: "32px",
//             textAlign: "center",
//           }}
//         >
//           Lịch khai giảng
//         </h1>

//         {/* Filter Section */}
//         <Card style={{ marginBottom: "32px" }}>
//           <Space size="middle" wrap>
//             <div>
//               <label
//                 style={{
//                   fontWeight: 500,
//                   color: "#1e3a5f",
//                   marginRight: "8px",
//                 }}
//               >
//                 Môn học:
//               </label>
//               <Select
//                 placeholder="Chọn môn học"
//                 style={{ width: 150 }}
//                 value={subjectFilter}
//                 onChange={setSubjectFilter}
//                 allowClear
//               >
//                 {subjects.map((subject) => (
//                   <Option key={subject} value={subject}>
//                     {subject}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <label
//                 style={{
//                   fontWeight: 500,
//                   color: "#1e3a5f",
//                   marginRight: "8px",
//                 }}
//               >
//                 Giảng viên:
//               </label>
//               <Select
//                 placeholder="Chọn giảng viên"
//                 style={{ width: 180 }}
//                 value={teacherFilter}
//                 onChange={setTeacherFilter}
//                 allowClear
//               >
//                 {teachers.map((teacher) => (
//                   <Option key={teacher} value={teacher}>
//                     {teacher}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <Button
//               icon={<FilterOutlined />}
//               onClick={clearFilters}
//               style={{
//                 background: "#f5f5f5",
//                 borderColor: "#d9d9d9",
//                 color: "#666",
//               }}
//             >
//               Xóa bộ lọc
//             </Button>
//           </Space>
//         </Card>

//         {/* Basic Classes Section */}
//         <Card style={{ marginBottom: "32px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 fontWeight: 600,
//                 color: "#ffa940",
//                 margin: 0,
//                 letterSpacing: "1px",
//               }}
//             >
//               LỚP CƠ BẢN
//             </h2>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("basic")} // Gọi handleAddClass với type "basic"
//               style={{
//                 background: "#1e3a5f",
//                 borderColor: "#1e3a5f",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               Thêm
//             </Button>
//           </div>
//           <Table
//             columns={columns}
//             dataSource={filterData(basicClasses)}
//             pagination={false}
//             size="middle"
//             style={{
//               background: "white",
//               borderRadius: "12px",
//               overflow: "hidden",
//               boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
//             }}
//           />
//         </Card>

//         {/* Advanced Classes Section */}
//         <Card>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 fontWeight: 600,
//                 color: "#ffa940",
//                 margin: 0,
//                 letterSpacing: "1px",
//               }}
//             >
//               LỚP NÂNG CAO
//             </h2>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => handleAddClass("advanced")} // Gọi handleAddClass với type "advanced"
//               style={{
//                 background: "#1e3a5f",
//                 borderColor: "#1e3a5f",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               Thêm
//             </Button>
//           </div>
//           <Table
//             columns={columns}
//             dataSource={filterData(advancedClasses)}
//             pagination={false}
//             size="middle"
//             style={{
//               background: "white",
//               borderRadius: "12px",
//               overflow: "hidden",
//               boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
//             }}
//           />
//         </Card>

//         {/* Modal Form */}
//         <Modal
//           open={isModalOpen} // Dùng chung state isModalOpen
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           title={
//             isAdvancedClassToAdd ? "THÊM LỚP HỌC NÂNG CAO" : "THÊM LỚP HỌC CƠ BẢN"
//           } // Tiêu đề modal động
//           okText="Xác nhận"
//           cancelText="Hủy"
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleModalSubmit}
//             style={{ marginTop: "20px" }}
//           >
//             <Form.Item
//               name="classCode"
//               label="Mã lớp"
//               rules={[{ required: true, message: "Vui lòng nhập mã lớp" }]}
//             >
//               <Input placeholder="Nhập mã lớp" />
//             </Form.Item>

//             <Form.Item
//               name="subject"
//               label="Môn học"
//               rules={[{ required: true, message: "Vui lòng chọn môn học" }]}
//             >
//               <Select placeholder="Chọn môn học">
//                 <Option value="Piano">Piano</Option>
//                 <Option value="Guitar">Guitar</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="teacher"
//               label="Giảng viên"
//               rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
//             >
//               <Select placeholder="Chọn giảng viên">
//                 <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
//                 <Option value="Trần Thị B">Trần Thị B</Option>
//                 <Option value="Lê Văn C">Lê Văn C</Option>
//                 <Option value="Phạm Văn D">Phạm Văn D</Option>
//               </Select>
//             </Form.Item>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "16px",
//               }}
//             >
//               <Form.Item
//                 name="startDate"
//                 label="Khai giảng"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày khai giảng" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 name="endDate"
//                 label="Kết thúc"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày kết thúc" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>
//             </div>

//             <Form.Item
//               name="schedule"
//               label="Lịch học"
//               rules={[{ required: true, message: "Vui lòng nhập lịch học" }]}
//             >
//               <Input placeholder="VD: Mon/Wed 18:00 to 19:30" />
//             </Form.Item>

//             <Form.Item
//               name="capacity"
//               label="Sức chứa"
//               rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
//             >
//               <Input placeholder="VD: 10" type="number" min={1} />
//             </Form.Item>

//             {/* Đã xóa Form.Item cho isAdvanced */}
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// }








import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Select,
  Table,
  Modal,
  Tag,
  Card,
  Space,
  Form,
  DatePicker,
  message,
  Spin,
} from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'; // Import dayjs
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import plugin isSameOrBefore
dayjs.extend(isSameOrBefore); // Extend dayjs with the plugin

const { Option } = Select;

export default function CourseSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedClassToAdd, setIsAdvancedClassToAdd] = useState(false);
  const [form] = Form.useForm();

  const teacherMapping = {
    "Basic Piano": "Nguyễn Văn A",
    "Advanced Piano": "Nguyễn Văn A",
    "Basic Guitar": "Trần Thị B",
    "Advanced Guitar": "Trần Thị B",
    // "Basic Piano": "Lê Văn C",
    // "Advanced Piano": "Lê Văn C",
    // "Basic Guitar": "Phạm Văn D",
    // "Advanced Guitar": "Phạm Văn D",
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule"
      );
      const data = await response.json();
      setSchedules(data.$values || []);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      message.error("Không thể tải dữ liệu lịch khai giảng");
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchSchedules();
  }, []);

  const transformScheduleData = (schedules) => {
    return schedules.map((schedule, index) => ({
      key: schedule.openingScheduleId.toString(),
      stt: index + 1,
      subject: schedule.subject.replace("Basic ", "").replace("Advanced ", ""),
      teacher: teacherMapping[schedule.subject] || "Chưa phân công",
      classCode: schedule.classCode,
      startDate: new Date(schedule.openingDay).toLocaleDateString("vi-VN"),
      endDate: new Date(schedule.endDate).toLocaleDateString("vi-VN"),
      schedule: schedule.schedule,
      capacity: `${Math.floor(schedule.studentQuantity * 0.7)}/${
        schedule.studentQuantity
      }`,
      isAdvanced: schedule.isAdvancedClass,
    }));
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const matchSubject = !subjectFilter || item.subject === subjectFilter;
      const matchTeacher = !teacherFilter || item.teacher === teacherFilter;
      return matchSubject && matchTeacher;
    });
  };

  const transformedData = transformScheduleData(schedules);
  const basicClasses = transformedData.filter((item) => !item.isAdvanced);
  const advancedClasses = transformedData.filter((item) => item.isAdvanced);

  const subjects = [...new Set(transformedData.map((item) => item.subject))];
  const teachers = [...new Set(transformedData.map((item) => item.teacher))];

  const clearFilters = () => {
    setSubjectFilter("");
    setTeacherFilter("");
  };

  const getCapacityColor = (capacity) => {
    const [current, total] = capacity.split("/").map(Number);
    const percentage = (current / total) * 100;
    if (percentage >= 80) return "red";
    if (percentage >= 60) return "orange";
    return "green";
  };

  const getSubjectColor = (subject) => {
    return subject === "Piano" ? "blue" : "green";
  };

  const handleAddClass = (type) => {
    form.resetFields();
    setIsAdvancedClassToAdd(type === "advanced");
    setIsModalOpen(true);
    // Không cần reset selectedWeekDays nữa vì nó không còn được sử dụng tự động
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    // Không cần reset selectedWeekDays nữa
  };

  // Hàm này không còn dùng để xác định lịch học gửi lên API nữa, nhưng có thể hữu ích ở đâu đó khác
  const getWeekdaysBetweenDates = (start, end) => {
    if (!start || !end) return [];
    const weekdays = new Set();
    let current = dayjs(start);
    while (current.isSameOrBefore(end, 'day')) {
      weekdays.add(current.day()); // 0: Chủ Nhật, 1: Thứ 2, ..., 6: Thứ 7
      current = current.add(1, 'day');
    }
    const sortedWeekdays = Array.from(weekdays).sort((a, b) => {
      // Sắp xếp Thứ 2 đến CN (CN là 0, nên đưa về cuối)
      if (a === 0 && b !== 0) return 1;
      if (b === 0 && a !== 0) return -1;
      return a - b;
    });

    const dayMapToShortCode = {
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
      0: "Sun",
    };

    return sortedWeekdays.map(day => dayMapToShortCode[day]);
  };

  // Loại bỏ useEffect này vì không còn tự động tính toán selectedWeekDays
  // const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  // useEffect(() => {
  //   const startDate = form.getFieldValue('startDate');
  //   const endDate = form.getFieldValue('endDate');
  //   if (startDate && endDate) {
  //     const days = getWeekdaysBetweenDates(startDate, endDate);
  //     setSelectedWeekDays(days);
  //   } else {
  //     setSelectedWeekDays([]);
  //   }
  // }, [form, form.getFieldValue('startDate'), form.getFieldValue('endDate')]);

  const handleModalSubmit = async (values) => {
    console.log("handleModalSubmit called with values:", values); // Debug log

    const subjectPrefix = isAdvancedClassToAdd ? "Advanced " : "Basic ";
    const fullSubjectName = subjectPrefix + values.subject;

    // Lấy scheduleDays (mảng các ngày đã chọn) và scheduleTime từ form
    const scheduleDaysPart = values.scheduleDays; // Đây là mảng các chuỗi 'Mon', 'Tue', v.v.
    const scheduleTimePart = values.scheduleTime;

    // Validate if scheduleDays is empty
    if (!scheduleDaysPart || scheduleDaysPart.length === 0) {
      message.error("Vui lòng chọn các ngày học trong tuần.");
      return;
    }

    // Kiểm tra định dạng thời gian nhập vào
    const timeRegex = /^\d{2}:\d{2} to \d{2}:\d{2}$/;
    if (!timeRegex.test(scheduleTimePart)) {
      message.error("Vui lòng nhập thời gian học theo định dạng HH:MM to HH:MM (VD: 18:00 to 19:30)");
      return;
    }

    // Tạo chuỗi finalSchedule theo định dạng "Mon/Thu 18:00 to 19:30"
    const finalSchedule = `${scheduleDaysPart.join('/')} ${scheduleTimePart}`;

    const payload = {
      subject: fullSubjectName,
      classCode: values.classCode,
      openingDay: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
      schedule: finalSchedule, // Sử dụng finalSchedule mới
      studentQuantity: parseInt(values.capacity, 10),
      isAdvancedClass: isAdvancedClassToAdd,
    };

    console.log("Payload to send:", payload);

    try {
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        message.success("Đã thêm lớp học thành công!");
        setIsModalOpen(false);
        fetchSchedules();
      } else {
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        message.error(
          `Thêm lớp học thất bại: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      message.error("Có lỗi xảy ra khi thêm lớp học.");
    }
  };

  const columns = [
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
      width: 100,
      align: "center",
      render: (text) => (
        <Tag color={getSubjectColor(text)} style={{ fontWeight: 500 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      width: 140,
      align: "center",
    },
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
      width: 140,
      align: "center",
      render: (text) => <span style={{ fontFamily: "monospace" }}>{text}</span>,
    },
    {
      title: "Thời gian",
      key: "duration",
      width: 180,
      align: "center",
      render: (_, record) => (
        <span
          style={{
            background: "rgba(30, 58, 95, 0.05)",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#1e3a5f",
          }}
        >
          {record.startDate} - {record.endDate}
        </span>
      ),
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
      key: "schedule",
      width: 180,
      align: "center",
      render: (text) => {
        if (!text) return "";

        const dayMap = {
          Mon: "Thứ 2",
          Tue: "Thứ 3",
          Wed: "Thứ 4",
          Thu: "Thứ 5",
          Fri: "Thứ 6",
          Sat: "Thứ 7",
          Sun: "Chủ nhật",
        };

        const parts = text.split(" ");
        const daysPart = parts[0]; 
        const timePart = parts.slice(1).join(" "); // Gộp lại phần thời gian nếu có khoảng trắng

        let startTime = '';
        let endTime = '';

        const timeRegex = /(\d{2}:\d{2}) to (\d{2}:\d{2})/;
        const matchTime = timePart.match(timeRegex);
        if (matchTime) {
          startTime = matchTime[1];
          endTime = matchTime[2];
        }

        // Chuyển đổi các mã ngày (Mon, Tue) sang tiếng Việt (Thứ 2, Thứ 3)
        const convertedDays = daysPart
          .split("/")
          .map((day) => dayMap[day] || day)
          .join(" / ");

        return `${convertedDays} (${startTime} - ${endTime})`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "capacity",
      key: "capacity",
      width: 100,
      align: "center",
      render: (text) => (
        <Tag color={getCapacityColor(text)} style={{ fontWeight: 600 }}>
          {text}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: "#666" }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "32px 16px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 600,
            color: "#1e3a5f",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Lịch khai giảng
        </h1>

        {/* Filter Section */}
        <Card style={{ marginBottom: "32px" }}>
          <Space size="middle" wrap>
            <div>
              <label
                style={{
                  fontWeight: 500,
                  color: "#1e3a5f",
                  marginRight: "8px",
                }}
              >
                Môn học:
              </label>
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
            <div>
              <label
                style={{
                  fontWeight: 500,
                  color: "#1e3a5f",
                  marginRight: "8px",
                }}
              >
                Giảng viên:
              </label>
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
            <Button
              icon={<FilterOutlined />}
              onClick={clearFilters}
              style={{
                background: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#666",
              }}
            >
              Xóa bộ lọc
            </Button>
          </Space>
        </Card>

        {/* Basic Classes Section */}
        <Card style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#ffa940",
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              LỚP CƠ BẢN
            </h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddClass("basic")}
              style={{
                background: "#1e3a5f",
                borderColor: "#1e3a5f",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Thêm
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={filterData(basicClasses)}
            pagination={false}
            size="middle"
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
            }}
          />
        </Card>

        {/* Advanced Classes Section */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#ffa940",
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              LỚP NÂNG CAO
            </h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddClass("advanced")}
              style={{
                background: "#1e3a5f",
                borderColor: "#1e3a5f",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Thêm
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={filterData(advancedClasses)}
            pagination={false}
            size="middle"
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
            }}
          />
        </Card>

        {/* Modal Form */}
        <Modal
          open={isModalOpen}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
          title={
            isAdvancedClassToAdd ? "THÊM LỚP HỌC NÂNG CAO" : "THÊM LỚP HỌC CƠ BẢN"
          }
          okText="Xác nhận"
          cancelText="Hủy"
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleModalSubmit}
            onFinishFailed={(errorInfo) => { // Added for better debugging
              console.error("Form submission failed:", errorInfo);
              message.error("Vui lòng kiểm tra lại các trường bị lỗi trong form.");
            }}
            style={{ marginTop: "20px" }}
          >
            <Form.Item
              name="classCode"
              label="Mã lớp"
              rules={[{ required: true, message: "Vui lòng nhập mã lớp" }]}
            >
              <Input placeholder="Nhập mã lớp" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Môn học"
              rules={[{ required: true, message: "Vui lòng chọn môn học" }]}
            >
              <Select placeholder="Chọn môn học">
                <Option value="Piano">Piano</Option>
                <Option value="Guitar">Guitar</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="teacher"
              label="Giảng viên"
              rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}
            >
              <Select placeholder="Chọn giảng viên">
                <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
                <Option value="Trần Thị B">Trần Thị B</Option>
                <Option value="Lê Văn C">Lê Văn C</Option>
                <Option value="Phạm Văn D">Phạm Văn D</Option>
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
                name="startDate"
                label="Ngày khai giảng"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày khai giảng" },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="endDate"
                label="Ngày kết thúc"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày kết thúc" },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </div>

            {/* NEW: Field to manually select weekdays */}
            <Form.Item
              name="scheduleDays"
              label="Các ngày học trong tuần"
              rules={[{ required: true, message: "Vui lòng chọn các ngày học trong tuần" }]}
            >
              <Select
                mode="multiple" // Allows multiple selections
                placeholder="Chọn các ngày học (VD: Thứ 2, Thứ 4)"
              >
                <Option value="Mon">Thứ 2</Option>
                <Option value="Tue">Thứ 3</Option>
                <Option value="Wed">Thứ 4</Option>
                <Option value="Thu">Thứ 5</Option>
                <Option value="Fri">Thứ 6</Option>
                <Option value="Sat">Thứ 7</Option>
                <Option value="Sun">Chủ nhật</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="scheduleTime"
              label="Thời gian học"
              rules={[
                { required: true, message: "Vui lòng nhập thời gian học (VD: 18:00 to 19:30)" },
                {
                  pattern: /^\d{2}:\d{2} to \d{2}:\d{2}$/,
                  message: "Định dạng phải là HH:MM to HH:MM",
                },
              ]}
            >
              <Input placeholder="VD: 18:00 to 19:30" />
            </Form.Item>

            <Form.Item
              name="capacity"
              label="Sức chứa"
              rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
            >
              <Input placeholder="VD: 10" type="number" min={1} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}