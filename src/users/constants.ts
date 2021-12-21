import * as bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);
export const userConstants = {
  passwordSalt: salt,
};
