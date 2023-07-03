# fe-todo


## Todo 설계

- Todos.js를 가져와서 todo 목록 초기화 
- $단위로 나눠서 저장
- show$all : 현재 상태 filtering 해서 반환
    - Filter status가 todo doing done 같은거 개수 출력
- show$todo : 총 todo list 반환
    - map으로 status가 todo인 것 개수 세고, 이름+id를 string으로 이어서 출력
- Add 
    - 새로운 json 객체 생성 name이랑 tag 구분해서
        - $단위로 나눈 두번째 원소를 이름으로 두고, 세번째 원소를 다시 JSON.parse()로 배열로 만들어서 걍 저장
- Delete
    - map함수를 이용해서 id가 같지 않은것만 return하는 새 배열을 todo로 저장
- Update
    - Filter 이용해서 해당 id의 상태 변경

Add, delete, update수행 후 show all 실행

Todos 형식
```json
{
  ‘Name’ : ‘이름’,
  ‘Tags’ : [‘tag1’,’tag2’],
  ‘Status’ : ‘todo’ || ‘doing’ || ‘done’,
  ‘Id’ : id
}
```