import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import auth from './utils/auth';
// import ApiService from './ApiService';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
// import MenteeList from './components/MenteeList';
// import MenteeDetailView from './components/MenteeDetailView';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  // const [allMentees, setAllMentees] = useState([]);
  // const [filteredMentees, setFilteredMentees] = useState([]);
  // const [remainingMentees, setRemainingMentees] = useState([]);
  // const [countMenteesChosenByMe, setCountMenteesChosenByMe] = useState(0);

  // //
  // useEffect(() => {
  //   ApiService.getMentees().then((menteeList) => {
  //     setAllMentees(menteeList);
  //   });
  // }, []);

  // // Update count of mentees selected by me and list of mentees that remain for choosing
  // useEffect(() => {
  //   // Update the count of mentees selected by me
  //   const updatedNumber = allMentees.filter(
  //     (mentee) => mentee.chosenByMe
  //   ).length;
  //   setCountMenteesChosenByMe(updatedNumber);
  //   // Update the list of mentees that remain for choosing
  //   const menteesNotChosen = allMentees.filter(
  //     (mentee) => mentee.chosen === false
  //   );
  //   setRemainingMentees(menteesNotChosen);
  // }, [allMentees]);

  // // Update boolean values in mentee object (e.g. chosen, bookmarked), add values to be changes as additional args in the function
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

  // function filterMentees(criteria, value) {
  //   const filteredMenteeList = allMentees.filter((mentee) => {
  //     return mentee[criteria] === value;
  //   });
  //   setFilteredMentees(filteredMenteeList);
  // }

  // console.log('🎯 Updated mentees', allMentees);

  return (
    <div className="">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      </Router>
      {/* <Routes>
        <Route
          path="/"
          element={
            <MenteeList
              mentees={remainingMentees}
              filteredMentees={filteredMentees}
              filterMentees={filterMentees}
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
            />
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;
