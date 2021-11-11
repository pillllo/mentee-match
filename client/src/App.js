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

  // function updateMentee(id, mentee) {
  //   ApiService.putMenteeChoice(id, mentee).then((menteeList) => {
  //     const index = menteeList.indexOf(mentee);
  //     setMentees(
  //       mentees
  //         .slice(0, index)
  //         .concat(mentee)
  //         .concat(mentees.slice(index + 1))
  //     );
  //   });
  // }

  function updateMentee(id, mentee) {
    ApiService.putMenteeChoice(id, mentee).then((updatedMentee) => {
      setMentees((menteeList) => {
        const menteeToUpdate = menteeList.find((mentee) => mentee._id === id);
        menteeToUpdate.chosen = updatedMentee.chosen;
        menteeToUpdate.chosenByMe = updatedMentee.chosenByMe;
        return [...menteeList];
      });
    });
  }

  return (
    <div className="">
      <Navbar className="" />
      <Routes>
        <Route path="/" element={<MenteeList mentees={mentees} />} />
        <Route
          path="/mentee/:id"
          element={
            <MenteeDetailView mentees={mentees} updateMentee={updateMentee} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
