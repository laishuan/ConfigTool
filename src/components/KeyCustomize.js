import React, { useState } from "react";

function KeyCustomizeItem(props) {
  let [count, setCount] = useState(props.data.items.length);
  let baseType = props.baseType;
  let dispatch = props.dispatch;
  let index = props.index;
  return (
    <div className="CustomizeItem">
      <div>
        <label style={{ color: props.data.isRepeat ? "red" : "black" }}>
          {"类型名: "}
        </label>
        <input
          autoFocus={true}
          className="Name"
          type="text"
          onChange={(event) => {
            if (props.data.isLock) return;
            dispatch({
              type: "KeyCustomize-type-name",
              index: index,
              value: event.target.value,
            });
          }}
          value={props.data.name}
          style={{ color: props.data.isRepeat ? "red" : "black" }}></input>

        <label>描述：</label>
        <input
          className="Dec"
          type="text"
          value={props.data.dec}
          onChange={(event) => {
            if (props.data.isLock) return;
            dispatch({
              type: "KeyCustomize-type-dec",
              index: props.index,
              value: event.target.value,
            });
          }}></input>
        {!props.data.isLock && (
          <a
            href="#KeyCustomize"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              dispatch({
                type: "KeyCustomize-delete-item",
                index: props.index,
              });
            }}>
            删
          </a>
        )}
      </div>

      <div className="CubeContainer">
        {props.data.items.map((v, i) => {
          return (
            <div className="Cube" key={i}>
              <div className="CubeItem">
                <select
                  value={v[1]}
                  onChange={(event) => {
                    if (props.data.isLock) return;
                    dispatch({
                      type: "KeyCustomize-key-type",
                      itemIndex: index,
                      keyIndex: i,
                      baseTypeIndex: event.target.value,
                    });
                  }}>
                  {baseType.map((v, i) => {
                    return (
                      <option key={i} value={i}>
                        {v}{" "}
                      </option>
                    );
                  })}{" "}
                </select>
              </div>

              <div className="CubeItem">
                <input
                  type="text"
                  value={v[0]}
                  onChange={(event) => {
                    if (props.data.isLock) return;
                    dispatch({
                      type: "KeyCustomize-key-name",
                      itemIndex: index,
                      keyIndex: i,
                      name: event.target.value,
                    });
                  }}
                  autoFocus={true}
                  className="CubeKeyName"
                  style={{
                    color: v[2] ? "black" : "red",
                  }}></input>
              </div>
            </div>
          );
        })}
      </div>
      {!props.data.isLock && (
        <div style={{marginLeft: "430px", marginTop: "-20px"}}>
          <button
            className="CubeButton"
            onClick={() => {
              dispatch({
                type: "KeyCustomize-add-key",
                itemIndex: index,
                name: "key" + count,
              });
              setCount(count + 1);
            }}>
            +
          </button>
          {props.data.items.length > 1 && (
            <button
              className="CubeButton"
              onClick={() => {
                dispatch({
                  type: "KeyCustomize-delete-key",
                  itemIndex: index,
                });
                setCount(count + 1);
              }}>
              -
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function KeyCustomize(props) {
  let baseType = props.data.baseType;
  let customizeType = props.data.customizeType;
  let dispatch = props.dispatch;
  const [count, setCount] = useState(baseType.length + customizeType.length);
  return (
    <div className="KeyCustomize Part" id="KeyCustomize">
      <h2>类型</h2>
      <div>
        <label>基础类型：</label>
        {baseType.map((v, i) => {
          return (
            <a key={i} href="#KeyCustomize" style={{ marginLeft: "5px" }}>
              {v}{" "}
            </a>
          );
        })}{" "}
      </div>
      <div style={{ marginBottom: "0px" }}>
        <label>自定义类型：</label>
        <button
          onClick={() => {
            dispatch({
              type: "KeyCustomize-add-item",
              name: "new" + count,
            });
            setCount(count + 1);
          }}>
          添加
        </button>
      </div>
      <div className="CustomizeContainer">
        {customizeType.map((v, i) => {
          return (
            <KeyCustomizeItem
              data={v}
              baseType={props.data.baseType}
              dispatch={dispatch}
              key={i}
              index={i}
            />
          );
        })}{" "}
      </div>
    </div>
  );
}

export default KeyCustomize;

function KeyCustomizeReducer(state, action) {
  let newState = state;
  let checkName = () => {
    newState.customizeType.forEach((item, i) => {
      item.isRepeat = !newState.customizeType.every((v, ii) => {
        return i === ii ? true : v.name !== item.name;
      });
    });

    newState.customizeType.forEach((element) => {
      element.items.forEach((item, i) => {
        item[2] = element.items.every((v, ii) => {
          return i === ii ? true : v[0] !== item[0];
        });
      });
      if (element.name.length < 1) element.isRepeat = true;
      if (!element.items.every((v) => v[0].length > 0)) element.isRepeat = true;
    });
    return newState;
  };
  let typeData, items;
  switch (action.type) {
    case "KeyCustomize-add-item":
      let newTyepData = {
        name: action.name,
        dec: "这是该属性的描述",
        items: [["key0", "1", true]],
      };
      newState.customizeType.push(newTyepData);
      return checkName();
    case "KeyCustomize-delete-item":
      newState.customizeType = newState.customizeType.filter((v, i) => {
        return i !== action.index;
      });
      return checkName();
    case "KeyCustomize-type-name":
      typeData = newState.customizeType[action.index];
      typeData.name = action.value;
      return checkName();
    case "KeyCustomize-type-dec":
      typeData = newState.customizeType[action.index];
      typeData.dec = action.value;
      return checkName();
    case "KeyCustomize-key-type":
      typeData = newState.customizeType[action.itemIndex];
      let typeItemData = typeData.items[action.keyIndex];
      typeItemData[1] = action.baseTypeIndex;
      return checkName();
    case "KeyCustomize-key-name":
      typeData = newState.customizeType[action.itemIndex];
      typeData.items[action.keyIndex][0] = action.name;
      return checkName();
    case "KeyCustomize-add-key":
      typeData = newState.customizeType[action.itemIndex];
      items = typeData.items;
      items[items.length] = [action.name, 1, true];
      return checkName();
    case "KeyCustomize-delete-key":
      typeData = newState.customizeType[action.itemIndex];
      items = typeData.items;
      items.pop();
      return checkName();
    default:
      return newState;
  }
}

let KeyCustomizeData = {
  baseType: ["number", "string"],
  customizeType: [
    {
      name: "award",
      dec: "奖励条目",
      items: [
        ["meta", 0, true],
        ["type", 1, true],
        ["count", 0, true],
      ],
      isRepeat: false,
      isLock: false,
    },
  ],
};

export { KeyCustomizeReducer, KeyCustomizeData };
