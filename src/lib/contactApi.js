import { db, ts } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function saveContactMessage({ name, email, message }) {
  const record = {
    name: name || 'Anonymous',
    email: email || null,
    message: message || '',
    createdAt: ts(),
  };

  const docRef = await addDoc(collection(db, 'contacts'), record);
  return docRef.id;
}
