function TableList() {
    return (
      <p> TableList </p>
    )
  }
export default TableList;

function TableListReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state
  }
}

let TableListData = {}

export {TableListReducer, TableListData}