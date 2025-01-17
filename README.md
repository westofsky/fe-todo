# fe-todo

> **현대자동차그룹 소프티어부트캠프 2기** <br/> **개발기간: 2023.07.3 ~ 2023.7.5**

## Pair-Programming 규칙
- 10분마다 교대
- 기능 구현 중간에 시간이 다 되어도 마무리 하고 교대하기
- 충분한 기능 구현 후 휴식시간 갖기
- 모르는 기술은 구글링 하고 아는 기술 있으면 옆 사람이 알려주기
- 화내지 않기(항상 격려와 칭찬하기)

## Directory 📁

```bash
├── README.md : 설계 명세서
├── grade.js : 실행 파일
├── todos.js : 데이터 저장 파일
├── constant.js : 문구 저장 파일
```


## Todo 설계

### 데이터 초기설정
- todos.js에서 데이터 배열 선언 후 grade.js에서 불러와서 그대로 저장

### 입력값 처리
- readline모듈을 이용해서 콘솔 한 줄씩 입력 받음
- 입력 받은 line을 $단위로 나눠서 저장

### 📌 Show
> show$all
- 현재 상태 filtering 해서 출력
    - filter {status}가 {todo} {doing} {done}인 개수 각각 출력
> show${status}
- 총 {status} list 반환
    - 빈 string에 todo가 {status}인 것들을 ``` {name} {id} ``` 형식으로 데이터 저장

- 예외처리
    1. status 자리에 빈 값이 들어온 경우
    2. status가 todo, doing, done이 아닌 경우

### 📌 Add 
> add${name}${["tags"]}
- name과 tag 구분해서 새로운 json 객체 생성 
- 두번째 인자를 이름, 세번째 인자를 태그로 하는 todo 생성해서 저장
- 태그는 JSON.parse를 이용해서 배열로 변환
- 예외처리
    1. name 자리에 빈 값이 들어온 경우
    2. tag 자리에 빈 값이 들어온 경우
    3. tag 의 형식이 배열이 아닌 다른 경우
    4. randomId를 반환하는데 이미 todos에 해당 id가 존재하는 경우

### 📌 Delete
> delete${id}
- findIndex를 이용해서 지울 todo의 인덱스를 찾기
- 입력으로 받은 id를 가진 todo가 없을 경우 메세지 출력
- 지워졌다는 안내 메세지 출력
- 예외처리
    1. id 자리에 빈 값이 들어온 경우
    2. 입력한 id가 없는 경우

### 📌 Update
> update${id}${status}
- findIndex를 이용해서 상태를 변경할 todo의 인덱스를 찾기
- 입력으로 받은 id를 가진 todo가 없을 경우 메세지 출력
- 상태 변경 후 안내 메세지 출력
- 예외처리
    1. status가 이미 같은 상태일 경우
    2. id 자리에 빈 값이 들어온 경우
    3. status 자리에 빈 값이 들어온 경우
    4. 입력한 status가 todo, doing, done이 아닌 경우

<br>

#### Add, delete, update수행 후 show all 실행

<br>
<br>

## 프로그램 실행
### app함수 재귀호출을 이용해서 계속 명령을 받을 수 있음

<br>
  
## Todos 형식
```
{
  ‘Name’ : {name},
  ‘Tags’ : [{tag1},{tag2}],
  ‘Status’ : {todo} || {doing} || {done},
  ‘Id’ : {id}
}
```
