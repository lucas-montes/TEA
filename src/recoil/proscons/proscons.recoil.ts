import { RecoilState } from "recoil";

import { customSelector, customAtom } from "@/recoil/base.recoil";
import ProsCons from "@/models/ProsCons";

export type ProsConsState = {
    items: { [key: ProsCons["id"]]: ProsCons; };
    selectedItem: ProsCons;
    selectedItemId: number;
};


export const prosConsState: RecoilState<ProsConsState> = customAtom("prosConsState");

export const prosConsSelector: RecoilState<ProsConsState> = customSelector("prosConsSelector", prosConsState);