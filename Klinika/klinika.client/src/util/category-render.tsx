import {
  ArchiveBox,
  HouseSimple,
  Table,
  UsersThree,
} from "@phosphor-icons/react";

function categoryRender(category: string) {
  switch (category) {
    case "Portal":
      return <HouseSimple size={28} weight="duotone" />;
    case "Data Manage":
      return <Table size={28} weight="duotone" />;
    case "Community":
      return <UsersThree size={28} weight="duotone" />;
    default:
      return <ArchiveBox size={28} weight="duotone" />;
  }
}

export { categoryRender };
