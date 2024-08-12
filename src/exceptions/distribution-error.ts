import { SsError } from './error-type';

export class DistributionError extends SsError {
  constructor(code: DistributionErrorCode, description?: any) {
    super(code, DistributionErrorCode, DistributionError.name, description);
  }
}

export enum DistributionErrorCode {
  STATUS_PREORDER_CHANGE = 'STATUS_PREORDER_CHANGE',
  EXISTING_DISTRIBUTION = 'EXISTING_DISTRIBUTION',
  USER_DISTRIBUTION_IS_ALREADY_REGISTERED = 'USER_DISTRIBUTION_IS_ALREADY_REGISTERED',
  DISTRIBUTION_NOT_FOUND = 'DISTRIBUTION_NOT_FOUND',
  PARAMETERS_ARE_NUMBERS = 'PARAMETERS_ARE_NUMBERS',
  PARAMETERS_POSITIVE_VALUES = 'PARAMETERS_POSITIVE_VALUES'
}
