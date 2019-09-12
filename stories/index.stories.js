import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LocoNavSelect from "../src/Select";

storiesOf("Select", module)
  .add("with custom endPoint", () => (
    <LocoNavSelect
      defaultOption="Search Country"
      onSelect={value => {
        console.log(`its is ${value}`);
      }}
    />
  ))
  .add("with isSearchable", () => (
    <LocoNavSelect
      defaultOption="Search Country"
      onSelect={value => {
        console.log(`its is ${value}`);
      }}
      isSearchable
    ></LocoNavSelect>
  ))
  .add("with isDisabled", () => (
    <LocoNavSelect disabled defaultOption="Delhi" />
  ))
  .add("Dark Theme", () => (
    <LocoNavSelect
      isInverted
      defaultOption="Delhi"
      onSelect={value => {
        console.log(`its is ${value}`);
      }}
    >
      DARK SELECT
    </LocoNavSelect>
  ));
