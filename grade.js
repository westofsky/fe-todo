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

const getLine = (line) => {
  const [command, arg1, arg2] = line.split("$");
  switch (command) {
    case "show":
      if (arg1 === "all") {
        show_all();
      } else {
        show_status(arg1);
      }
      break;
    case "add":
      add_todo(arg1, arg2);
      break;
    case "delete":
      delete_todo(arg1);
      break;
    case "update":
      update_todo(arg1, arg2);
      break;
    case "exit":
      rl.close();
    default:
      console.log("없는 명령입니다.");
      break;
  }
};

const show_all = () => {
  const count = {
    "todo": 0,
    "doing": 0,
    "done": 0,
  }
  todos.filter((todo) => count[todo.status]++)

  console.log(
    `현재상태 : todo: ${count["todo"]}개, doing: ${count["doing"]}개, done: ${count["done"]}개`
  );
};

const show_status = (status) => {
  let name_id = [];
  todos.filter((todo) => {
    if (todo.status === status) {
      name_id.push(`'${todo.name}, ${todo.id}번'`);
    }
  });
  console.log(
    `${status}리스트 : 총${name_id.length}건 : ${name_id.toString()}`
  );
};