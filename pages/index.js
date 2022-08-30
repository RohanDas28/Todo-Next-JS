import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const current = new Date();
  const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      text: "Learn Next.js",
      desc: "Learn Next.js",
      date: "{date}",
      done: false,
    },
    {
      id: 2,
      text: "Learn React.js",
      desc: "Learn React.js",
      date: "{date}",
      done: false,
    },
  ]);
  const handleAdd = () => {
    if (todoItem.length > 0) {
      // if the input is not empty
      setItems([
        {
          id: items.length + 1,
          text: todoItem,
          desc: "",
          date: {date},
          done: false,
        },
        ...items,
      ]); // add the input to the array
      setTodoItem(""); // reset the input
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
    setItems(_items);
  };

  return (
    <>
      <Head />
      <Navbar />
      <div className="d-flex justify-content-center p-2">
        <h1>ToDo App</h1>
      </div>
      <div className="d-flex justify-content-center p-2">
        <input
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          className="p-2 m-2"
        ></input>
        <button type="button" onClick={handleAdd} className="p-2 m-2">
          Add
        </button>
      </div>
      <div className="d-flex flex-column  align-items-center">
      <ul>
        {items
          .filter(({ done }) => !done)
          .map(({ id, text, done }) => (
            <li
              key={id}
              onClick={() => handleToggle(id)}
              className={`${done ? "text-decoration-line-through" : " "}`}
            >
              {text} {date}
            </li>
          ))}
      </ul>
      <ul>
        {items
          .filter(({ done }) => done)
          .map(({ id, text, done }) => (
            <li
              key={id}
              onClick={() => handleToggle(id)}
              className={`${done ? "text-decoration-line-through" : " "}`}
            >
              {text} {date}
            </li>
          ))}
      </ul>
      </div>

      <Footer />
    </>
  );
}
