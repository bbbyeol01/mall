import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  name: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);

  const { moveToList, moveToModify } = useCustomMove();

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    // console.log(pno);

    getOne(pno)
      .then((data) => {
        // console.log(data);
        setProduct(data);
        setFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">PNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">NAME</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.name}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">PRICE</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6  text-right font-bold">DESC</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col m-auto items-center justify-center">
        {product.uploadFileNames.map((imageFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imageFile}`}
          />
        ))}
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 text-xl text-white bg-blue-500"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 text-xl text-white bg-blue-500"
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;
