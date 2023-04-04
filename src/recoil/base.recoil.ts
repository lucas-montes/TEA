import { DefaultValue, RecoilState, atom, selector, SetRecoilState, GetRecoilValue, RecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export function customAtom<T>(key: string, defaultExtras: object = {}, initialItems: object = {}): RecoilState<T> {
    const defaultObject = {
        items: initialItems,
        selectedItem: null,
        selectedItemId: null
    }
    return atom({
        key: key,
        default: { ...defaultObject, ...defaultExtras },
        effects_UNSTABLE: [persistAtom],
    });
}

export function customSelector<T>(
    key: string,
    state: RecoilState<T>,
    getMethod: Function = getItems,
    setMethod: Function = addNewItem
): RecoilState<T> {
    return selector({
        key: key,
        get: ({ get }) => getMethod(get, state),
        set: ({ get, set }, items) => setMethod(items, set, get, state),
    });
}

export function getItems<T>(
    get: GetRecoilValue,
    state: RecoilState<T>
): { [key: number]: RecoilValue<T> } {
    return Object.values(get(state).items)
}

export function addNewItem<T>(
    items: T | DefaultValue | null,
    set: SetRecoilState,
    get: GetRecoilValue,
    state: RecoilState<T>
): void {
    !(items instanceof DefaultValue) && set(state, { ...get(state), items, })
}

export function setItem<T>(itemId: T | DefaultValue | null, set: SetRecoilState, get: GetRecoilValue,
    state: RecoilState<T>): void {
    const currentItemState = get(state);
    console.log(currentItemState)
    const item = currentItemState.items[itemId]
    set(state, { ...currentItemState, selectedItemId: item.id, selectedItem: item })
}

export function getItem<T>(
    get: GetRecoilValue,
    state: RecoilState<T>
): RecoilValue<T> {
    return get(state).selectedItem
}
