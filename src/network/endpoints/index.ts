type METHODS = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

export class ENDPOINT {
  static readonly OTP_SNED = new ENDPOINT('mobile/send-otp', 'POST');
  static readonly OTP_VERIFICATION = new ENDPOINT('mobile/verify-otp', 'POST');

  static readonly PIN_SUBMIT = new ENDPOINT('set/new/pin', 'POST');
  static readonly LOGIN_WITH_PIN = new ENDPOINT('pin/verify', 'POST');

  static readonly LOG_IN = new ENDPOINT('login', 'GET');
  static readonly HOME = new ENDPOINT('home', 'GET');
  static readonly CRM_LEADS = new ENDPOINT('crm/leads', 'GET');
  static readonly GET_LEAD_OPTIONS = new ENDPOINT('tags', 'GET');
  static readonly createLead = new ENDPOINT('crm/leads', 'POST');
  static readonly GET_LEAD_DETAILS = new ENDPOINT('crm/leads', 'GET');
  static readonly GET_REMARKS = new ENDPOINT('remarks/customer', 'GET');
  static readonly ADD_REMARK = new ENDPOINT('remarks/customer', 'POST');
  static readonly UPDATE_REMARK = new ENDPOINT('remarks/customer', 'PUT');
  static readonly ADD_FOLLOWUP = new ENDPOINT('follow-ups', 'POST');
  static readonly UPDATE_FOLLOWUP = new ENDPOINT('follow-ups', 'PUT');
  static readonly GET_FOLLOWUP = new ENDPOINT('follow-ups?customer_id=', 'GET');
  static readonly GET_ALL_FOLLOWUPS = new ENDPOINT('follow-ups', 'GET');

  static readonly HOME_COLLECTIONS = new ENDPOINT('dashboard', 'GET');
  static readonly COLLECTIONS_PAYMENTS = new ENDPOINT('payments/collections', 'POST');
  static readonly COLLECTIONS_UPCOMING = new ENDPOINT('payments/upcoming', 'POST');
  static readonly COLLECTIONS_OVERDUE = new ENDPOINT('payments/overdue', 'POST');



  private constructor(
    private readonly key: string,
    public readonly method: METHODS
  ) { }

  toString() {
    return this.key;
  }

  withId(value: string | number) {
    return `${this.key}/${value}`;
  }
}
