import { DefaultValue, RecoilState, atom, selector, SetRecoilState, GetRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export function customAtom<T>(key: string, defaultExtras: object = {}): RecoilState<T> {
    const defaultObject = {
        items: {},
        selectedItem: "",
        selectedItemId: ""
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
    getMethod: Function = Object.values,
    setMethod: Function = addNewItem
): RecoilState<T> {
    return selector({
        key: key,
        get: ({ get }) => getMethod(get(state).items),
        set: ({ get, set }, items) => setMethod(items, set, get, state),
    });
}

export function addNewItem<T>(
    items: any,
    set: SetRecoilState,
    get: GetRecoilValue,
    state: RecoilState<T>
): void {
    !(items instanceof DefaultValue) && set(state, { ...get(state), items, })
}