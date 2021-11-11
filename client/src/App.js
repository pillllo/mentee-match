import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from './ApiService';
import Navbar from './components/Navbar/Navbar';
import MenteeList from './components/MenteeList/MenteeList';
import MenteeDetailView from './components/MenteeDetailView/MenteeDetailView';

function App() {
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setMentees(menteeList);
    });
  }, []);

  console.log('App:', mentees);

  return (
    <div className="">
      <Navbar className="" />
      <Routes>
        <Route path="/" element={<MenteeList mentees={mentees} />} />
        <Route
          path="/mentee/:id"
          element={<MenteeDetailView mentees={mentees} />}
        />
        {/* <Route
          path="/mentee"
          element={<MenteeDetailView mentees={mentees} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
