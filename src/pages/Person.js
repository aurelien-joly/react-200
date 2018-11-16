import React, { useState, useCallback } from 'react';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';

const useEditing = () => {
  const [editing, setEditing] = useState(false);

  const beginEdit = useCallback(() => setEditing(true));
  const endEdit = useCallback(() => setEditing(false));

  return [editing, beginEdit, endEdit];
};

const Person = ({ id, personExists }) => {
  const [editing, beginEdit, endEdit] = useEditing();

  const renderCardOrForm = () => {
    if (editing) {
      return <PersonForm id={id} onDone={endEdit} />;
    } else {
      return <PersonCard id={id} onEdit={beginEdit} />;
    }
  };

  return (
    <div className="card-container">
      {personExists ? renderCardOrForm() : 'not found :('}
    </div>
  );
};

export default Person;
