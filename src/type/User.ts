export type User = {
    uid: string
    firebaseUid: string
    username: string
    email: string | null | undefined
    displayName: string | null
    photoURL: string | null
    role: string
}