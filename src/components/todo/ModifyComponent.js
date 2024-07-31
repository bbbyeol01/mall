import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });

  // 모달창을 위한 상태
  const [result, setResult] = useState(null);

  // 이동
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(tno)
      .then((data) => {
        setTodo(data);
      })
      .catch((e) => {
        console.log(e);
        console.log(tno);
      });
  }, [tno]);

  // 수정 버튼 클릭 시
  const handleClickModify = () => {
    putOne(todo)
      .then((data) => {
        // console.log("modify result : " + data);
        setResult("Modified");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 삭제 버튼 클릭 시
  const handleClickDelete = () => {
    deleteOne(tno)
      .then((data) => {
        // console.log("delete result : " + data);
        setResult("Deleted");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;

    todo.complete = value === "Y";

    setTodo({ ...todo });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title={"처리 결과"}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.tno}
          </div>
        </div>
      </div>

      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">Writer</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
          <div>{todo.writer}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Title</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DueDate</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Complete</div>
          <select
            className="w-2/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="status"
            value={todo.complete ? "Y" : "N"}
            onChange={handleChangeTodoComplete}
          >
            <option value="Y">Complete</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
