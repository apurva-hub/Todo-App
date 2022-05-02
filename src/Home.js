import { app, db } from "./Fire";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import Addicon from "./Addicon";
import Deleteicon from "./Deleteicon";

const Home = (props) => {
  const [task, setTask] = useState("");
  const [getTask, setgetTask] = useState([]);
  const usersCollectionRef = collection(db, props.userEmail);

  const addTask = (event) => {
    event.preventDefault();
    addDoc(usersCollectionRef, {
      task: task,
      completed: false,
    })
      .then(() => {
        getData();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const statusUpdate = (event, taskId) => {
    const updateRef = doc(db, props.userEmail, taskId);
    updateDoc(updateRef, {
      completed: event.target.checked,
    }).then(() => {
      getData();
    });
  };

  const getData = async () => {
    const data = await getDocs(usersCollectionRef);
    setgetTask(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteRecord = (taskId) => {
    let deleteTask = doc(db, props.userEmail, taskId);
    deleteDoc(deleteTask)
      .then(() => {
        getData();
      })

      .catch(() => alert("error"));
  };

  return (
    <div>
      <section className="logout-layout">
        <button className="button logout-button" onClick={props.logout}>
          Logout
        </button>
      </section>
      <div className="task-layout">
        <form className="search-area">
          <input
            className="input-task"
            required
            type="text"
            placeholder="Enter the task"
            onChange={(event) => setTask(event.target.value)}
          />
          <button
            className="addtask-button"
            onClick={(event) => addTask(event)}
          >
            <Addicon />
          </button>
        </form>

        {getTask.map((item) => {
          return (
            <div className="added-tasks">
              {item.completed ? (
                <div>
                  <input
                    defaultChecked
                    className="checkbox"
                    type="checkbox"
                    onClick={(event) => statusUpdate(event, item.id)}
                  />
                  <span className="added-tasktitle">
                    <strike>{item.task}</strike>
                  </span>
                </div>
              ) : (
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onClick={(event) => statusUpdate(event, item.id)}
                  />
                  <span className="added-tasktitle">{item.task}</span>
                </div>
              )}

              <button
                className="delete-button"
                onClick={() => deleteRecord(item.id)}
              >
                <Deleteicon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
