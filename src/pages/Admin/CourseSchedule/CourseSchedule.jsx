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








// import { useState, useEffect, useRef } from "react";
// import {
//   Button,
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
// import dayjs from 'dayjs'; // Import dayjs
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import plugin isSameOrBefore
// dayjs.extend(isSameOrBefore); // Extend dayjs with the plugin

// const { Option } = Select;

// export default function CourseSchedulePage() {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subjectFilter, setSubjectFilter] = useState("");
//   const [teacherFilter, setTeacherFilter] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAdvancedClassToAdd, setIsAdvancedClassToAdd] = useState(false);
//   const [form] = Form.useForm();

//   const teacherMapping = {
//     "Basic Piano": "Nguyễn Văn A",
//     "Advanced Piano": "Nguyễn Văn A",
//     "Basic Guitar": "Trần Thị B",
//     "Advanced Guitar": "Trần Thị B",
//     // "Basic Piano": "Lê Văn C",
//     // "Advanced Piano": "Lê Văn C",
//     // "Basic Guitar": "Phạm Văn D",
//     // "Advanced Guitar": "Phạm Văn D",
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
//     form.resetFields();
//     setIsAdvancedClassToAdd(type === "advanced");
//     setIsModalOpen(true);
//     // Không cần reset selectedWeekDays nữa vì nó không còn được sử dụng tự động
//   };

//   const handleModalCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//     // Không cần reset selectedWeekDays nữa
//   };

//   // Hàm này không còn dùng để xác định lịch học gửi lên API nữa, nhưng có thể hữu ích ở đâu đó khác
//   const getWeekdaysBetweenDates = (start, end) => {
//     if (!start || !end) return [];
//     const weekdays = new Set();
//     let current = dayjs(start);
//     while (current.isSameOrBefore(end, 'day')) {
//       weekdays.add(current.day()); // 0: Chủ Nhật, 1: Thứ 2, ..., 6: Thứ 7
//       current = current.add(1, 'day');
//     }
//     const sortedWeekdays = Array.from(weekdays).sort((a, b) => {
//       // Sắp xếp Thứ 2 đến CN (CN là 0, nên đưa về cuối)
//       if (a === 0 && b !== 0) return 1;
//       if (b === 0 && a !== 0) return -1;
//       return a - b;
//     });

//     const dayMapToShortCode = {
//       1: "Mon",
//       2: "Tue",
//       3: "Wed",
//       4: "Thu",
//       5: "Fri",
//       6: "Sat",
//       0: "Sun",
//     };

//     return sortedWeekdays.map(day => dayMapToShortCode[day]);
//   };

//   // Loại bỏ useEffect này vì không còn tự động tính toán selectedWeekDays
//   // const [selectedWeekDays, setSelectedWeekDays] = useState([]);
//   // useEffect(() => {
//   //   const startDate = form.getFieldValue('startDate');
//   //   const endDate = form.getFieldValue('endDate');
//   //   if (startDate && endDate) {
//   //     const days = getWeekdaysBetweenDates(startDate, endDate);
//   //     setSelectedWeekDays(days);
//   //   } else {
//   //     setSelectedWeekDays([]);
//   //   }
//   // }, [form, form.getFieldValue('startDate'), form.getFieldValue('endDate')]);

//   const handleModalSubmit = async (values) => {
//     console.log("handleModalSubmit called with values:", values); // Debug log

//     const subjectPrefix = isAdvancedClassToAdd ? "Advanced " : "Basic ";
//     const fullSubjectName = subjectPrefix + values.subject;

//     // Lấy scheduleDays (mảng các ngày đã chọn) và scheduleTime từ form
//     const scheduleDaysPart = values.scheduleDays; // Đây là mảng các chuỗi 'Mon', 'Tue', v.v.
//     const scheduleTimePart = values.scheduleTime;

//     // Validate if scheduleDays is empty
//     if (!scheduleDaysPart || scheduleDaysPart.length === 0) {
//       message.error("Vui lòng chọn các ngày học trong tuần.");
//       return;
//     }

//     // Kiểm tra định dạng thời gian nhập vào
//     const timeRegex = /^\d{2}:\d{2} to \d{2}:\d{2}$/;
//     if (!timeRegex.test(scheduleTimePart)) {
//       message.error("Vui lòng nhập thời gian học theo định dạng HH:MM to HH:MM (VD: 18:00 to 19:30)");
//       return;
//     }

//     // Tạo chuỗi finalSchedule theo định dạng "Mon/Thu 18:00 to 19:30"
//     const finalSchedule = `${scheduleDaysPart.join('/')} ${scheduleTimePart}`;

//     const payload = {
//       subject: fullSubjectName,
//       classCode: values.classCode,
//       openingDay: values.startDate.format("YYYY-MM-DD"),
//       endDate: values.endDate.format("YYYY-MM-DD"),
//       schedule: finalSchedule, // Sử dụng finalSchedule mới
//       studentQuantity: parseInt(values.capacity, 10),
//       isAdvancedClass: isAdvancedClassToAdd,
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
//         setIsModalOpen(false);
//         fetchSchedules();
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

//   const columns = [
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

//         const parts = text.split(" ");
//         const daysPart = parts[0]; 
//         const timePart = parts.slice(1).join(" "); // Gộp lại phần thời gian nếu có khoảng trắng

//         let startTime = '';
//         let endTime = '';

//         const timeRegex = /(\d{2}:\d{2}) to (\d{2}:\d{2})/;
//         const matchTime = timePart.match(timeRegex);
//         if (matchTime) {
//           startTime = matchTime[1];
//           endTime = matchTime[2];
//         }

//         // Chuyển đổi các mã ngày (Mon, Tue) sang tiếng Việt (Thứ 2, Thứ 3)
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
//           open={isModalOpen}
//           onCancel={handleModalCancel}
//           onOk={() => form.submit()}
//           title={
//             isAdvancedClassToAdd ? "THÊM LỚP HỌC NÂNG CAO" : "THÊM LỚP HỌC CƠ BẢN"
//           }
//           okText="Xác nhận"
//           cancelText="Hủy"
//           width={600}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleModalSubmit}
//             onFinishFailed={(errorInfo) => { // Added for better debugging
//               console.error("Form submission failed:", errorInfo);
//               message.error("Vui lòng kiểm tra lại các trường bị lỗi trong form.");
//             }}
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
//                 label="Ngày khai giảng"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày khai giảng" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 name="endDate"
//                 label="Ngày kết thúc"
//                 rules={[
//                   { required: true, message: "Vui lòng chọn ngày kết thúc" },
//                 ]}
//               >
//                 <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
//               </Form.Item>
//             </div>

//             {/* NEW: Field to manually select weekdays */}
//             <Form.Item
//               name="scheduleDays"
//               label="Các ngày học trong tuần"
//               rules={[{ required: true, message: "Vui lòng chọn các ngày học trong tuần" }]}
//             >
//               <Select
//                 mode="multiple" // Allows multiple selections
//                 placeholder="Chọn các ngày học (VD: Thứ 2, Thứ 4)"
//               >
//                 <Option value="Mon">Thứ 2</Option>
//                 <Option value="Tue">Thứ 3</Option>
//                 <Option value="Wed">Thứ 4</Option>
//                 <Option value="Thu">Thứ 5</Option>
//                 <Option value="Fri">Thứ 6</Option>
//                 <Option value="Sat">Thứ 7</Option>
//                 <Option value="Sun">Chủ nhật</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="scheduleTime"
//               label="Thời gian học"
//               rules={[
//                 { required: true, message: "Vui lòng nhập thời gian học (VD: 18:00 to 19:30)" },
//                 {
//                   pattern: /^\d{2}:\d{2} to \d{2}:\d{2}$/,
//                   message: "Định dạng phải là HH:MM to HH:MM",
//                 },
//               ]}
//             >
//               <Input placeholder="VD: 18:00 to 19:30" />
//             </Form.Item>

//             <Form.Item
//               name="capacity"
//               label="Sức chứa"
//               rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
//             >
//               <Input placeholder="VD: 10" type="number" min={1} />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// }










"use client"

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

// Mapping for weekdays (short code to Vietnamese name)
const dayMapToVietnamese = {
  Mon: "Thứ 2",
  Tue: "Thứ 3",
  Wed: "Thứ 4",
  Thu: "Thứ 5",
  Fri: "Thứ 6",
  Sat: "Thứ 7",
  Sun: "Chủ nhật",
}

// Mapping for weekdays (Ant Design Select value to Vietnamese name)
const weekdayOptions = [
  { label: "Thứ 2", value: "Mon" },
  { label: "Thứ 3", value: "Tue" },
  { label: "Thứ 4", value: "Wed" },
  { label: "Thứ 5", value: "Thu" },
  { label: "Thứ 6", value: "Fri" },
  { label: "Thứ 7", value: "Sat" },
  { label: "Chủ nhật", value: "Sun" },
]

const CourseSchedule = () => {
  const [openingSchedules, setOpeningSchedules] = useState([])
  const [classes, setClasses] = useState([]) // Add classes state
  const [loading, setLoading] = useState(true)
  const [subjectFilter, setSubjectFilter] = useState(null)
  const [teacherFilter, setTeacherFilter] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [availableTeachers, setAvailableTeachers] = useState([]) // List of teacher objects for dropdowns
  const [allUsers, setAllUsers] = useState([]) // All users including students
  const hasFetchedTeachers = useRef(false) // Ref to ensure teachers are fetched only once
  const hasFetchedClasses = useRef(false) // Ref to ensure classes are fetched only once

  // States cho modal CẬP NHẬT
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [updateForm] = Form.useForm()

  // States cho modal THÊM MỚI
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isAdvancedClassToAdd, setIsAdvancedClassToAdd] = useState(false)
  const [addForm] = Form.useForm()

  const { message: antdMessage, modal: antdModal } = App.useApp()
  const hasFetchedSchedules = useRef(false)

  // Function to fetch opening schedules
  const fetchOpeningSchedules = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (Array.isArray(data)) {
        setOpeningSchedules(data)

        // Extract unique subjects from instrument names
        const uniqueSubjects = [...new Set(data.map((item) => item.instrument?.instrumentName).filter(Boolean))]

        // Extract unique teacher names for filtering
        const allTeacherNamesFromApi = data.map((item) => item.teacherUser?.accountName?.trim()).filter(Boolean)
        const uniqueTeachersForFilter = [...new Set(allTeacherNamesFromApi)]

        setSubjects(uniqueSubjects)
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

  // Function to fetch classes
  const fetchClasses = async () => {
    try {
      const response = await fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (Array.isArray(data)) {
        setClasses(data)
      } else {
        setClasses([])
      }
    } catch (error) {
      console.error("Error fetching classes:", error)
      antdMessage.error("Không thể tải dữ liệu lớp học.")
    }
  }

  // Function to fetch all users (teachers and students)
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token") // Get token from localStorage
      if (!token) {
        antdMessage.error("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.")
        return
      }

      const response = await fetch("https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User", {
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
        // Filter users to get only teachers (assuming roleId: 2 is for Teacher)
        const teachersData = users.filter((user) => user.roleId === 2 && !user.isDisabled)
        setAvailableTeachers(teachersData)

        // Store all users for student counting
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

  useEffect(() => {
    if (hasFetchedSchedules.current) return
    hasFetchedSchedules.current = true
    fetchOpeningSchedules()
  }, [antdMessage])

  // Add useEffect to fetch all users
  useEffect(() => {
    if (!hasFetchedTeachers.current) {
      hasFetchedTeachers.current = true
      fetchAllUsers() // Changed from fetchAvailableTeachers
    }
  }, [])

  // Add useEffect to fetch classes
  useEffect(() => {
    if (!hasFetchedClasses.current) {
      hasFetchedClasses.current = true
      fetchClasses()
    }
  }, [])

  // Helper function to get actual student count for a class using User API
  const getActualStudentCount = (classCode) => {
    // Find the class first to get classId
    const classData = classes.find((cls) => cls.classCode === classCode)
    if (!classData) return 0

    // Count students (roleId: 3) who have this classId in their classIds array
    const studentsInClass = allUsers.filter(
      (user) => user.roleId === 3 && !user.isDisabled && user.classIds && user.classIds.includes(classData.classId),
    )

    return studentsInClass.length
  }

  // Transform schedule data to match your table's display
  const transformScheduleData = (schedules) => {
    return schedules.map((schedule, index) => {
      const { openingDay, endDate, schedule: rawSchedule, studentQuantity } = schedule

      // Get subject from instrument object
      const subjectName = schedule.instrument?.instrumentName || "Không xác định"

      // Get teacher name from nested structure
      const teacherName = schedule.teacherUser?.accountName?.trim() || "Chưa phân công"

      // Get actual student count from User API (more reliable)
      const actualStudentCount = getActualStudentCount(schedule.classCode)

      const transformedSchedule = {
        key: schedule.openingScheduleId.toString(),
        stt: index + 1,
        openingScheduleId: schedule.openingScheduleId,
        subject: subjectName,
        teacherName: teacherName,
        classCode: schedule.classCode,
        openingDay: openingDay,
        endDate: endDate,
        isAdvancedClass: schedule.isAdvancedClass,
        studentQuantity: studentQuantity,
        actualStudentCount: actualStudentCount, // From User API
        rawSchedule: rawSchedule,
        instrumentId: schedule.instrumentId,
        scheduleDays: [],
        scheduleTime: "",
      }

      // Try to parse the schedule if it follows the expected format
      if (rawSchedule && typeof rawSchedule === "string") {
        const scheduleRegex = /^([A-Za-z/]+)\s+(\d{2}:\d{2}\s+to\s+\d{2}:\d{2})$/
        const match = rawSchedule.match(scheduleRegex)

        if (match) {
          const dayCodes = match[1].split("/")
          transformedSchedule.scheduleDays = dayCodes
          transformedSchedule.scheduleTime = match[2]

          const timeRegex = /(\d{2}:\d{2}) to (\d{2}:\d{2})/
          const matchTime = transformedSchedule.scheduleTime.match(timeRegex)
          let displayTime = ""
          if (matchTime) {
            displayTime = `(${matchTime[1]} - ${matchTime[2]})`
          }

          const convertedDaysForDisplay = dayCodes.map((day) => dayMapToVietnamese[day] || day).join(" / ")
          transformedSchedule.displaySchedule = `${convertedDaysForDisplay} ${displayTime}`
        } else {
          transformedSchedule.displaySchedule = rawSchedule
        }
      } else {
        transformedSchedule.displaySchedule = rawSchedule || "Chưa có lịch"
      }

      // Update display capacity to show actual/max from User API
      transformedSchedule.displayCapacity = `${actualStudentCount}/${studentQuantity}`
      return transformedSchedule
    })
  }

  const transformedData = useMemo(() => transformScheduleData(openingSchedules), [openingSchedules, classes, allUsers])

  // Memoized filtered data
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

  // Phân chia lịch học cơ bản và nâng cao
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
    if (percentage >= 100) return "red" // Full capacity
    if (percentage >= 80) return "orange" // Near capacity
    if (percentage >= 60) return "gold" // Getting full
    return "green" // Available spots
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
    updateForm.setFieldsValue({
      ...record,
      openingDay: record.openingDay ? dayjs(record.openingDay) : null,
      endDate: record.endDate ? dayjs(record.endDate) : null,
      subject: record.subject,
      instrumentId: record.instrumentId,
      isAdvancedClass: record.isAdvancedClass,
      teacherName: record.teacherName === "Chưa phân công" ? undefined : record.teacherName,
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

      // Validate student quantity doesn't exceed current enrolled students
      const currentStudentCount = currentRecord.actualStudentCount
      if (values.studentQuantity < currentStudentCount) {
        antdMessage.error(
          `Sĩ số tối đa không thể nhỏ hơn số học viên hiện tại (${currentStudentCount}). Vui lòng nhập số lớn hơn hoặc bằng ${currentStudentCount}.`,
        )
        return
      }

      // Combine scheduleDays and scheduleTime into one string if provided
      let finalSchedule = values.rawSchedule // Use existing schedule as fallback

      if (values.scheduleDays && values.scheduleDays.length > 0 && values.scheduleTime) {
        const timeRegex = /^\d{2}:\d{2} to \d{2}:\d{2}$/
        if (!timeRegex.test(values.scheduleTime)) {
          antdMessage.error("Vui lòng nhập thời gian học theo định dạng HH:MM to HH:MM (VD: 18:00 to 19:30)")
          return
        }
        finalSchedule = `${values.scheduleDays.join("/")} ${values.scheduleTime}`
      }

      const scheduleIdToUpdate = currentRecord.openingScheduleId
      if (!scheduleIdToUpdate) {
        throw new Error("Không tìm thấy ID lịch học để cập nhật.")
      }

      // Find the teacher's userId based on their accountName
      const selectedTeacher = availableTeachers.find((teacher) => teacher.accountName === values.teacherName)
      const teacherUserId = selectedTeacher ? selectedTeacher.userId : null

      if (!teacherUserId && values.teacherName) {
        antdMessage.error("Giảng viên được chọn không hợp lệ. Vui lòng chọn lại.")
        return
      }

      const updatedData = {
        openingScheduleId: scheduleIdToUpdate,
        instrumentId: values.subject === "Piano" ? 2 : 1,
        classCode: values.classCode,
        openingDay: values.openingDay ? values.openingDay.format("YYYY-MM-DD") : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
        schedule: finalSchedule,
        studentQuantity: values.studentQuantity,
        isAdvancedClass: values.isAdvancedClass || false,
        teacherUserId: teacherUserId,
      }

      const response = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule/${scheduleIdToUpdate}`,
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
        fetchOpeningSchedules()
        fetchClasses() // Refresh classes data
        fetchAllUsers() // Refresh user data
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
    // Check if class has students
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
            `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule/${record.openingScheduleId}`,
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
            fetchClasses() // Refresh classes data
            fetchAllUsers() // Refresh user data
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

      const scheduleDaysPart = values.scheduleDays
      const scheduleTimePart = values.scheduleTime

      if (!scheduleDaysPart || scheduleDaysPart.length === 0) {
        antdMessage.error("Vui lòng chọn các ngày học trong tuần.")
        return
      }

      const timeRegex = /^\d{2}:\d{2} to \d{2}:\d{2}$/
      if (!timeRegex.test(scheduleTimePart)) {
        antdMessage.error("Vui lòng nhập thời gian học theo định dạng HH:MM to HH:MM (VD: 18:00 to 19:30)")
        return
      }

      const finalSchedule = `${scheduleDaysPart.join("/")} ${scheduleTimePart}`

      // Find the teacher's userId based on their accountName
      const selectedTeacher = availableTeachers.find((teacher) => teacher.accountName === values.teacherName)
      const teacherUserId = selectedTeacher ? selectedTeacher.userId : null

      if (!teacherUserId && values.teacherName) {
        antdMessage.error("Giảng viên được chọn không hợp lệ. Vui lòng chọn lại.")
        return
      }

      const newSchedule = {
        instrumentId: values.subject === "Piano" ? 2 : 1,
        classCode: values.classCode,
        openingDay: values.openingDay ? values.openingDay.format("YYYY-MM-DD") : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
        schedule: finalSchedule,
        studentQuantity: Number.parseInt(values.studentQuantity, 10),
        isAdvancedClass: isAdvancedClassToAdd,
        teacherUserId: teacherUserId,
      }

      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
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
        fetchOpeningSchedules()
        fetchClasses() // Refresh classes data
        fetchAllUsers() // Refresh user data
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
    {
      title: "Lịch học",
      dataIndex: "displaySchedule",
      key: "displaySchedule",
      width: 180,
      align: "center",
      render: (text) => (
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
          {text}
        </span>
      ),
    },
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
            name="studentQuantity"
            label="Sĩ số tối đa"
            rules={[
              { required: true, message: "Vui lòng nhập sĩ số tối đa" },
              { type: "number", min: 1, message: "Sĩ số tối đa phải lớn hơn 0" },
            ]}
          >
            <InputNumber placeholder="VD: 10" min={1} style={{ width: "100%" }} />
          </Form.Item>
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
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Môn học" rules={[{ required: true, message: "Vui lòng nhập môn học!" }]}>
            <Select placeholder="Chọn môn học">
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
          <Form.Item
            name="rawSchedule"
            label="Lịch học hiện tại"
            help="Bạn có thể chỉnh sửa trực tiếp hoặc sử dụng các trường bên dưới"
          >
            <Input placeholder="VD: Mon/Wed 18:00 to 19:30" />
          </Form.Item>
          <Form.Item name="scheduleDays" label="Các ngày học trong tuần (tùy chọn)">
            <Select mode="multiple" placeholder="Chọn các ngày học (VD: Thứ 2, Thứ 4)" options={weekdayOptions} />
          </Form.Item>
          <Form.Item
            name="scheduleTime"
            label="Thời gian học (tùy chọn)"
            rules={[
              {
                pattern: /^\d{2}:\d{2} to \d{2}:\d{2}$/,
                message: "Định dạng phải là HH:MM to HH:MM",
              },
            ]}
          >
            <Input placeholder="VD: 18:00 to 19:30" />
          </Form.Item>
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
          <Form.Item name="isAdvancedClass" valuePropName="checked" label="Là lớp nâng cao?">
            <Checkbox>Lớp nâng cao</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseSchedule


