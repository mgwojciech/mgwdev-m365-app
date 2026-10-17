import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
    headerWrapper: {
        width: "100%",
        minHeight: "56px",
        display: "flex",
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `0 ${tokens.spacingHorizontalM}`,
        boxSizing: "border-box",
        fontFamily: tokens.fontFamilyBase,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    },
    imgStyle: {
        height: "4px",
        width: "24px",
        verticalAlign: "bottom"
    },
    headerText: {
        display: "inline",
        margin: 0,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        fontSize: tokens.fontSizeBase400,
        width: "100%",
    },
    insideStyleDash: {
        backgroundColor: tokens.colorBrandBackground,
        width: "24px",
        height: "3px",
    },
    pageTitleWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: `0 ${tokens.spacingHorizontalM}`,
        cursor: "pointer",
        width: "auto",
        maxWidth: "240px",
        flex: "1 1 auto",
        minWidth: 0,
    },
    leftSideWrapper: {
        display: "flex",
        alignItems: "center",
        flex: "1 1 auto",
        minWidth: 0,
    },
    navigationWrapper: {
        position: "relative",
        width: "70%",
        minWidth: "660px"
    },

    logoWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        padding: `0 ${tokens.spacingHorizontalS}`,
    },
    logo: {
        height: "30px",
        width: "80px"
    },
    rightSideWrapper: {
        display: "flex",
        flexShrink: 0,
        marginLeft: "auto",
        flexDirection: "row",
        gap: tokens.spacingHorizontalS,
        alignItems: "center",
    },
    personaWrapper: {
        minWidth: 0,
        maxWidth: "220px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        "& .fui-Persona": {
            minWidth: 0,
            maxWidth: "100%",
        },
        "& .fui-Persona__primaryText": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        "@media (max-width: 640px)": {
            maxWidth: "clamp(110px, 38vw, 160px)",
            "& .fui-Persona__primaryText": {
                display: "none",
            },
            "& .fui-Persona__secondaryText": {
                display: "none",
            },
        },
    },

    helpWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: `${tokens.spacingVerticalXS} 5px`
    },
    helpLink: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer"
    },
    ticketWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: `${tokens.spacingVerticalXS} 0 ${tokens.spacingVerticalXS} 5px`
    },
    ticketlink: {
        fontSize: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer"
    },
    searchButton: {
        ":hover": {
            cursor: "pointer"
        }
    },
    iconWrapper: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5px"
    },
    helpIcon: {
        height: "40px",
        width: "40px"
    },
    dialogButton: {
        width: "40px",
        height: "40px",
        maxWidth: "40px",
        maxHeight: "40px",
        '& span': {
            width: "40px",
            height: "40px",
        }
    }
})