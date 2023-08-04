import { useState } from "react"
import { Link } from "react-router-dom"

import { auth } from "../../firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"

import { useNavigate } from "react-router-dom"

export default function Register() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const navigate = useNavigate()

   async function handleRegister(e) {
      e.preventDefault()
      if (email !== "" && password !== "") {
         await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
               navigate("/admin", { replace: true })
            })
            .catch((error) => {
               console.log("erro ao registrar")
            })
      } else {
         alert("Preencha todos os campos")
      }
   }

   return (
      <div className="home-container">
         <h1>Cadastre-se</h1>
         <span>Vamos criar sua conta</span>

         <form className="form" onSubmit={handleRegister}>
            <input
               type="text"
               placeholder="Digite seu e-mail"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="password"
               placeholder="Digite sua senha secreta"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Criar conta</button>
         </form>
         <Link className="button-link" to="/">
            Já possui uma conta? faça login !
         </Link>
      </div>
   )
}
