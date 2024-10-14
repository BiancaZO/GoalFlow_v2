import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';  
import AddTransactionForm from './AddTransactionForm';  
import Header from './Header';

import { Pie } from 'react-chartjs-2';  

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // Função para buscar transações, enviando o token JWT
  const fetchTransactions = async () => {
    try {
        const token = localStorage.getItem('token');  // Recupera o token JWT do localStorage
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            'x-auth-token': token  // Envia o token JWT no cabeçalho
          }
        });
        setTransactions(res.data);
        calculateSummary(res.data);  
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

  useEffect(() => {
    fetchTransactions();  // Busca transações ao carregar a página
  }, []);

  // Função para calcular o resumo de receita e despesa
  const calculateSummary = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
  };

  return (
    <>
      <Header />    
    <div className="dashboard-container">
      <h1>Welcome to Your Financial Dashboard</h1>

      <div className="dashboard-summary">
        <div className="summary-box">
          <h3>Total Income</h3>
          <p>${income}</p>
        </div>
        <div className="summary-box">
          <h3>Total Expense</h3>
          <p>${expense}</p>
        </div>
        <div className="summary-box">
          <h3>Balance</h3>
          <p>${income - expense}</p>
        </div>
      </div>

      <div className="dashboard-charts">
        {transactions.length > 0 ? (
          <div className="chart-box">
            <h3>Income vs Expense</h3>
            {income && expense ? (
              <Pie
                data={{
                  labels: ['Income', 'Expense'],
                  datasets: [
                    {
                      label: 'Income vs Expense',
                      data: [income, expense],
                      backgroundColor: ['#4CAF50', '#F44336'],
                    },
                  ],
                }}
              />
            ) : (
              <p>Loading chart...</p>  // Mostra enquanto o gráfico está carregando
            )}
          </div>
        ) : (
          <p>No transactions available</p>  // Mostra se não houver transações
        )}
      </div>

      <div className="add-transaction">
        <h3>Add New Transaction</h3>
        <AddTransactionForm onTransactionsAdded={fetchTransactions} />  
      </div>
    </div>
     </>
  );
}

export default Dashboard;


//with Goals -code with errors
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';  
// import AddTransactionForm from './AddTransactionForm';  

// import { Bar, Pie } from 'react-chartjs-2';  

// function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [goals, setGoals] = useState([]);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   // JWT token unable for now, for make test easier
//   const fetchTransactions = async () => {
//     try {
//         const token = localStorage.getItem('token');  // recover token
//         const res = await axios.get('http://localhost:5000/api/dashboard', {
//           headers: {
//             'x-auth-token': token  // send token
//           }
//         });
//         setTransactions(res.data);
//         calculateSummary(res.data);  
//       } catch (err) {
//         console.error('Error fetching transactions:', err);
//       }
//     };

//     const fetchGoals = async () => {
//         try {
//           //const token = localStorage.getItem('token');  // Recuperar o token JWT
//           const res = await axios.get('http://localhost:5000/api/goals', {
//             // headers: {
//             //   'x-auth-token': token  // Enviar o token JWT no cabeçalho
//             // }
//           });
//           setGoals(res.data);  
//         } catch (err) {
//           console.error('Error fetching goals:', err);
//         }
//       };


//   useEffect(() => {
//     fetchTransactions();  // Busca transações ao carregar a página
//     fetchGoals();  // Busca metas ao carregar a página
//   }, []);


//   const calculateSummary = (transactions) => {

//     let totalIncome = 0;
//     let totalExpense = 0;

//     transactions.forEach((transaction) => {
//       if (transaction.type === 'income') {
//         totalIncome += transaction.amount;
//       } else if (transaction.type === 'expense') {
//         totalExpense += transaction.amount;
//       }
//     });
//     setIncome(totalIncome);
//     setExpense(totalExpense);
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome to Your Financial Dashboard</h1>

//       <div className="dashboard-summary">
//         <div className="summary-box">
//           <h3>Total Income</h3>
//           <p>${income}</p>
//         </div>
//         <div className="summary-box">
//           <h3>Total Expense</h3>
//           <p>${expense}</p>
//         </div>
//         <div className="summary-box">
//           <h3>Balance</h3>
//           <p>${income - expense}</p>
//         </div>
//       </div>

//       <div className="dashboard-charts">
//         {transactions.length > 0 ? (
//           <div className="chart-box">
//             <h3>Income vs Expense</h3>
//             <Pie
//               data={{
//                 labels: ['Income', 'Expense'],
//                 datasets: [
//                   {
//                     label: 'Income vs Expense',
//                     data: [income, expense],
//                     backgroundColor: ['#4CAF50', '#F44336'],
//                   },
//                 ],
//               }}
//             />
//           </div>
//         ) : (
//           <p>No transactions available</p>
//         )}
//       </div>

//       <div className="goal-section">
//         <h3>Your Financial Goals</h3>
//         {goals.length > 0 ? (
//           <ul>
//             {goals.map((goal) => (
//               <li key={goal._id}>
//                 {goal.name}: ${goal.amount} by {new Date(goal.targetDate).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No goals available</p>
//         )}
//       </div>

//       <div className="add-transaction">
//         <h3>Add New Transaction</h3>
//         <AddTransactionForm onTransactionsAdded={fetchTransactions} />  
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


