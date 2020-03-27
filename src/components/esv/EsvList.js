import React, { useState, useEffect } from "react";
import EsvManager from "../../modules/ExternalApiManager";
import EsvCard from "./EsvCard";

const EsvList = props => {
  const [dataAsObject, setDataAsObject] = useState({});
  const [results, setResults] = useState([]);

  const FilterList = e => {
      debugger;
    let items = dataAsObject;
    let itemArray = items[2];
    itemArray = itemArray.filter((itemArray) => {
        return itemArray.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    });
    setResults((items));
  };

  const GetResults = () => {
    return EsvManager.getAll().then(ApiResults => {
      const results = Object.values(ApiResults)
      setDataAsObject(results);
    });
  };
  useEffect(() => {
      GetResults()
    setDataAsObject({
        content: results.reference,
        items: results.content
    })
  }, []);

  return (
    <>
      {/* <div>
        {Object.values(dataAsObject).map((data, i) => (
          <EsvCard key={i} data={data} {...props} />
        ))}
      </div> */}
      <div>
          <form>
              <input type="text" placeholder="Search" onChange={FilterList}/>
          </form>
          <div>
              {results.map(item => {
                  return <div key={item}>{item}</div>
              })}
          </div>
      </div>
    </>
  );
};
export default EsvList;

