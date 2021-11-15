import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from '../ApiService';
import MenteeList from './MenteeList';
import MenteeDetailView from './MenteeDetailView';
import Login from './Login';

function Dashboard({ setIsAuthenticated }) {
  const [allMentees, setAllMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [remainingMentees, setRemainingMentees] = useState([]);
  const [countMenteesChosenByMe, setCountMenteesChosenByMe] = useState(0);

  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setAllMentees(menteeList);
    });
  }, []);

  // Update count of mentees selected by me and list of mentees that remain for choosing
  useEffect(() => {
    // Update the count of mentees selected by me
    const updatedNumber = allMentees.filter(
      (mentee) => mentee.chosenByMe
    ).length;
    setCountMenteesChosenByMe(updatedNumber);
    // Update the list of mentees that remain for choosing
    const menteesNotChosen = allMentees.filter(
      (mentee) => mentee.chosen === false
    );
    setRemainingMentees(menteesNotChosen);
  }, [allMentees]);

  // Update boolean values in mentee object (e.g. chosen, bookmarked), add values to be changes as additional args in the function
  function updateMentee(id, mentee) {
    const keys = [...arguments].slice(2);
    keys.forEach((key) => {
      mentee[key] = !mentee[key];
    });
    // mentee.chosenByMe = !mentee.chosenByMe;
    ApiService.putMenteeChoice(id, mentee).then((updatedMentee) => {
      setAllMentees((menteeList) => {
        const menteeToUpdate = menteeList.find((mentee) => mentee._id === id);
        menteeToUpdate.chosen = updatedMentee.chosen;
        menteeToUpdate.chosenByMe = updatedMentee.chosenByMe;
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

  console.log('🎯 Updated mentees', allMentees);

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
          // TODO: change to dashboard
          path="/"
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
