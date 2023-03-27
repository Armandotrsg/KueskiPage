import {Navbar} from "./components/Navbar"

function App() {
  return (
    <div className="flex">
      <Navbar />
      <div className="container mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Hello World</h1>
        </div>
      </div>
    </div>
  )
}

export default App
