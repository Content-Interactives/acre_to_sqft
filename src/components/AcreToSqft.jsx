import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const AcreToSqft = () => {
  const [practiceType, setPracticeType] = useState('sqftToAcres');
  const [value, setValue] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [stepCompleted, setStepCompleted] = useState({
    step1: false
  });
  const [stepSkipped, setStepSkipped] = useState({
    step1: false
  });
  const [steps, setSteps] = useState([]);

  const sqFeetToAcres = (sqFeet) => {
    const result = parseFloat(sqFeet) / 43560;
    // For very small numbers, use scientific notation with superscript
    if (result < 0.0001) {
      const [coefficient, exponent] = result.toExponential(4).split('e');
      return `${coefficient} × 10<sup>${exponent}</sup>`;
    }
    // For larger numbers, show up to 6 decimal places if needed
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const acresToSqFeet = (acres) => {
    return Math.round(parseFloat(acres) * 43560).toString();
  };

  const calculateSteps = () => {
    if (!value) return;
    
    // Only proceed if we have a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    const newSteps = practiceType === 'sqftToAcres' ? [
      {
        main: 'Divide square feet by 43,560',
        formula: `${numValue.toLocaleString()} ÷ 43,560`,
        answer: sqFeetToAcres(value)
      }
    ] : [
      {
        main: 'Multiply acres by 43,560',
        formula: `${numValue} × 43,560`,
        answer: acresToSqFeet(value)
      }
    ];

    setSteps(newSteps);
    setShowSteps(true);
    setUserAnswer('');
    setStepCompleted({ step1: false });
    setStepSkipped({ step1: false });
  };

  const handleAnswerCheck = () => {
    const correctAnswer = practiceType === 'sqftToAcres' 
      ? sqFeetToAcres(value)
      : acresToSqFeet(value);
    
    const isCorrect = Math.abs(parseFloat(userAnswer) - parseFloat(correctAnswer)) < 
      (practiceType === 'sqftToAcres' ? 0.0001 : 1);
    
    setHasError(!isCorrect);
    if (isCorrect) {
      setShowAnswer(true);
      setStepCompleted(prev => ({ ...prev, step1: true }));
    }
  };

  const skipStep = () => {
    setUserAnswer(steps[0].answer);
    setStepCompleted({ step1: true });
    setStepSkipped({ step1: true });
    setShowAnswer(true);
  };

  return (
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        /* Remove spinner buttons from number inputs */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: #fff;
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Acre Square Feet Conversion</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Allow typing decimal numbers and check final value only when complete
                    if (/^\d*\.?\d{0,2}$/.test(val)) {
                      const num = parseFloat(val || 0);
                      // Allow incomplete decimal numbers (like "0." or ".") or valid numbers
                      if (val === '' || val === '.' || val.endsWith('.') || 
                          (num >= 0.0001 && num <= 1000000000000)) {
                        setValue(val);
                      }
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5750E3] pr-20"
                  placeholder={practiceType === 'sqftToAcres' ? "Enter square feet" : "Enter acres"}
                />
                {value && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {practiceType === 'sqftToAcres' ? 'Square Feet' : 'Acres'}
                  </span>
                )}
              </div>
              <Button 
                onClick={() => setPracticeType(prev => prev === 'sqftToAcres' ? 'acresToSqft' : 'sqftToAcres')}
                className="bg-[#008545] hover:bg-[#00703d] text-white px-4 h-[42px]"
              >
                Change Unit
              </Button>
            </div>

            <div className={`glow-button ${!showSteps ? 'simple-glow' : 'simple-glow stopped'}`}>
              <button 
                onClick={calculateSteps}
                className="w-full bg-[#008545] hover:bg-[#00703d] text-white text-sm py-2 rounded"
              >
                {practiceType === 'sqftToAcres' ? 'Convert Square Feet to Acres' : 'Convert Acres to Square Feet'}
              </button>
            </div>
          </div>
        </div>

        {showSteps && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-2">
              <h3 className="text-[#5750E3] text-sm font-medium mb-2">
                Steps to calculate the conversion:
              </h3>
              <div className="space-y-4">
                <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                  <p className="text-sm">{steps[0].main}</p>
                  <pre className="text-sm whitespace-pre-wrap mt-1">{steps[0].formula}</pre>
                  {stepCompleted.step1 && (
                    <p className="text-sm text-[#008545] font-medium mt-1">
                      = <span dangerouslySetInnerHTML={{ __html: steps[0].answer }} />
                    </p>
                  )}
                  {!stepCompleted.step1 && (
                    <div className="flex items-center space-x-1 mt-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow typing decimal numbers and check final value only when complete
                          if (/^\d*\.?\d{0,2}$/.test(val)) {
                            const num = parseFloat(val || 0);
                            // Allow incomplete decimal numbers (like "0." or ".") or valid numbers
                            if (val === '' || val === '.' || val.endsWith('.') || 
                                (num >= 0.0001 && num <= 1000000000000)) {
                              setUserAnswer(val);
                              setHasError(false);
                            }
                          }
                        }}
                        placeholder="Enter Answer"
                        className={`w-full text-sm p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5750E3] ${
                          hasError ? 'border-yellow-500' : 'border-gray-300'
                        }`}
                      />
                      <div className="glow-button simple-glow">
                        <div className="flex gap-1">
                          <button 
                            onClick={handleAnswerCheck}
                            className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Check
                          </button>
                          <button 
                            onClick={skipStep}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {stepCompleted.step1 && (
                    <div className="flex items-center gap-4 mt-2 justify-end">
                      {!stepSkipped.step1 && (
                        <span className="text-green-600 font-bold select-none">Great Job!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AcreToSqft;