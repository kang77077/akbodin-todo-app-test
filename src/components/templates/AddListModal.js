import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Modal } from "react-bootstrap";
import { taskSchema } from "../../validate/SchemaTask";
import * as taskService from "../../services/task.service";

export const AddListModal = (props) => {
  const { register, handleSubmit, setValue, trigger, reset, formState:{ errors, isValid } } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(taskSchema),
      shouldUnregister: false,
    });

  const onSubmit = async (data) => {
    let result;
    if (props.isEdit) {
      result = await taskService.editTask(data, props.taskId)
    } else {
      result = await taskService.createTask(data)
    }
    if (result.statusText === "OK") {
      props.setChildren(props.isEdit ? "Update success." : "Create success." )
      props.setAlertSuccess(true)
      props.setShowModal(false)
      props.getTaskList()
      reset({
        title: "",
        description: ""
      })
    } else {
      props.setChildren(props.isEdit ? "Update failed." : "Create success." )
      props.setAlertWarning(true)
      props.setShowModal(false)
      props.getTaskList()
    }
  }

  const getTaskData = async (id) => {
    const result = await taskService.getTaskById(id)
    if (result.statusText === "OK") {
      setValue("title", result.data.title)
      setValue("description", result.data.description)
    }
  }

  const onCancel = () => {
    props.setShowModal(false)
    reset({
      title: "",
      description: ""
    })
  }

  useEffect(() => {
    if (props.isEdit) {
      getTaskData(props.taskId)
    }
  },[props.taskId])

  return (
    <Modal
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              {...register("title")}
              placeholder="Please enter title" 
            />
            <small className="text-danger">{errors.title?.message}</small>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              {...register("description")}
              rows={3} 
            />
          </Form.Group>
          <Form.Group className="mb-3 float-right">
            <button className="mr-2 btn btn-link btn-sm" 
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <div className="btn-add-task btn-add-modal">
              <div className="login100-form-bgbtn"></div>
              <button className="btn-add-text" type="submit">
                {props.isEdit ? "Edit" : "Add" }
              </button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}