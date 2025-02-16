import { ColorValue } from 'react-native';

export interface IHomeItem {
  title: string,
  icon: any,
  backgroundColor: string,
  color: string
}

export interface IOptions {
  label: string;
  value: string;
}

export interface IRoles {
  id: number,
  name: string
  guard_name: string
}

export interface IUser {
  first_name: string,
  last_name: string
  email: string,
  mobile: string,
  is_mobile_verified: boolean,
  pin: string,
  id: number,
  role_names: string[]
}


export interface IAgentHome {
  totalCollectionsToday: number,
  totalCollectionsThisWeek: number,
  totalOutstanding: number,
  collectionRate: string
}

export interface ICollectionHome {
  clientName: string,
  contact: string
}

export interface ICollectionToday extends ICollectionHome {
  amountCollected: number,
  date: string,
}
export interface ICollectionOverDue extends ICollectionHome {
  amountOverdue: number,
  daysOverdue: number,
}

export interface ICrmTag {
  id: number,
  name: string,
  slug: string,
  type: string,
  color: string,
  color_code: string;
  order_column: string,
  created_at: string,
  updated_at: string
}

export interface ICrmPriority {
  id: number,
  name: string,
  slug: string,
  type: string,
  color: string,
  order_column: string,
  created_at: string,
  updated_at: string
}

export interface ICrmLeadSource {
  id: number;
  name: string;
  slug: string;
  type: string;
  color: string;
  color_code: string;
  order: string;
  created_at: string;
  updated_at: string
}

export interface IFollowupMode {
  id: number;
  name: string;
  slug: string;
  type: string;
  color: string;
  color_code: string;
  order: string;
  created_at: string;
  updated_at: string
}

export interface IFollowupStatus {
  id: number;
  name: string;
  slug: string;
  type: string;
  color: string;
  color_code: string;
  order: string;
  created_at: string;
  updated_at: string
}

export interface IFollowupResult {
  id: number;
  name: string;
  slug: string;
  type: string;
  color: string;
  color_code: string;
  order: string;
  created_at: string;
  updated_at: string
}
export interface IRemark {
  id: number;
  payment_id: string;
  customer_id: number;
  installment_id: string
  transaction_id: string
  remark: string
  created_at: string
  updated_at: string
  created_by: number,
  updated_by: string
  deleted_at: string
}

export interface IFollowup_modes {
  id: number,
  name: string,
  color: string,
}
export interface IFollowup_priorities {
  id: number,
  name: string,
  color: string,
}

export interface IFollowup_statuses {
  id: number,
  name: string,
  color: string,
}

export interface IFollowup_results {
  id: number,
  name: string,
  color: string,
}

export interface IFollowup {
  id: number;
  customer_id: number;
  followup_datetime: string;
  completed_at: string;
  notes: string;
  outcome: string;
  reminded_at: string;
  next_reminder: string;
  created_at: string;
  updated_at: string;
  assigned_to: number;
  created_by: string;
  updated_by: string;
  followup_modes: IFollowup_modes[],
  followup_priorities: IFollowup_priorities[],
  followup_statuses: IFollowup_statuses[],
  followup_results: IFollowup_results[]
}

export interface ILead {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  mobile: string,
  alternate_contact: string,
  address_1: string,
  address_2: string,
  address_city: string,
  address_state: string,
  address_pincode: string,
  lead_statuses: ICrmTag[],
  lead_sources: ICrmLeadSource[],
  remarks: IRemark[]
  followups: IFollowup[]
}

export interface IInfoCreateLead {
  isLoading: boolean
  first_name: string,
  last_name: string,
  email: string,
  mobile: string,
  lead_source: string,
  tags: string,
  alternate_contact: string,
  address_1: string,
  address_2: string,
  address_city: string,
  address_state: string,
  address_pincode: string
}

// export interface IHomeCollectionHeader {
//   title: string,
//   icon: any,
//   backgroundColor: string,
//   color: string,
//   principle: number,
//   interest: number,
//   total: number,
//   received: number,
//   pending: number,
//   overdue: number
// }


//Collections
export interface ICustomer {
  "id": number
  "customer_id": string
  "first_name": string
  "last_name": string
  "email": string
  "mobile": string
  "alternate_contact": string
  "billing_address_1": string
  "billing_address_2": string
  "billing_address_city": string
  "billing_address_state": string
  "billing_address_pincode": string
  "shipping_address_1": string
  "shipping_address_2": string
  "shipping_address_city": string
  "shipping_address_state": string
  "shipping_address_pincode": string
  "other_details": [],
  "status": number
  "type": string
  "created_at": string
  "updated_at": string
  "assigned_to": number
  "created_by": number
  "updated_by": string
  "deleted_at": string
  "full_name": string
  "initials": string
}
export interface IFrequencies {
  once: string
  daily: string
  weekly: string
  monthly: string
  quarter_yearly: string
  semi_yearly: string
  yearly: string
}

export interface IReportData {
  total: string
  self: string
  co_lender: string
}

export interface IPayment {
  payment_id: string
  customer_id: number
  branch_id: string
  contribution_self: string
  contribution_co_lender: string
  assigned_to: number
  target_amount: string
  target_amount_self: string
  target_amount_co_lender: string
  frequency_type: string
  customer_name: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_mobile: string
}

export interface IUpcomingPayment extends IPayment {
  upcoming_id: string
  last_payment_at: string
  upcoming_datetime: string
  status: string
  total_pending: string
  amount_pending: string
  pending_days: number
}

export interface IOverduePayment extends IPayment {
  overdue_id: string
  last_payment_at: string
  overdue_datetime: string
  amount_pending: string
  overdue_days: number

}

export interface IPaymentCollection extends IPayment {
  upcoming_id: string
  paid_datetime: string
  intended_datetime: string
  status: string
  total_paid: string
  amount_paid: string
}