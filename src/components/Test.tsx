import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";

const Test: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
      <h1>{value}</h1>
    </div>
  );
};

export default Test;
