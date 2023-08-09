"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import styles from "../componentStyle/styles.module.css";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/todolist/RootState";
import {
  AddTask,
  ChangeStatus,
  Deletetask,
} from "@/app/redux/todolist/todoActions";
import { AppDispatch } from "@/app/redux/todolist/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
interface Props {
  title: string;
}

const Page: React.FC<Props> = () => {
  const [allButtonColor, setAllButtonColor] = useState("white");

  const [completedButtonColor, setCompletedButtonColor] = useState("white");
  const [IncompletedButtonColor, setIncompletedButtonColor] = useState("white");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [filteredTasks, setFilteredTasks] = useState<data[]>(tasks);
  const [windowDisplay, setWindowDisplay] = useState("none");
  const [windowDisplay2, setWindowDisplay2] = useState("none");
  const [deleteTaskId, setIdToDetelet] = useState(-1);
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  type data = {
    id: number;
    status: string;
    name: string;
  };

  let dataType: data[] = [];
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (
      tasks.length > 0 &&
      completedButtonColor == "white" &&
      IncompletedButtonColor == "white"
    ) {
      setAllButtonColor("rgb(244, 244, 244)");
      setFilteredTasks(tasks);
    }
  }, [tasks]);

  const insertTask = () => {
    if (text.length > 0) {
      const body = { id: tasks.length, status: "undone", name: text };
      dispatch(AddTask(body));
      if (completedButtonColor == "white") {
        setFilteredTasks(tasks);
      }
      if (IncompletedButtonColor != "white") {
        setFilteredTasks([...filteredTasks, body]);
      }

      console.log(tasks);
      console.log(filteredTasks);
      setText("");
    }
  };
  const changeStatus = (id: number) => {
    setFilteredTasks(tasks);
    dispatch(ChangeStatus(id));
  };

  const showCompleted = () => {
    setAllButtonColor("white");
    setCompletedButtonColor("rgb(244, 244, 244)");
    setIncompletedButtonColor("white");

    const completedTasks = tasks.filter((item) => item.status === "done");
    setFilteredTasks(completedTasks);
  };

  const showIncompleted = () => {
    setAllButtonColor("white");
    setCompletedButtonColor("white");
    setIncompletedButtonColor("rgb(244, 244, 244)");

    const incompletedTasks = tasks.filter((item) => item.status === "undone");
    setFilteredTasks(incompletedTasks);
  };
  const showAll = () => {
    setFilteredTasks(tasks);
    setAllButtonColor("rgb(244, 244, 244)");
    setCompletedButtonColor("white");
    setIncompletedButtonColor("white");
  };

  const opentoDelte = (id: number) => {
    setWindowDisplay("block");
    setWindowDisplay2("block");
    setIdToDetelet(id);
  };
  const deleteTask = () => {
    dispatch(Deletetask(deleteTaskId));
    setWindowDisplay("none");
    setWindowDisplay2("none");
    setIdToDetelet(-1);
  };
  return (
    <div className={styles.permasa}>
      <div style={{ display: windowDisplay2 }} className={styles.window}>
        <div className={styles.window2}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", width: 20, height: 20 }}
          />
        </div>
        <FontAwesomeIcon
          onClick={() => {
            setWindowDisplay("none");
            setWindowDisplay2("none");
            setIdToDetelet(-1);
          }}
          className={styles.closetag}
          icon={faTimes}
        />
        <p
          style={{
            marginLeft: 20,
            marginTop: -10,
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Delete task{" "}
        </p>
        <p style={{ fontSize: 12, width: 300, marginLeft: 20, color: "grey" }}>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <button
          onClick={() => {
            setWindowDisplay("none");
            setWindowDisplay2("none");
            setIdToDetelet(-1);
          }}
          style={{
            width: 140,
            height: 40,
            border: "1px black solid ",
            marginLeft: 20,
            borderRadius: 5,
            marginTop: 19,
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => deleteTask()}
          style={{
            width: 140,
            height: 40,

            marginLeft: 20,
            borderRadius: 5,
            marginTop: 19,
            backgroundColor: "red",
            color: "white",
          }}
        >
          {" "}
          Delete
        </button>
      </div>
      <div style={{ display: windowDisplay }} className={styles.shadow}></div>
      <div>
        <div className="header">
          <div className={styles.inputdiv}>
            <input
              type="text"
              className={styles.inputplace}
              placeholder="Write your task here..."
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </div>
          <button onClick={() => insertTask()} className={styles.buttonCreate}>
            Create
          </button>
          <div className={styles.treButtons}>
            <button
              className={styles.allButton}
              style={{
                backgroundColor: allButtonColor,
              }}
              onClick={() => showAll()}
            >
              All{" "}
            </button>
            <button
              style={{
                backgroundColor: completedButtonColor,
              }}
              className={styles.Completed}
              onClick={() => showCompleted()}
            >
              Completed
            </button>
            <button
              style={{
                backgroundColor: IncompletedButtonColor,
              }}
              className={styles.Incompleted}
              onClick={() => showIncompleted()}
            >
              Incompleted
            </button>
          </div>
        </div>
        <div className={styles.body}>
          <div
            style={{ display: tasks.length == 0 ? "block" : "none" }}
            className={styles.empty}
          >
            <p className={styles.youdonthavetask}>You don't have any tasks</p>
            <div onClick={focusInput} className={styles.circle}>
              <FontAwesomeIcon className={styles.plusadd} icon={faPlus} />
            </div>
            <p className={styles.createTask}>Create Task</p>
          </div>

          <div
            className={styles.tasksData}
            style={{ display: tasks.length == 0 ? "none" : "block" }}
          >
            {filteredTasks.map((d) => (
              <div key={d.id} className={styles.taskContainer}>
                <div
                  style={{
                    backgroundColor: d.status == "done" ? "#a5fad2 " : "white ",
                  }}
                  className={styles.TaskDiv}
                >
                  <div
                    className={styles.circletask}
                    onClick={() => changeStatus(d.id)}
                    style={{
                      border:
                        d.status == "done"
                          ? "3px green solid"
                          : "3px black solid",
                    }}
                  />
                  <FontAwesomeIcon
                    onClick={() => changeStatus(d.id)}
                    className={styles.checkTask}
                    icon={faCheck}
                    style={{
                      color: d.status == "done" ? "green " : "black ",
                    }}
                  />
                  <p className={styles.TAskname}>{d.name}</p>
                </div>
                <button className={styles.Editbutton}>Edit</button>
                <button
                  onClick={() => opentoDelte(d.id)}
                  className={styles.deleteButton}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: "white" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
