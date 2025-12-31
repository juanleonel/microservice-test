export interface AccountApiResponse {
  success: boolean;
  account: Account;
}

export interface Account {
  id: string;
  name: string;
  number: string;
  type: string;
  status: string;
}
