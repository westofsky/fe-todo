const ERROR = {
  INPUT_BLANK : "명령을 입력해주세요.",
  INVALID_INPUT_COMMAND : "없는 명령입니다.",
  ID_NOT_EXISTS : "id를 입력하세요.",
}

const COMMAND = {
  SPLIT: "$",
  SHOW : "show",
  ADD : "add",
  DELETE : "delete",
  UPDATE : "update",
  EXIT : "exit",
  BLANK : "",
  ALL : "all",
}

const STATUS = {
  TODO : "todo",
  DOING : "doing",
  DONE : "done",
}

const MESSAGE = {
    CLOSE : "close",
    QUESTION : "명령하세요 : ",
    SHOW_ALL: (todo, doing, done) => `현재상태 : todo: ${todo}개, doing: ${doing}개, done: ${done}개`,
    STATUS_ARRAY_STRING : (name, id) => `'${name}, ${id}번'`,
    SHOW_STATUS: (status, statusArray) => `${status}리스트 : 총${statusArray.length}건 : ${statusArray.toString()}`,
    ADD_TODO: (name, id) => `${name} 1개가 추가됐습니다.(id : ${id})`,
    DELETE_TODO: (name, status) => `${name} ${status}가 목록에서 삭제됐습니다`,
    UPDATE_TODO: (name, status) => `${name} ${status}으로 상태가 변경됐습니다`,
}
module.exports  = {
  ERROR,
  COMMAND,
  STATUS,
  MESSAGE
}