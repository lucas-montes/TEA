import ProsCons from "@/models/ProsCons";

export type ProsConsState = {
    items: { [key: ProsCons["id"]]: ProsCons; };
    selectedItem: ProsCons;
    selectedItemId: number;
};