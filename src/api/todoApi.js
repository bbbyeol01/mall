import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

// 하나의 todo를 불러옴
export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}`);
  return res.data;
};

// todo 리스트를 가져옴(페이지 처리)
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// todo 등록 후 tno를 받아옴
export const postAdd = async (todoObj) => {
  const res = await axios.post(`${prefix}/`, todoObj);

  return res.data;
};

// todo 삭제
export const deleteOne = async (tno) => {
  const res = await axios.delete(`${prefix}/${tno}`);

  return res.data;
};

export const putOne = async (todo) => {
  const res = await axios.put(`${prefix}/${todo.tno}`, todo);

  return res.data;
};
