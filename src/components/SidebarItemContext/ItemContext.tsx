import { useRecoilState, RecoilState } from "recoil";

import { ContextMenu } from "@/components/ContextMenu";
import { Dropdown } from "@/components/Dropdown";
import { Close, Edit } from "@/components/Icons";

type Props = {
  itemId: string;
  setRenamingItemId: (id: string) => void;
  children: React.ReactNode;
  itemSelector: RecoilState<any>
};

export const ItemContext = ({ itemId, setRenamingItemId, itemSelector, children }: Props) => {
  const [items, setItems] = useRecoilState(itemSelector);

  const menu = [
    {
      id: "rename",
      onClick: () => setRenamingItemId(itemId),
      children: (
        <>
          <Edit size={15} /> Rename
        </>
      ),
    },
    {
      id: "delete",
      onClick: () => setItems(items.filter((item: any) => item.id !== itemId)),
      children: (
        <>
          <Close size={15} /> Delete
        </>
      ),
      danger: true,
    },
  ];

  return (
    <ContextMenu color="offWhite" menu={menu}>
      {children}
      <Dropdown menu={menu} />
    </ContextMenu>
  );
};
