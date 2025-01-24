import "server-only";
import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Certificado
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const privateKeyFormatted = process.env
	.FIREBASE_PRIVATE_KEY!.split(String.raw`\n`)
	.join("\n");

export const firebaseCert = cert({
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: privateKeyFormatted,
});

// Instância do APP
if (!getApps().length) {
	initializeApp({
		credential: firebaseCert,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	});
}

export const db = getFirestore();

export const storage = getStorage().bucket();

export async function getDownloadURL(path: string) {
	if (!path) return;

	const file = storage.file(path);

	const [url] = await file.getSignedUrl({
		action: "read",
		expires: "03-01-2500",
	});

	return url;
}
