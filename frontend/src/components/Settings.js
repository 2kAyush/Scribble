import React, { useState } from "react";
import SelectOptions from "./SelectOptions";

export default function Settings() {
  const rounds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const times = ["30", "45", "60", "75", "90", "105", "120", "135", "150"];
  const languages = ["English"];
  const [totalRounds, setTotalRounds] = useState("1");
  const [roundTime, setRoundTime] = useState("60");
  const [language, setLanguage] = useState("English");
  // send to the backend in the form of [times, rounds] format
  return (
    <>
      <div className="settings-container">
        <h1 className="set__header"> Settings</h1>
        <div className="set__rounds setters">
          <div> Rounds</div>
          <SelectOptions
            options={rounds}
            value={totalRounds}
            changeFunc={setTotalRounds}
          />
        </div>
        <div className="set__time setters">
          <div> Draw time in seconds</div>
          <SelectOptions
            options={times}
            value={roundTime}
            changeFunc={setRoundTime}
          />
        </div>
        <div className="set__lang setters">
          <div> Languages</div>
          <SelectOptions
            options={languages}
            value={language}
            changeFunc={setLanguage}
          />
        </div>
        <div className="set__words setters">
          <div> Word Pool(optional)</div>
          <textarea> Enter space seperated custom words</textarea>
        </div>
        <button className="start-button"> Start Game</button>
      </div>
    </>
  );
}

/* <select
  className="start-inputs__select"
  value={chosen}
  onChange={(e) => {
    setChosen(e.target.value);
  }}
>
  {categories.map((el) => {
    return (
      <option key={`${el.id}`} className="start-inputs__select-option">
        {el.category}
      </option>
    );
  })}
</select> */
