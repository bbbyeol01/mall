// import { useCallback } from "react";
import {
  // createSearchParams,
  // useNavigate,
  useParams,
  // useSearchParams,
} from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

function ReadPage() {
  const { tno } = useParams();

  // ReadComponent가 필요한 기능을 useCustomMove를 이용해서 처리할 수 있으므로, 기존의 useNavigate를 이용하는 코드를 삭제할 수 있음.
  // const navigate = useNavigate();

  // const [queryParams] = useSearchParams();

  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  // const queryStr = createSearchParams({ page, size }).toString();

  // const moveToModify = useCallback(
  //   (tno) => {
  //     navigate({
  //       pathname: `/todo/modify/${tno}`,
  //       search: queryStr,
  //     });
  //   },
  //   [tno, page, size]
  // );

  // const moveToList = useCallback(() => {
  //   navigate({
  //     pathname: `/todo/list`,
  //     search: queryStr,
  //   });
  // }, [page, size]);

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl">Todo Read Page Component {tno}</div>

      <ReadComponent tno={tno}></ReadComponent>
    </div>
  );
}

export default ReadPage;
