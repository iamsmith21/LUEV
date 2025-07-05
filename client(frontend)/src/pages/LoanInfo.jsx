import { Link } from "react-router-dom";

function LoanInfo() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center">
            <section
                className="bg-cover bg-center h-80 flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/loanCalc-header.jpg')" }}
                >
                <h1 className="text-3xl font-bold px-6 py-3 rounded">
                    Car Financing Made Simple
                </h1>
            </section>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Buying your next electric vehicle doesn’t have to drain your wallet. With auto financing,
          you can split your payments over time and drive off today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-[#F8F3F0] py-7 px-6 rounded text-center">
          <img src="/car.svg" alt="Step 1" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Choose Your Vehicle</h3>
          <p className="text-gray-600">Pick from our wide range of electric vehicles in stock.</p>
        </div>
        <div className="bg-[#F8F3F0] py-7 px-6 rounded text-center">
          <img src="/shield.svg" alt="Step 2" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Estimate Your Loan</h3>
          <p className="text-gray-600">Use our calculator to see your monthly payments.</p>
        </div>
        <div className="bg-[#F8F3F0] py-7 px-6 rounded text-center">
          <img src="/quick.svg" alt="Step 3" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Drive Away</h3>
          <p className="text-gray-600">Get approved and start driving.</p>
        </div>
      </div>
      
      <div className="text-center mt-10 space-y-4 text-grey-600">
        <p className="text-lg text-grey-600">
            Not sure of your budget? <br />
            Check out our loan calculator to estimate your monthly payments.
        </p>
        <Link to="/calculator">
          <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded text-lg transition">
            View Loan Calculator
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoanInfo;