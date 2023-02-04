import { useId } from 'react';

import useToggle from "../hooks/useToggleState";

export default function Choice({ text, defaultChecked = false, optionChange}) {
  const choiceKey = useId();
  const [state, toggle] = useToggle(defaultChecked);
  const handleToggleChange = () => {
    optionChange.change(optionChange.stateVal, !state);
    toggle();
  };
  return (
    <div className="form form__choice" key={choiceKey}>
      <div
        className={`form__choice--label choice-label-${state && "active"}`}
        onClick={handleToggleChange}
      />
      <h4 className="subtitle">{text}</h4>
    </div>
  );
}
