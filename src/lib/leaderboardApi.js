import { db, ts } from './firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export async function addToLeaderboard(user, resultId, outputs, city) {
  if (!user) {
    throw new Error('Must be logged in to join leaderboard');
  }

  const record = {
    userId: user.uid,
    name: user.displayName || user.email || 'Anonymous',
    city: city || 'karachi',
    score: outputs.ecoScore,
    resultId: resultId,
    createdAt: ts(),
  };

  const docRef = await addDoc(collection(db, 'leaderboard'), record);
  return { id: docRef.id, ...record };
}

export async function getLeaderboardByCity(city, limitN = 10) {
  const leaderboardRef = collection(db, 'leaderboard');
  let q;

  if (city && city !== 'all') {
    q = query(
      leaderboardRef,
      where('city', '==', city),
      orderBy('score', 'desc'),
      limit(limitN)
    );
  } else {
    q = query(leaderboardRef, orderBy('score', 'desc'), limit(limitN));
  }

  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
}
