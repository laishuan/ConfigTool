import './components.css';
function Template() {
    return (
      <div class='Template'>
          <label for="templateType">模板类型：</label>
          <select>
              {[1,2,3,4].map(function(v){
              return (<option>{v}</option>)
              })}
          </select>
          <button>添加</button>
      </div>
    )
  }
export default Template;