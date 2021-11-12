import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from './ApiService';
import Navbar from './components/Navbar';
import MenteeList from './components/MenteeList';
import MenteeDetailView from './components/MenteeDetailView';
import DropDown from './components/Functional/DropDown';

function App() {
  const [allMentees, setAllMentees] = useState([]);
  // FIXME: fix display of chosen mentees -> update when mentee is marked as chosen
  const [countMenteesChosenByMe, setCountMenteesChosenByMe] = useState(0);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [remainingMentees, setRemainingMentees] = useState([]);

  //
  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setAllMentees(menteeList);
      // const menteesNotChosen = menteeList.filter(
      //   (mentee) => mentee.chosen === false
      // );
      // setRemainingMentees(menteesNotChosen);
    });
  }, []);

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

  function updateMentee(id, mentee) {
    mentee.chosen = !mentee.chosen;
    mentee.chosenByMe = !mentee.chosenByMe;
    ApiService.putMenteeChoice(id, mentee).then((updatedMentee) => {
      setAllMentees((menteeList) => {
        const menteeToUpdate = menteeList.find((mentee) => mentee._id === id);
        menteeToUpdate.chosen = updatedMentee.chosen;
        menteeToUpdate.chosenByMe = updatedMentee.chosenByMe;
        return [...menteeList];
      });
    });
  }

  console.log('🎯 Remaining mentees', remainingMentees);

  return (
    <div className="">
      <Navbar className="" />
      <Routes>
        <Route path="/" element={<MenteeList mentees={allMentees} />} />
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
      </Routes>
    </div>
  );
}

export default App;
