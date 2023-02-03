import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faL, faP, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  // todo state
  const [toDo, setToDo] = useState([
    { "id": 1, "title": "Task 1", "status": false },
    { "id": 2, "title": "Task 2", "status": false }
  ]);

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
        <>
          <div className='row'>
            <div className='col'>
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className='form-control form-control-lg' />
            </div>
            <div className='col-auto'>
              <button onClick={updateTask} className='btn btn-lg btn-success mr-20'>Update</button>
              <button className='btn btn-lg btn-warning'>Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Add task */}
          <div className='row'>
            <div className='col'>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className='form-control form-control-lg'
              />
            </div>
            <div className='col-auto'>
              <button
                onClick={addTask}
                className='btn btn-lg btn-success'
              >Add task</button>
            </div>
          </div>
          <br />
        </>
      )}

      {toDo && toDo.length ? '' : 'No tasks..'}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>

              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>
                <div className='iconsWrap'>
                  <span title='Completed / Not Completed'
                    onClick={(e) => markDone(task.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span title='edit'
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}


                  <span title='delete'
                    onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }

    </div>
  );
}

export default App;
