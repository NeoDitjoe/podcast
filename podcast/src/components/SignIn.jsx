// import { useState } from 'react';
// import './App.css'


// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     // You can add your sign-in logic here, like sending data to a backend API
//     console.log('Sign-in data:', { email, password });
//     // Reset the form fields after sign-in
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
