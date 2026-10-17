import { Button, Divider } from "@fluentui/react-components";
import {
    AppsRegular,
    ChevronLeftRegular,
    ChevronRightRegular,
    DocumentRegular,
    HomeRegular,
    SettingsRegular
} from "@fluentui/react-icons";
import { useState, type ReactNode } from "react";
import { useLocalization } from "../../../context/LocalizationContext";
import { useStyles } from "./SideNav.styles";
import type { SideNavItem } from "./SideNavItem";

const iconMap = {
    home: HomeRegular,
    document: DocumentRegular,
    settings: SettingsRegular,
    apps: AppsRegular
};

export function SideNav(props: {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    navigateTo?: (url: string) => void;
    navigationItems: SideNavItem[];
}) {
    const { getLocalization } = useLocalization();
    const [isCollapsed, setIsCollapsed] = useState(props.isOpen === false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const styles = useStyles();

    const resolvedIsOpen = !isCollapsed;

    const toggleCollapse = () => {
        const next = !resolvedIsOpen;
        setIsCollapsed(!next);
        props.onOpenChange?.(next);
    };

    const getItemText = (item: SideNavItem) => {
        return item.text ?? (item.localizationKey ? getLocalization(item.localizationKey) : item.key);
    };

    const renderIcon = (item: SideNavItem) => {
        if (!item.icon) {
            return null;
        }
        if (typeof item.icon === "string" && iconMap[item.icon as keyof typeof iconMap]) {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return <IconComponent className={styles.icon} />;
        }
        return <div className={styles.icon}>{item.icon}</div>;
    };

    const handleNavigate = (item: SideNavItem) => {
        if (item.onClick) {
            item.onClick();
            return;
        }

        if (props.navigateTo && item.key) {
            props.navigateTo(item.key);
        }
    };

    const renderItem = (item: SideNavItem, level: number = 0): ReactNode => {
        const itemText = getItemText(item);
        const hasChildren = Array.isArray(item.children) ? item.children.length > 0 : !!item.children;
        const isExpanded = expandedGroups[item.key] ?? true;
        const childItems = Array.isArray(item.children) ? item.children : [];
        const customChildren = !Array.isArray(item.children) ? item.children : null;

        if (item.isHeader && !hasChildren) {
            return <div key={item.key} className={styles.headerItem}>{itemText}</div>;
        }

        if (item.isHeader && hasChildren) {
            return <div key={item.key} className={styles.groupWrapper}>
                <div className={styles.headerItem}>{itemText}</div>
                {!isCollapsed && isExpanded && (
                    <div className={styles.groupChildren}>
                        {childItems.length > 0
                            ? childItems.map((child) => renderItem(child, level + 1))
                            : customChildren}
                    </div>
                )}
            </div>;
        }

        if (hasChildren) {
            return <div key={item.key} className={styles.groupWrapper}>
                <Button
                    className={styles.groupButton}
                    appearance="subtle"
                    onClick={() => setExpandedGroups((current) => ({ ...current, [item.key]: !isExpanded }))}
                    icon={renderIcon(item)}
                    iconPosition="before"
                    style={{ paddingLeft: `${level * 12 + 12}px` }}
                >
                    {!isCollapsed && itemText}
                </Button>
                {!isCollapsed && isExpanded && (
                    <div className={styles.groupChildren}>
                        {childItems.length > 0
                            ? childItems.map((child) => renderItem(child, level + 1))
                            : customChildren}
                    </div>
                )}
            </div>;
        }

        return <Button
            key={item.key}
            type="button"
            className={styles.navItem}
            onClick={() => handleNavigate(item)}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
            {renderIcon(item)}
            {!isCollapsed && <span className={styles.navText}>{itemText}</span>}
        </Button>;
    };

    return <nav className={`${styles.root} ${isCollapsed ? styles.rootCollapsed : ""}`} aria-label={getLocalization("sideNav.sidebarNavigation")}>
        <div className={styles.navHeader}>
            {!isCollapsed && <div className={styles.brand}>{getLocalization("common.appName")}</div>}
            <Button
                aria-label={isCollapsed ? getLocalization("sideNav.expandNavigation") : getLocalization("sideNav.collapseNavigation")}
                appearance="subtle"
                className={styles.collapseButton}
                onClick={toggleCollapse}
                icon={isCollapsed ? <ChevronRightRegular /> : <ChevronLeftRegular />}
            />
        </div>
        <div className={styles.navContent}>
            <Divider className={styles.divider} />
            {props.navigationItems.map((item) => renderItem(item))}
        </div>
    </nav>;
}