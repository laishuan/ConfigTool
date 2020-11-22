/* eslint-disable no-multi-str */
// import logo from './logo.svg';
import React, { useReducer } from 'react';
import './App.css';
import './Components/components.css';
import Template, {TemplateReducer, TemplateData} from './Components/Template.js';
import OutPut, {OutPutReducer, OutPutData} from './Components/OutPut.js';
import TabelList, {TableListReducer, TableListData} from './Components/TabelList.js';
import KeyCustomize, {KeyCustomizeReducer, KeyCustomizeData} from './Components/KeyCustomize.js';

const initialState = {
  template: TemplateData,
  outPut: OutPutData,
  tableList: TableListData,
  keyCustomize: KeyCustomizeData,
};

const reducers = {
  template: TemplateReducer,
  outPut: OutPutReducer,
  tableList: TableListReducer,
  keyCustomize: KeyCustomizeReducer,
}

function reducer(state, action) {
    const newState = {...state};
    Object.keys(reducers).forEach(key =>{
        const childState = state[key];
        newState[key] = reducers[key](childState,action);
    });
    return newState;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Template data={state.template} dispatch={dispatch}/>
      <KeyCustomize data={state.keyCustomize} dispatch={dispatch}/>
      <TabelList data={state.tableList} dispatch={dispatch}/>
      <OutPut data={state.outPut} dispatch={dispatch}/>
    </div>
  )
}
export default App;
