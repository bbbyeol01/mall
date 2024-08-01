import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/products/ModifyComponent";

const ModifyPage = () => {
  const { pno } = useParams();
  return (
    <div className="bg-white p-4 w-full">
      <div className="text-3xl font-extrabold">Product Modify</div>
      <ModifyComponent pno={pno} />
    </div>
  );
};

export default ModifyPage;
