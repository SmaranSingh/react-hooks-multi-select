import React, { Fragment, useEffect, useState } from "react";

import PropTypes from "prop-types";

const Autocomplete = props => {
  const [text, setText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setDataSet(props.dataSet.map(item => item.toLowerCase()));
  }, [props.dataSet]);

  const setInputText = value => {
    const { max } = props;

    setText(value);
    setFilteredOptions(
      dataSet.filter(item => item.startsWith(value.toLowerCase())).slice(0, max)
    );
  };

  const selectOption = selectedOption => {
    const { onChange } = props;

    selectedOptions.push(selectedOption);
    setText("");
    setFilteredOptions([]);
    setDataSet(dataSet.filter(item => item !== selectedOption));
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
  };

  const pop = selectedOption => {
    const { onChange } = props;

    const index = selectedOptions.indexOf(selectedOption);
    selectedOptions.splice(index, 1);
    setSelectedOptions(selectedOptions);
    setDataSet([...dataSet, selectedOption]);
    onChange(selectedOptions);
  };

  return (
    <Fragment>
      <input
        value={text}
        onChange={e => setInputText(e.target.value)}
        style={{ height: "28px", width: "200px" }}
      />
      {text !== "" &&
        (filteredOptions.length > 0 ? (
          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                value={option}
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <i>No results found</i>
          </div>
        ))}
      <h1>Selected options (component): </h1>
      <ul>
        {selectedOptions.map((option, index) => (
          <h6 key={index} onClick={() => pop(option)}>
            {option}
          </h6>
        ))}
      </ul>
    </Fragment>
  );
};

Autocomplete.propTypes = {
  dataSet: PropTypes.array.isRequired,
  max: PropTypes.number
};

Autocomplete.defaultProps = {
  max: 5
};

export default Autocomplete;
