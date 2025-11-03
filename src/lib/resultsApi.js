import { db, ts } from './firebase';
import { collection, addDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';

export async function saveResult(user, inputs, outputs) {
  const record = {
    createdBy: user?.uid || null,
    name: user?.displayName || user?.email || 'Anonymous',
    city: inputs.city,
    monthlyUnits: inputs.monthlyUnits,
    heavyHours: inputs.heavyHours,
    daytimeUsagePct: inputs.daytimeUsagePct,
    budget: inputs.budget || 0,
    netMetering: inputs.netMetering,
    outputs: outputs,
    createdAt: ts(),
  };

  const docRef = await addDoc(collection(db, 'results'), record);
  return docRef.id;
}

export async function getResultById(id) {
  const docRef = doc(db, 'results', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

export async function getUserResults(uid) {
  const q = query(collection(db, 'results'), where('createdBy', '==', uid));
  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
}
