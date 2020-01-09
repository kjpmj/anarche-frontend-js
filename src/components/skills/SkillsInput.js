import React from 'react';
import StyledInput from '../common/StyledInput';

/**
 *
 */
function SkillsInput({ value, name, placeholder, onChange }) {
  const handleChange = e => {
    let value = parseInt(e.target.value);

    if (!e.target.value) {
      onChange(e.target.name, '');
      return;
    }

    if (Number.isNaN(value)) {
      return;
    }

    if (value <= 0) {
      value = 0;
    }

    if (value > 230000) {
      value = 230000;
    }

    onChange(e.target.name, value);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      type="text"
      name={name}
      onChange={handleChange}
    />
  );
}

export default React.memo(SkillsInput);
