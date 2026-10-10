import { GraphPersona } from "mgwdev-m365-components";
import viteLogo from './../../../assets/vite.svg'
import { useLocalization } from "../../../context/LocalizationContext";
import { CommonAppSettings } from "../CommonAppSettings";
import { useStyles } from "./AppHeader.styles";

export interface PageHeaderProps {
    navigateTo?: (url: string) => void;
}


export function AppHeader(props: PageHeaderProps) {
    const styles = useStyles();
    const { getLocalization } = useLocalization();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSideWrapper} >
                <div className={styles.logoWrapper}>
                    <img src={viteLogo} className={styles.logo} />
                </div>
                <div className={styles.pageTitleWrapper}>
                    <h2 className={styles.headerText} onClick={() => {
                        props.navigateTo ? props.navigateTo('/') : window.location.assign('/')
                    }}>{getLocalization("common.appName")}</h2>
                </div>
            </div>
            <div className={styles.rightSideWrapper}>
                <div className={styles.iconWrapper}>
                </div>

                <div className={styles.iconWrapper}>
                    <CommonAppSettings />
                </div>
                <div className={styles.personaWrapper}>
                    <GraphPersona size="large"  />
                </div>
            </div>
        </div>

    )
}