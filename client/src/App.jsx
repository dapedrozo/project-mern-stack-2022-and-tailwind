import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskFormUpdate from "./pages/TaskFormUpdate";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskProvider";
import Navbar from "./components/Navbar";
import TaskFormCreate from './pages/TaskFormCreate';

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-20">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TaskFormCreate />} />
            <Route path="/edit/:id" element={<TaskFormUpdate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App;
