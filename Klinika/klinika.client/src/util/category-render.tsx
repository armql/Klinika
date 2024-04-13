import {
  ArchiveBox,
  HouseSimple,
  Table,
  UsersThree,
} from "@phosphor-icons/react";

function categoryRender(category: string) {
  switch (category) {
    case "Portal":
      return <HouseSimple size={24} weight="duotone" />;
    case "Data Manage":
      return <Table size={24} weight="duotone" />;
    case "Community":
      return <UsersThree size={24} weight="duotone" />;
    default:
      return <ArchiveBox size={24} weight="duotone" />;
  }
}

export { categoryRender };
