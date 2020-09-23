import bcrypt from 'bcrypt';
import { HttpError } from './HttpError';

export async function login(db, username, password) {
  const user = await db.findUserByUsername(username);
  let isValid = false;
  if (user) {
    isValid = await bcrypt.compare(password, user.password);
  }
  if (!isValid) {
    throw new HttpError(403);
  }
  return user;
}
