import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  })
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const response = await getTask(params.id);
        setTask({
          title: response.title,
          description: response.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          await updateTask(params.id, values);
          setTask({
            title: "",
            description: "",
          })
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
            <h1 className="text-xl font-bold uppercase text-center">Edit Task</h1>
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
              {isSubmitting ? "Saving..." : "Edit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
