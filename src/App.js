import { useState } from "react";

/*
// Test (render)
const tasks = [
  { id: 1, description: "Go gym", isDone: true },
  { id: 2, description: "Prepare dinner", isDone: false },
  { id: 3, description: "Learn React", isDone: false },
];
*/

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleIsDone(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearTasks() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems((items) => []);
  }

  return (
    <div className="App">
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onIsDone={handleIsDone}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} onClearTasks={handleClearTasks} />
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, isDone: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="heading-primary">Todo App</h1>
      <div className="input-field">
        <input
          type="text"
          className="user-input"
          placeholder="Add your new todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={handleSubmit}
        />
        <button className="plus-button">+</button>
      </div>
    </form>
  );
}

function List({ items, onIsDone, onDeleteItem }) {
  return (
    <div>
      <ul>
        {items.map((task) => (
          <Task
            task={task}
            onIsDone={onIsDone}
            onDeleteItem={onDeleteItem}
            key={task.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Task({ task, onIsDone, onDeleteItem }) {
  return (
    <li>
      <span
        className="task-text"
        style={task.isDone ? { textDecoration: "line-through" } : {}}
      >
        {task.description}
      </span>
      <div className="li-right">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onIsDone(task.id)}
        />
        <button className="cross" onClick={() => onDeleteItem(task.id)}>
          ❌
        </button>
      </div>
    </li>
  );
}

function Stats({ items, onClearTasks }) {
  if (!items.length)
    return <p className="stats">Start adding tasks to your list 🚀</p>;

  const numTasks = items.length;
  const numDone = items.filter((item) => item.isDone).length;
  const percentage = Math.round((numDone / numTasks) * 100);

  return (
    <footer>
      <p className="stats">
        {percentage === 100 ? (
          <>
            You've finished all your tasks for today 🎉
            <button className="clear-button" onClick={onClearTasks}>
              Clear all tasks
            </button>
          </>
        ) : (
          `You have ${numTasks} ${
            numTasks > 1 ? "tasks" : "task"
          }, and you already completed ${numDone} (
        ${percentage}%)`
        )}
      </p>
    </footer>
  );
}
