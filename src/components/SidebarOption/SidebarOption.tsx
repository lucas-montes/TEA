import { useEffect, useMemo, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";

import { Folder as FolderIcon } from "@/components/Icons";
import { Input } from "@/components/Input";

import { Ellipsis, Flex } from "@/styles/layout";

import { Item, Form } from "./style";

type Props = {
  item: any;
  renamingId: string;
  cancelRenaming: () => void;
  selectedItemIdSelector: RecoilState<any>;
  itemSelector: RecoilState<any>;
};

export const SidebarOption = (
  { item, renamingId, cancelRenaming, selectedItemIdSelector, itemSelector }: Props) => {

  const [tempName, setTempName] = useState(item.name);
  const [selectedItemId, setSelectedItem] = useRecoilState(selectedItemIdSelector);
  const [itemState, updateItems] = useRecoilState(itemSelector);

  const handleItemSelect = () => setSelectedItem(item.id);
  const handleRename = () => {
    if (itemState && renamingId) {
      updateItems(
        itemState.map((c: any) =>
          c.id === renamingId
            ? {
              ...c,
              name: tempName,
            }
            : c,
        ),
      );
    }
    cancelRenaming();
  };

  function handleChange(event) {
    setTempName(event.target.value)
  }

  const renaming = useMemo(() => renamingId == item.id, [renamingId, item]);

  useEffect(() => {
    if (renaming) {
      setTimeout(() => document.getElementById("category-input")?.focus(), 100);
    }
  }, [renaming]);

  return (
    <Item
      onClick={handleItemSelect}
      selected={selectedItemId === item.id}
    >
      <Flex alignItems="center" gap={10}>
        <FolderIcon className="icon" size={15} />
        {renaming ? (
          <Form onSubmit={handleRename} onClick={(e: any) => e.stopPropagation()}>
            <Input
              aria-label="Name"
              autoFocus
              value={tempName}
              onChange={handleChange}
              onBlur={handleRename}
            />
          </Form>
        ) : (
          <Ellipsis>{item.name}</Ellipsis>
        )}
      </Flex>
    </Item>
  );
};
