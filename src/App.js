/* eslint-disable no-multi-str */
// import logo from './logo.svg';
import React, { useReducer } from 'react';
import './App.css';
import './components/components.css';
import Template, {TemplateReducer, TemplateData} from './components/Template.js';
import OutPut, {OutPutReducer, OutPutData} from './components/OutPut.js';
import TabelList, {TableListReducer, TableListData} from './components/TabelList.js';
import KeyCustomize, {KeyCustomizeReducer, KeyCustomizeData} from './components/KeyCustomize.js';

let initialState = {
  template: TemplateData,
  outPut: OutPutData,
  tableList: TableListData,
  keyCustomize: KeyCustomizeData,
  history: [],
  historyIndex:0,
  maxHistoryRecord: 20
};

initialState.history.push(JSON.stringify({...initialState, history: undefined}))

const reducers = {
  template: TemplateReducer,
  outPut: OutPutReducer,
  tableList: TableListReducer,
  keyCustomize: KeyCustomizeReducer,
}

function reducer(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    Object.keys(reducers).forEach(key =>{
        const childState = newState[key];
        newState[key] = reducers[key](childState,action);
    });

    const hisLen = newState.history.length

    switch (action.type) {
      case "History-step":
        let nextIndex = newState.historyIndex + action.step

        let lastData = newState.history[nextIndex]
        if (lastData) {
          lastData = JSON.parse(lastData)
          lastData.history = newState.history
          lastData.historyIndex = nextIndex
          newState = lastData
        }
        break;
      default:
        let historyState = JSON.stringify({...newState, history: undefined})
        if (newState.historyIndex < newState.history.length - 1) 
        {
          newState.history = newState.history.slice(0, newState.historyIndex+1)
        }
        newState.history.push(historyState)
        if (hisLen + 1 > newState.maxHistoryRecord) {
          newState.history.shift()
        }
        newState.historyIndex = newState.history.length - 1
    }


    return newState;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button disabled={state.historyIndex <= 0} onClick = {()=>{
        dispatch({
          type: "History-step",
          step: -1
        })
      }}>back</button>
      <button disabled={state.history.length-1 <= state.historyIndex} onClick = {()=>{
        dispatch({
          type: "History-step",
          step: 1
        })
      }}>forward</button>
      <Template data={state.template} dispatch={dispatch} tableList={state.tableList}/>
      <KeyCustomize data={state.keyCustomize} dispatch={dispatch}/>
      <TabelList data={state.tableList} dispatch={dispatch}/>
      <OutPut data={state.outPut} dispatch={dispatch}/>
    </div>
  )
}
export default App;
