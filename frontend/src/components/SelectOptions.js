import React from "react";

export default function SelectOptions({ options, value, changeFunc }) {
  let key = 0;
  console.log(options, value);
  return (
    <>
      <select
        value={value}
        onChange={(e) => {
          changeFunc(e.target.value);
        }}
      >
        {options.map((el) => {
          key++;
          return <option key={key}>{el}</option>;
        })}
      </select>
    </>
  );
}
