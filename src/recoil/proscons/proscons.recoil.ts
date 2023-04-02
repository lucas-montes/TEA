import { RecoilState } from "recoil";

import { customSelector, customAtom } from "@/recoil/base.recoil";

import { ProsConsState } from "@/recoil/proscons/types";


export const prosConsState: RecoilState<ProsConsState> = customAtom("prosConsState");

export const prosConsSelector: RecoilState<ProsConsState> = customSelector("prosConsSelector", prosConsState);