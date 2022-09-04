const NotesTodo = ({ items, setItems }) => {
  // get the array from the parent component

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
    const data = JSON.parse(JSON.stringify(items)); // copy the array

    const newData = []; // create a new array

    data.map((item) => {
      if (item.id != id) {
        newData.push(item); // add the item to the new array if the id is not equal to the id of the item to be deleted
      }
    });

    localStorage.setItem("todo", JSON.stringify(newData)); // update the local storage
    setItems(newData); // update the array
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Notes</h1>

            <ul data-toggle="tooltip" title="Click to Mark as Done">
              {items
                .filter(({ done }) => !done) // filter the array to get the items that are not done
                .map(
                  ({ id, text, done, date, desc, type }) =>
                    type == "notes" && ( // check if the type is notes
                      <li
                        key={id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          className="height-alignment"
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          onClick={() => handleToggle(id)}
                        >
                          <div className="">
                            <b>{text}</b> {date}
                          </div>
                          <div className="">{desc}</div>
                        </div>
                        <button
                          className=" btn btn-sm btn-danger fix-sizebtn"
                          onClick={() => {
                            handleDelete(id);
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    )
                )}
            </ul>
          </div>

          <div className="col">
            <h1>Todos</h1>
            <ul data-toggle="tooltip" title="Click to Mark as Done">
              {items
                .filter(({ done }) => !done)
                .map(
                  ({ id, text, done, date, desc, type }) =>
                    type == "todo" && ( // check if the type is todo
                      <li
                        key={id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          className="height-alignment"
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          onClick={() => handleToggle(id)}
                        >
                          <div className="height-alignment">
                            <b>{text}</b> {date}
                          </div>
                          <div className="height-alignment">{desc}</div>
                        </div>
                        <button
                          className=" btn btn-sm btn-danger fix-sizebtn"
                          onClick={() => {
                            handleDelete(id);
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    )
                )}
            </ul>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="w-100"></div>

          <div className="col">
            <h1>Notes Done</h1>
            <ul data-toggle="tooltip" title="Click to Uncheck">
              {items
                .filter(({ done }) => done) // filter the array to get the items that are done
                .map(
                  ({ id, text, done, type, date, desc }) =>
                    type == "notes" && ( // check if the type is notes
                      <li
                        key={id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          onClick={() => handleToggle(id)}
                          className={`${
                            done
                              ? "text-decoration-line-through height-alignment"
                              : "height-alignment "
                          }`} // add the text-decoration-line-through class if the item is done
                        >
                          <div className="height-alignment">
                            <b>{text}</b> {date}
                          </div>
                          <div className="height-alignment">{desc}</div>
                        </div>
                        <button
                          className="btn btn-sm btn-danger fix-sizebtn"
                          onClick={() => {
                            handleDelete(id); 
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    )
                )}
            </ul>
          </div>

          <div
            className="
            col"
          >
            <h1>Todos Done</h1>
            <ul data-toggle="tooltip" title="Click to Uncheck">
              {items
                .filter(({ done }) => done)
                .map(
                  ({ id, text, type, done, date, desc }) =>
                    type == "todo" && ( // check if the type is todo
                      <li
                        key={id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          onClick={() => handleToggle(id)}
                          className={`${
                            done
                              ? "height-alignment text-decoration-line-through"
                              : "height-alignment "
                          } `} // add the class text-decoration-line-through if the item is done
                        >
                          <div className="">
                            <b>{text}</b> {date}
                          </div>
                          <div className="">{desc}</div>
                        </div>
                        <button
                          className="btn btn-sm btn-danger fix-sizebtn"
                          onClick={() => {
                            handleDelete(id);
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesTodo;
