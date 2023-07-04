const { todos } = require("./todos");
const { ERROR, COMMAND, STATUS, MESSAGE } = require("./constant");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const app = () => {
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
      process.exit();
    case COMMAND.BLANK:
      console.log(ERROR.INPUT_BLANK);
      break;
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
  if(checkErrorStatus(status)){
    return;
  }
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
  if(checkErrorAddTodo(name,tags))
    return;
  const tag = JSON.parse(tags);
  const randomId = generateId();
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
  const index = todos.findIndex((todo) => (todo.id).toString() === id);
  if (checkErrorDeleteTodo(id, index)) {
    return;
  }
  console.log(
    MESSAGE.DELETE_TODO(todos[index].name, todos[index].status)
  );
  todos.splice(index, 1);
  showAll();
};

const updateTodo = (id, status) => {
  const index = todos.findIndex((todo) => (todo.id).toString() === id);
  if(checkErrorUpdateTodo(id,index,status)){
    return;
  }
  todos[index].status = status;
  console.log(
    MESSAGE.UPDATE_TODO(todos[index].name, todos[index].status)
  );
  showAll();
};

const checkErrorStatus = (status) => {
  const existStatus = [
    STATUS.TODO,
    STATUS.DOING,
    STATUS.DONE
  ];
  if(!status){
    console.log(ERROR.STATUS_NOT_INPUT);
    return true;
  }
  const invalidStatus = existStatus.findIndex((existStatus)=> existStatus === status) === -1;
  if(invalidStatus){
    console.log(ERROR.STATUS_NOT_EXIST);
    return true;
  }
  return false;
}

const checkErrorAddTodo = (name,tags) => {
  if(!name){
    console.log(ERROR.NAME_NOT_INPUT);
    return true;
  }
  if(!tags){
    console.log(ERROR.TAG_NOT_INPUT);
    return true;
  }
  if (!checkStringIsArray(tags)) {
    console.log(ERROR.TAG_INVALID_TYPE);
    return true;
  }
  return false;
}

const checkErrorDeleteTodo = (id, index) => {
  if(checkIdInput(id))
    return true;
  if (checkTodoExist(index)){
    return true;
  }
  return false;
}

const checkErrorUpdateTodo = (id, index, status) => {
  if(checkIdInput(id))
    return true;
  if (checkTodoExist(index)){
    return true;
  }
  if (todos[index].status === status) {
    console.log(ERROR.STATUS_ALREADY);
    return true;
  }
  return checkErrorStatus(status)
}

const checkStringIsArray = (string) => {
  const regex = /\["([^"]+)"(?:,\s*"([^"]+)")*\]/;
  return regex.test(string);
}

const checkIdInput = (id) => { 
  if(!id && id !==0){
    console.log(ERROR.ID_NOT_INPUT);
    return true;
  }
  return false;
}

const checkTodoExist = (index) => {
  if (index < 0) {
    console.log(ERROR.ID_NOT_EXIST);
    return true;
  }
  return false;
}
const generateId = () => {
  const id = Math.round(Math.random() * 100000) + 1;
  const duplicatedTodo =  todos.filter((todo) => 
    id === todo.id
  );
  if (duplicatedTodo.length)
    return generateId();
  return id;
}



app();