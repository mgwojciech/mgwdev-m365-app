import { GraphPersona } from "mgwdev-m365-components";
import viteLogo from './../../assets/vite.svg'
import { makeStyles, tokens } from "@fluentui/react-components";

export interface PageHeaderProps {
    navigateTo?: (url: string) => void;
}

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
        marginLeft: "40px"
    },
    personaWrapper: {
        margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS} 0 0`,
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
export function AppHeader(props: PageHeaderProps) {
    const styles = useStyles();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSideWrapper} >
                <div className={styles.logoWrapper}>
                    <img src={viteLogo} className={styles.logo} />
                </div>
                <div className={styles.pageTitleWrapper}>
                    <h2 className={styles.headerText} onClick={() => {
                        props.navigateTo ? props.navigateTo('/') : window.location.assign('/')
                    }}>MGWDev App</h2>
                </div>
            </div>
            <div className={styles.rightSideWrapper}>
                <div className={styles.iconWrapper}>
                </div>

                <div className={styles.iconWrapper}>
                </div>
                <div className={styles.personaWrapper}>
                    <GraphPersona size="extra-large" />
                </div>
            </div>
        </div>

    )
}