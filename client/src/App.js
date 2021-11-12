import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiService from './ApiService';
import Navbar from './components/Navbar';
import MenteeList from './components/MenteeList';
import MenteeDetailView from './components/MenteeDetailView';

function App() {
  const [allMentees, setAllMentees] = useState([]);
  // FIXME: fix display of chosen mentees -> update when mentee is marked as chosen
  const [remainingMentees, setRemainingMentees] = useState([]);
  const [amountMenteesChosen, setNumberChosenMentees] = useState(0);

  //
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
  }

  // console.log('🎯 Mentees', allMentees[0].chosen);
  // console.log('🎯 Mentees', allMentees[6].chosen);
  console.log('🎯 new number chosen mentees', amountMenteesChosen);

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
              amountMenteesChosen={amountMenteesChosen}
              updateMentee={updateMentee}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
