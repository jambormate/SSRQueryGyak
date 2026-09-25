import { Injectable } from '@nestjs/common';
import { Expense } from './expense.js';

@Injectable()
export class AppService {
  expenses: Expense[] = [
    {
      name: 'Élelmiszer',
      amount: 12500,
      category: 'food',
    },
    {
      name: 'Villanyszámla',
      amount: 18500,
      category: 'utilities',
    },
    {
      name: 'Netflix',
      amount: 3990,
      category: 'entertainment',
    },
    {
      name: 'Buszjegy',
      amount: 2500,
      category: 'misc',
    },
    {
      name: 'Ebéd',
      amount: 4200,
      category: 'food',
    },
    {
      name: 'Internet',
      amount: 7500,
      category: 'utilities',
    },
    {
      name: 'Mozi',
      amount: 4500,
      category: 'entertainment',
    },
    {
      name: 'Tisztítószerek',
      amount: 6300,
      category: 'misc',
    },
    {
      name: 'Bevásárlás',
      amount: 15600,
      category: 'food',
    },
    {
      name: 'Vízszámla',
      amount: 5200,
      category: 'utilities',
    },
  ];
  getAll(): Expense[] {
    return this.expenses;
  }
  getTop3(): Expense[] {
    return [...this.expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }
  search(name: string): Expense[] {
    return this.expenses.filter(expense =>
      expense.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  getExpensive(amount: number): Expense[] {
    return this.expenses.filter(expense => expense.amount > amount);
  }
  getTotal(): number {
    return this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }
  getStats() {
    const count = this.expenses.length;
    const total = this.getTotal();
    const average = total / count;
    const categories = new Map<
      string,
      {
        darab: number;
        osszeg: number;
        atlag: number;
      }
    >();
    for (const expense of this.expenses) {
      if (!categories.has(expense.category)) {
        categories.set(expense.category, {
          darab: 0,
          osszeg: 0,
          atlag: 0
        });
      }
      const category = categories.get(expense.category)!;
      category.darab++;
      category.osszeg += expense.amount;
      category.atlag = category.osszeg / category.darab;
    }
    return {
      count,
      total,
      average,
      categories
    };
  }
}