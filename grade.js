const { todos } = require("./todos");
const { ERROR, COMMAND, STATUS, MESSAGE } = require("./constant");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * 메인 함수
*/
const app = () => {
  rl.question(MESSAGE.QUESTION, (line) => {
    getLine(line);
    app();
  });
};

/**
 * 한 줄 입력 받는 함수
*/
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

/**
 * 전체 Todo 리스트 보여주는 함수
*/
const showAll = () => {
  const count = {
    [STATUS.TODO] : 0,
    [STATUS.DOING] :  0,
    [STATUS.DONE] : 0,
  }
  todos.forEach((todo) => count[todo.status]++);

  console.log(
    MESSAGE.SHOW_ALL(count[STATUS.TODO], count[STATUS.DOING], count[STATUS.DONE])
  );
};

/**
 * status에 따른 Todo 리스트 보여주는 함수
*/
const showStatus = (status) => {
  let statusArray = [];
  if(checkErrorStatus(status)){
    return;
  }
  todos.forEach((todo) => {
    if (todo.status === status) {
      statusArray.push(MESSAGE.STATUS_ARRAY_STRING(todo.name, todo.id));
    }
  });
  console.log(
    MESSAGE.SHOW_STATUS(status, statusArray)
  );
};

/**
 * Todo 추가하는 함수
*/
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

/**
 * Todo 지우는 함수
*/
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

/**
 * Todo 업데이트 하는 함수
*/
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

/**
 * status 입력이 제대로 되었는지 확인하는 함수
*/
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
  if(!existStatus.includes(status)){
    console.log(ERROR.STATUS_NOT_EXIST);
    return true;
  }
  return false;
}

/**
 * addTodo 입력 값이 올바른지 확인하는 함수
*/
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

/**
 * deleteTodo 입력 값이 올바른지 확인하는 함수
*/
const checkErrorDeleteTodo = (id, index) => {
  if(checkIdInput(id))
    return true;
  if (checkTodoExist(index)){
    return true;
  }
  return false;
}

/**
 * updateTodo 입력 값이 올바른지 확인하는 함수
*/
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

/**
 * 문자열이 문자열 배열인지 확인하는 함수
*/
const checkStringIsArray = (string) => {
  const regex = /\["([^"]+)"(?:,\s*"([^"]+)")*\]/;
  return regex.test(string);
}

/**
 * id입력값이 올바른지 확인하는 함수
*/
const checkIdInput = (id) => { 
  if(!id && id !==0){
    console.log(ERROR.ID_NOT_INPUT);
    return true;
  }
  return false;
}

/**
 * id에 해당하는 todo가 존재하는지 확인하는 함수
*/
const checkTodoExist = (index) => {
  if (index < 0) {
    console.log(ERROR.ID_NOT_EXIST);
    return true;
  }
  return false;
}

/**
 * id값을 생성하는 함수
*/
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