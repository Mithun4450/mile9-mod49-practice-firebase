import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import './App.css'
import app from "./firebase/firebase.config";
import { useState } from "react";

function App() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null);

  const handleGoogleLogIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const loggedUser = result.user;
      setUser(loggedUser);
      console.log(loggedUser)
      console.log(user)
      
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const handleGitHubLogIn = () =>{
    signInWithPopup(auth, gitHubProvider)
    .then(result =>{
      const loggedGitUser = result.user;
      console.log(loggedGitUser)
      setUser(loggedGitUser);
    })
    .catch(error =>{
      console.log(error)
    })
  }


  const handleSignOut =() =>{
    signOut(auth)
    .then(result =>{
      console.log(result)
      setUser(null)
    })
    .catch(error =>{
      console.log(error)
    })
  }

 

  return (
    <>
      
      <h1>Practice Firebase</h1>
      <div className="card">
        {user? 
          <button onClick={handleSignOut}>Sign Out</button>:
          
         <>
         <button onClick={handleGoogleLogIn}>Google Log in</button>
         <button onClick={handleGitHubLogIn}>GitHub Log in</button>
         </>
        }

        {
          user &&
          <div>
            <h3>User Name: {user.displayName}</h3>
            <h4>Email: {user.email}</h4>
          </div>
        }

     

       
        
      </div>
      
        
      
      
    </>
  )
}

export default App
