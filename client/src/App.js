import './App.css';
import { useState, useEffect } from 'react';
import ApiService from './ApiService';
import Navbar from './components/Navbar/Navbar';
import MenteeList from './components/MenteeList/MenteeList';

function App() {
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setMentees(menteeList);
    });
  }, []);

  return (
    <div className="">
      <Navbar className="" />
      <MenteeList mentees={mentees} />
    </div>
  );
}

export default App;
