import { GraphPersona } from "mgwdev-m365-components";
import { useEffect, useState } from "react";
import viteLogo from './../../../assets/vite.svg'
import { useLocalization } from "../../../context/LocalizationContext";
import { CommonAppSettings } from "../CommonAppSettings";
import { useStyles } from "./AppHeader.styles";
import type { RouterSubscriber } from "react-router-dom";
import { routes } from "../../../appRouter";

export interface PageHeaderProps {
    navigateTo?: (url: string) => void;
    onLocationChange?: (fn: RouterSubscriber) => () => void
}


export function AppHeader(props: PageHeaderProps) {
    const styles = useStyles();
    const { getLocalization } = useLocalization();
    const [appTitle, setAppTitle] = useState(getLocalization("common.appName"));

    useEffect(() => {
        if (props.onLocationChange) {
            const unsubscribe = props.onLocationChange(() => {
                const newLocation = window.location.pathname;
                const locationEntity = routes.find(route => route.path === newLocation);
                if (locationEntity) {
                    setAppTitle(getLocalization(locationEntity.localizationKey));
                }

            });
            return unsubscribe;
        }
    }, []);

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.leftSideWrapper} >
                <div className={styles.logoWrapper}>
                    <img src={viteLogo} className={styles.logo} />
                </div>
                <div className={styles.pageTitleWrapper}>
                    <h2 className={styles.headerText} onClick={() => {
                        props.navigateTo ? props.navigateTo('/') : window.location.assign('/')
                    }}>{appTitle}</h2>
                </div>
            </div>
            <div className={styles.rightSideWrapper}>
                <div className={styles.iconWrapper}>
                </div>

                <div className={styles.iconWrapper}>
                    <CommonAppSettings />
                </div>
                <div className={styles.personaWrapper}>
                    <GraphPersona size="large" />
                </div>
            </div>
        </div>

    )
}