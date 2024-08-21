import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash} from 'react-icons/fi'
import {api} from './services/api'

interface CustomerProps{
  id: string
  name: string
  email:string
  status: boolean
}

export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{
    loadCustomers()
  },[])

async function loadCustomers() {
  const response = await api.get("/customers")
  setCustomers(response.data.body.customer)
}

async function handleSubmit (e:FormEvent){
e.preventDefault()

  if(!nameRef.current?.value || !emailRef.current?.value) return
 
  const response = await api.post("/customers",{
    name:nameRef.current?.value,
    email:emailRef.current?.value,
  })


  setCustomers(allCustomers =>[
    ...allCustomers,
    response.data.body.customers
  ])
  nameRef.current.value = ""
  emailRef.current.value = ""
}

async function handleDelete (id:string){
  await api.delete(`/customers/${id}`)

  const allCustomers = customers.filter((customer)=> customer.id !== id)
  setCustomers(allCustomers)
}

  return(
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input 
            type="text" 
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded-full"
            ref={nameRef}
          />

          <label className="font-medium text-white">Email:</label>
          <input 
            type="text" 
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded-full"
            ref={emailRef}
          />

          <input 
          type="submit" value="Cadastrar"
          className="cursor-pointer w-full p-2 bg-green-500 rounded-full"
          />
        </form>

        <section className="flex flex-col gap-4">
          
          {customers.map((Customer)=>(
            <article
            key={Customer.id}
            className="w-full bg-white rounded p-2 read-only relative hover:scale-105 duration-200">
              <p><span className="font-medium">Nome: </span>{Customer.name}</p>
              <p><span className="font-medium">Email: </span>{Customer.email}</p>
              <p><span className="font-medium">Status: </span>{Customer.status ? "Ativo" : "Inativo" }</p>
  
                <button
                className='bg-red-500 w-7 h-7 flex items-center justify-center rounded absolute right-0 -top-2'
                onClick={()=>handleDelete(Customer.id)}
                >
                  <FiTrash size={18} color="#FFF"/>
                </button>
            </article>
          ))}

        </section>

      </main>
    </div>
  )
}