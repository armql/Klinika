import DataList from "../../components/DataList";
import Table from "../../features/handata/components/Table";

export type Specialization = {
  specialization_id: number;
  name: string;
  created_by: string;
  created_date: string;
};

export default function SpecializationData() {
  return (
    <DataList name="Specialization List">
      <Table
        headers={["Specialization id", "Name", "Created by", "Created in"]}
      />
    </DataList>
  );
}
