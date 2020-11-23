/* eslint-disable no-multi-str */
import React, { useState } from "react";

function Template(props) {
    let items = props.data.items
    let curIndex = props.data.curIndex
    let dispatch = props.dispatch
    let [count, setCount] = useState(props.tableList.length) 

    return (
      <div className='Template Part'>
          <h2>模板</h2>
          <div>
            <label>模板类型：</label>
            <select value={curIndex} onChange={(event)=>{
              // console.log(value, value2)
              dispatch({type:'templagte_select_chages', curIndex: event.target.value})
            }}>
                {items.map(function(v, i){
                  return (<option value={i} key={i}>{v.name}</option>)
                })}
            </select>
            <button onClick={()=>{
              dispatch({
                type: "TableList-Add",
                name: "table" + count,
                value: items[curIndex].value
              })
              setCount(count+1)
            }}>插入模板</button>
          </div>

          <div>
            <textarea readOnly={true} value={items[curIndex].dec}></textarea>
          </div>
      </div>
    )
  }
export default Template;

function TemplateReducer(state, action) {
  switch (action.type) {
    case 'templagte_select_chages':
      return {...state, curIndex: parseInt(action.curIndex)};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state
  }
}

let TemplateData = {
  items: [
    {
      name: "key-value",
      value: 1,
      dec: "Key：value类型配置\n\
      属性\t\t类型\t\t值\t\t描述\n\
      test\t\tnumber\t\t1\t\t这是描述\n\
      test2\t\tstring\t\t2\t\t这是描述2\n\
      ...\n\
      "
    },
    {
      name: "array",
      value: 2,
      dec: "数组类型配置\n\
      顺序\t\t数值1\t\t数值1\t\t数值3\n\
      index\t\tvalue1\t\tvalue2\t\tvalue3\n\
      number\t\tnumber\t\tstring\t\tstring\n\
      1    \t\t2    \t\taaa  \t\tbbb\n\
      2    \t\t3    \t\taaa  \t\tbbb\n\
      ...\n\
      "
    }
  ],
  curIndex: 1
}

export {TemplateReducer, TemplateData}