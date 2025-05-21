import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";


import { AuthProvider } from "./context/AuthContext";

//         </div>
//         {/* <Routes>
//           <Route path="/" element={<LoginForm />} />

//           {/* <Route path="/" element={<NewsSection />} /> */}
//         {/* </Routes>  */}
//       </Router>
//     </AuthProvider>

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <LoginForm />
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
