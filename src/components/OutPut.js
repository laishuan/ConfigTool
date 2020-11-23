import React, { useState } from "react";
function OutPut() {
    let [json, setJson] = useState("空")
    let [xml, setXml] = useState("空")
    return (
      <div className="Part OutPut" id = "OutPut">
        <h2>输出</h2>
        <div className="OutPutContainer">
          <div>
            <div>
              <label><b>json</b></label>
              <a href="#end">复制</a>
            </div>
            <textarea readOnly={true} value={json}></textarea>
          </div>
          <div>
            <div>
              <label><b>xml</b></label>
              <a href="#end">复制</a>
            </div>
            <textarea readOnly={true} value={json}></textarea>
          </div>
          <button>生成</button>
        </div>
      </div>
    )
  }
export default OutPut;

function OutPutReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state
  }
}

let OutPutData = {}

export {OutPutReducer, OutPutData}