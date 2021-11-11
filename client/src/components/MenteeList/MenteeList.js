import MenteeListItem from '../MenteeListItem/MenteeListItem';

function MenteeList({ mentees }) {
  return (
    <div>
      {mentees.map((mentee) => (
        <MenteeListItem key={mentee._id} mentee={mentee} />
      ))}
    </div>
  );
}

export default MenteeList;
