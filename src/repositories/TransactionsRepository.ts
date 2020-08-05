import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, { type, value }) => {
      const currentValue = type === 'income' ? value : 0;
      return accumulator + currentValue;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, { type, value }) => {
      const currentValue = type === 'outcome' ? value : 0;
      return accumulator + currentValue;
    }, 0);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
