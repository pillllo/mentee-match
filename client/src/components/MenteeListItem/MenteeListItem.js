function MenteeListItem({ mentee }) {
  return (
    <div>
      <h2 className="">{mentee.name}</h2>
      <p className="">{mentee.why}</p>
    </div>
  );
}

export default MenteeListItem;
