import { Lock, Copy, Zap } from 'lucide-react';
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const App = () => {
  const [displayPass, setDisplayPass] = useState("");
  const [passLength, setPassLength] = useState(8);
  const [passFormat, setPassFormat] = useState([]);
  const [maxLength, setMaxLength] = useState(30);



  const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
  const upperAlpha = lowerAlpha.toUpperCase();
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-";



  useEffect(() => {
    if (passFormat.length === 0) {
      setMaxLength(30);
    } else if (passFormat.every(e => e === "uppercase") || passFormat.every(e => e === "lowercase")) {
      setMaxLength(26);
    } else if (passFormat.every(e => e === "numbers")) {
      setMaxLength(10);
    } else if (passFormat.every(e => e === "symbols")) {
      setMaxLength(12);
    } else if (passFormat.includes("numbers", "symbols")) {
      setMaxLength(22);
    } else {
      setMaxLength(30); // All checkbox clicked
    }

    if (passLength > maxLength) setPassLength(maxLength);

  }, [passFormat, maxLength]);



  const handleFormat = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setPassFormat((prev) => [...prev, value]);
    } else {
      setPassFormat((prev) => prev.filter(e => e !== value));
    }
  };



  const generatePassword = () => {
    const char = [];

    for (let i = 0; i <= passLength; i++) {
      if (passFormat.includes("uppercase")) char.push(upperAlpha[Math.floor(Math.random() * upperAlpha.length)]);


      if (passFormat.includes("lowercase")) char.push(lowerAlpha[Math.floor(Math.random() * lowerAlpha.length)]);


      if (passFormat.includes("numbers")) char.push(numbers[Math.floor(Math.random() * numbers.length)]);


      if (passFormat.includes("symbols")) char.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    const unique = [...new Set(char)].slice(0, passLength);

    if (passLength !== unique) {
      for (let i = 0; i <= passLength; i++) {
        if (passFormat.includes("uppercase")) char.push(upperAlpha[Math.floor(Math.random() * upperAlpha.length)]);


        if (passFormat.includes("lowercase")) char.push(lowerAlpha[Math.floor(Math.random() * lowerAlpha.length)]);


        if (passFormat.includes("numbers")) char.push(numbers[Math.floor(Math.random() * numbers.length)]);


        if (passFormat.includes("symbols")) char.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
    }

    setDisplayPass([...new Set(char)].slice(0, passLength).join(""));
    console.log([...new Set(char)].slice(0, passLength).join("").length);
  };



  const handleCopy = () => {
    navigator.clipboard.writeText(displayPass);

    toast('Text copied successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };



  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full flex-grow flex items-center justify-center">
        <div className="flex flex-col p-8 bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transition-all duration-300">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-indigo-500" />
            Secure Passkey
          </h1>
          <p className="text-gray-400 mb-6 border-b border-gray-700 pb-4">
            Generate strong, random passwords instantly.
          </p>

          {/* Password Output */}
          <div className="mb-6 relative">
            <input
              type="text"
              value={displayPass}
              disabled
              className="w-full p-4 text-sm sm:text-lg font-mono border border-gray-600 bg-gray-700 rounded-lg pr-12 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your secure password"
            />
            <button
              className="absolute right-0 top-0 h-full px-4 rounded-r-lg disabled:cursor-not-allowed text-gray-400 hover:bg-gray-600"
              title="Copy to Clipboard"
              onClick={handleCopy}
              disabled={displayPass.length > 0 ? false : true}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {/* Length Slider */}
          <div className="mb-6">
            <label className="flex justify-between items-center text-gray-300 font-medium mb-2">
              Password Length
              <span className="text-indigo-400 text-md sm:text-lg font-bold">{passLength}</span>
            </label>
            <input
              type="range"
              min="6"
              max={maxLength}
              value={passLength}
              onChange={e => setPassLength(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
            {["uppercase", "lowercase", "numbers", "symbols"].map((item, i) => (
              <div key={i} className="p-3 bg-gray-700 rounded-lg flex items-center cursor-pointer transition">
                <label className="group flex items-center cursor-pointer w-full">
                  <input
                    className="hidden peer"
                    type="checkbox"
                    value={item}
                    onChange={handleFormat}
                  />
                  <span className="relative w-5 h-5 flex justify-center items-center bg-gray-600 rounded-md shadow-md transition-all duration-500 peer-checked:bg-indigo-600">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="hidden w-5 h-5 text-white peer-checked:block transition-transform duration-300 transform scale-75 peer-checked:scale-100"
                    >
                      <path
                        clipRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-3 text-sm sm:text-md capitalize text-white">{item}</span>
                </label>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <button
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg shadow-indigo-500/50 flex items-center justify-center disabled:opacity-50 focus-visible:outline-none"
            type="submit"
            disabled={passFormat.length === 0}
            onClick={generatePassword}
          >
            <Zap className="w-5 h-5 mr-2" />
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );

};

export default App;
