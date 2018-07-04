import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyC8XCsEBZcfqEhuaRr33UZWHHKO4sW5z3I',
  authDomain: 'vuejs-book-manager.firebaseapp.com',
  databaseURL: 'https://vuejs-book-manager.firebaseio.com',
  storageBucket: 'vuejs-book-manager.appspot.com',
  messagingSenderId: '188554156397'
}

let app = Firebase.initializeApp(config)

export default app
