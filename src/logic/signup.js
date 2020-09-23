import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { HttpError } from './HttpError';

export async function signup(db, username, password, name) {
  const alreadyExist = await db.userByUsernameExists(username);
  if (alreadyExist) {
    throw new HttpError(400, 'This usersname already exists');
  }
  const token = nanoid();
  const passwordHashed = await bcrypt.hash(password, 10);
  const user = await db.insertUser(username, passwordHashed, name, token);
  return user;
}
