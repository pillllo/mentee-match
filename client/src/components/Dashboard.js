import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from '../ApiService';
import MenteeList from './MenteeList';
import MenteeDetailView from './MenteeDetailView';
import Profile from './Profile';

function Dashboard({ isAuthenticated, setIsAuthenticated }) {
  const [allMentees, setAllMentees] = useState([]);
  //Currently displaying all mentees, even if they are not available anymore
  const [remainingMentees, setRemainingMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [countMenteesChosenByMe, setCountMenteesChosenByMe] = useState(0);

  //Mentor profile currently not dependent on logged in mentor
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
    // Update the list of filtered mentees
  }, [allMentees]);

  // Update boolean values in mentee object (e.g. chosen, bookmarked), add values to be changes as additional args in the function
  function updateMentee(menteeId, mentorId) {
    ApiService.putMenteeChoice(menteeId, mentorId).then((updatedMentee) => {
      setAllMentees((menteeList) => {
        const menteeToUpdate = menteeList.find(
          (mentee) => mentee.id === menteeId
        );
        menteeToUpdate.MentorId = '' + updatedMentee.MentorId;
        return [...menteeList];
      });
    });
  }

  function filterMentees(criteria, value) {
    console.log('All mentees from filterMentees', allMentees);
    const filteredMenteeList = allMentees.filter((mentee) => {
      return mentee[criteria] === value;
    });
    setFilteredMentees(filteredMenteeList);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MenteeList
              mentees={allMentees}
              myId={myId}
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
