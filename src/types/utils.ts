import type { components } from "types/api/api.ts";

export type Dto<T extends keyof components["schemas"]> = components["schemas"][T];