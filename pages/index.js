import Head from "next/head";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const current = new Date();

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // var date  = current.toLocaleDateString("en-US", options)
  let date = current.toLocaleDateString("hi-IN", options);

  // let date = `${current.getDay()}/${current.getMonth()}/${getYear()} ${current.getHours()}:${current.getMinutes()}`
  const [todoItem, setTodoItem] = useState({});
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value });
    console.log(todoItem);
  };

  const handleAdd = () => {
    if (todoItem.text && todoItem.desc) {
      console.log("first");
      // if the input is not empty
      let data = [
        {
          id: Math.random(),
          text: todoItem.text,
          desc: todoItem.desc,
          date: date,
          done: false,
        },
        ...items,
      ];
      setItems(data); // add the input to the array

      localStorage.setItem("todo", JSON.stringify(data));
      setTodoItem({}); // reset the input
    }
  };

  const handleToggle = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done, // toggle the done property
        };
      }
      return item;
    });

    localStorage.setItem("todo", JSON.stringify(_items)); // update the local storage
    setItems(_items);
  };

  const handleDelete = (id) => {
    const data = JSON.parse(JSON.stringify(items));

    const newData = [];

    data.map((item) => {
      if (item.id != id) {
        newData.push(item);
      }
    });

    localStorage.setItem("todo", JSON.stringify(newData));
    setItems(newData);
  };

  useEffect(() => {
    let data = localStorage.getItem("todo");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <div className="min-vh-100">
        <Navbar />
        <div className="d-flex justify-content-center p-4">
          <h1>ToDo App</h1>
        </div>
        <div className="d-flex justify-content-center p-2">
          <input
            placeholder="Enter your task"
            type="text"
            name="text"
            value={todoItem.text || ""}
            onChange={handleChange}
            className="p-2 m-2"
          />
          <input
            placeholder="Enter your description"
            type="text"
            name="desc"
            value={todoItem.desc || ""}
            onChange={handleChange}
            className="p-2 m-2"
          />
          <button
            className=" p-2 m-2 btn btn-primary"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <div className="d-flex flex-column align-items-center">
          <ul>
            {items
              .filter(({ done }) => !done)
              .map(({ id, text, done, date, desc }) => (
                <li
                  key={id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ marginRight: "40px" }}
                    onClick={() => handleToggle(id)}
                  >
                    <div className="">
                      <b>{text}</b> {date}
                    </div>
                    <div className="">{desc}</div>
                  </div>
                  <button
                    className=" btn btn-sm btn-danger"
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          <hr style={{ width: "35%" }} />
          <ul>
            {items
              .filter(({ done }) => done)
              .map(({ id, text, done, date, desc }) => (
                <li
                  key={id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ marginRight: "40px" }}
                    onClick={() => handleToggle(id)}
                    className={`${done ? "text-decoration-line-through" : " "}`}
                  >
                    <div className="">
                      <b>{text}</b> {date}
                    </div>
                    <div className="">{desc}</div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}