import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
    headerWrapper: {
        width: "100%",
        height: "50px",
        display: "flex",
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        flexDirection: "row",
        justifyContent: "space-between",
        //    paddingBottom: "10px",
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
        marginTop: "5px",
        //    marginBottom: "5px",
        minHeight: "35px",
        fontWeight: "bold",
        width: "fit-content",
    },
    insideStyleDash: {
        backgroundColor: tokens.colorBrandBackground,
        width: "24px",
        height: "3px",
    },
    pageTitleWrapper: {
        display: "flex",
        flexDirection: "column",
        marginTop: "5px",
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
        cursor: "pointer",
        width: "400px",
    },
    leftSideWrapper: {
        display: "flex",
        minWidth: "312px",
    },
    navigationWrapper: {
        position: "relative",
        width: "70%",
        minWidth: "660px"
    },

    logoWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    },
    logo: {
        height: "30px",
        width: "80px"
    },
    rightSideWrapper: {
        display: "flex",
        marginLeft: "40px",
        flexDirection: "row",
        gap: tokens.spacingHorizontalS,
        alignItems: "center",
    },
    personaWrapper: {
        margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS} 0 0`,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
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