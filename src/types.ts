export type Transaction = {
  id?: number;
  date: Date;
  amount: number;
  description: string;

  recurrenceInterval?: RecurrenceInterval;
  endDate?: Date;
}

export type RecurrenceInterval =
  | 'NON'
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'YEARLY';
