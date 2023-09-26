import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Course } from './components/pages/course';
import { Admin } from './components/pages/Admin';
import { Blog } from './components/pages/Bolg';
import { ChipInput } from './components/common/Fields/chipInput';
import Form from './components/pages/Form';
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
          <Route path='/contact-us' element={<ContactUs/>}/> */
          }
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/ChipInput' element={<ChipInput/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
