import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import Course from "../pages/Course/Course.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import AdminLayout from "../Layout/AdminLayout.jsx";
import AdminProfile from "../pages/Admin/AdminProfile/AdminProfile.jsx";
import Statistics from "../pages/Admin/Statistics/Statistics.jsx";
import CreateAccount from "../pages/Admin/CreateAccount/CreateAccount.jsx";
import CourseSchedule from "../pages/Admin/CourseSchedule/CourseSchedule.jsx";
import Materials from "../pages/Admin/Materials/Materials.jsx";
import Schedule from "../pages/Admin/Schedule/Schedule.jsx";
import StudentInfo from "../pages/Admin/StudentInfo/StudentInfo.jsx";
import Absence from "../pages/Admin/Absence/Absence.jsx";
import SheetMusic from "../pages/Admin/SheetMusic/SheetMusic.jsx";
import Consultation from "../pages/Admin/Consultation/Consultation.jsx";
import TeacherClass from "../pages/Teacher/TeacherClass/TeacherClass.jsx";
import TeacherLayout from "../Layout/TeacherLayout/TeacherLayout.jsx";
import TeacherClassDetail from "../pages/Teacher/TeacherClassDetail/TeacherClassDetail.jsx";
import TeacherAttendance from "../pages/Teacher/TeacherAttendance/TeacherAttendance.jsx";
import TeacherClassStudentInfo from "../pages/Teacher/TeacherClassStudentInfo/TeacherClassStudentInfo.jsx";
import StudentInfoList from "../pages/Teacher/StudentInfoList/StudentInfoList.jsx";
import Lesson from "../pages/Student/Lesson/Lesson.jsx";
import StudentLayout from "../Layout/StudentLayout/StudentLayout.jsx";
import StudentMaterials from "../pages/Student/StudentMaterial/StudentMaterial.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import CourseGuitarAdvanced from "../pages/CourseGuitarAdvanced/CourseGuitarAdvanced.jsx";
import CoursePianoAdvanced from "../pages/CoursePianoAdvanced/CoursePianoAdvanced.jsx";
import CoursePiano from "../pages/CoursePianoBasic/CoursePianoBasic.jsx";
import AdminTeacherAttendance from "../pages/Admin/TeacherAttendance/AdminTeacherAttendance.jsx";


const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ allowedRoles }) => {
  const user = getUser();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};


const AppRoutes = () => {
  return (
    <Router>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Reusing Login component for simplicity */}
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="course/piano-basic" element={<CoursePiano />} />
          <Route path="course/piano-advanced" element={<CoursePianoAdvanced />} />
          <Route path="course/guitar-basic" element={<Course />} />
          <Route path="course/guitar-advanced" element={<CourseGuitarAdvanced />} />
          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>


<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Statistics />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/create-account" element={<CreateAccount />} />
          <Route path="/admin/course-schedule" element={<CourseSchedule />} />
          <Route path="/admin/materials" element={<Materials />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          <Route path="/admin/student-info" element={<StudentInfo />} />
          <Route path="/admin/absence" element={<Absence />} />
          <Route path="/admin/sheet-music" element={<SheetMusic />} />
          <Route path="/admin/consultation" element={<Consultation />} />
          <Route path="course/guitar-basic" element={<Course />} />
          <Route path="course/guitar-advanced" element={<Course />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/admin/teacher-attendance" element={<AdminTeacherAttendance />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
</Route>


<Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherClass />} />
          <Route path="/teacher/profile" element={<AdminProfile />} />
          <Route path="/teacher/class-detail" element={<TeacherClassDetail />} />
          <Route path="/teacher/class-detail-student-info" element={<TeacherClassStudentInfo />} />
          <Route path="/teacher/class-detail-student-info/student-info-list" element={<StudentInfoList />} />
          <Route path="/teacher/class-detail/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/course-schedule" element={<CourseSchedule />} />
          <Route path="/teacher/materials" element={<Materials />} />
          <Route path="/teacher/schedule" element={<Schedule />} />
          <Route path="/teacher/student-info" element={<StudentInfo />} />
          <Route path="/teacher/absence" element={<Absence />} />
          {/* <Route path="/teacher/sheet-music" element={<SheetMusic />} /> */}
          <Route path="/teacher/consultation" element={<Consultation />} />
          <Route path="course/guitar-basic" element={<Course />} />
          <Route path="course/guitar-advanced" element={<Course />} />
          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
</Route>



<Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Lesson />} />
          <Route path="/student/profile" element={<AdminProfile />} />
          <Route path="/student/student-material" element={<StudentMaterials />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
</Route>


      </Routes>
    </Router>
  );
};

export default AppRoutes;
