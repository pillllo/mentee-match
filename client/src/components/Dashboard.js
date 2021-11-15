import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from '../ApiService';
import MenteeList from './MenteeList';
import MenteeDetailView from './MenteeDetailView';
import Login from './Login';

function Dashboard({ setIsAuthenticated }) {
  const [allMentees, setAllMentees] = useState([]);
  const [remainingMentees, setRemainingMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [countMenteesChosenByMe, setCountMenteesChosenByMe] = useState(0);

  const myId = '10';

  // Import all available mentees on page load
  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setAllMentees(menteeList);
    });
  }, []);

  // Update count of mentees selected by "me"
  // Update list of mentees that remain for choosing
  useEffect(() => {
    // Update the count of mentees selected by "me"
    const updatedNumber = allMentees.filter(
      (mentee) => mentee.MentorId === myId
    ).length;
    setCountMenteesChosenByMe(updatedNumber);
    // Update the list of mentees that remain for choosing
    const menteesNotChosen = allMentees.filter((mentee) => !mentee.MentorId);
    setRemainingMentees(menteesNotChosen);
  }, [allMentees]);

  // Update boolean values in mentee object (e.g. chosen, bookmarked), add values to be changes as additional args in the function
  function updateMentee(menteeId, mentorId) {
    ApiService.putMenteeChoice(menteeId, mentorId).then((updatedMentee) => {
      setAllMentees((menteeList) => {
        const menteeToUpdate = menteeList.find(
          (mentee) => mentee.id === menteeId
        );
        menteeToUpdate.MentorId = updatedMentee.MentorId;
        return [...menteeList];
      });
    });
  }

  function filterMentees(criteria, value) {
    const filteredMenteeList = allMentees.filter((mentee) => {
      return mentee[criteria] === value;
    });
    setFilteredMentees(filteredMenteeList);
  }

  console.log('🎯 Count mentees', countMenteesChosenByMe);
  console.log('🎯 All mentees', allMentees.length);
  console.log('🎯 Remaining mentees', remainingMentees.length);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          // render={(props) => (
          //   <Login {...props} setIsAuthenticated={setIsAuthenticated} />
          // )}
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            <MenteeList
              mentees={allMentees}
              filteredMentees={filteredMentees}
              filterMentees={filterMentees}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/mentee/:id"
          element={
            <MenteeDetailView
              mentees={allMentees}
              myId={myId}
              countMenteesChosenByMe={countMenteesChosenByMe}
              updateMentee={updateMentee}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Dashboard;

// OLD VERSION update mentee with mock data
// function updateMentee(id, mentee) {
//   const keys = [...arguments].slice(2);
//   keys.forEach((key) => {
//     mentee[key] = !mentee[key];
//   });
//   // mentee.chosenByMe = !mentee.chosenByMe;
//   ApiService.putMenteeChoice(id, mentee).then((updatedMentee) => {
//     setAllMentees((menteeList) => {
//       const menteeToUpdate = menteeList.find((mentee) => mentee._id === id);
//       menteeToUpdate.chosen = updatedMentee.chosen;
//       menteeToUpdate.chosenByMe = updatedMentee.chosenByMe;
//       return [...menteeList];
//     });
//   });
// }
