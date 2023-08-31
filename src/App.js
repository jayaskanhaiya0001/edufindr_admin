import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Course } from './components/pages/course';
import { Admin } from './components/pages/Admin';
import './App.css';
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Admin />} />
          {/* <Route path='/course' element={<CoursePage />} />
          <Route path='/teachers/:id' element={<TeacherDetail />} />
          <Route path='/course/course-detail/:id' element={<CourseDetail />} />
          <Route path='/testseries' element={<TestSeriesPage />} />
          <Route path='/freebeis' element={<Freebeis />} />
          <Route path='/freebeis/blog' element={<Freebeis />} />
          <Route path='/contact-us' element={<ContactUs/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
