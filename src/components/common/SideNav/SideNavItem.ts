import type { ReactNode } from "react";

export type SideNavItem = {
    key: string;
    localizationKey?: string;
    text?: string;
    icon?: any;
    isHeader?: boolean;
    onClick?: () => void;
    children?: SideNavItem[] | ReactNode;
}