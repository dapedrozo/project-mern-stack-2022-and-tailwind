import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TaskFormCreate() {
  const { createTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  })
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={false}
        onSubmit={async (values, actions) => {
          await createTask(values);
          setTask({
            title: "",
            description: "",
          })
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
            <h1 className="text-xl font-bold uppercase text-center">New Task</h1>
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="px-2 py-1 rounded-md w-full"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className="px-2 py-1 rounded-md w-full"
              onChange={handleChange}
              value={values.description}
            />
            <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 mt-2 text-white w-full rounded-md">
              {isSubmitting ? "Saving..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskFormCreate;
