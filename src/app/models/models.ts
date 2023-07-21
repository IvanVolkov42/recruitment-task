export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export interface Payment {
  count: number;
  id: number;
  status: string;
  receiver: string;
  internalFieldA: string;
  xYZRandomField: string;
}

export interface Country {
  id: number;
  name: string;
  flag: string;
  code: string
  someWeirdServerFieldNameWithCount: number | null;
}
