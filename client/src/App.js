import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from './ApiService';
import Navbar from './components/Navbar/Navbar';
import MenteeList from './components/MenteeList/MenteeList';
import MenteeDetailView from './components/MenteeDetailView/MenteeDetailView';

function App() {
  const [allMentees, setAllMentees] = useState([]);
  const [remainingMentees, setRemainingMentees] = useState([]);
  const [numberChosenMentees, setNumberChosenMentees] = useState(0);

  useEffect(() => {
    ApiService.getMentees().then((menteeList) => {
      setAllMentees(menteeList);
      const menteesNotChosen = menteeList.filter(
        (mentee) => mentee.chosen === false
      );
      setRemainingMentees(menteesNotChosen);
    });
  }, []);

  useEffect(() => {
    const updatedNumber = allMentees.filter(
      (mentee) => mentee.chosenByMe
    ).length;
    setNumberChosenMentees(updatedNumber);
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
    console.log('🎯 updateMentee function: click');
  }

  console.log('🎯 new number chosen mentees', numberChosenMentees);

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
              updateMentee={updateMentee}
              numberChosenMentees={numberChosenMentees}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
