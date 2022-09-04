import { useState, useEffect } from "react";
import NotesTodo from "./NotesTodo";

const AddToDo = () => {
  const current = new Date(); // get the current date

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }; // set the options for the date

  // var date  = current.toLocaleDateString("en-US", options)
  let date = current.toLocaleDateString("bn-IN", options); // Maine Bengali mein date change kia hai lol

  // let date = `${current.getDay()}/${current.getMonth()}/${getYear()} ${current.getHours()}:${current.getMinutes()}`
  const [todoItem, setTodoItem] = useState({});
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value }); // set the value of the input field
    // console.log(todoItem);
  };
  const [type, settype] = useState("todo");

  const handleAdd = () => {
    if (todoItem.text && todoItem.desc) {
      //   console.log("first");
      // if the input is not empty
      let data = [
        {
          id: Math.random(),
          text: todoItem.text,
          desc: todoItem.desc,
          date: date,
          done: false,
          type: type,
        },
        ...items,
      ];
      setItems(data); // add the input to the array

      localStorage.setItem("todo", JSON.stringify(data));
      setTodoItem({}); // reset the input
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("todo"); // get the data from local storage
    if (data) {
      setItems(JSON.parse(data)); // set the data to the array
    }
  }, []);

  return (
    <>
      <div className="container p-2">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Your Task/ Note
          </label>
          <input
            placeholder="Enter your Task/ Note"
            type="text"
            name="text"
            value={todoItem.text || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            placeholder="Enter your description"
            type="text"
            name="desc"
            value={todoItem.desc || ""}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <div className="">
          <select
            className="form-select p-2"
            aria-label="Default select example"
            name="task"
            onChange={(e) => {
              settype(e.target.value); // set the value of the input field
            }}
          >
            <option value="todo">Todo</option>
            <option value="notes">Notes</option>
          </select>

          <button
            className="mt-2 px-4 btn btn-primary"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
      <NotesTodo items={items} setItems={setItems} />{" "}
      {/* pass the array and the function to the child component */}
    </>
  );
};

export default AddToDo;
