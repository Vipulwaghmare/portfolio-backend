const backupTodoController = async (req, res) => {};

const recoverTodoController = async (req, res) => {};

const deleteTodoController = async (req, res) => {};

const todoControllers = {
  backupTodo: backupTodoController,
  recoverTodo: recoverTodoController,
  deleteTodo: deleteTodoController,
};

export default todoControllers;
