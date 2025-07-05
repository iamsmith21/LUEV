import { useState } from "react";

function LoanCalculator(){


    const [vehiclePrice, setVP] = useState("");
    const [downPayment, setDP] = useState("");
    const [interestRate, setIR] = useState("");
    const [durationM, setDM] = useState("");
    const [monthlyPayment, setMP] = useState(null);

    const calculatePayment = () => {
        const loanAmount = parseFloat(vehiclePrice) - parseFloat(downPayment)
        const monthlyRate = parseFloat(interestRate) / 1200;
        const n = parseInt(durationM);

        if (loanAmount <= 0 || monthlyRate <0 || n<=0){
            setMP("Invalid Input");
            return;
        }

        const paymentCalc = (loanAmount*monthlyRate)/(1 - Math.pow(1+monthlyRate, -n));
        setMP(paymentCalc.toFixed(2));
    }

    return(

        <div className="max-w-md mx-auto p-4 border rounded mt-6">
            <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>

        <input 
            type="number"
            placeholder="Vehicle Price"
            value={vehiclePrice}
            onChange={(e) => setVP(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            />

        <input 
            type="number"
            placeholder="Down Payment"
            value={downPayment}
            onChange={(e) => setDP(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            />
            
        <input 
            type="number"
            placeholder="Interest Rate %"
            value={interestRate}
            onChange={(e) => setIR(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            />
        <input 
            type="number"
            placeholder="Loan Duration (M)"
            value={durationM}
            onChange={(e) => setDM(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            />
        
        <button
            onClick={calculatePayment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-40 py-2 rounded"
        >
            Calculate
        </button>

        {monthlyPayment && (
            <p className="mt-4 text-lg">
                Monthly Payment: <strong>${monthlyPayment}</strong>
            </p>
        )}
        
        </div>
    )

}

export default LoanCalculator;