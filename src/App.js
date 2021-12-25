import React, { useState } from "react";
import SpacexInformation from "./components/SpacexInformation";
import FilterInformation from "./components/FilterInformation";
import spacex from "./assets/images/spacex.jpg";

export default function App() {
  const [filterValue, setFilterValue] = useState("allLaunches");
  const handleFilterValue = (e) => {
    setFilterValue(e.target.value);
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={spacex} alt="spacex" style={{ width: 220 }} />
      </div>
      <FilterInformation
        filterValue={filterValue}
        handleFilterValue={handleFilterValue}
      />
      <SpacexInformation filterValue={filterValue} />
    </div>
  );
}
