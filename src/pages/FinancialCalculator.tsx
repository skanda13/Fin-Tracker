
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [emiResult, setEmiResult] = useState<number | null>(null);

  const [simpleAmount, setSimpleAmount] = useState("");
  const [simpleRate, setSimpleRate] = useState("");
  const [simpleTime, setSimpleTime] = useState("");
  const [simpleInterestResult, setSimpleInterestResult] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTerm) * 12;
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmiResult(Math.round(emi * 100) / 100);
    }
  };

  const calculateSimpleInterest = () => {
    const P = parseFloat(simpleAmount);
    const r = parseFloat(simpleRate) / 100;
    const t = parseFloat(simpleTime);
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(t)) {
      const interest = P * r * t;
      setSimpleInterestResult(Math.round(interest * 100) / 100);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Calculator</h1>
        <p className="text-gray-500 mt-1">Calculate EMIs, interest rates, and more</p>
      </div>

      <Tabs defaultValue="emi" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
          <TabsTrigger value="simple-interest">Simple Interest</TabsTrigger>
        </TabsList>
        
        <TabsContent value="emi">
          <Card>
            <CardHeader>
              <CardTitle>EMI Calculator</CardTitle>
              <CardDescription>
                Calculate your Equated Monthly Installment (EMI) for loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                  <Input 
                    id="loan-amount" 
                    placeholder="e.g., 500000" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
                  <Input 
                    id="interest-rate" 
                    placeholder="e.g., 10.5" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="loan-term">Loan Term (years)</Label>
                  <Input 
                    id="loan-term" 
                    placeholder="e.g., 5" 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </div>
                
                <Button onClick={calculateEMI} className="bg-ledger-600 hover:bg-ledger-700">
                  Calculate EMI
                </Button>
                
                {emiResult !== null && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="font-medium text-gray-700">Your monthly EMI would be:</p>
                    <p className="text-2xl font-bold text-ledger-700">₹{emiResult.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simple-interest">
          <Card>
            <CardHeader>
              <CardTitle>Simple Interest Calculator</CardTitle>
              <CardDescription>
                Calculate simple interest on your investments or loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="principal">Principal Amount (₹)</Label>
                  <Input 
                    id="principal" 
                    placeholder="e.g., 10000" 
                    value={simpleAmount}
                    onChange={(e) => setSimpleAmount(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="simple-rate">Interest Rate (% per annum)</Label>
                  <Input 
                    id="simple-rate" 
                    placeholder="e.g., 5" 
                    value={simpleRate}
                    onChange={(e) => setSimpleRate(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="time-period">Time Period (years)</Label>
                  <Input 
                    id="time-period" 
                    placeholder="e.g., 2" 
                    value={simpleTime}
                    onChange={(e) => setSimpleTime(e.target.value)}
                  />
                </div>
                
                <Button onClick={calculateSimpleInterest} className="bg-ledger-600 hover:bg-ledger-700">
                  Calculate Interest
                </Button>
                
                {simpleInterestResult !== null && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="font-medium text-gray-700">Simple Interest:</p>
                    <p className="text-2xl font-bold text-ledger-700">₹{simpleInterestResult.toLocaleString()}</p>
                    <p className="font-medium text-gray-700 mt-2">Total Amount:</p>
                    <p className="text-xl font-bold text-ledger-700">
                      ₹{(parseFloat(simpleAmount) + simpleInterestResult).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default FinancialCalculator;
