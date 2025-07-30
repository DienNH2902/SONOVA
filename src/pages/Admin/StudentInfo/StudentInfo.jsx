// "use client";

// import { Typography, Table, Checkbox, Input, Select, Button, Tag, Space, Pagination, Spin, App, Modal, Form, Descriptions } from "antd";
// import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import { useState, useEffect, useMemo, useRef } from "react"; // Thêm useRef
// import "./StudentInfo.css"; // Đảm bảo CSS của mày vẫn hoạt động tốt

// const { Title } = Typography;
// const { Option } = Select;
// const { confirm } = Modal;

// const StudentInfo = () => {
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [tempSearchText, setTempSearchText] = useState(""); // State tạm thời cho input search
//     const [classFilter, setClassFilter] = useState("Tất cả");
//     const [statusFilter, setStatusFilter] = useState("Tất cả");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [userData, setUserData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [allClasses, setAllClasses] = useState([]);
//     const { message: antdMessage } = App.useApp();

//     const pageSize = 10;
//     const baseUrl = "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net";

//     // --- Modals State ---
//     const [isClassEditModalVisible, setIsClassEditModalVisible] = useState(false);
//     const [editingUser, setEditingUser] = useState(null);
//     const [selectedClassesForEdit, setSelectedClassesForEdit] = useState([]);
//     const [form] = Form.useForm();
//     const [isViewModalVisible, setIsViewModalVisible] = useState(false);
//     const [viewingUser, setViewingUser] = useState(null);

//     // --- Fetch User Data (Students and Teachers) ---
//     const fetchUsers = async () => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 antdMessage.error("Vui lòng đăng nhập để xem thông tin.");
//                 setLoading(false);
//                 return;
//             }

//             const response = await fetch(`${baseUrl}/api/User`, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "Không thể tải dữ liệu người dùng.");
//             }

//             const data = await response.json();
//             // Lọc ra chỉ học sinh (roleId: 3) và giáo viên (roleId: 2)
//             const filteredUsers = data.filter(user => user.roleId === 3 || user.roleId === 2);

//             const formattedUsers = filteredUsers.map(user => ({
//                 ...user,
//                 key: user.userId,
//                 name: user.accountName || user.username || "Không tên",
//                 phone: user.phoneNumber || "N/A",
//                 email: user.email || "N/A",
//                 role: user.roleId === 2 ? 'teacher' : (user.roleId === 3 ? 'student' : 'other'),
//             }));
//             setUserData(formattedUsers);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//             antdMessage.error(`Lỗi tải dữ liệu người dùng: ${error.message}`);
//             setUserData([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- Fetch All Classes (to populate class filter) ---
//     const fetchAllClasses = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${baseUrl}/api/Class`, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setAllClasses(data);
//         } catch (error) {
//             console.error("Error fetching classes:", error);
//             antdMessage.error("Không thể tải danh sách lớp học.");
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//         fetchAllClasses();
//     }, []);

//     // --- Debounce effect for search text ---
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setSearchText(tempSearchText); // Cập nhật searchText sau khi ngừng gõ
//             setCurrentPage(1); // Reset trang về 1 khi searchText được cập nhật
//         }, 500); // 500ms debounce time

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [tempSearchText]);

//     // --- Filter and Search Logic ---
//     const filteredAndSearchedData = useMemo(() => {
//         let filtered = userData;

//         // Apply class filter (by classId)
//         if (classFilter !== "Tất cả") {
//             filtered = filtered.filter(user => user.classIds && user.classIds.includes(parseInt(classFilter)));
//         }

//         // Apply status filter (by isDisabled)
//         if (statusFilter !== "Tất cả") {
//             if (statusFilter === "active") { // Đang học/Đang dạy
//                 filtered = filtered.filter(user => !user.isDisabled);
//             } else if (statusFilter === "disabled") { // Hoàn thành
//                 filtered = filtered.filter(user => user.isDisabled);
//             }
//         }

//         // Apply search filter
//         if (searchText.trim()) {
//             const searchLower = searchText.toLowerCase().trim();
//             filtered = filtered.filter(
//                 (user) =>
//                     user.name.toLowerCase().includes(searchLower) ||
//                     user.username.toLowerCase().includes(searchLower) ||
//                     (user.email && user.email.toLowerCase().includes(searchLower)) ||
//                     (user.phoneNumber && user.phoneNumber.includes(searchText.trim())) ||
//                     String(user.userId).includes(searchText.trim()) ||
//                     user.classIds?.some(classId => {
//                         const classInfo = allClasses.find(cls => cls.classId === classId);
//                         if (!classInfo) return false;
//                         return (
//                             classInfo.className?.toLowerCase().includes(searchLower) ||
//                             classInfo.classCode?.toLowerCase().includes(searchLower)
//                         );
//                     })
//             );
//         }

//         return filtered;
//     }, [userData, classFilter, statusFilter, searchText, allClasses]); // searchText là dependency

//     // Paginated data
//     const paginatedData = useMemo(() => {
//         const startIndex = (currentPage - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         return filteredAndSearchedData.slice(startIndex, endIndex);
//     }, [filteredAndSearchedData, currentPage, pageSize]);

//     // Reset to first page when filters change (not search input directly)
//     const handleFilterChange = (filterType, value) => {
//         setCurrentPage(1); // Chỉ reset trang khi filter thay đổi
//         if (filterType === "class") {
//             setClassFilter(value);
//         } else if (filterType === "status") {
//             setStatusFilter(value);
//         }
//     };

//     const handleTempSearchChange = (e) => {
//         setTempSearchText(e.target.value); // Chỉ cập nhật tempSearchText
//     };

//     // Cập nhật logic hàm getStatusTag
//     const getStatusTag = (isDisabled, role) => {
//         if (isDisabled) {
//             return <Tag color="error">Hoàn thành</Tag>;
//         }
//         if (role === 'student') {
//             return <Tag color="success">Đang học</Tag>;
//         }
//         if (role === 'teacher') {
//             return <Tag color="success">Đang dạy</Tag>; // Màu khác để phân biệt
//         }
//         return <Tag color="default">Không xác định</Tag>; // Trường hợp khác
//     };

//     // --- Handle Edit/Delete/View Actions ---

//     const handleViewUser = (record) => {
//         setViewingUser(record);
//         setIsViewModalVisible(true);
//     };

//     const handleEditClass = (record) => {
//         setEditingUser(record);
//         setSelectedClassesForEdit(record.classIds || []);
//         form.setFieldsValue({ classes: record.classIds || [] });
//         setIsClassEditModalVisible(true);
//     };

//     const handleUpdateClasses = async () => {
//         try {
//             const values = await form.validateFields();
//             if (!editingUser) return;

//             const formData = new FormData();

//             formData.append("userId", editingUser.userId);
//             formData.append("username", editingUser.username);
//             formData.append("accountName", editingUser.accountName || "");
//             formData.append("email", editingUser.email || "");
//             formData.append("phoneNumber", editingUser.phoneNumber || "");
//             formData.append("roleId", editingUser.roleId);
//             formData.append("isDisabled", editingUser.isDisabled);
//             formData.append("genderId", editingUser.genderId || 0);
//             formData.append("birthday", editingUser.birthday || "");
//             formData.append("address", editingUser.address || "");

//             if (values.classes && values.classes.length > 0) {
//                 values.classes.forEach(classId => {
//                     formData.append("classIds", classId);
//                 });
//             }

//             const token = localStorage.getItem("token");

//             const response = await fetch(`${baseUrl}/api/User/${editingUser.userId}`, {
//                 method: "PUT",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "Không thể cập nhật thông tin người dùng.");
//             }

//             antdMessage.success(`Cập nhật lớp học cho ${editingUser.name} thành công!`);
//             setIsClassEditModalVisible(false);
//             setEditingUser(null);
//             setSelectedClassesForEdit([]);
//             form.resetFields();
//             fetchUsers();
//         } catch (error) {
//             console.error("Error updating user:", error);
//             antdMessage.error(`Cập nhật người dùng thất bại: ${error.message}`);
//         }
//     };

//     const handleDeleteUser = (record) => {
//         confirm({
//             title: `Bạn có chắc muốn xóa người dùng ${record.name}?`,
//             icon: <ExclamationCircleOutlined />,
//             content: 'Thao tác này không thể hoàn tác. Người dùng sẽ bị xóa khỏi hệ thống.',
//             okText: 'Xóa',
//             okType: 'danger',
//             cancelText: 'Hủy',
//             async onOk() {
//                 try {
//                     const token = localStorage.getItem("token");
//                     const response = await fetch(`${baseUrl}/api/User/${record.userId}`, {
//                         method: "DELETE",
//                         headers: {
//                             "Authorization": `Bearer ${token}`,
//                         },
//                     });

//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(errorData.detail || "Không thể xóa người dùng.");
//                     }

//                     antdMessage.success(`Đã xóa người dùng ${record.name} thành công.`);
//                     fetchUsers();
//                 } catch (error) {
//                     console.error("Error deleting user:", error);
//                     antdMessage.error(`Xóa người dùng thất bại: ${error.message}`);
//                 }
//             },
//             onCancel() {
//                 console.log('Hủy xóa');
//             },
//         });
//     };

//     const columns = [
//         {
//             title: "User ID",
//             dataIndex: "userId",
//             key: "userId",
//             width: 100,
//             align: "center",
//             render: (userId) => <span className="user-id">{userId}</span>,
//         },
//         {
//             title: "Họ và tên",
//             dataIndex: "name",
//             key: "name",
//             width: 150,
//         },
//         {
//             title: "Username",
//             dataIndex: "username",
//             key: "username",
//             width: 120,
//         },
//         {
//             title: "SĐT",
//             dataIndex: "phone",
//             key: "phone",
//             width: 120,
//             render: (phone) => phone === "N/A" ? <Tag>Chưa cập nhật</Tag> : phone,
//         },
//         {
//             title: "Email",
//             dataIndex: "email",
//             key: "email",
//             width: 180,
//             render: (email) => email === "N/A" ? <Tag>Chưa cập nhật</Tag> : email,
//         },
//         {
//             title: "Lớp học",
//             dataIndex: "classIds",
//             key: "class",
//             width: 180,
//             render: (classIds) => {
//                 if (!classIds || classIds.length === 0) {
//                     return <Tag color="default">Chưa có lớp</Tag>;
//                 }
//                 return classIds.map(classId => {
//                     const classInfo = allClasses.find(cls => cls.classId === classId);
//                     const displayClass = classInfo ? classInfo.classCode : `ID: ${classId}`;
//                     return <Tag key={classId} color="blue">{displayClass}</Tag>;
//                 });
//             },
//         },
//         {
//             title: "Vai trò",
//             dataIndex: "role",
//             key: "role",
//             width: 100,
//             render: (role) => {
//                 let color = '';
//                 let text = '';
//                 if (role === 'student') {
//                     color = 'geekblue';
//                     text = 'Học viên';
//                 } else if (role === 'teacher') {
//                     color = 'volcano';
//                     text = 'Giáo viên';
//                 } else {
//                     color = 'default';
//                     text = 'Khác';
//                 }
//                 return <Tag color={color}>{text}</Tag>;
//             }
//         },
//         {
//             title: "Trạng thái",
//             dataIndex: "isDisabled",
//             key: "status",
//             width: 120,
//             // Truyền cả `record` để có thể truy cập `role`
//             render: (isDisabled, record) => getStatusTag(isDisabled, record.role),
//         },
//         {
//             title: "Thao tác",
//             key: "actions",
//             width: 120,
//             align: "center",
//             render: (_, record) => (
//                 <Space size="small">
//                     <Button
//                         type="text"
//                         icon={<EyeOutlined />}
//                         size="small"
//                         className="action-btn view-btn"
//                         onClick={() => handleViewUser(record)}
//                     />
//                     <Button
//                         type="text"
//                         icon={<EditOutlined />}
//                         size="small"
//                         className="action-btn edit-btn"
//                         onClick={() => handleEditClass(record)}
//                     />
//                     <Button
//                         type="text"
//                         icon={<DeleteOutlined />}
//                         size="small"
//                         className="action-btn delete-btn"
//                         onClick={() => handleDeleteUser(record)}
//                     />
//                 </Space>
//             ),
//         },
//     ];

//     const rowSelection = {
//         selectedRowKeys,
//         onChange: (newSelectedRowKeys) => {
//             setSelectedRowKeys(newSelectedRowKeys);
//         },
//         onSelectAll: (selected) => {
//             if (selected) {
//                 setSelectedRowKeys(paginatedData.map((item) => item.key));
//             } else {
//                 setSelectedRowKeys([]);
//             }
//         },
//         onSelect: (record, selected) => {
//             if (selected) {
//                 setSelectedRowKeys(prev => [...prev, record.key]);
//             } else {
//                 setSelectedRowKeys(prev => prev.filter(key => key !== record.key));
//             }
//         }
//     };

//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//             setSelectedRowKeys(paginatedData.map((item) => item.key));
//         } else {
//             setSelectedRowKeys([]);
//         }
//     };

//     const clearFilters = () => {
//         setTempSearchText(""); // Reset cả tempSearchText
//         setSearchText(""); // Và searchText
//         setClassFilter("Tất cả");
//         setStatusFilter("Tất cả");
//         setCurrentPage(1);
//     };

//     if (loading) {
//         return (
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
//                 <Spin size="large" tip="Đang tải dữ liệu người dùng..." />
//             </div>
//         );
//     }

//     return (
//         <div className="student-info-page">
//             <div className="student-info-container">
//                 <Title level={1} className="page-title">
//                     QUẢN LÝ NGƯỜI DÙNG
//                 </Title>

//                 {/* Filters Section */}
//                 <div className="filters-section">
//                     <div className="filters-left">
//                         <Checkbox
//                             checked={selectedRowKeys.length === paginatedData.length && paginatedData.length > 0}
//                             indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < paginatedData.length}
//                             onChange={handleSelectAll}
//                             className="select-all-checkbox"
//                         >
//                             Đã chọn {selectedRowKeys.length}
//                         </Checkbox>
//                         <Button type="link" onClick={clearFilters} className="clear-filters-btn">
//                             Xóa bộ lọc
//                         </Button>
//                         <Input
//                             placeholder="Tìm kiếm theo tên, username, SĐT, Email, User ID..."
//                             prefix={<SearchOutlined />}
//                             value={tempSearchText} // Bind với tempSearchText
//                             onChange={handleTempSearchChange} // Call handleTempSearchChange
//                             className="search-input"
//                         />
//                     </div>

//                     <div className="filters-right">
//                         <div className="filter-group">
//                             <span className="filter-label">Lớp học:</span>
//                             <Select
//                                 value={classFilter}
//                                 onChange={(value) => handleFilterChange("class", value)}
//                                 className="filter-select"
//                                 showSearch
//                                 optionFilterProp="children"
//                                 filterOption={(input, option) =>
//                                     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                 }
//                             >
//                                 <Option value="Tất cả">Tất cả</Option>
//                                 {allClasses.map((cls) => (
//                                     <Option key={cls.classId} value={cls.classId}>
//                                         {/* {cls.classCode} - {cls.className} */}
//                                         {cls.classCode} 
//                                     </Option>
//                                 ))}
//                             </Select>
//                         </div>

//                         <div className="filter-group">
//                             <span className="filter-label">Trạng thái:</span>
//                             <Select
//                                 value={statusFilter}
//                                 onChange={(value) => handleFilterChange("status", value)}
//                                 className="filter-select"
//                             >
//                                 <Option value="Tất cả">Tất cả</Option>
//                                 <Option value="active">Đang hoạt động</Option> {/* Đổi thành "Đang hoạt động" để bao gồm cả Học sinh và Giáo viên */}
//                                 <Option value="disabled">Hoàn thành</Option>
//                             </Select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Results Info */}
//                 <div className="results-info">
//                     <span>
//                         Hiển thị {paginatedData.length} / {filteredAndSearchedData.length} người dùng
//                         {filteredAndSearchedData.length !== userData.length && ` (lọc từ ${userData.length} tổng cộng)`}
//                     </span>
//                 </div>

//                 {/* Table Section */}
//                 <div className="table-container">
//                     <Table
//                         columns={columns}
//                         dataSource={paginatedData}
//                         rowSelection={rowSelection}
//                         pagination={false}
//                         className="student-table"
//                         size="middle"
//                     />
//                 </div>

//                 {/* Pagination Section */}
//                 <div className="pagination-container">
//                     <Pagination
//                         current={currentPage}
//                         total={filteredAndSearchedData.length}
//                         pageSize={pageSize}
//                         showSizeChanger={false}
//                         onChange={setCurrentPage}
//                         className="custom-pagination"
//                         showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} người dùng`}
//                     />
//                 </div>
//             </div>

//             {/* Class Edit Modal */}
//             <Modal
//                 title={`Chỉnh sửa lớp học cho ${editingUser?.name}`}
//                 visible={isClassEditModalVisible}
//                 onOk={handleUpdateClasses}
//                 onCancel={() => {
//                     setIsClassEditModalVisible(false);
//                     setEditingUser(null);
//                     setSelectedClassesForEdit([]);
//                     form.resetFields();
//                 }}
//                 okText="Cập nhật"
//                 cancelText="Hủy"
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item
//                         name="classes"
//                         label="Chọn (các) lớp học"
//                         rules={[{ required: false, message: 'Vui lòng chọn lớp học!' }]}
//                     >
//                         <Select
//                             mode="multiple"
//                             style={{ width: '100%' }}
//                             placeholder="Chọn lớp học"
//                             onChange={setSelectedClassesForEdit}
//                             filterOption={(input, option) =>
//                                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                             }
//                         >
//                             {allClasses.map(cls => (
//                                 <Option key={cls.classId} value={cls.classId}>
//                                     {/* {cls.classCode} - {cls.className} */}
//                                         {cls.classCode} 
//                                 </Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//             {/* View User Info Modal */}
//             <Modal
//                 title={`Thông tin chi tiết của ${viewingUser?.name}`}
//                 visible={isViewModalVisible}
//                 onCancel={() => {
//                     setIsViewModalVisible(false);
//                     setViewingUser(null);
//                 }}
//                 footer={null}
//                 width={600}
//             >
//                 {viewingUser && (
//                     <Descriptions bordered column={1} size="small">
//                         <Descriptions.Item label="User ID">{viewingUser.userId}</Descriptions.Item>
//                         <Descriptions.Item label="Họ và tên">{viewingUser.name}</Descriptions.Item>
//                         <Descriptions.Item label="Username">{viewingUser.username}</Descriptions.Item>
//                         <Descriptions.Item label="Email">{viewingUser.email}</Descriptions.Item>
//                         <Descriptions.Item label="SĐT">{viewingUser.phone}</Descriptions.Item>
//                         <Descriptions.Item label="Vai trò">{viewingUser.role === 'student' ? 'Học viên' : viewingUser.role === 'teacher' ? 'Giáo viên' : 'Khác'}</Descriptions.Item>
//                         {/* Truyền cả role vào getStatusTag trong Descriptions */}
//                         <Descriptions.Item label="Trạng thái">{getStatusTag(viewingUser.isDisabled, viewingUser.role)}</Descriptions.Item>
//                         <Descriptions.Item label="Giới tính">{viewingUser.genderId === 1 ? 'Nam' : viewingUser.genderId === 2 ? 'Nữ' : 'Chưa cập nhật'}</Descriptions.Item>
//                         <Descriptions.Item label="Ngày sinh">{viewingUser.birthday ? new Date(viewingUser.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</Descriptions.Item>
//                         <Descriptions.Item label="Địa chỉ">{viewingUser.address || 'Chưa cập nhật'}</Descriptions.Item>
//                         <Descriptions.Item label="Lớp học">
//                             {viewingUser.classIds && viewingUser.classIds.length > 0 ? (
//                                 viewingUser.classIds.map(classId => {
//                                     const classInfo = allClasses.find(cls => cls.classId === classId);
//                                     return (
//                                         <Tag key={classId} color="blue" style={{ marginBottom: 4 }}>
//                                             {classInfo ? `${classInfo.classCode} - ${classInfo.className}` : `ID: ${classId}`}
//                                         </Tag>
//                                     );
//                                 })
//                             ) : (
//                                 <Tag color="default">Chưa có lớp</Tag>
//                             )}
//                         </Descriptions.Item>
//                     </Descriptions>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default StudentInfo;



"use client";

import { Typography, Table, Checkbox, Input, Select, Button, Tag, Space, Pagination, Spin, App, Modal, Form, Descriptions } from "antd";
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useState, useEffect, useMemo, useRef } from "react";
import "./StudentInfo.css"; // Đảm bảo CSS của mày vẫn hoạt động tốt

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const StudentInfo = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [tempSearchText, setTempSearchText] = useState("");
    const [classFilter, setClassFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");
    
    // Chia ra 2 state riêng cho dữ liệu gốc của học viên và giáo viên
    const [allStudentData, setAllStudentData] = useState([]);
    const [allTeacherData, setAllTeacherData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [allClasses, setAllClasses] = useState([]);
    const { message: antdMessage } = App.useApp();

    const pageSize = 10;
    const baseUrl = "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net";

    // --- Pagination States ---
    const [studentCurrentPage, setStudentCurrentPage] = useState(1);
    const [teacherCurrentPage, setTeacherCurrentPage] = useState(1);

    // --- Modals State ---
    const [isClassEditModalVisible, setIsClassEditModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedClassesForEdit, setSelectedClassesForEdit] = useState([]);
    const [form] = Form.useForm();
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [viewingUser, setViewingUser] = useState(null);

    // --- Fetch User Data (Students and Teachers) ---
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                antdMessage.error("Vui lòng đăng nhập để xem thông tin.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${baseUrl}/api/User`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Không thể tải dữ liệu người dùng.");
            }

            const data = await response.json();
            
            const formattedUsers = data.map(user => ({
                ...user,
                key: user.userId,
                name: user.accountName || user.username || "Không tên",
                phone: user.phoneNumber || "N/A",
                email: user.email || "N/A",
                role: user.roleId === 2 ? 'teacher' : (user.roleId === 3 ? 'student' : 'other'),
            }));

            // Phân loại thành học viên và giáo viên
            setAllStudentData(formattedUsers.filter(user => user.roleId === 3));
            setAllTeacherData(formattedUsers.filter(user => user.roleId === 2));

        } catch (error) {
            console.error("Error fetching users:", error);
            antdMessage.error(`Lỗi tải dữ liệu người dùng: ${error.message}`);
            setAllStudentData([]);
            setAllTeacherData([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Fetch All Classes (to populate class filter) ---
    const fetchAllClasses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/api/Class`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllClasses(data);
        } catch (error) {
            console.error("Error fetching classes:", error);
            antdMessage.error("Không thể tải danh sách lớp học.");
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchAllClasses();
    }, []);

    // --- Debounce effect for search text ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(tempSearchText);
            setStudentCurrentPage(1); // Reset trang về 1 khi searchText được cập nhật
            setTeacherCurrentPage(1); // Reset trang về 1 khi searchText được cập nhật
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [tempSearchText]);

    // --- Filter and Search Logic for Students ---
    const filteredAndSearchedStudents = useMemo(() => {
        let filtered = allStudentData;

        if (classFilter !== "Tất cả") {
            filtered = filtered.filter(user => user.classIds && user.classIds.includes(parseInt(classFilter)));
        }

        if (statusFilter !== "Tất cả") {
            if (statusFilter === "active") {
                filtered = filtered.filter(user => !user.isDisabled);
            } else if (statusFilter === "disabled") {
                filtered = filtered.filter(user => user.isDisabled);
            }
        }

        if (searchText.trim()) {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchLower) ||
                    user.username.toLowerCase().includes(searchLower) ||
                    (user.email && user.email.toLowerCase().includes(searchLower)) ||
                    (user.phoneNumber && user.phoneNumber.includes(searchText.trim())) ||
                    String(user.userId).includes(searchText.trim()) ||
                    user.classIds?.some(classId => {
                        const classInfo = allClasses.find(cls => cls.classId === classId);
                        if (!classInfo) return false;
                        return (
                            classInfo.className?.toLowerCase().includes(searchLower) ||
                            classInfo.classCode?.toLowerCase().includes(searchLower)
                        );
                    })
            );
        }
        return filtered;
    }, [allStudentData, classFilter, statusFilter, searchText, allClasses]);

    // --- Filter and Search Logic for Teachers ---
    const filteredAndSearchedTeachers = useMemo(() => {
        let filtered = allTeacherData;

        if (classFilter !== "Tất cả") {
            filtered = filtered.filter(user => user.classIds && user.classIds.includes(parseInt(classFilter)));
        }

        if (statusFilter !== "Tất cả") {
            if (statusFilter === "active") {
                filtered = filtered.filter(user => !user.isDisabled);
            } else if (statusFilter === "disabled") {
                filtered = filtered.filter(user => user.isDisabled);
            }
        }

        if (searchText.trim()) {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchLower) ||
                    user.username.toLowerCase().includes(searchLower) ||
                    (user.email && user.email.toLowerCase().includes(searchLower)) ||
                    (user.phoneNumber && user.phoneNumber.includes(searchText.trim())) ||
                    String(user.userId).includes(searchText.trim()) ||
                    user.classIds?.some(classId => {
                        const classInfo = allClasses.find(cls => cls.classId === classId);
                        if (!classInfo) return false;
                        return (
                            classInfo.className?.toLowerCase().includes(searchLower) ||
                            classInfo.classCode?.toLowerCase().includes(searchLower)
                        );
                    })
            );
        }
        return filtered;
    }, [allTeacherData, classFilter, statusFilter, searchText, allClasses]);


    // Paginated data for Students
    const paginatedStudentData = useMemo(() => {
        const startIndex = (studentCurrentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredAndSearchedStudents.slice(startIndex, endIndex);
    }, [filteredAndSearchedStudents, studentCurrentPage, pageSize]);

    // Paginated data for Teachers
    const paginatedTeacherData = useMemo(() => {
        const startIndex = (teacherCurrentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredAndSearchedTeachers.slice(startIndex, endIndex);
    }, [filteredAndSearchedTeachers, teacherCurrentPage, pageSize]);

    // Reset to first page when filters change (not search input directly)
    const handleFilterChange = (filterType, value) => {
        setStudentCurrentPage(1);
        setTeacherCurrentPage(1);
        if (filterType === "class") {
            setClassFilter(value);
        } else if (filterType === "status") {
            setStatusFilter(value);
        }
    };

    const handleTempSearchChange = (e) => {
        setTempSearchText(e.target.value);
    };

    const getStatusTag = (isDisabled, role) => {
        if (isDisabled) {
            return <Tag color="error">Hoàn thành</Tag>;
        }
        if (role === 'student') {
            return <Tag color="success">Đang học</Tag>;
        }
        if (role === 'teacher') {
            return <Tag color="success">Đang dạy</Tag>;
        }
        return <Tag color="default">Không xác định</Tag>;
    };

    // --- Handle Edit/Delete/View Actions ---
    const handleViewUser = (record) => {
        setViewingUser(record);
        setIsViewModalVisible(true);
    };

    const handleEditClass = (record) => {
        setEditingUser(record);
        setSelectedClassesForEdit(record.classIds || []);
        form.setFieldsValue({ classes: record.classIds || [] });
        setIsClassEditModalVisible(true);
    };

    const handleUpdateClasses = async () => {
        try {
            const values = await form.validateFields();
            if (!editingUser) return;

            const formData = new FormData();

            formData.append("userId", editingUser.userId);
            formData.append("username", editingUser.username);
            formData.append("accountName", editingUser.accountName || "");
            formData.append("email", editingUser.email || "");
            formData.append("phoneNumber", editingUser.phoneNumber || "");
            formData.append("roleId", editingUser.roleId);
            formData.append("isDisabled", editingUser.isDisabled);
            formData.append("genderId", editingUser.genderId || 0);
            formData.append("birthday", editingUser.birthday || "");
            formData.append("address", editingUser.address || "");

            if (values.classes && values.classes.length > 0) {
                values.classes.forEach(classId => {
                    formData.append("classIds", classId);
                });
            }

            const token = localStorage.getItem("token");

            const response = await fetch(`${baseUrl}/api/User/${editingUser.userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Không thể cập nhật thông tin người dùng.");
            }

            antdMessage.success(`Cập nhật lớp học cho ${editingUser.name} thành công!`);
            setIsClassEditModalVisible(false);
            setEditingUser(null);
            setSelectedClassesForEdit([]);
            form.resetFields();
            fetchUsers(); // Fetch lại dữ liệu sau khi cập nhật
        } catch (error) {
            console.error("Error updating user:", error);
            antdMessage.error(`Cập nhật người dùng thất bại: ${error.message}`);
        }
    };

    const handleDeleteUser = (record) => {
        confirm({
            title: `Bạn có chắc muốn xóa người dùng ${record.name}?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Thao tác này không thể hoàn tác. Người dùng sẽ bị xóa khỏi hệ thống.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(`${baseUrl}/api/User/${record.userId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || "Không thể xóa người dùng.");
                    }

                    antdMessage.success(`Đã xóa người dùng ${record.name} thành công.`);
                    fetchUsers(); // Fetch lại dữ liệu sau khi xóa
                } catch (error) {
                    console.error("Error deleting user:", error);
                    antdMessage.error(`Xóa người dùng thất bại: ${error.message}`);
                }
            },
            onCancel() {
                console.log('Hủy xóa');
            },
        });
    };

    const columns = [
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
            width: 100,
            align: "center",
            render: (userId) => <span className="user-id">{userId}</span>,
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            width: 150,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 120,
        },
        {
            title: "SĐT",
            dataIndex: "phone",
            key: "phone",
            width: 120,
            render: (phone) => phone === "N/A" ? <Tag>Chưa cập nhật</Tag> : phone,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 180,
            render: (email) => email === "N/A" ? <Tag>Chưa cập nhật</Tag> : email,
        },
        {
            title: "Lớp học",
            dataIndex: "classIds",
            key: "class",
            width: 180,
            render: (classIds) => {
                if (!classIds || classIds.length === 0) {
                    return <Tag color="default">Chưa có lớp</Tag>;
                }
                return classIds.map(classId => {
                    const classInfo = allClasses.find(cls => cls.classId === classId);
                    const displayClass = classInfo ? classInfo.classCode : `ID: ${classId}`;
                    return <Tag key={classId} color="blue">{displayClass}</Tag>;
                });
            },
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            width: 100,
            render: (role) => {
                let color = '';
                let text = '';
                if (role === 'student') {
                    color = 'geekblue';
                    text = 'Học viên';
                } else if (role === 'teacher') {
                    color = 'volcano';
                    text = 'Giáo viên';
                } else {
                    color = 'default';
                    text = 'Khác';
                }
                return <Tag color={color}>{text}</Tag>;
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "isDisabled",
            key: "status",
            width: 120,
            render: (isDisabled, record) => getStatusTag(isDisabled, record.role),
        },
        {
            title: "Thao tác",
            key: "actions",
            width: 120,
            align: "center",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        className="action-btn view-btn"
                        onClick={() => handleViewUser(record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        className="action-btn edit-btn"
                        onClick={() => handleEditClass(record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteUser(record)}
                    />
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            const currentPaginatedKeys = paginatedStudentData.map((item) => item.key); // Chỉ chọn/bỏ chọn trên trang hiện tại của học viên
            if (selected) {
                setSelectedRowKeys(prev => Array.from(new Set([...prev, ...currentPaginatedKeys])));
            } else {
                setSelectedRowKeys(prev => prev.filter(key => !currentPaginatedKeys.includes(key)));
            }
        },
        onSelect: (record, selected) => {
            if (selected) {
                setSelectedRowKeys(prev => [...prev, record.key]);
            } else {
                setSelectedRowKeys(prev => prev.filter(key => key !== record.key));
            }
        }
    };

    const handleSelectAllStudents = (e) => {
        if (e.target.checked) {
            setSelectedRowKeys(prev => Array.from(new Set([...prev, ...paginatedStudentData.map((item) => item.key)])));
        } else {
            setSelectedRowKeys(prev => prev.filter(key => !paginatedStudentData.map(item => item.key).includes(key)));
        }
    };
    
    // Tao them ham nay cho giao vien neu muon co checkbox rieng cho giao vien
    const handleSelectAllTeachers = (e) => {
        if (e.target.checked) {
            setSelectedRowKeys(prev => Array.from(new Set([...prev, ...paginatedTeacherData.map((item) => item.key)])));
        } else {
            setSelectedRowKeys(prev => prev.filter(key => !paginatedTeacherData.map(item => item.key).includes(key)));
        }
    };

    const clearFilters = () => {
        setTempSearchText("");
        setSearchText("");
        setClassFilter("Tất cả");
        setStatusFilter("Tất cả");
        setStudentCurrentPage(1);
        setTeacherCurrentPage(1);
        setSelectedRowKeys([]); // Xóa chọn tất cả khi clear filters
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                <Spin size="large" tip="Đang tải dữ liệu người dùng..." />
            </div>
        );
    }

    return (
        <div className="student-info-page">
            <div className="student-info-container">
                <Title level={1} className="page-title">
                    QUẢN LÝ NGƯỜI DÙNG
                </Title>

                {/* Filters Section */}
                <div className="filters-section">
                    <div className="filters-left">
                        {/* Checkbox "Đã chọn X" sẽ là tổng số đã chọn trên cả 2 bảng */}
                        <Checkbox
                            checked={selectedRowKeys.length > 0 && selectedRowKeys.length === (paginatedStudentData.length + paginatedTeacherData.length)}
                            indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < (paginatedStudentData.length + paginatedTeacherData.length)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedRowKeys(Array.from(new Set([...paginatedStudentData.map(item => item.key), ...paginatedTeacherData.map(item => item.key)])));
                                } else {
                                    setSelectedRowKeys([]);
                                }
                            }}
                            className="select-all-checkbox"
                        >
                            Đã chọn {selectedRowKeys.length}
                        </Checkbox>
                        <Button type="link" onClick={clearFilters} className="clear-filters-btn">
                            Xóa bộ lọc
                        </Button>
                        <Input
                            placeholder="Tìm kiếm theo tên, username, SĐT, Email, User ID..."
                            prefix={<SearchOutlined />}
                            value={tempSearchText}
                            onChange={handleTempSearchChange}
                            className="search-input"
                        />
                    </div>

                    <div className="filters-right">
                        <div className="filter-group">
                            <span className="filter-label">Lớp học:</span>
                            <Select
                                value={classFilter}
                                onChange={(value) => handleFilterChange("class", value)}
                                className="filter-select"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Tất cả">Tất cả</Option>
                                {allClasses.map((cls) => (
                                    <Option key={cls.classId} value={cls.classId}>
                                        {cls.classCode}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <div className="filter-group">
                            <span className="filter-label">Trạng thái:</span>
                            <Select
                                value={statusFilter}
                                onChange={(value) => handleFilterChange("status", value)}
                                className="filter-select"
                            >
                                <Option value="Tất cả">Tất cả</Option>
                                <Option value="active">Đang hoạt động</Option>
                                <Option value="disabled">Hoàn thành</Option>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Student Table Section */}
                {filteredAndSearchedStudents.length > 0 && (
                    <div className="table-section">
                        <Title level={2} className="section-title">Học viên</Title>
                        <div className="results-info">
                            <span>
                                Hiển thị {paginatedStudentData.length} / {filteredAndSearchedStudents.length} học viên
                                {filteredAndSearchedStudents.length !== allStudentData.length && ` (lọc từ ${allStudentData.length} tổng cộng)`}
                            </span>
                        </div>
                        <div className="table-container">
                            <Table
                                columns={columns}
                                dataSource={paginatedStudentData}
                                rowSelection={rowSelection}
                                pagination={false}
                                className="student-table"
                                size="middle"
                            />
                        </div>
                        <div className="pagination-container">
                            <Pagination
                                current={studentCurrentPage}
                                total={filteredAndSearchedStudents.length}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                onChange={setStudentCurrentPage}
                                className="custom-pagination"
                                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} học viên`}
                            />
                        </div>
                    </div>
                )}

                {/* Teacher Table Section */}
                {filteredAndSearchedTeachers.length > 0 && (
                    <div className="table-section" style={{ marginTop: '40px' }}>
                        <Title level={2} className="section-title">Giáo viên</Title>
                        <div className="results-info">
                            <span>
                                Hiển thị {paginatedTeacherData.length} / {filteredAndSearchedTeachers.length} giáo viên
                                {filteredAndSearchedTeachers.length !== allTeacherData.length && ` (lọc từ ${allTeacherData.length} tổng cộng)`}
                            </span>
                        </div>
                        <div className="table-container">
                            <Table
                                columns={columns}
                                dataSource={paginatedTeacherData}
                                rowSelection={{
                                    selectedRowKeys,
                                    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
                                    onSelectAll: (selected, selectedRows, changeRows) => {
                                        const currentPaginatedKeys = paginatedTeacherData.map((item) => item.key);
                                        if (selected) {
                                            setSelectedRowKeys(prev => Array.from(new Set([...prev, ...currentPaginatedKeys])));
                                        } else {
                                            setSelectedRowKeys(prev => prev.filter(key => !currentPaginatedKeys.includes(key)));
                                        }
                                    },
                                    onSelect: (record, selected) => {
                                        if (selected) {
                                            setSelectedRowKeys(prev => [...prev, record.key]);
                                        } else {
                                            setSelectedRowKeys(prev => prev.filter(key => key !== record.key));
                                        }
                                    }
                                }}
                                pagination={false}
                                className="teacher-table"
                                size="middle"
                            />
                        </div>
                        <div className="pagination-container">
                            <Pagination
                                current={teacherCurrentPage}
                                total={filteredAndSearchedTeachers.length}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                onChange={setTeacherCurrentPage}
                                className="custom-pagination"
                                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} giáo viên`}
                            />
                        </div>
                    </div>
                )}
                
                {/* No data message */}
                {filteredAndSearchedStudents.length === 0 && filteredAndSearchedTeachers.length === 0 && (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <Typography.Text type="secondary">Không tìm thấy người dùng nào phù hợp với bộ lọc hiện tại.</Typography.Text>
                    </div>
                )}


            </div>

            {/* Class Edit Modal */}
            <Modal
                title={`Chỉnh sửa lớp học cho ${editingUser?.name}`}
                visible={isClassEditModalVisible}
                onOk={handleUpdateClasses}
                onCancel={() => {
                    setIsClassEditModalVisible(false);
                    setEditingUser(null);
                    setSelectedClassesForEdit([]);
                    form.resetFields();
                }}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="classes"
                        label="Chọn (các) lớp học"
                        rules={[{ required: false, message: 'Vui lòng chọn lớp học!' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn lớp học"
                            onChange={setSelectedClassesForEdit}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {allClasses.map(cls => (
                                <Option key={cls.classId} value={cls.classId}>
                                    {cls.classCode}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View User Info Modal */}
            <Modal
                title={`Thông tin chi tiết của ${viewingUser?.name}`}
                visible={isViewModalVisible}
                onCancel={() => {
                    setIsViewModalVisible(false);
                    setViewingUser(null);
                }}
                footer={null}
                width={600}
            >
                {viewingUser && (
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="User ID">{viewingUser.userId}</Descriptions.Item>
                        <Descriptions.Item label="Họ và tên">{viewingUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Username">{viewingUser.username}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewingUser.email}</Descriptions.Item>
                        <Descriptions.Item label="SĐT">{viewingUser.phone}</Descriptions.Item>
                        <Descriptions.Item label="Vai trò">{viewingUser.role === 'student' ? 'Học viên' : viewingUser.role === 'teacher' ? 'Giáo viên' : 'Khác'}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{getStatusTag(viewingUser.isDisabled, viewingUser.role)}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{viewingUser.genderId === 1 ? 'Nam' : viewingUser.genderId === 2 ? 'Nữ' : 'Chưa cập nhật'}</Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">{viewingUser.birthday ? new Date(viewingUser.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{viewingUser.address || 'Chưa cập nhật'}</Descriptions.Item>
                        <Descriptions.Item label="Lớp học">
                            {viewingUser.classIds && viewingUser.classIds.length > 0 ? (
                                viewingUser.classIds.map(classId => {
                                    const classInfo = allClasses.find(cls => cls.classId === classId);
                                    return (
                                        <Tag key={classId} color="blue" style={{ marginBottom: 4 }}>
                                            {classInfo ? `${classInfo.classCode}` : `ID: ${classId}`}
                                        </Tag>
                                    );
                                })
                            ) : (
                                <Tag color="default">Chưa có lớp</Tag>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default StudentInfo;