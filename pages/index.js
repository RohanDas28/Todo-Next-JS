import AddToDo from "../components/AddToDo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";



const Index = () => {
  

  return (
    <>
      <div className="min-vh-100">
        <Navbar />
        <div className="d-flex justify-content-center p-4">
          <h1>ToDo App</h1>
        </div>
        <AddToDo/>
      </div>
        <Footer/>

    </>
  )
}


export default Index;