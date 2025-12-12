import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

// Firebase configuration object, containing credentials for your Firebase project.
const firebaseConfig = {
  apiKey: 'AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk',
  authDomain: 'crwn-clothing-db-98d4d.firebaseapp.com',
  projectId: 'crwn-clothing-db-98d4d',
  storageBucket: 'crwn-clothing-db-98d4d.appspot.com',
  messagingSenderId: '626766232035',
  appId: '1:626766232035:web:506621582dab103a4d08d6',
};

// Initializes the Firebase app with the provided configuration.
const firebaseApp = initializeApp(firebaseConfig);

// Creates a new Google Auth Provider instance.
const googleProvider = new GoogleAuthProvider();

// Sets custom parameters for the Google authentication provider.
// 'prompt: select_account' ensures the user is prompted to select an account every time.
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Exports the Firebase Auth instance.
export const auth = getAuth();
// Function to sign in with Google using a popup window.
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// Function to sign in with Google using a redirect.
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Exports the Firestore database instance.
export const db = getFirestore();

// Type definition for objects that can be added to a collection, requiring a 'title'.
type ObjectToAdd = {
  title: string;
};

/**
 * Adds a collection of documents to Firestore.
 * Uses a batch write for efficiency when adding multiple documents.
 * @param collectionKey The name of the collection to add documents to.
 * @param objectsToAdd An array of objects to add to the collection. Each object must have a 'title' property.
 */
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // Creates a document reference using the lowercase title as the document ID.
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit(); // Commits all batched writes.
  console.log('done');
};

// Type definition for an item within a category.
type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

// Type definition for category data, including image, items, and title.
type CategoryData = {
  imageUrl: string;
  items: CategoryItem[];
  title: string;
};

/**
 * Fetches all documents from the 'categories' collection in Firestore.
 * @returns A promise that resolves to an array of CategoryData objects.
 */
export const getCategoriesAndDocuments = async (): Promise<CategoryData[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef); // Creates a query for the 'categories' collection.

  const querySnapshot = await getDocs(q); // Executes the query and gets the snapshot.
  // Maps the document snapshots to CategoryData objects.
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as CategoryData
  );
};

// Type definition for additional information that can be stored with a user.
export type AdditionalInformation = {
  displayName?: string;
};

// Type definition for user data stored in Firestore.
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

/**
 * Creates or retrieves a user document in Firestore based on Firebase Authentication user data.
 * If the user document does not exist, it creates a new one.
 * @param userAuth The User object from Firebase Authentication.
 * @param additionalInformation Optional additional data to store with the user.
 * @returns A promise that resolves to the QueryDocumentSnapshot of the user, or void if userAuth is null.
 */
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return; // If no userAuth, exit.

  const userDocRef = doc(db, 'users', userAuth.uid); // Reference to the user's document.

  const userSnapshot = await getDoc(userDocRef); // Tries to get the user document.

  // If the user document does not exist in Firestore, create it.
  if (!userSnapshot.exists()) {
    // Destructure displayName and email from the authenticated user object.
    const { displayName, email } = userAuth;
    // Get the current date to record when the user document was created.
    const createdAt = new Date();

    try {
      // Set the user document in Firestore with the extracted data and any additional information.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      // Log any errors that occur during the creation of the user document.
      console.log('error creating the user', error);
    }
  }

  // Return the user document snapshot, casting it to the expected UserData type.
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Creates a new user with email and password using Firebase Auth
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  // Guard clause: return early if email or password is missing
  if (!email || !password) return;

  // Call Firebase's createUserWithEmailAndPassword and return the result
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Signs in an existing user with email and password using Firebase Auth
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  // Guard clause: return early if email or password is missing
  if (!email || !password) return;

  // Call Firebase's signInWithEmailAndPassword and return the result
  return await signInWithEmailAndPassword(auth, email, password);
};

// Signs out the current user
export const signOutUser = async (): Promise<void> => 
  // Call Firebase's signOut method
  await signOut(auth);

// Registers a listener for authentication state changes
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  // Pass the callback to Firebase's onAuthStateChanged
  onAuthStateChanged(auth, callback);

// Returns a Promise that resolves with the current user (or null if not signed in)
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        // Unsubscribe immediately after getting the current user
        unsubscribe();
        // Resolve the promise with the user object (or null)
        resolve(userAuth);
      },
      // Reject the promise if there's an error
      reject
    );
  });
};