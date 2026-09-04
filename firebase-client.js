import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const config = window.DramaPlusFirebaseConfig || {};
const enabled = Boolean(config.apiKey && !config.apiKey.startsWith('COLE_') && config.projectId && !config.projectId.startsWith('SEU_'));
let auth = null;
let db = null;
let googleProvider = null;

if (enabled) {
    const app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
}

const toUser = (user) => {
    if (!user) return null;
    const name = user.displayName || user.email?.split('@')[0] || 'Usuário';
    return { name, email: user.email || '', initials: name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(), uid: user.uid };
};

export const firebaseApi = {
    enabled,
    observeAuth(callback) {
        return enabled ? onAuthStateChanged(auth, (user) => callback(toUser(user))) : () => { };
    },
    async login(email, password) {
        if (!enabled) return null;
        const result = await signInWithEmailAndPassword(auth, email, password);
        return toUser(result.user);
    },
    async signup(name, email, password) {
        if (!enabled) return null;
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        return toUser(result.user);
    },
    async googleLogin() {
        if (!enabled) return null;
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return toUser(result.user);
        } catch (error) {
            if (['auth/popup-blocked', 'auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(error.code)) {
                await signInWithRedirect(auth, googleProvider);
                return null;
            }
            throw error;
        }
    },
    async logout() {
        if (enabled) await signOut(auth);
    },
    async loadList(uid) {
        if (!enabled || !uid) return null;
        const snapshot = await getDoc(doc(db, 'users', uid));
        return snapshot.exists() ? snapshot.data().list || [] : [];
    },
    async saveList(uid, list) {
        if (!enabled || !uid) return;
        await setDoc(doc(db, 'users', uid), { list, updatedAt: Date.now() }, { merge: true });
    }
};
