import React, { useState, useEffect } from "react";
import EsvManager from "../../modules/ExternalApiManager";
import EsvCard from "./EsvCard";

const EsvList = props => {
  const [dataAsObject, setDataAsObject] = useState({});
  //   const [results, setResults] = useState([]);

  const GetResults = () => {
    return EsvManager.getAll().then(ApiResults => {
      const results = Object.values(ApiResults)
      setDataAsObject(results);
    });
  };
  useEffect(() => {
    GetResults();
  }, []);

  return (
    <>
      <div>
        {Object.values(dataAsObject).map(data => (
          <EsvCard key={Math.random()} data={data} {...props} />
        ))}
      </div>
    </>
  );
};
export default EsvList;
