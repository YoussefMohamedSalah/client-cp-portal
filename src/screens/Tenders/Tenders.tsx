import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { Tender } from "types/Tender";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useDeleteTender } from "api/Tenders/deleteTender";
import { useTendersQuery } from "api/Tenders/getAllTenders";
import TenderCard from "components/Tenders/TenderCard";

const Tenders: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteTender();
  const { data, error, isLoading } = useTendersQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let tenders: Tender[] = data.tenders.data! || ([] as Tender[]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Tenders"}
          isBtnShow={true}
          btnText={"Create Tender"}
          onClickBtn={() => push("/" + PAGES.TENDER)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          {tenders.map((tender: Tender) => (
            <div key={tender.id}>
              <TenderCard tender={tender} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tenders;
