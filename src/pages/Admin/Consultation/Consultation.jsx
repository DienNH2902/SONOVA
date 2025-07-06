// "use client"

// import { Typography, Table, Checkbox } from "antd"
// import { useState, useEffect } from "react"
// import "./Consultation.css"

// const { Title } = Typography

// const Consultation = () => {
//   const [contactedRequests, setContactedRequests] = useState({})
//   const [currentAdmin, setCurrentAdmin] = useState("")

//   // Get admin username from localStorage on component mount
//   // useEffect(() => {
//   //   const adminName = localStorage.getItem("username") || "Admin"
//   //   setCurrentAdmin(adminName)
//   // }, [])
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       const user = JSON.parse(storedUser)
//       setCurrentAdmin(user.username)
//     }
//     setCurrentAdmin
//   }, [])

//   // Sample consultation requests data
//   const consultationData = [
//     {
//       key: 1,
//       stt: 1,
//       name: "David",
//       phone: "0793826634",
//       email: "david@gmail.com",
//       consultationNeed: "Guitar nâng cao",
//       notes: "",
//     },
//     {
//       key: 2,
//       stt: 2,
//       name: "Scott",
//       phone: "0793822354",
//       email: "scott123@gmail.com",
//       consultationNeed: "Guitar cơ bản",
//       notes: "",
//     },
//     {
//       key: 3,
//       stt: 3,
//       name: "Xelina",
//       phone: "0793826634",
//       email: "xelina@gmail.com",
//       consultationNeed: "Guitar cơ bản",
//       notes: "",
//     },
//     {
//       key: 4,
//       stt: 4,
//       name: "Chuatin",
//       phone: "0793822354",
//       email: "scott123@gmail.com",
//       consultationNeed: "Guitar nâng cao",
//       notes: "",
//     },
//     {
//       key: 5,
//       stt: 5,
//       name: "Noobita",
//       phone: "0793822354",
//       email: "xelina@gmail.com",
//       consultationNeed: "Piano cơ bản",
//       notes: "",
//     },
//     {
//       key: 6,
//       stt: 6,
//       name: "Leona",
//       phone: "0793826634",
//       email: "xelina@gmail.com",
//       consultationNeed: "Guitar cơ bản",
//       notes: "",
//     },
//     {
//       key: 7,
//       stt: 7,
//       name: "Emma",
//       phone: "0793822354",
//       email: "scott123@gmail.com",
//       consultationNeed: "Piano cơ bản",
//       notes: "",
//     },
//     {
//       key: 8,
//       stt: 8,
//       name: "Ladmira",
//       phone: "0793822354",
//       email: "xelina@gmail.com",
//       consultationNeed: "Guitar nâng cao",
//       notes: "",
//     },
//     {
//       key: 9,
//       stt: 9,
//       name: "Puma",
//       phone: "0793826634",
//       email: "xelina@gmail.com",
//       consultationNeed: "Piano cơ bản",
//       notes: "",
//     },
//     {
//       key: 10,
//       stt: 10,
//       name: "Heri",
//       phone: "0793822354",
//       email: "scott123@gmail.com",
//       consultationNeed: "Piano nâng cao",
//       notes: "",
//     },
//     {
//       key: 11,
//       stt: 11,
//       name: "Donan",
//       phone: "0793826634",
//       email: "xelina@gmail.com",
//       consultationNeed: "Piano nâng cao",
//       notes: "",
//     },
//     {
//       key: 12,
//       stt: 12,
//       name: "Kristina",
//       phone: "0793822354",
//       email: "scott123@gmail.com",
//       consultationNeed: "Guitar cơ bản",
//       notes: "",
//     },
//   ]

//   const handleContactedChange = (requestKey, checked) => {
//     if (checked) {
//       // Store both the contacted status and the admin who confirmed
//       setContactedRequests({
//         ...contactedRequests,
//         [requestKey]: {
//           contacted: true,
//           confirmedBy: currentAdmin,
//           confirmedAt: new Date().toLocaleString("vi-VN"),
//         },
//       })
//     } else {
//       // Remove the request from contacted list
//       const updatedRequests = { ...contactedRequests }
//       delete updatedRequests[requestKey]
//       setContactedRequests(updatedRequests)
//     }
//   }

//   const getConsultationTag = (need) => {
//     const needConfig = {
//       "Guitar nâng cao": "guitar-advanced",
//       "Guitar cơ bản": "guitar-basic",
//       "Piano nâng cao": "piano-advanced",
//       "Piano cơ bản": "piano-basic",
//     }

//     const className = needConfig[need] || "default"
//     return <span className={`consultation-tag ${className}`}>{need}</span>
//   }

//   const columns = [
//     {
//       title: "STT",
//       dataIndex: "stt",
//       key: "stt",
//       width: 80,
//       align: "center",
//     },
//     {
//       title: "Họ và tên",
//       dataIndex: "name",
//       key: "name",
//       width: 150,
//     },
//     {
//       title: "SĐT",
//       dataIndex: "phone",
//       key: "phone",
//       width: 140,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       width: 200,
//     },
//     {
//       title: "Nhu cầu tư vấn",
//       dataIndex: "consultationNeed",
//       key: "consultationNeed",
//       width: 180,
//       render: (need) => getConsultationTag(need),
//     },
//     {
//       title: "Ghi chú",
//       dataIndex: "notes",
//       key: "notes",
//       width: 120,
//       render: (notes) => notes || "-",
//     },
//     {
//       title: "Xác nhận đã liên lạc",
//       key: "contacted",
//       width: 180,
//       align: "center",
//       render: (_, record) => (
//         <Checkbox
//           checked={contactedRequests[record.key]?.contacted || false}
//           onChange={(e) => handleContactedChange(record.key, e.target.checked)}
//           className="contact-checkbox"
//         />
//       ),
//     },
//     {
//       title: "Người xác nhận",
//       key: "confirmedBy",
//       width: 160,
//       align: "center",
//       render: (_, record) => {
//         const contactInfo = contactedRequests[record.key]
//         if (contactInfo?.contacted) {
//           return (
//             <div className="confirmed-info">
//               <div className="confirmed-by">{contactInfo.confirmedBy}</div>
//               <div className="confirmed-time">{contactInfo.confirmedAt}</div>
//             </div>
//           )
//         }
//         return <span className="not-confirmed">-</span>
//       },
//     },
//   ]

//   return (
//     <div className="consultation-page">
//       <div className="consultation-container">
//         <Title level={1} className="page-title">
//           Liên hệ tư vấn
//         </Title>

//         {/* Current Admin Info */}
//         <div className="admin-info">
//           <span className="admin-label">Đang đăng nhập:</span>
//           <span className="admin-name">{currentAdmin}</span>
//         </div>

//         {/* Table Section */}
//         <div className="table-container">
//           <Table
//             columns={columns}
//             dataSource={consultationData}
//             pagination={false}
//             className="consultation-table"
//             size="middle"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Consultation




"use client";

import { Typography, Table, Checkbox, Spin } from "antd"; // Import Spin and message
import { useState, useEffect, useRef } from "react"; // Import useRef
import "./Consultation.css";
import { App } from 'antd'; // Import App for message context

const { Title } = Typography;

const Consultation = () => {
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [consultationTopicsMap, setConsultationTopicsMap] = useState({}); // To store topic ID to Name mapping

  // Use App.useApp() for message context
  const { message: antdMessage } = App.useApp();

  // Ref to prevent multiple fetches on initial render (if not already handled by "use client")
  const hasFetchedRequests = useRef(false);
  const hasFetchedTopics = useRef(false);

  // Get admin username from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentAdmin(user.username);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        setCurrentAdmin("Admin"); // Fallback
      }
    } else {
      setCurrentAdmin("Admin"); // Fallback
    }
  }, []);

  // Fetch Consultation Topics
  useEffect(() => {
    if (hasFetchedTopics.current) return;
    hasFetchedTopics.current = true;

    const fetchTopics = async () => {
      try {
        const response = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationTopic"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const topicMap = {};
        if (data.$values) {
          data.$values.forEach((topic) => {
            topicMap[topic.consultationTopicId] = topic.consultationTopicName;
          });
        }
        setConsultationTopicsMap(topicMap);
      } catch (error) {
        console.error("Error fetching consultation topics:", error);
        antdMessage.error("Không thể tải danh mục tư vấn.");
      }
    };

    fetchTopics();
  }, [antdMessage]); // Depend on antdMessage

  // Fetch Consultation Requests
  const fetchConsultationRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationRequest"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.$values) {
        // Initialize `hasContact` state from fetched data
        const initialContactedState = {};
        data.$values.forEach(request => {
          if (request.hasContact) {
            initialContactedState[request.consultationRequestId] = {
              contacted: true,
              // Note: Backend doesn't provide who confirmed or when.
              // We'll set a placeholder or fetch this info if API supports.
              // For now, it will be blank if not explicitly set by client.
              confirmedBy: "Admin", // Default placeholder
              confirmedAt: "Unknown Date", // Default placeholder
            };
          }
        });
        // You had `contactedRequests` state earlier, but it wasn't connected to initial API data.
        // If you need to persist "confirmedBy" and "confirmedAt" across sessions,
        // they must be stored in the backend. For now, they'll be client-side only unless updated via API.
        // setContactedRequests(initialContactedState); // If you want to use a separate state for contacted status

        setConsultationRequests(data.$values);
      } else {
        setConsultationRequests([]);
      }
    } catch (error) {
      console.error("Error fetching consultation requests:", error);
      antdMessage.error("Không thể tải dữ liệu yêu cầu tư vấn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRequests.current) return;
    hasFetchedRequests.current = true;
    fetchConsultationRequests();
  }, [antdMessage]); // Depend on antdMessage

  // Function to update hasContact status on backend
  const updateHasContactStatus = async (request) => {
    const payload = {
      ...request, // Send entire object as PUT is often full replacement
      hasContact: !request.hasContact, // Toggle the status
    };

    // If your backend only accepts certain fields for PUT,
    // or if it's a PATCH endpoint, adjust this payload and method accordingly.
    // Assuming the endpoint is: https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationRequest/{consultationRequestId}
    // and it's a PUT method expecting full object.

    try {
      const response = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ConsultationRequest/${request.consultationRequestId}`,
        {
          method: "PUT", // Or 'PATCH' if backend supports partial update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        antdMessage.success(`Cập nhật trạng thái liên hệ thành công cho ${request.fullname}!`);
        // Re-fetch data to reflect the change from the server
        fetchConsultationRequests();
      } else {
        const errorData = await response.json();
        console.error("Error updating hasContact status:", errorData);
        antdMessage.error(`Cập nhật trạng thái liên hệ thất bại: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Network error updating hasContact status:", error);
      antdMessage.error("Có lỗi xảy ra khi cập nhật trạng thái liên hệ.");
    }
  };

  const getConsultationTag = (consultationTopicId) => {
    const topicName = consultationTopicsMap[consultationTopicId] || "Không xác định";
    let className = "default"; // Default class for styling

    // Map topic names to specific classes for styling (adjust as per your CSS)
    if (topicName.includes("Piano")) {
      className = topicName.includes("Basic") ? "piano-basic" : "piano-advanced";
    } else if (topicName.includes("Guitar")) {
      className = topicName.includes("Basic") ? "guitar-basic" : "guitar-advanced";
    }
    // Add more conditions if you have other topics
    // For example: if (topicName === "Nguyet") className = "nguyet-topic";

    return <span className={`consultation-tag ${className}`}>{topicName}</span>;
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      render: (text, record, index) => index + 1, // Render STT dynamically
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      width: 150,
    },
    {
      title: "SĐT",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Nhu cầu tư vấn",
      dataIndex: "consultationTopicId", // Use consultationTopicId from API
      key: "consultationNeed",
      width: 180,
      render: (consultationTopicId) => getConsultationTag(consultationTopicId),
    },
    {
      title: "Ghi chú",
      dataIndex: "note", // Use 'note' from API
      key: "notes",
      width: 120,
      render: (note) => note || "-",
    },
    {
      title: "Xác nhận đã liên lạc",
      dataIndex: "hasContact", // Use 'hasContact' from API
      key: "contacted",
      width: 180,
      align: "center",
      render: (hasContact, record) => (
        <Checkbox
          checked={hasContact} // Bind to hasContact directly from record
          onChange={() => updateHasContactStatus(record)} // Pass the whole record
          className="contact-checkbox"
        />
      ),
    },
    {
      title: "Người xác nhận",
      key: "confirmedBy",
      width: 160,
      align: "center",
      // Note: 'confirmedBy' and 'confirmedAt' are not in the current API response for ConsultationRequest.
      // If you need to store who confirmed and when, your backend API needs to return these fields.
      // For now, this column will not show dynamic data unless the API is updated or you track it purely client-side
      // (which would not persist across sessions/reloads).
      render: (_, record) => {
        // If hasContact is true, display currentAdmin and current time for demo/placeholder
        // For production, this data should ideally come from the backend.
        if (record.hasContact) {
          return (
            <div className="confirmed-info">
              <div className="confirmed-by">{currentAdmin}</div>
              <div className="confirmed-time">
                {/* This time will be when the page loads or when it was last fetched. */}
                {/* For real-time, consider storing this on backend. */}
                Đã liên hệ
              </div>
            </div>
          );
        }
        return <span className="not-confirmed">-</span>;
      },
    },
  ];

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
        <Spin size="large" tip="Đang tải dữ liệu tư vấn..." />
      </div>
    );
  }

  return (
    <div className="consultation-page">
      <div className="consultation-container">
        <Title level={1} className="page-title">
          Liên hệ tư vấn
        </Title>

        {/* Current Admin Info */}
        <div className="admin-info">
          <span className="admin-label">Đang đăng nhập:</span>
          <span className="admin-name">{currentAdmin}</span>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={consultationRequests.map((req, index) => ({
              ...req,
              key: req.consultationRequestId, // Ant Design table needs a unique key
              stt: index + 1, // Add STT for display
            }))}
            pagination={false}
            className="consultation-table"
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};

export default Consultation;