import { makeStyles, tokens } from "@fluentui/react-components";

export const useRootStyles = makeStyles({
    root: {
        minHeight: "100vh",
        width: "100%",
    },
    appSurfaceWrapper: {
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 56px)",
        "@media (max-width: 640px)": {
            gridTemplateColumns: "minmax(0, 1fr)",
            overflow: "visible",
            minHeight: "calc(100vh - 56px)",
        },
    },
    contentWrapper: {
        padding: tokens.spacingHorizontalL,
        boxSizing: "border-box",
        minWidth: 0,
        overflow: "auto",
        "@media (max-width: 640px)": {
            width: "100%",
            padding: tokens.spacingHorizontalM,
            paddingBottom: "calc(84px + env(safe-area-inset-bottom))",
            overflow: "visible",
        },
    },
});