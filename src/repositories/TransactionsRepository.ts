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
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeValue = 0;
    let outcomeValue = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        incomeValue += transaction.value;
        return 'income';
      }
      if (transaction.type === 'outcome') {
        outcomeValue += transaction.value;
        return 'outcome';
      }

      return false;
    });

    const total = incomeValue - outcomeValue;

    return { income: incomeValue, outcome: outcomeValue, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
