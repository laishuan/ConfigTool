// import logo from './logo.svg';
import './App.css';
import Template from './components/Template';
import OutPut from './components/OutPut';
import TabelList from './components/TabelList';
import KeyCustomize from './components/KeyCustomize';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
function App() {
  return (
    <div>
      <Template/>
      <KeyCustomize/>
      <TabelList/>
      <OutPut/>
    </div>
  )
}
export default App;
