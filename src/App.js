import "./App.css";

import React, { useState } from "react";

import Autocomplete from "./components/Autocomplete";

const dataSet = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Geordie",
  "George",
  "Georgia",
  "Georgy",
  "Gerard",
  "Ghyll",
  "Paul",
  "Pavit",
  "Pawel",
  "Pawlo",
  "Pearce",
  "Pearse"
];

const App = props => {
  const [selected, setSelected] = useState([]);

  const onChange = selectedOptions => {
    setSelected([...selectedOptions]);
  };

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <Autocomplete dataSet={dataSet} onChange={onChange} />
      <br />
      {selected.length > 0 && (
        <button type="button" onClick={() => alert(selected)}>
          Show selected
        </button>
      )}
      <br />
      <br />
      <br />
      <h1>Selected options: </h1>
      <ul>
        {selected.map((option, index) => (
          <h6 key={index}>{option}</h6>
        ))}
      </ul>
    </div>
  );
};

export default App;
