const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {serverData.prev ? (
        <div
          onClick={() => movePage({ page: serverData.prevPage })}
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
        >
          Prev
        </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          onClick={() => movePage({ page: pageNum })}
          className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
            serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
          }`}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div onClick={() => movePage({ page: serverData.nextPage })}>Next</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageComponent;
