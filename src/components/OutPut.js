function OutPut() {
    return (
      <p> OutPut </p>
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