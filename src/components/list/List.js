import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AddListModal } from "../templates/AddListModal";
import * as authService from "../../services/auth.service";
import * as taskService from "../../services/task.service";
import { getAllTaskAction } from "../../actions/taskAction"
import { AlertSuccess, AlertWarning, SwalWarning } from "../templates/alerts";

export const List = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskId, setTaskId] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  const [children, setChildren] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { task_list } = useSelector(state => state.taskList) 

  const handleDelete = async (id) => {
    const result = await taskService.removeTask(id);
    if (result.statusText === "OK") {
      setChildren("Task has been deleted successfully.")
      setAlertSuccess(true)
      getTask()
    } else {
      setChildren("Unable to delete task.")
      setAlertSuccess(true)
    }
  }

  const confirmDelete = (id, title, type, text) => {
    SwalWarning({ title, type, text }).then((result) => {
      if (result.value) {
        handleDelete(id)
      }
    });
  }

  const logout = async () => {
    authService.logout()
    setTimeout(() => {
      history.push("/login")
    },500)
  }

  const getTask = async () => {
    const result = await taskService.getAllTask()
    if (result.statusText === "OK") {
      dispatch(getAllTaskAction(result.data))
    }
  }

  const addTask = (checkEdit, id = "") => {
    setShowModal(true)
    setIsEdit(checkEdit)
    setTaskId(id)
  }

  useEffect(() => {
    getTask()
  },[])

  return (
    <>
      <div className="col-md-12 row">
        <div className="col-md-12">
          <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="fa fa-tasks"></i>&nbsp;Task Lists</div>
            </div>
            <div className="scroll-area-sm">
              <div style={{position: "static"}} className="ps ps--active-y">
                <div className="ps-content">
                  <ul className=" list-group list-group-flush">
                    {task_list.length > 0 ? task_list.map((task) => (
                      <li className="list-group-item">
                        <div className="todo-indicator bg-primary"></div>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-2"></div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {task.title}
                              </div>
                              <div className="widget-subheading"><i>{task.description}</i></div>
                            </div>
                            <div className="widget-content-right"> 
                              <button 
                                className="border-0 btn-transition btn btn-outline-primary mr-1"
                                onClick={() => addTask(true, task._id)}
                              > 
                                <i className="fa fa-edit"></i> 
                              </button> 
                              <button 
                                className="border-0 btn-transition btn btn-outline-danger"
                                onClick={() => confirmDelete(
                                  task._id,
                                  "Are you sure?",
                                  "warning",
                                  "This task will be deleted."
                                )}
                              > 
                                <i className="fa fa-trash"></i> 
                              </button> 
                            </div>
                          </div>
                        </div>
                      </li>
                    )) : null}
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-block text-right card-footer">
              <button className="mr-2 btn btn-link btn-sm" onClick={logout}>Logout</button>
              <div className="btn-add-task">
                <div className="login100-form-bgbtn"></div>
                <button className="btn-add-text" onClick={() => addTask(false)}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddListModal
          showModal={showModal}
          isEdit={isEdit}
          taskId={taskId}
          setShowModal={setShowModal}
          setAlertSuccess={setAlertSuccess}
          setAlertWarning={setAlertWarning}
          setChildren={setChildren}
          getTaskList={getTask}
        />
      </div>
      <AlertSuccess
        open={alertSuccess}
        setOpen={setAlertSuccess}
        children={children}
        duration={3000}
      />
      <AlertWarning
        open={alertWarning}
        setOpen={setAlertWarning}
        children={children}
        duration={3000}
      />
    </>
  )
}