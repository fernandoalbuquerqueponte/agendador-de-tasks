import { useState, useEffect } from "react"
import "./admin.css"

import { auth, db } from "../../firebaseConnection"
import { signOut } from "firebase/auth"
import {
   addDoc,
   collection,
   onSnapshot,
   query,
   orderBy,
   where,
   doc,
   deleteDoc,
} from "firebase/firestore"

export default function Admin() {
   const [tarefaInput, setTarefaInput] = useState("")
   const [user, setUser] = useState({})
   const [tarefas, setTarefas] = useState([])

   useEffect(() => {
      async function loadTarefas() {
         const userDetails = localStorage.getItem("@userDetails")
         setUser(JSON.parse(userDetails))

         if (userDetails) {
            const data = JSON.parse(userDetails)

            const tarefaRef = collection(db, "tarefas")

            const q = query(
               tarefaRef,
               orderBy("created", "desc"),
               where("userUid", "==", data?.uid)
            )

            const unsub = onSnapshot(q, (snapshot) => {
               let lista = []
               snapshot.forEach((doc) => {
                  lista.push({
                     id: doc.id,
                     tarefa: doc.data().tarefa,
                     userUid: doc.data().userUid,
                  })
               })
               console.log({ lista })
               setTarefas(lista)
            })
         }
      }
      loadTarefas()
   }, [])

   async function handleRegister(e) {
      e.preventDefault()
      if (tarefaInput === "") {
         alert("Digite sua tarefa..")
         return
      }

      await addDoc(collection(db, "tarefas"), {
         tarefa: tarefaInput,
         created: new Date(),
         userUid: user?.uid,
      })
         .then(() => {
            console.log("Tarefa registrada")
            setTarefaInput("")
         })
         .catch((error) => {
            console.log(error)
         })
   }

   async function handleLogout() {
      await signOut(auth)
   }

   async function handleDeleteTask(id) {
      const docRef = doc(db, "tarefas", id)
      await deleteDoc(docRef)
   }

   return (
      <div className="admin-container">
         <h1>Minhas tarefas</h1>

         <form className="form" onSubmit={handleRegister}>
            <textarea
               placeholder="Digite sua tarefa..."
               value={tarefaInput}
               onChange={(e) => setTarefaInput(e.target.value)}
            />
            <button className="btn-register" type="submit">
               Registrar tarefa
            </button>
         </form>

         {tarefas.map((task) => (
            <article key={task.id} className="list">
               <p>{task.tarefa}</p>

               <div>
                  <button>Editar</button>
                  <button
                     onClick={() => handleDeleteTask(task.id)}
                     className="btn-delete"
                  >
                     Concluir
                  </button>
               </div>
            </article>
         ))}

         <button className="btn-logout" onClick={handleLogout}>
            Sair
         </button>
      </div>
   )
}
