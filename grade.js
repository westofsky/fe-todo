const { todos: todo_array } = require("./todos");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const todos = todo_array;
const app = () => {
  rl.on("close", () => {
    process.exit();
  });
  rl.question("명령하세요 : ", (line) => {
    getLine(line);
    app();
  });
};
