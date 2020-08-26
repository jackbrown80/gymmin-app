import React from 'react'
import AppContainer from './src/navigation'
import Firebase, { FirebaseProvider } from './src/firebase'

export default function App() {
  console.log(Firebase);
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  )
}