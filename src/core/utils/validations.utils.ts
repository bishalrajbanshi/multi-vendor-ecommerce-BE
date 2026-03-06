import validator from 'validator';

export function isEmail(value: string) {
  return validator.isEmail(value);
}

export function isPhone(value: string) {
  return validator.isMobilePhone(value);
}

