import { useState } from "react";
import "./App.css";

const random = [
  "like",
  "lift",
  "line",
  "link",
  "list",
  "live",
  "load",
  "loan",
  "lock",
  "logo",
  "long",
  "look",
  "lord",
  "lose",
  "loss",
  "lost",
  "love",
  "luck",
  "made",
  "mail",
  "main",
  "make",
  "male",
  "many",
  "mark",
  "mass",
  "matt",
  "meal",
  "mean",
  "meat",
  "meet",
  "menu",
  "mere",
  "mike",
  "mile",
  "milk",
  "mill",
  "mind",
  "mine",
  "miss",
  "mode",
  "mood",
  "moon",
  "more",
  "most",
  "move",
  "much",
  "must",
  "name",
  "navy",
  "near",
  "neck",
  "next",
  "nice",
  "nick",
  "nine",
  "none",
  "nose",
  "note",
  "okay",
  "once",
  "only",
  "onto",
  "open",
  "oral",
  "over",
  "pace",
  "pack",
  "page",
  "paid",
  "pain",
  "pair",
  "palm",
  "park",
  "part",
  "pass",
  "past",
  "path",
  "peak",
  "able",
  "acid",
  "aged",
  "also",
  "area",
  "army",
  "away",
  "baby",
  "back",
  "ball",
  "band",
  "bank",
  "base",
  "bath",
  "bear",
  "beat",
  "beer",
  "been",
  "bell",
  "belt",
  "best",
  "bill"
];
var arr = random[Math.floor(Math.random() * random.length)];

export default function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [list, setList] = useState([
    { inputValue: "", bull: 0, cow: 0, show: false }
  ]);

  function IsValidJSONString(str) {
    const reg = /^[a-z,\s]{4}$/;
    let uniq = "";
    let flag = false;
    let enterValue = reg.test(str);
    for (let i = 0; i < str.length; i++) {
      if (uniq.includes(str[i]) === true) {
        flag = true;
        break;
      } else {
        uniq += str[i];
      }
    }

    if (enterValue && !flag) return true;
    else {
      return false;
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value.toLowerCase());
    const valid = IsValidJSONString(e.target.value.toLowerCase());

    if (valid) {
      setError("");
      setIsValid(true);
    } else {
      setIsValid(false);
      setError(`Please enter only 4 unique characters`);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      let bCount = 0;
      let cCount = 0;
      const finedPositionFunction = (index) => {
        if (value[index] === arr[index]) {
          return true;
        } else {
          return false;
        }
      };

      const finedPositionDiffrent = (index1, index2) => {
        if (arr[index1] === value[index2]) {
          return true;
        } else {
          return false;
        }
      };

      for (let i = 0; i < arr.length; i++) {
        const finedPosition = finedPositionFunction(i);

        if (finedPosition) {
          bCount++;
        } else {
          for (let j = 0; j < arr.length; j++) {
            if (finedPositionDiffrent(i, j) && i !== j) {
              cCount++;
            }
          }
        }
      }

      const newItem = {
        inputValue: value,
        show: true,
        bull: bCount,
        cow: cCount
      };

      const newItems = [...list, newItem];

      setList(newItems);
      setValue("");
    }
  };
  return (
    <div className="App">
      <div onSubmit={handleSubmit} className="input-main">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="input-box"
          // maxLength="4"
        />
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="button"
        />
      </div>
      <div className="error">{error}</div>
      {list.map((content, index) => (
        <>
          <div className="row">
            {content.show && (
              <>
                <div className="input-value">{content.inputValue}</div>
                <div className="out-value">
                  {content.bull + "B---" + content.cow + "C"}
                </div>
              </>
            )}
          </div>
        </>
      ))}
    </div>
  );
}

