const { todos } = require("./todos");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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
        showAll();
      } else {
        showStatus(arg1);
      }
      break;
    case "add":
      addTodo(arg1, arg2);
      break;
    case "delete":
      deleteTodo(arg1);
      break;
    case "update":
      updateTodo(arg1, arg2);
      break;
    case "exit":
      rl.close();
    default:
      console.log("없는 명령입니다.");
      break;
  }
};

const showAll = () => {
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

const showStatus = (status) => {
  let statusArray = [];
  todos.filter((todo) => {
    if (todo.status === status) {
      statusArray.push(`'${todo.name}, ${todo.id}번'`);
    }
  });
  console.log(
    `${status}리스트 : 총${statusArray.length}건 : ${statusArray.toString()}`
  );
};

const addTodo = (name, tags) => {
  const tag = JSON.parse(tags);
  const randomId = Math.round(Math.random() * 100000);
  todos.push({
    name: name,
    tags: tag,
    status: "todo",
    id: randomId,
  });
  console.log(`${name} 1개가 추가됐습니다.(id : ${randomId})`);
  showAll();
};

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id == id);
  if (index < 0) 
    console.log("id가 없습니다.");
  else {
    console.log(
      `${todos[index].name} ${todos[index].status}가 목록에서 삭제됐습니다`
    );
    todos.splice(index, 1);
  }
  showAll();
};

const updateTodo = (id, status) => {
  const index = todos.findIndex((todo) => todo.id == id);
  if (index < 0) 
    console.log("id가 없습니다.");
  else {
    todos[index].status = status;
    console.log(
      `${todos[index].name} ${todos[index].status}으로 상태가 변경됐습니다`
    );
  }
  showAll();
};

app();