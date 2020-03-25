import React from "react";

const EsvCard = props => {
    return (
        <div className="esvCard">
            <div className="esvContent">
                <h2>
                    <span>
                        {Object.values(props.data).map(results =>
                            results.reference)}
                    </span>
                    {/* <span>
                        {props.data.map(results => 
                            results.reference)}
                    </span> */}
                </h2>
            </div>
        </div>
    )
}

export default EsvCard