import { lazy } from "react";
import { Inventory } from "types/Inventory";
import { useInventoriesQuery } from "api/Inventory/getAllInventories";

const PageHeader = lazy(() => import("../../components/Common/PageHeader"));
const Loading = lazy(() => import("../../components/UI/Loading"));
const InventoryCard = lazy(() => import("../../components/Inventory/InventoryCard"));
const NoTableData = lazy(() => import("../../components/Common/NoTableData"));

const InventoryPage = () => {
  const { data: InventoriesData, error: InventoriesError, isLoading: InventoriesIsLoading } = useInventoriesQuery({});

  if (InventoriesIsLoading) return <Loading />;
  if (InventoriesError) return null;

  let inventories: Inventory[] = InventoriesData?.inventories?.data || ([] as Inventory[]);

  if (inventories && inventories.length === 0) return <NoTableData text={"No Data To Be Shown..."} />;

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Inventories" isBtnShow={false} />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-4 row-cols-xxl-4 py-1 pb-4">
        {inventories.map((inventory, i: number) => {
          return (
            <div key={"key" + i} className="col">
              <div className="row g-2 mb-3 mt-3">
                <InventoryCard inventory={inventory} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryPage;
