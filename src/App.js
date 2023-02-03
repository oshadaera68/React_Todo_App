import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // todo state
  const [toDo, setToDo] = useState([]);

  // temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  // delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks)
  }

  // mark task as done
  const markDone = (id) => {
    let newtask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task
    })
    setToDo(newtask);
  }

  // cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // change task
  const changeTask = (e) => {
    let newEntery = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntery)
  }

  // update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br /> <br />
      <h2>To do list app (React js)</h2>
      <br /> <br />

      {/* update task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {toDo && toDo.length ? '' : 'No tasks..'}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
