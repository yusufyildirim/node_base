import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

function password(pw) {
  return bcrypt.hashSync(pw, BCRYPT_SALT_ROUNDS);
}

function compare(pw, h) {
  return bcrypt.compareSync(pw, h);
}

export default {
  password,
  compare,
};
