/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      icon?: any;
      children?: TSidebarItem[];
    }
  | undefined;

export type TUserPath = {
  name?: string;
  path?: string;
  icon?: any;
  element?: ReactNode;
  children?: TUserPath[];
};
