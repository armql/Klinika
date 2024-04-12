import React, { useEffect, useState } from "react";
import DataList from "../../components/DataList";
import Table from "../../features/handata/components/Table";
import specializationData from "../../data/specialization.json";
import { useSpecialized } from "../../features/handata/handata";

export type Specialization = {
  specialization_id: number;
  name: string;
  created_by: string;
  created_date: string;
};

export default function SpecializationData() {
  const { specialization, setSpecialization, setLoading } = useSpecialized();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setSpecialization(specializationData.specializations);
    }, 1000);
  }, []);

  return (
    <DataList name="Specialization List">
      <Table<Specialization>
        headers={["Specialization id", "Name", "Created by", "Created in"]}
        data={specialization}
      />
    </DataList>
  );
}
