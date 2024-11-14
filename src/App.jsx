import { useState } from "react"

export default function App() {
  let [error, setError] = useState(false);
  let [showExp, setShowExp] = useState("");
  let [expression, setExpression] = useState("");
  let [result, setResult] = useState("");
  let [finish, setFinish] = useState(false);
  let [isMinus, setIsMinus] = useState(true);

  const typeExp = (key) => {
    setError(false);
    const regex = /[0-9]/;
    if (key.match(regex) && finish) {
      setExpression(key);
      setShowExp(key);
      setResult("");
      setFinish(false);
    } else {
      setFinish(false);
      if (key == "x") {
        setExpression(expression + "*");
      } else if (key == "÷") {
        setExpression(expression + "/");
      } else {
        setExpression(expression + key);
      }
      setShowExp(showExp + key);
    }
  }
   
  const clearExp = () => {
    setExpression("");
    setResult("");
    setShowExp("");
    setError(false);
  }

  const minusOrPlus = () => {
    setIsMinus(!isMinus);
    if (isMinus ) {
      let regex = /[0-9]+$/;
      let matchExp = expression.match(regex);
      if (matchExp) {
        setExpression(expression.replace(regex, "") + `(-${matchExp[0]})`);
        setShowExp(showExp.replace(regex, "") + `(-${matchExp[0]})`);
      }
    } else {
      let regex = /\(.*\)$/;
      let matchExp = expression.match(regex)[0].replace("-", "");
      setExpression(expression.replace(regex, "") + matchExp.replaceAll(/[()]/g, ""));
      setShowExp(expression.replace(regex, "") + matchExp.replaceAll(/[()]/g, ""));
    }
  }

  const calculate = () => {
    try {
      setResult(showExp);
      setExpression(eval(expression).toString());
      setShowExp(eval(expression).toString());
      setFinish(true);
    } catch (err) {
      setError(true);
      setResult("");
      setExpression("");
      setShowExp("");
    }
  }
  return (
    <div className="w-full max-w-80 mx-auto">
      <p className="text-center text-4xl font-bold mt-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent h-fit p-2">Calculator App by Rugsit</p>
      <div className="mt-10 bg-stone-900 pt-28 rounded-xl mb-10 shadow-lg">
        <p className={"text-3xl text-gray-500 text-right mb-3 px-7 font-bold transition-all break-all" + (result != "" ? " opacity-100 translate-y-0" : " opacity-0 translate-y-full")}>{result}</p>
        <p className="text-right  text-white text-5xl font-bold mb-5 break-all px-7">{error ? "Invalid" : showExp == "" ? "0" : showExp}</p>
        <div className="grid grid-cols-4 grid-rows-5 p-7 gap-2 bg-gray-100 rounded-lg ">
          <button className="calculate-button text-gray-500" onClick={clearExp}>C</button>
          <button className="calculate-button text-gray-500" onClick={minusOrPlus}>+/-</button>
          <button className="calculate-button text-gray-500" onClick={() => {
            typeExp("%")
          }}>%</button>
          <button className="calculate-button text-purple-400" onClick={() => {
            typeExp("÷")
          }}>÷</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("7")
          }}>7</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("8")
          }}>8</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("9")
          }}>9</button>
          <button className="calculate-button text-purple-400" onClick={() => {
            typeExp("x")
          }}>x</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("4")
          }}>4</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("5")
          }}>5</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("6")
          }}>6</button>
          <button className="calculate-button text-purple-400" onClick={() => {
            typeExp("-")
          }}>-</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("1")
          }}>1</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("2")
          }}>2</button>
          <button className="calculate-button text-sky-600" onClick={() => {
            typeExp("3")
          }}>3</button>
          <button className="calculate-button text-purple-400" onClick={() => {
            typeExp("+")
          }}>+</button>
          <button className="calculate-button col-span-2 text-sky-600" onClick={() => {
            typeExp("0")
          }}>0</button>
          <button className="calculate-button" onClick={() => {
            typeExp(".")
          }}>.</button>
          <button className="calculate-button text-white bg-blue-500 active:bg-blue-800" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  )
}
