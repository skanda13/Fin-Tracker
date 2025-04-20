import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FinancialCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [emiResult, setEmiResult] = useState<number | null>(null);
  const [emiTotalAmount, setEmiTotalAmount] = useState<number | null>(null);
  const [emiTotalInterest, setEmiTotalInterest] = useState<number | null>(null);

  const [simpleAmount, setSimpleAmount] = useState("");
  const [simpleRate, setSimpleRate] = useState("");
  const [simpleTime, setSimpleTime] = useState("");
  const [simpleInterestResult, setSimpleInterestResult] = useState<number | null>(null);

  // New states for Compound Interest Calculator
  const [compoundPrincipal, setCompoundPrincipal] = useState("");
  const [compoundRate, setCompoundRate] = useState("");
  const [compoundTime, setCompoundTime] = useState("");
  const [compoundFrequency, setCompoundFrequency] = useState("1"); // Annual by default
  const [compoundResult, setCompoundResult] = useState<number | null>(null);
  const [totalCompoundInterest, setTotalCompoundInterest] = useState<number | null>(null);

  // New states for SIP Calculator
  const [sipAmount, setSipAmount] = useState("");
  const [sipRate, setSipRate] = useState("");
  const [sipYears, setSipYears] = useState("");
  const [sipTotalInvestment, setSipTotalInvestment] = useState<number | null>(null);
  const [sipMaturityValue, setSipMaturityValue] = useState<number | null>(null);
  const [sipWealthGained, setSipWealthGained] = useState<number | null>(null);

  // States for Fixed Deposit Calculator
  const [fdAmount, setFdAmount] = useState("");
  const [fdRate, setFdRate] = useState("");
  const [fdYears, setFdYears] = useState("");
  const [fdCompounding, setFdCompounding] = useState("4"); // Quarterly by default
  const [fdMaturityAmount, setFdMaturityAmount] = useState<number | null>(null);
  const [fdInterestEarned, setFdInterestEarned] = useState<number | null>(null);

  // States for PPF Calculator
  const [ppfAmount, setPpfAmount] = useState("");
  const [ppfYearlyContribution, setPpfYearlyContribution] = useState("");
  const [ppfRate, setPpfRate] = useState("7.1"); // Current PPF rate
  const [ppfYears, setPpfYears] = useState("");
  const [ppfMaturityAmount, setPpfMaturityAmount] = useState<number | null>(null);
  const [ppfTotalInvestment, setPpfTotalInvestment] = useState<number | null>(null);
  const [ppfInterestEarned, setPpfInterestEarned] = useState<number | null>(null);

  // States for Retirement Calculator
  const [retirementCurrentAge, setRetirementCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [retirementLifeExpectancy, setRetirementLifeExpectancy] = useState("");
  const [retirementMonthlyExpense, setRetirementMonthlyExpense] = useState("");
  const [retirementCurrentSavings, setRetirementCurrentSavings] = useState("");
  const [retirementExpectedReturn, setRetirementExpectedReturn] = useState("");
  const [retirementInflation, setRetirementInflation] = useState("6"); // Default inflation rate
  const [retirementCorpusNeeded, setRetirementCorpusNeeded] = useState<number | null>(null);
  const [retirementMonthlySavingsNeeded, setRetirementMonthlySavingsNeeded] = useState<number | null>(null);

  // States for Home Loan Affordability
  const [homeAnnualIncome, setHomeAnnualIncome] = useState("");
  const [homeMonthlyObligations, setHomeMonthlyObligations] = useState("");
  const [homeDownPayment, setHomeDownPayment] = useState("");
  const [homeLoanRate, setHomeLoanRate] = useState("");
  const [homeLoanTerm, setHomeLoanTerm] = useState("");
  const [homeMaxLoanAmount, setHomeMaxLoanAmount] = useState<number | null>(null);
  const [homeAffordableValue, setHomeAffordableValue] = useState<number | null>(null);
  const [homeMonthlyEMI, setHomeMonthlyEMI] = useState<number | null>(null);

  // Add state variables for the new calculators
  const [taxIncome, setTaxIncome] = useState("");
  const [taxDeductions, setTaxDeductions] = useState("");
  const [taxRegime, setTaxRegime] = useState("new");
  const [taxResult, setTaxResult] = useState<number | null>(null);
  const [taxCess, setTaxCess] = useState<number | null>(null);
  const [taxTotalLiability, setTaxTotalLiability] = useState<number | null>(null);

  // States for Inflation Calculator
  const [presentValue, setPresentValue] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [inflationYears, setInflationYears] = useState("");
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [valueLoss, setValueLoss] = useState<number | null>(null);

  // States for Loan Comparison
  const [loan1Amount, setLoan1Amount] = useState("");
  const [loan1Rate, setLoan1Rate] = useState("");
  const [loan1Term, setLoan1Term] = useState("");
  const [loan2Amount, setLoan2Amount] = useState("");
  const [loan2Rate, setLoan2Rate] = useState("");
  const [loan2Term, setLoan2Term] = useState("");
  const [loan1EMI, setLoan1EMI] = useState<number | null>(null);
  const [loan2EMI, setLoan2EMI] = useState<number | null>(null);
  const [loan1TotalInterest, setLoan1TotalInterest] = useState<number | null>(null);
  const [loan2TotalInterest, setLoan2TotalInterest] = useState<number | null>(null);
  const [loan1Total, setLoan1Total] = useState<number | null>(null);
  const [loan2Total, setLoan2Total] = useState<number | null>(null);

  // States for Goal Savings
  const [goalAmount, setGoalAmount] = useState("");
  const [goalYears, setGoalYears] = useState("");
  const [goalExisting, setGoalExisting] = useState("");
  const [goalReturn, setGoalReturn] = useState("");
  const [monthlySavingsNeeded, setMonthlySavingsNeeded] = useState<number | null>(null);
  const [goalTotalContribution, setGoalTotalContribution] = useState<number | null>(null);
  const [goalTotalReturns, setGoalTotalReturns] = useState<number | null>(null);

  // Format number in Indian currency format (e.g., 1,00,000 instead of 100,000)
  const formatIndianCurrency = (num: number): string => {
    // Round to nearest integer
    const roundedNum = Math.round(num);
    
    const numStr = roundedNum.toString();
    const lastThree = numStr.length > 3 ? numStr.slice(-3) : numStr;
    const otherNumbers = numStr.length > 3 ? numStr.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') : '';
    
    return (otherNumbers ? otherNumbers + ',' : '') + lastThree;
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTerm) * 12;
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;
      
      setEmiResult(Math.round(emi * 100) / 100);
      setEmiTotalAmount(Math.round(totalAmount * 100) / 100);
      setEmiTotalInterest(Math.round(totalInterest * 100) / 100);
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

  // New calculate functions
  const calculateCompoundInterest = () => {
    const P = parseFloat(compoundPrincipal);
    const r = parseFloat(compoundRate) / 100;
    const t = parseFloat(compoundTime);
    const n = parseFloat(compoundFrequency);
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
      const amount = P * Math.pow(1 + (r / n), n * t);
      const interest = amount - P;
      
      setCompoundResult(Math.round(amount * 100) / 100);
      setTotalCompoundInterest(Math.round(interest * 100) / 100);
    }
  };

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const r = parseFloat(sipRate) / 100 / 12; // Monthly interest rate
    const t = parseFloat(sipYears) * 12; // Total months
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(t)) {
      const totalInvestment = P * t;
      const maturityValue = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
      const wealthGained = maturityValue - totalInvestment;
      
      setSipTotalInvestment(Math.round(totalInvestment * 100) / 100);
      setSipMaturityValue(Math.round(maturityValue * 100) / 100);
      setSipWealthGained(Math.round(wealthGained * 100) / 100);
    }
  };

  // Fixed Deposit calculation
  const calculateFD = () => {
    const P = parseFloat(fdAmount);
    const r = parseFloat(fdRate) / 100;
    const t = parseFloat(fdYears);
    const n = parseFloat(fdCompounding);
    
    if (!isNaN(P) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
      const maturityAmount = P * Math.pow(1 + (r / n), n * t);
      const interestEarned = maturityAmount - P;
      
      setFdMaturityAmount(Math.round(maturityAmount * 100) / 100);
      setFdInterestEarned(Math.round(interestEarned * 100) / 100);
    }
  };

  // PPF calculation
  const calculatePPF = () => {
    const initialAmount = parseFloat(ppfAmount) || 0;
    const yearlyContribution = parseFloat(ppfYearlyContribution);
    const r = parseFloat(ppfRate) / 100;
    const years = parseFloat(ppfYears);
    
    if (!isNaN(yearlyContribution) && !isNaN(r) && !isNaN(years)) {
      let totalAmount = initialAmount;
      let totalInvestment = initialAmount;
      
      for (let i = 0; i < years; i++) {
        // Add yearly contribution
        if (i > 0) {
          totalAmount += yearlyContribution;
          totalInvestment += yearlyContribution;
        }
        
        // Add interest for the year
        totalAmount += totalAmount * r;
      }
      
      setPpfMaturityAmount(Math.round(totalAmount * 100) / 100);
      setPpfTotalInvestment(Math.round(totalInvestment * 100) / 100);
      setPpfInterestEarned(Math.round((totalAmount - totalInvestment) * 100) / 100);
    }
  };

  // Retirement calculation
  const calculateRetirement = () => {
    const currentAge = parseFloat(retirementCurrentAge);
    const retireAge = parseFloat(retirementAge);
    const lifeExpectancy = parseFloat(retirementLifeExpectancy);
    const monthlyExpense = parseFloat(retirementMonthlyExpense);
    const currentSavings = parseFloat(retirementCurrentSavings);
    const expectedReturn = parseFloat(retirementExpectedReturn) / 100;
    const inflation = parseFloat(retirementInflation) / 100;
    
    if (!isNaN(currentAge) && !isNaN(retireAge) && !isNaN(lifeExpectancy) && 
        !isNaN(monthlyExpense) && !isNaN(expectedReturn) && !isNaN(inflation)) {
      const yearsToRetirement = retireAge - currentAge;
      const retirementDuration = lifeExpectancy - retireAge;
      
      // Calculate inflation-adjusted monthly expense at retirement
      const inflationAdjustedExpense = monthlyExpense * Math.pow((1 + inflation), yearsToRetirement);
      
      // Calculate corpus needed at retirement
      // Using the formula: Corpus = Monthly Expense * [((1+r)^n - (1+i)^n) / (r-i)]
      // Where r = expected return, i = inflation, n = retirement duration
      const r = expectedReturn / 12;
      const i = inflation / 12;
      const n = retirementDuration * 12;
      
      // When r = i, the formula becomes: Corpus = Monthly Expense * n
      let corpus;
      if (Math.abs(r - i) < 0.0001) {
        corpus = inflationAdjustedExpense * n;
      } else {
        corpus = inflationAdjustedExpense * ((Math.pow(1 + r, n) - Math.pow(1 + i, n)) / (r - i));
      }
      
      // Calculate future value of current savings
      const futureSavings = currentSavings * Math.pow((1 + expectedReturn), yearsToRetirement);
      
      // Calculate additional corpus needed
      const additionalCorpus = Math.max(0, corpus - futureSavings);
      
      // Calculate monthly savings needed
      const monthlySavingsNeeded = (additionalCorpus * expectedReturn/12) / 
                                   (Math.pow(1 + expectedReturn/12, yearsToRetirement * 12) - 1);
      
      setRetirementCorpusNeeded(Math.round(corpus));
      setRetirementMonthlySavingsNeeded(Math.round(monthlySavingsNeeded));
    }
  };

  // Home Loan Affordability calculation
  const calculateHomeLoanAffordability = () => {
    const annualIncome = parseFloat(homeAnnualIncome);
    const monthlyIncome = annualIncome / 12;
    const monthlyObligations = parseFloat(homeMonthlyObligations) || 0;
    const downPayment = parseFloat(homeDownPayment) || 0;
    const loanRate = parseFloat(homeLoanRate) / 100;
    const loanTerm = parseFloat(homeLoanTerm);
    
    if (!isNaN(annualIncome) && !isNaN(loanRate) && !isNaN(loanTerm)) {
      // Maximum EMI based on 40% of income (adjusted for existing obligations)
      const maxEMI = (monthlyIncome * 0.4) - monthlyObligations;
      
      // Maximum loan amount based on EMI
      const r = loanRate / 12;
      const n = loanTerm * 12;
      const maxLoanAmount = maxEMI * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
      
      // Affordable home value = loan amount + down payment
      const affordableValue = maxLoanAmount + downPayment;
      
      setHomeMaxLoanAmount(Math.round(maxLoanAmount));
      setHomeAffordableValue(Math.round(affordableValue));
      setHomeMonthlyEMI(Math.round(maxEMI));
    }
  };

  // Income Tax calculation
  const calculateIncomeTax = () => {
    const income = parseFloat(taxIncome);
    const deductions = parseFloat(taxDeductions) || 0;
    
    if (!isNaN(income)) {
      let taxableIncome = Math.max(0, income - deductions);
      let tax = 0;
      
      if (taxRegime === "old") {
        // Old tax regime calculation
        if (taxableIncome > 1000000) {
          tax += (taxableIncome - 1000000) * 0.3;
          taxableIncome = 1000000;
        }
        if (taxableIncome > 500000) {
          tax += (taxableIncome - 500000) * 0.2;
          taxableIncome = 500000;
        }
        if (taxableIncome > 250000) {
          tax += (taxableIncome - 250000) * 0.05;
        }
      } else {
        // New tax regime calculation
        if (taxableIncome > 1500000) {
          tax += (taxableIncome - 1500000) * 0.3;
          taxableIncome = 1500000;
        }
        if (taxableIncome > 1250000) {
          tax += (taxableIncome - 1250000) * 0.25;
          taxableIncome = 1250000;
        }
        if (taxableIncome > 1000000) {
          tax += (taxableIncome - 1000000) * 0.2;
          taxableIncome = 1000000;
        }
        if (taxableIncome > 750000) {
          tax += (taxableIncome - 750000) * 0.15;
          taxableIncome = 750000;
        }
        if (taxableIncome > 500000) {
          tax += (taxableIncome - 500000) * 0.1;
          taxableIncome = 500000;
        }
        if (taxableIncome > 300000) {
          tax += (taxableIncome - 300000) * 0.05;
        }
      }
      
      // Calculate cess
      const cess = tax * 0.04;
      const totalLiability = tax + cess;
      
      setTaxResult(Math.round(tax));
      setTaxCess(Math.round(cess));
      setTaxTotalLiability(Math.round(totalLiability));
    }
  };

  // Inflation calculation
  const calculateInflation = () => {
    const present = parseFloat(presentValue);
    const rate = parseFloat(inflationRate) / 100;
    const years = parseFloat(inflationYears);
    
    if (!isNaN(present) && !isNaN(rate) && !isNaN(years)) {
      const future = present * Math.pow(1 + rate, years);
      const loss = future - present;
      
      setFutureValue(Math.round(future * 100) / 100);
      setValueLoss(Math.round(loss * 100) / 100);
    }
  };

  // Loan Comparison calculation
  const compareLoanOptions = () => {
    const amount1 = parseFloat(loan1Amount);
    const rate1 = parseFloat(loan1Rate) / 12 / 100;
    const term1 = parseFloat(loan1Term) * 12;
    
    const amount2 = parseFloat(loan2Amount);
    const rate2 = parseFloat(loan2Rate) / 12 / 100;
    const term2 = parseFloat(loan2Term) * 12;
    
    if (!isNaN(amount1) && !isNaN(rate1) && !isNaN(term1)) {
      const emi1 = (amount1 * rate1 * Math.pow(1 + rate1, term1)) / (Math.pow(1 + rate1, term1) - 1);
      const totalAmount1 = emi1 * term1;
      const totalInterest1 = totalAmount1 - amount1;
      
      setLoan1EMI(Math.round(emi1 * 100) / 100);
      setLoan1TotalInterest(Math.round(totalInterest1 * 100) / 100);
      setLoan1Total(Math.round(totalAmount1 * 100) / 100);
    }
    
    if (!isNaN(amount2) && !isNaN(rate2) && !isNaN(term2)) {
      const emi2 = (amount2 * rate2 * Math.pow(1 + rate2, term2)) / (Math.pow(1 + rate2, term2) - 1);
      const totalAmount2 = emi2 * term2;
      const totalInterest2 = totalAmount2 - amount2;
      
      setLoan2EMI(Math.round(emi2 * 100) / 100);
      setLoan2TotalInterest(Math.round(totalInterest2 * 100) / 100);
      setLoan2Total(Math.round(totalAmount2 * 100) / 100);
    }
  };

  // Goal Savings calculation
  const calculateGoalSavings = () => {
    const target = parseFloat(goalAmount);
    const years = parseFloat(goalYears);
    const existing = parseFloat(goalExisting) || 0;
    const rateOfReturn = parseFloat(goalReturn) / 100;
    
    if (!isNaN(target) && !isNaN(years) && !isNaN(rateOfReturn)) {
      // Monthly rate of return
      const monthlyRate = rateOfReturn / 12;
      
      // Future value of existing savings
      const futureExisting = existing * Math.pow(1 + rateOfReturn, years);
      
      // Amount needed beyond existing savings
      const additionalNeeded = target - futureExisting;
      
      if (additionalNeeded <= 0) {
        // Already have enough with current savings
        setMonthlySavingsNeeded(0);
        setGoalTotalContribution(existing);
        setGoalTotalReturns(futureExisting - existing);
      } else {
        // Calculate monthly savings using PMT formula
        const n = years * 12; // Total number of months
        const monthlyPayment = additionalNeeded / 
          ((Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n)));
        
        const totalContribution = existing + (monthlyPayment * n);
        const totalReturns = target - totalContribution;
        
        setMonthlySavingsNeeded(Math.round(monthlyPayment * 100) / 100);
        setGoalTotalContribution(Math.round(totalContribution * 100) / 100);
        setGoalTotalReturns(Math.round(totalReturns * 100) / 100);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Financial Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Calculate EMIs, interest rates, and more</p>
      </div>

      <Tabs defaultValue="emi" className="w-full">
        <TabsList className="grid grid-cols-6 gap-2 mb-8 p-2 bg-transparent">
          <TabsTrigger 
            value="emi" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            EMI Calculator
          </TabsTrigger>
          <TabsTrigger 
            value="simple-interest" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Simple Interest
          </TabsTrigger>
          <TabsTrigger 
            value="compound-interest" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Compound Interest
          </TabsTrigger>
          <TabsTrigger 
            value="sip" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            SIP Calculator
          </TabsTrigger>
          <TabsTrigger 
            value="fd" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Fixed Deposit
          </TabsTrigger>
          <TabsTrigger 
            value="ppf" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            PPF Calculator
          </TabsTrigger>
          <TabsTrigger 
            value="retirement" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Retirement
          </TabsTrigger>
          <TabsTrigger 
            value="home-loan" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Home Loan
          </TabsTrigger>
          <TabsTrigger 
            value="tax" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Income Tax
          </TabsTrigger>
          <TabsTrigger 
            value="inflation" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Inflation
          </TabsTrigger>
          <TabsTrigger 
            value="loan-comparison" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Loan Comparison
          </TabsTrigger>
          <TabsTrigger 
            value="goal-savings" 
            className="data-[state=active]:bg-violet-700 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg transition-colors text-sm"
          >
            Goal Savings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emi" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="emi-calculator-title">EMI Calculator</CardTitle>
              <CardDescription>
                Calculate your Equated Monthly Installment (EMI) for loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                  <Input 
                    id="loan-amount" 
                    placeholder="e.g., 500000" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
                  <Input 
                    id="interest-rate" 
                    placeholder="e.g., 10.5" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="loan-term">Loan Term (years)</Label>
                  <Input 
                    id="loan-term" 
                    placeholder="e.g., 5" 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                  <Button onClick={calculateEMI} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                  Calculate EMI
                </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {emiResult !== null ? (
                    <div className="space-y-3">
                      <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Interest Rate: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{interestRate}% p.a.</span>
                          </span>
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Loan Term: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{loanTerm} {Number(loanTerm) === 1 ? 'year' : 'years'}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Your monthly EMI would be:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(emiResult!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Principal Amount:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(parseFloat(loanAmount))}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Interest:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(emiTotalInterest!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Amount Payable:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(emiTotalAmount!)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter loan details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                  </div>
                )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simple-interest" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="simple-interest-calculator-title">Simple Interest Calculator</CardTitle>
              <CardDescription>
                Calculate simple interest on your investments or loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="principal">Principal Amount (₹)</Label>
                  <Input 
                    id="principal" 
                    placeholder="e.g., 10000" 
                    value={simpleAmount}
                    onChange={(e) => setSimpleAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="simple-rate">Interest Rate (% per annum)</Label>
                  <Input 
                    id="simple-rate" 
                    placeholder="e.g., 5" 
                    value={simpleRate}
                    onChange={(e) => setSimpleRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="time-period">Time Period (years)</Label>
                  <Input 
                    id="time-period" 
                    placeholder="e.g., 2" 
                    value={simpleTime}
                    onChange={(e) => setSimpleTime(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <Button onClick={calculateSimpleInterest} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Interest
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {simpleInterestResult !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Simple Interest:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(simpleInterestResult!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Principal Amount:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(parseFloat(simpleAmount))}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Amount:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">
                          ₹{formatIndianCurrency(parseFloat(simpleAmount) + simpleInterestResult!)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter investment details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compound-interest" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="compound-interest-calculator-title">Compound Interest Calculator</CardTitle>
              <CardDescription>
                Calculate growth of investments with interest compounding over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="compound-principal">Principal Amount (₹)</Label>
                    <Input 
                      id="compound-principal" 
                      placeholder="e.g., 100000" 
                      value={compoundPrincipal}
                      onChange={(e) => setCompoundPrincipal(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="compound-rate">Annual Interest Rate (%)</Label>
                    <Input 
                      id="compound-rate" 
                      placeholder="e.g., 8" 
                      value={compoundRate}
                      onChange={(e) => setCompoundRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="compound-time">Time Period (years)</Label>
                    <Input 
                      id="compound-time" 
                      placeholder="e.g., 5" 
                      value={compoundTime}
                      onChange={(e) => setCompoundTime(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="compound-frequency">Compounding Frequency</Label>
                    <Select 
                      value={compoundFrequency} 
                      onValueChange={setCompoundFrequency}
                    >
                      <SelectTrigger id="compound-frequency" className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800">
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-Annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateCompoundInterest} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {compoundResult !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Final Amount:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(compoundResult!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Principal Amount:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(parseFloat(compoundPrincipal))}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Interest Earned:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(totalCompoundInterest!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Interest Rate: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{compoundRate}% p.a.</span>
                          </span>
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Time Period: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{compoundTime} years</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter investment details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sip" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="sip-calculator-title">SIP Calculator</CardTitle>
              <CardDescription>
                Calculate returns on your monthly Systematic Investment Plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="sip-amount">Monthly Investment (₹)</Label>
                    <Input 
                      id="sip-amount" 
                      placeholder="e.g., 5000" 
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="sip-rate">Expected Annual Return (%)</Label>
                    <Input 
                      id="sip-rate" 
                      placeholder="e.g., 12" 
                      value={sipRate}
                      onChange={(e) => setSipRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="sip-years">Investment Period (years)</Label>
                    <Input 
                      id="sip-years" 
                      placeholder="e.g., 10" 
                      value={sipYears}
                      onChange={(e) => setSipYears(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <Button onClick={calculateSIP} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Returns
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {sipMaturityValue !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Maturity Value:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(sipMaturityValue!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Investment:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(sipTotalInvestment!)}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Wealth Gained:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(sipWealthGained!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Monthly SIP: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(parseFloat(sipAmount))}</span>
                          </span>
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Time Period: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{sipYears} years</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter SIP details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fd" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="fd-calculator-title">Fixed Deposit Calculator</CardTitle>
              <CardDescription>
                Calculate maturity amount and interest earned for a fixed deposit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fd-amount">Principal Amount (₹)</Label>
                    <Input 
                      id="fd-amount" 
                      placeholder="e.g., 100000" 
                      value={fdAmount}
                      onChange={(e) => setFdAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="fd-rate">Interest Rate (% per annum)</Label>
                    <Input 
                      id="fd-rate" 
                      placeholder="e.g., 8" 
                      value={fdRate}
                      onChange={(e) => setFdRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="fd-years">Time Period (years)</Label>
                    <Input 
                      id="fd-years" 
                      placeholder="e.g., 5" 
                      value={fdYears}
                      onChange={(e) => setFdYears(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="fd-compounding">Compounding Frequency</Label>
                    <Select 
                      value={fdCompounding} 
                      onValueChange={setFdCompounding}
                    >
                      <SelectTrigger id="fd-compounding" className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800">
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-Annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateFD} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Maturity Amount
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {fdMaturityAmount !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Maturity Amount:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(fdMaturityAmount!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Interest Earned:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(fdInterestEarned!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Interest Rate: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{fdRate}% p.a.</span>
                          </span>
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Time Period: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{fdYears} years</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter fixed deposit details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ppf" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="ppf-calculator-title">PPF Calculator</CardTitle>
              <CardDescription>
                Calculate maturity amount and interest earned for a Public Provident Fund
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="ppf-amount">Initial Amount (₹)</Label>
                    <Input 
                      id="ppf-amount" 
                      placeholder="e.g., 100000" 
                      value={ppfAmount}
                      onChange={(e) => setPpfAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="ppf-yearly-contribution">Yearly Contribution (₹)</Label>
                    <Input 
                      id="ppf-yearly-contribution" 
                      placeholder="e.g., 5000" 
                      value={ppfYearlyContribution}
                      onChange={(e) => setPpfYearlyContribution(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="ppf-rate">Interest Rate (%)</Label>
                    <Input 
                      id="ppf-rate" 
                      placeholder="e.g., 7.1" 
                      value={ppfRate}
                      onChange={(e) => setPpfRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="ppf-years">Investment Period (years)</Label>
                    <Input 
                      id="ppf-years" 
                      placeholder="e.g., 15" 
                      value={ppfYears}
                      onChange={(e) => setPpfYears(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <Button onClick={calculatePPF} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Maturity Amount
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {ppfMaturityAmount !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Maturity Amount:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(ppfMaturityAmount!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Interest Earned:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(ppfInterestEarned!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Interest Rate: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{ppfRate}%</span>
                          </span>
                          <span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Time Period: </span>
                            <span className="font-semibold text-ledger-700 dark:text-ledger-400">{ppfYears} years</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter PPF details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retirement" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="retirement-calculator-title">Retirement Calculator</CardTitle>
              <CardDescription>
                Plan for your retirement by calculating corpus needed and monthly savings required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-age">Current Age</Label>
                      <Input 
                        id="current-age" 
                        placeholder="e.g., 30" 
                        value={retirementCurrentAge}
                        onChange={(e) => setRetirementCurrentAge(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="retirement-age">Retirement Age</Label>
                      <Input 
                        id="retirement-age" 
                        placeholder="e.g., 60" 
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="life-expectancy">Life Expectancy</Label>
                    <Input 
                      id="life-expectancy" 
                      placeholder="e.g., 85" 
                      value={retirementLifeExpectancy}
                      onChange={(e) => setRetirementLifeExpectancy(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="monthly-expense">Current Monthly Expenses (₹)</Label>
                    <Input 
                      id="monthly-expense" 
                      placeholder="e.g., 50000" 
                      value={retirementMonthlyExpense}
                      onChange={(e) => setRetirementMonthlyExpense(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="current-savings">Current Retirement Savings (₹)</Label>
                    <Input 
                      id="current-savings" 
                      placeholder="e.g., 1000000" 
                      value={retirementCurrentSavings}
                      onChange={(e) => setRetirementCurrentSavings(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expected-return">Expected Return (% p.a.)</Label>
                      <Input 
                        id="expected-return" 
                        placeholder="e.g., 8" 
                        value={retirementExpectedReturn}
                        onChange={(e) => setRetirementExpectedReturn(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="inflation-rate">Inflation Rate (% p.a.)</Label>
                      <Input 
                        id="inflation-rate" 
                        placeholder="e.g., 6" 
                        value={retirementInflation}
                        onChange={(e) => setRetirementInflation(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateRetirement} className="w-full mt-2 bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Retirement Plan
                </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {retirementCorpusNeeded !== null ? (
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Retirement Corpus Needed:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(retirementCorpusNeeded!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Monthly Savings Required:</p>
                        <p className="text-xl font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(retirementMonthlySavingsNeeded!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                        <p className="mt-1">Years until retirement: {parseInt(retirementAge) - parseInt(retirementCurrentAge)}</p>
                        <p className="mt-1">Years in retirement: {parseInt(retirementLifeExpectancy) - parseInt(retirementAge)}</p>
                        <p className="mt-1">Inflation-adjusted monthly expenses at retirement: 
                          ₹{formatIndianCurrency(parseFloat(retirementMonthlyExpense) * 
                          Math.pow(1 + parseFloat(retirementInflation)/100, parseInt(retirementAge) - parseInt(retirementCurrentAge)))}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter retirement details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="home-loan" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="home-loan-calculator-title">Home Loan Affordability Calculator</CardTitle>
              <CardDescription>
                Find out how much home loan you can afford based on your income
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="annual-income">Annual Income (₹)</Label>
                    <Input 
                      id="annual-income" 
                      placeholder="e.g., 1200000" 
                      value={homeAnnualIncome}
                      onChange={(e) => setHomeAnnualIncome(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="monthly-obligations">Existing Monthly Obligations (₹)</Label>
                    <Input 
                      id="monthly-obligations" 
                      placeholder="e.g., 15000" 
                      value={homeMonthlyObligations}
                      onChange={(e) => setHomeMonthlyObligations(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="down-payment">Down Payment (₹)</Label>
                    <Input 
                      id="down-payment" 
                      placeholder="e.g., 1000000" 
                      value={homeDownPayment}
                      onChange={(e) => setHomeDownPayment(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="loan-interest">Loan Interest Rate (% p.a.)</Label>
                      <Input 
                        id="loan-interest" 
                        placeholder="e.g., 8.5" 
                        value={homeLoanRate}
                        onChange={(e) => setHomeLoanRate(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="loan-term">Loan Term (years)</Label>
                      <Input 
                        id="loan-term" 
                        placeholder="e.g., 20" 
                        value={homeLoanTerm}
                        onChange={(e) => setHomeLoanTerm(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateHomeLoanAffordability} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Affordability
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {homeAffordableValue !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Property You Can Afford:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(homeAffordableValue!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Maximum Loan Amount:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(homeMaxLoanAmount!)}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Affordable Monthly EMI:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(homeMonthlyEMI!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Based on 40% of your monthly income (₹{formatIndianCurrency(parseFloat(homeAnnualIncome) / 12 * 0.4)}) 
                          minus existing obligations.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Down payment: ₹{formatIndianCurrency(parseFloat(homeDownPayment) || 0)} 
                          ({homeDownPayment ? Math.round((parseFloat(homeDownPayment) / homeAffordableValue!) * 100) : 0}% of property value)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter your details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                  </div>
                )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="tax-calculator-title">Income Tax Calculator</CardTitle>
              <CardDescription>
                Calculate your tax liability based on income and deductions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tax-income">Annual Income (₹)</Label>
                    <Input 
                      id="tax-income" 
                      placeholder="e.g., 1000000" 
                      value={taxIncome}
                      onChange={(e) => setTaxIncome(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="tax-deductions">Total Deductions (₹)</Label>
                    <Input 
                      id="tax-deductions" 
                      placeholder="e.g., 150000" 
                      value={taxDeductions}
                      onChange={(e) => setTaxDeductions(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="tax-regime">Tax Regime</Label>
                    <Select value={taxRegime} onValueChange={setTaxRegime}>
                      <SelectTrigger id="tax-regime" className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
                        <SelectValue placeholder="Select tax regime" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800">
                        <SelectItem value="old">Old Regime</SelectItem>
                        <SelectItem value="new">New Regime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateIncomeTax} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Tax
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {taxResult !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Income Tax:</p>
                        <p className="text-xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(taxResult)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Health & Education Cess (4%):</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(taxCess!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Tax Liability:</p>
                        <p className="text-xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(taxTotalLiability!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Tax calculated as per {taxRegime === "old" ? "Old" : "New"} Tax Regime
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter income details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inflation" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="inflation-calculator-title">Inflation Calculator</CardTitle>
              <CardDescription>
                Calculate how inflation affects the value of money over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="present-value">Present Value (₹)</Label>
                    <Input 
                      id="present-value" 
                      placeholder="e.g., 100000" 
                      value={presentValue}
                      onChange={(e) => setPresentValue(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="inflation-rate">Expected Inflation Rate (% per annum)</Label>
                    <Input 
                      id="inflation-rate" 
                      placeholder="e.g., 6" 
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="inflation-years">Number of Years</Label>
                    <Input 
                      id="inflation-years" 
                      placeholder="e.g., 10" 
                      value={inflationYears}
                      onChange={(e) => setInflationYears(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <Button onClick={calculateInflation} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Future Value
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {futureValue !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Future Value:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(futureValue)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Present Value:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(parseFloat(presentValue))}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Value Eroded by Inflation:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(valueLoss!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          At {inflationRate}% annual inflation, your money will lose {Math.round((valueLoss! / parseFloat(presentValue)) * 100)}% of its purchasing power over {inflationYears} years.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter values and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loan-comparison" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="loan-comparison-calculator-title">Loan Comparison Calculator</CardTitle>
              <CardDescription>
                Compare different loan offers to find the best option
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-medium mb-3">Loan Option 1</h3>
                    <div className="grid gap-3">
                      <Label htmlFor="loan1-amount">Loan Amount (₹)</Label>
                      <Input 
                        id="loan1-amount" 
                        placeholder="e.g., 500000" 
                        value={loan1Amount}
                        onChange={(e) => setLoan1Amount(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-3 mt-3">
                      <Label htmlFor="loan1-rate">Interest Rate (% per annum)</Label>
                      <Input 
                        id="loan1-rate" 
                        placeholder="e.g., 10.5" 
                        value={loan1Rate}
                        onChange={(e) => setLoan1Rate(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-3 mt-3">
                      <Label htmlFor="loan1-term">Loan Term (years)</Label>
                      <Input 
                        id="loan1-term" 
                        placeholder="e.g., 5" 
                        value={loan1Term}
                        onChange={(e) => setLoan1Term(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Loan Option 2</h3>
                    <div className="grid gap-3">
                      <Label htmlFor="loan2-amount">Loan Amount (₹)</Label>
                      <Input 
                        id="loan2-amount" 
                        placeholder="e.g., 500000" 
                        value={loan2Amount}
                        onChange={(e) => setLoan2Amount(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-3 mt-3">
                      <Label htmlFor="loan2-rate">Interest Rate (% per annum)</Label>
                      <Input 
                        id="loan2-rate" 
                        placeholder="e.g., 9.5" 
                        value={loan2Rate}
                        onChange={(e) => setLoan2Rate(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                    
                    <div className="grid gap-3 mt-3">
                      <Label htmlFor="loan2-term">Loan Term (years)</Label>
                      <Input 
                        id="loan2-term" 
                        placeholder="e.g., 7" 
                        value={loan2Term}
                        onChange={(e) => setLoan2Term(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={compareLoanOptions} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white mt-4">
                    Compare Loans
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {loan1EMI !== null && loan2EMI !== null ? (
                    <div className="space-y-4">
                      <div className="border-b pb-3 mb-3">
                        <h3 className="text-lg font-medium mb-2">Loan Option 1</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan1EMI)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan1TotalInterest!)}</p>
                          </div>
                          <div className="col-span-2 mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Payable:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan1Total!)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b pb-3 mb-3">
                        <h3 className="text-lg font-medium mb-2">Loan Option 2</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan2EMI)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan2TotalInterest!)}</p>
                          </div>
                          <div className="col-span-2 mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Payable:</p>
                            <p className="font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(loan2Total!)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-lg font-medium mb-3">Comparison Summary</h3>
                        <div className="p-3 rounded-md bg-ledger-50 dark:bg-ledger-900">
                          {loan1TotalInterest! < loan2TotalInterest! ? (
                            <p className="text-ledger-700 dark:text-ledger-300">
                              Option 1 saves you ₹{formatIndianCurrency(loan2TotalInterest! - loan1TotalInterest!)} in interest payments.
                            </p>
                          ) : (
                            <p className="text-ledger-700 dark:text-ledger-300">
                              Option 2 saves you ₹{formatIndianCurrency(loan1TotalInterest! - loan2TotalInterest!)} in interest payments.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter loan details and compare</p>
                        <p>Comparison results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goal-savings" className="mt-10 pt-4 relative z-10">
          <Card className="dark:bg-gray-800 dark:border-gray-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl" id="goal-savings-calculator-title">Goal Savings Calculator</CardTitle>
              <CardDescription>
                Calculate how much you need to save monthly to reach your financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Inputs */}
                <div className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="goal-amount">Target Amount (₹)</Label>
                    <Input 
                      id="goal-amount" 
                      placeholder="e.g., 1000000" 
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="goal-years">Time to Achieve Goal (years)</Label>
                    <Input 
                      id="goal-years" 
                      placeholder="e.g., 10" 
                      value={goalYears}
                      onChange={(e) => setGoalYears(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="goal-existing">Existing Savings (₹)</Label>
                    <Input 
                      id="goal-existing" 
                      placeholder="e.g., 100000" 
                      value={goalExisting}
                      onChange={(e) => setGoalExisting(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="goal-return">Expected Annual Return (%)</Label>
                    <Input 
                      id="goal-return" 
                      placeholder="e.g., 8" 
                      value={goalReturn}
                      onChange={(e) => setGoalReturn(e.target.value)}
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                    />
                  </div>
                  
                  <Button onClick={calculateGoalSavings} className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
                    Calculate Monthly Savings
                  </Button>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {monthlySavingsNeeded !== null ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Monthly Savings Required:</p>
                        <p className="text-2xl font-bold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(monthlySavingsNeeded)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Total Contributions:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(goalTotalContribution!)}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Estimated Returns:</p>
                        <p className="text-lg font-semibold text-ledger-700 dark:text-ledger-400">₹{formatIndianCurrency(goalTotalReturns!)}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Target goal amount: ₹{formatIndianCurrency(parseFloat(goalAmount))}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Time period: {goalYears} years
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Expected returns: {goalReturn}% per annum
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-2 text-lg">Enter goal details and calculate</p>
                        <p>Results will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default FinancialCalculator;
