const ERROR = {
  INPUT_BLANK : "명령을 입력해주세요.",
  INVALID_INPUT_COMMAND : "없는 명령입니다.",
  ID_NOT_INPUT : "id를 입력하세요.",
  ID_NOT_EXIST : "존재하는 todo의 id가 아닙니다.",
  STATUS_NOT_INPUT : "상태를 입력하지 않았습니다.",
  STATUS_NOT_EXIST : "존재하는 상태가 아닙니다.",
  STATUS_ALREADY : "이미 해당 status입니다.",
  NAME_NOT_INPUT : "이름이 입력되지 않았습니다.",
  TAG_NOT_INPUT : "태그가 입력되지 않았습니다.",
  TAG_INVALID_TYPE : "태그가 올바른 형식이 아닙니다.",

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