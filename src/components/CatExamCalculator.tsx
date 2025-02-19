import React, { useState } from "react";
import { CircleX } from "lucide-react";
import Draggable from "react-draggable";

interface CatExamCalculatorProps {
  setShowCal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CatExamCalculator: React.FC<CatExamCalculatorProps> = ({ setShowCal }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [memoryValue, setMemoryValue] = useState<number | null>(null);
  const [calculationValue, setCalculationValue] = useState("");

  const ButtonStyle = "w-10 h-9 border border-gray-300 text-gray-700  text-xs rounded-lg shadow-sm m-1 font-extrabold hover:opacity-80 hover:scale-103 active:bg-gray-300 active:scale-95 transition-transform";

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "C":
        clearDisplay();
        break;
      case "MC":
        clearMemory();
        break;
      case "MR":
        recallMemory();
        break;
      case "MS":
        storeMemory();
        break;
      case "M+":
        addToMemory();
        break;
      case "M-":
        subtractFromMemory();
        break;
      case "√":
        calculateSquareRoot();
        break;
      case "1/x":
        calculateReciprocal();
        break;
      case "%":
        calculatePercentage();
        break;
      case "+/-":
        negateValue();
        break;
      case "←":
        backspace();
        break;
      case "=":
        evaluateExpression();
        break;
      default:
        appendToDisplay(value);
        break;
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setCalculationValue("");
  };

  const clearMemory = () => {
    setMemoryValue(null);
  };

  const recallMemory = () => {
    if (memoryValue !== null) {
      setDisplayValue(memoryValue.toString());
    }
  };

  const storeMemory = () => {
    setMemoryValue(parseFloat(displayValue));
  };

  const addToMemory = () => {
    if (memoryValue !== null) {
      setMemoryValue(memoryValue + parseFloat(displayValue));
    } else {
      setMemoryValue(parseFloat(displayValue));
    }
  };

  const subtractFromMemory = () => {
    if (memoryValue !== null) {
      setMemoryValue(memoryValue - parseFloat(displayValue));
    } else {
      setMemoryValue(parseFloat(displayValue) * -1);
    }
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(displayValue);
    if (value >= 0) {
      setDisplayValue(Math.sqrt(value).toString());
    } else {
      setDisplayValue("Error");
    }
  };

  const calculateReciprocal = () => {
    const value = parseFloat(displayValue);
    if (value !== 0) {
      setDisplayValue((1 / value).toString());
    } else {
      setDisplayValue("Error");
    }
  };

  const calculatePercentage = () => {
    const value = parseFloat(displayValue);
    setDisplayValue((value / 100).toString());
  };

  const negateValue = () => {
    const value = parseFloat(displayValue);
    setDisplayValue((value * -1).toString());
  };

  const backspace = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  };

  const evaluateExpression = () => {
    try {
      const result = eval(displayValue);
      setCalculationValue(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      console.log("🚀 ~ evaluateExpression ~ error:", error)
      setDisplayValue("Error");
      setCalculationValue("");
    }
  };

  const appendToDisplay = (value: string) => {
    setDisplayValue((prevDisplay) =>
      prevDisplay === "0" ? value : prevDisplay + value
    );
  };

  return (
    <Draggable>
      <div className="bg-white rounded-lg shadow-lg  w-72 absolute top-1/4 left-1/4 cursor-move">
        <div className="bg-blue-500 text-white rounded-t-lg p-2 flex justify-between items-center">
          <h6 className="font-semibold">Calculator</h6>
          <button
            onClick={() => setShowCal(false)}
            className="text-2xl cursor-pointer hover:text-gray-300"
          >
            <CircleX />
          </button>
        </div>
        <div className="p-2 bg-gray-200 rounded-b-lg">
          <input
            type="text"
            value={calculationValue}
            readOnly
            className="bg-white mb-2 w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            value={displayValue}
            readOnly
            className="bg-white mb-2 w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-0"
          />
          <div className="keypad flex flex-wrap gap-2">
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("MC")}>MC</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("MR")}>MR</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("MS")}>MS</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("M+")}>M+</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("M-")}>M-</button>
            <button
              className={`${ButtonStyle} text-white w-24 bg-red-500`}
              onClick={() => handleButtonClick("←")}
            >
              ←
            </button>
            <button
              className={`${ButtonStyle} bg-red-500 text-white`}
              onClick={() => handleButtonClick("C")}
            >
              C
            </button>
            <button
              className={`${ButtonStyle} bg-red-500 text-white`}
              onClick={() => handleButtonClick("+/-")}
            >
              +/-
            </button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("√")}>√</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("7")}>7</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("8")}>8</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("9")}>9</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("/")}>/</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("%")}>%</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("4")}>4</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("5")}>5</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("6")}>6</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("*")}>*</button>
            <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("1/x")}>1/x</button>
            <div className="flex gap-1">
            <div className="flex flex-wrap gap-2 w-[82%]">
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("1")}>1</button>
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("2")}>2</button>
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("3")}>3</button>
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("-")}>-</button>
              <button className={`${ButtonStyle} w-24 bg-white`} onClick={() => handleButtonClick("0")}>0</button>
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick(".")}>.</button>
              <button className={`${ButtonStyle} bg-white`} onClick={() => handleButtonClick("+")}>+</button>
            </div>
            <button
              className={`${ButtonStyle} bg-green-500 text-white h-[82px]`}
              onClick={() => handleButtonClick("=")}
            >
              =
            </button>
            </div>
           
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default CatExamCalculator;
