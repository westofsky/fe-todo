const { todos } = require("./todos");
const { ERROR, COMMAND, STATUS, MESSAGE } = require("./constant");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const app = () => {
  rl.on(MESSAGE.CLOSE, () => {
    process.exit();
  });
  rl.question(MESSAGE.QUESTION, (line) => {
    getLine(line);
    app();
  });
};

const getLine = (line) => {
  const [command, arg1, arg2] = line.split(COMMAND.SPLIT);
  switch (command) {
    case COMMAND.SHOW:
      if (arg1 === COMMAND.ALL) {
        showAll();
      } else {
        showStatus(arg1);
      }
      break;
    case COMMAND.ADD:
      addTodo(arg1, arg2);
      break;
    case COMMAND.DELETE:
      deleteTodo(arg1);
      break;
    case COMMAND.UPDATE:
      updateTodo(arg1, arg2);
      break;
    case COMMAND.EXIT:
      rl.close();
    case COMMAND.BLANK:
      console.log(ERROR.INPUT_BLANK);
    default:
      console.log(ERROR.INVALID_INPUT_COMMAND);
      break;
  }
};

const showAll = () => {
  const count = {
    [STATUS.TODO] : 0,
    [STATUS.DOING] :  0,
    [STATUS.DONE] : 0,
  }
  todos.filter((todo) => count[todo.status]++)

  console.log(
    MESSAGE.SHOW_ALL(count[STATUS.TODO], count[STATUS.DOING], count[STATUS.DONE])
  );
};

const showStatus = (status) => {
  let statusArray = [];
  // status가 없을 때
  // status가 todo,doing,done이 아니면 없는 상태입니다.
  todos.filter((todo) => {
    if (todo.status === status) {
      statusArray.push(MESSAGE.STATUS_ARRAY_STRING(todo.name, todo.id));
    }
  });
  console.log(
    MESSAGE.SHOW_STATUS(status, statusArray)
  );
};

const addTodo = (name, tags) => {
  const tag = JSON.parse(tags);
  //name이 비어있을 때
  //tag형식이 이상할때
  //tae도 비어있을때
  const randomId = Math.round(Math.random() * 100000);
  // randomid만들었는데 이미 존재하는 아이디 일때 다시 받기
  todos.push({
    name: name,
    tags: tag,
    status: STATUS.TODO,
    id: randomId,
  });
  console.log(MESSAGE.ADD_TODO(name, randomId));
  showAll();
};

const deleteTodo = (id) => {
  //id가 없을때
  //id가 비어있을때
  const index = todos.findIndex((todo) => todo.id == id);
  if (index < 0) 
    console.log(ERROR.ID_NOT_EXISTS);
  else {
    console.log(
      MESSAGE.DELETE_TODO(todos[index].name, todos[index].status)
    );
    todos.splice(index, 1);
  }
  showAll();
};

const updateTodo = (id, status) => {
  // status가 이미 같은 상태일 경우
  // id가 없을때
  // status가 없을때
  // status가 todo, doing, done가 아닌 경우
  const index = todos.findIndex((todo) => todo.id == id);
  if (index < 0) 
    console.log(ERROR.ID_NOT_EXISTS);
  else {
    todos[index].status = status;
    console.log(
      MESSAGE.UPDATE_TODO(todos[index].name, todos[index].status)
    );
  }
  showAll();
};

app();