import React from "react";
import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsFillTrashFill,
  BsCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  });

  const handleEdit = id => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  const handleDelete = id => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <h1>To Do List</h1>
      <Create />
      {todos.length === 0 ? (
        <h2 className="noRecord">No Record</h2>
      ) : (
        todos.map(todo => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsCheckCircleFill className="icon"></BsCheckCircleFill>
              ) : (
                <BsCircleFill className="icon" />
              )}

              <p className={todo.done ? "line_through li" : "li"}>
                {todo.task}
              </p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
