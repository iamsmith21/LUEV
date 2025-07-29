import { useState } from "react";

function CarCalculator() {
  const [vehiclePrice, setVP] = useState("");
  const [downPayment, setDP] = useState("");
  const [interestRate, setIR] = useState("");
  const [durationM, setDM] = useState("");
  const [monthlyPayment, setMP] = useState(null);
const calculatePayment = () => {
  const price = parseFloat(vehiclePrice);
  const down = parseFloat(downPayment);
  const rate = parseFloat(interestRate);
  const months = parseInt(durationM);

  const loanAmount = price - down;
  const monthlyRate = rate / 1200;

  if (
    isNaN(price) ||
    isNaN(down) ||
    isNaN(rate) ||
    isNaN(months) ||
    loanAmount <= 0 ||
    monthlyRate < 0 ||
    months <= 0
  ) {
    setMP("Invalid Input");
    return;
  }

  let paymentCalc;


  if (monthlyRate === 0) {
    paymentCalc = loanAmount / months;
  } else {
    paymentCalc =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months));
  }

  setMP(paymentCalc.toFixed(2));
};

  return (
    <div className="mt-32">
      {" "}
      <div className="max-w-md mx-auto p-4 border rounded mt-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Loan Calculator
        </h2>

        <input
          type="number"
          step="any"
          placeholder="Vehicle Price ($)"
          value={vehiclePrice}
          onChange={(e) => setVP(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="number"
          step="any"
          placeholder="Down Payment ($)"
          value={downPayment}
          onChange={(e) => setDP(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="number"
          step="any"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setIR(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Loan Duration (Months)"
          value={durationM}
          onChange={(e) => setDM(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={calculatePayment}
          className="text-white py-2 rounded px-40
            bg-blue-500 hover:bg-blue-600"
        >
          Calculate
        </button>

        {monthlyPayment && (
          <p className="mt-4 text-lg text-center">
            Monthly Payment:{" "}
            <strong className="text-green-600">
              {isNaN(monthlyPayment) ? monthlyPayment : `$${monthlyPayment}`}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default CarCalculator;
