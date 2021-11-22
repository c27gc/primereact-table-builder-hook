import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const CellEditor = (options) => {
  console.log("options", options);

  const [value, setValue] = useState(options.selection[options.field]);

  return (
    <InputText
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        //options.editor(e.target.value)
      }}
    />
  );
};

export default CellEditor;
