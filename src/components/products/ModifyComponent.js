import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  pno: 0,
  name: "",
  price: 0,
  pdesc: "",
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);

  const [fetching, setFetching] = useState(false);

  const { moveToList, moveToRead } = useCustomMove();

  const [result, setResult] = useState(null);

  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  /** product의 uploadFileNames를 변경해서 화면에 보이지 않도록 함 */
  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    product.uploadFileNames = resultFileNames;

    // setProduct(product) -> product 객체가 변경되었더라도, 참조가 변경되지 않았기 때문에 재렌더링이 되지 않음
    // setProduct({...product}) -> 얕은 복사로 참조를 달라지게 만들어서 재렌더링을 할 수 있도록 함
    setProduct({ ...product });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("pdesc", product.pdesc);
    formData.append("delFlag", product.delFlag);

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }

    setFetching(true);

    putOne(pno, formData).then((data) => {
      setResult("Modified");
      setFetching(false);
    });
  };

  const handleClickDelete = () => {
    setFetching(true);

    deleteOne(pno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(pno);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }
    setResult(null);
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 ">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid shadow-md"
            name="name"
            type={"text"}
            value={product.name}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid shadow-md"
            type={"text"}
            name="pdesc"
            rows="3"
            value={product.pdesc}
            onChange={handleChangeProduct}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid shadow-md"
            type={"number"}
            name="price"
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">Delete</div>
          <select
            className="w-4/5 p-6 rounded-r border border-solid shadow-md"
            value={product.delFlag}
            name="delFlag"
            onChange={handleChangeProduct}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            type={"file"}
            multiple={true}
            className="w-4/5 p-6 rounded-r border border-solid shadow-md"
          ></input>
        </div>
      </div>

      <div className="w-full flex flex-col m-auto items-center justify-center">
        {product.uploadFileNames.map((imageFile, i) => (
          <div className="flex justify-center mb-2 flex-col w-1/3" key={i}>
            <img alt="product" src={`${host}/api/products/view/${imageFile}`} />
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => deleteOldImages(imageFile)}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 text-xl  text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>

        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 text-xl  text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 w-32 text-white bg-blue-500 text-xl"
          onClick={moveToList}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
