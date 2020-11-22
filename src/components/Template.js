/* eslint-disable no-multi-str */

function Template(props) {
    let items = props.data.items
    let curIndex = props.data.curIndex
    let message = props.data.message
    let dispatch = props.dispatch
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
            <button>插入配置</button>
            <label style={{color: "red", marginLeft: "20px"}}>{message}</label>
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
      dec: "Key：value类型配置\n\
      属性\t\t类型\t\t值\t\t描述\n\
      test\t\tnumber\t\t1\t\t这是描述\n\
      test2\t\tstring\t\t2\t\t这是描述2\n\
      ...\n\
      "
    },
    {
      name: "array",
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
  curIndex: 1,
  message: 123,
}

export {TemplateReducer, TemplateData}