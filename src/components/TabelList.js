import React, { useState } from "react";
function TableList(props) {
    const [curSelect, setCurSelect] = useState(0)
    return (
      <div className="Part TableList">
        <h2>当前表格</h2>
        <div className="TableListContainer">
          {props.data.map((v,i)=>{
            return <div key={i}  onClick={()=>{
              setCurSelect(i)
            }} style={{color: v.message ? "red" : "black", backgroundColor: (i===curSelect ? " rgb(113, 143, 243)" : "white")}} className="TableListItem">{v.name + ": " + v.dec + v.message}</div>
          })}
        </div>
      </div>
    )
  }
export default TableList;

function TableListReducer(state, action) {
  switch (action.type) {
    case 'TableList-Add':
      state.push({
        name: action.name,
        value: action.value,
        dec: `这是${action.name}的描述`,
        message: ""
      })
      return state;
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state
  }
}

let TableListData = [
  {
    name: "table1",
    dec: "这里是描述",
    values: [
    ],
    message: "",

  },
  {
    name: "table2",
    dec: "这里是描述",
    values: [
    ],
    message: "111",

  },
]

export {TableListReducer, TableListData}