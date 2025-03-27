import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const AcreToSqft = () => {
  const generateInitialProblem = () => {
    const type = Math.random() < 0.5 ? 'sqftToAcres' : 'acresToSqft';
    const initialValue = type === 'sqftToAcres'
      ? (Math.round((Math.floor(Math.random() * 100) + 0.5 * Math.floor(Math.random() * 2)) * 43560)).toString()
      : (Math.floor(Math.random() * 10) + 0.5 * Math.floor(Math.random() * 2)).toString();
    return { type, value: initialValue };
  };

  const initial = generateInitialProblem();
  const [practiceType, setPracticeType] = useState(initial.type);
  const [value, setValue] = useState(initial.value);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateRandomProblem = () => {
    const newType = Math.random() < 0.5 ? 'sqftToAcres' : 'acresToSqft';
    setPracticeType(newType);
    
    if (newType === 'sqftToAcres') {
      const acresTarget = Math.floor(Math.random() * 100) + 0.5 * Math.floor(Math.random() * 2);
      const randomSqFt = Math.round(acresTarget * 43560);
      setValue(randomSqFt.toString());
    } else {
      const randomAcres = Math.floor(Math.random() * 100) + 0.5 * Math.floor(Math.random() * 2);
      setValue(randomAcres.toString());
    }
    setUserAnswer('');
    setHasError(false);
    setShowAnswer(false);
  };

  const sqFeetToAcres = (sqFeet) => {
    const result = parseFloat(sqFeet) / 43560;
    const rounded = Math.round(result * 100) / 100;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
  };

  const acresToSqFeet = (acres) => {
    return Math.round(parseFloat(acres) * 43560).toString();
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
    }
  };

  return (
    <div className="bg-gray-100 p-8 w-full max-w-4xl mx-auto">
      <Card className="w-full shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg">
          <h1 className="text-sky-900 text-2xl font-bold">Area Unit Conversion</h1>
          <p className="text-sky-800">Learn how to convert between square feet and acres in both directions!</p>
        </div>

        <CardContent className="space-y-6 pt-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">Area Conversion Basics</h2>
            <div className="space-y-3">
              <p className="text-blue-600">
                <strong>Key Relationship:</strong> 1 acre = 43,560 square feet
              </p>
              <div className="p-3 rounded">
                <p className="font-medium">Formula:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Square Feet to Acres: Divide square feet by 43,560</li>
                  <li>Acres to Square Feet: Multiply acres by 43,560</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Examples</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="border-b pb-4 mt-4 mb-2">
                    <p className="text-lg font-bold mb-4">Example 1: Square Feet to Acres</p>
                    <div className="space-y-4">
                      <p className="text-lg">Convert 87,120 square feet to acres</p>
                      <div className="p-3 rounded-lg">
                        <p className="font-medium mb-1">Formula: Acres = Square Feet ÷ 43,560</p>
                        <div className="font-mono mt-2">
                          <p>87,120 ÷ 43,560 = 2 acres</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-lg font-bold mb-2">Example 2: Acres to Square Feet</p>
                    <div className="space-y-4">
                      <p className="text-lg">Convert 2.5 acres to square feet</p>
                      <div className="p-3 rounded-lg">
                        <p className="font-medium mb-1">Formula: Square Feet = Acres × 43,560</p>
                        <div className="font-mono mt-2">
                          <p>2.5 × 43,560 = 108,900 square feet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <Button 
                onClick={generateRandomProblem}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Problem
              </Button>
            </div>

            {value && (
              <div className="space-y-4">
                <p className="text-lg font-medium text-center">
                  {practiceType === 'sqftToAcres' 
                    ? `Convert ${parseInt(value).toLocaleString()} square feet to acres`
                    : `Convert ${value} acres to square feet`
                  }
                </p>
                
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      setHasError(false);
                    }}
                    placeholder={practiceType === 'sqftToAcres' ? "Enter acres" : "Enter square feet"}
                    step={practiceType === 'sqftToAcres' ? "0.0001" : "1"}
                    className={`flex-1 ${hasError ? 'border-red-500' : 'border-blue-300'}`}
                  />
                  <Button
                    onClick={handleAnswerCheck}
                    className="bg-blue-400 hover:bg-blue-500"
                  >
                    Check
                  </Button>
                  <Button
                    onClick={() => {
                      setUserAnswer(practiceType === 'sqftToAcres' 
                        ? sqFeetToAcres(value) 
                        : acresToSqFeet(value));
                      setShowAnswer(true);
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    Skip
                  </Button>
                </div>

                {showAnswer && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <h3 className="text-green-800 text-xl font-bold">Solution</h3>
                    <div className="space-y-2 mt-2">
                      {practiceType === 'sqftToAcres' ? (
                        <>
                          <p>Use the formula Acres = Square Feet ÷ 43,560</p>
                          <p className="font-mono">
                            {parseInt(value).toLocaleString()} ÷ 43,560 = {sqFeetToAcres(value)} acres
                          </p>
                        </>
                      ) : (
                        <>
                          <p>Use the formula Square Feet = Acres × 43,560</p>
                          <p className="font-mono">
                            {value} × 43,560 = {acresToSqFeet(value)} square feet
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding both directions of area conversion is essential for real estate and land management!
      </p>
    </div>
  );
};

export default AcreToSqft;