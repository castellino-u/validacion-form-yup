import { Input } from "./components/Input/Input"


function App() {


  return (
    <div>
    <Input label="name" name="name" value="" handleChange={()=>{}} type="text" ></Input>
    <Input label="email" name="email" value="" handleChange={()=>{}} type="email" ></Input>
    <Input label="password" name="password" value="" handleChange={()=>{}} type="password" ></Input>
    </div>
  )
}

export default App
