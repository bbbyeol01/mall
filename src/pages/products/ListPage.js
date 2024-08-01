import ListComponent from "../../components/products/ListComponent";
import { API_SERVER_HOST } from "../../api/todoApi";
import { useState } from "react";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Products List Page</div>
      <ListComponent />
    </div>
  );
};

export default ListPage;
