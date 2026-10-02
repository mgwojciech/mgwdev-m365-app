import { PersonaService, useGraph, useSP, useDataverse } from "mgwdev-m365-components"
import type { SPSite } from "../model/SPSite"
import { useState, useEffect, useMemo } from "react"
import type { IUser } from "mgwdev-m365-helpers/lib-commonjs/model/IUser";
import type { DataverseUser } from "../model/DataverseUser";
import { DataverseService } from "../services/DataverseService";
import { SharePointService } from "../services/SharePointService";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    page: {
        boxSizing: "border-box",
        width: "min(1080px, calc(100% - 48px))",
        margin: "0 auto",
        padding: "42px 0 64px",
        color: tokens.colorNeutralForeground1,
        fontFamily: tokens.fontFamilyBase,
        "@media (max-width: 600px)": {
            width: "calc(100% - 32px)",
            paddingTop: "30px"
        }
    },
    intro: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: tokens.spacingHorizontalXL,
        paddingBottom: "28px",
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        "@media (max-width: 600px)": {
            alignItems: "flex-start",
            flexDirection: "column",
            gap: tokens.spacingVerticalL
        }
    },
    headingGroup: {
        minWidth: 0
    },
    eyebrow: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        margin: "0 0 12px",
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        textTransform: "uppercase"
    },
    eyebrowMark: {
        width: "8px",
        height: "8px",
        borderRadius: tokens.borderRadiusCircular,
        backgroundColor: "#008b8b"
    },
    title: {
        margin: 0,
        fontSize: "36px",
        lineHeight: "42px",
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: 0,
        "@media (max-width: 600px)": {
            fontSize: "30px",
            lineHeight: "36px"
        }
    },
    description: {
        maxWidth: "540px",
        margin: `${tokens.spacingVerticalS} 0 0`,
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300
    },
    account: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
        flexShrink: 0,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        "@media (max-width: 600px)": {
            width: "100%",
            boxSizing: "border-box"
        }
    },
    avatar: {
        display: "grid",
        placeItems: "center",
        width: "38px",
        height: "38px",
        flexShrink: 0,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: "#d9f0ed",
        color: "#006b68",
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightBold
    },
    accountText: {
        minWidth: 0
    },
    accountLabel: {
        display: "block",
        marginBottom: "2px",
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200
    },
    accountName: {
        display: "block",
        overflow: "hidden",
        maxWidth: "240px",
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    sectionHeading: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: tokens.spacingHorizontalM,
        margin: "28px 0 14px"
    },
    sectionTitle: {
        margin: 0,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold
    },
    sectionCount: {
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200
    },
    serviceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: tokens.spacingHorizontalL,
        "@media (max-width: 760px)": {
            gridTemplateColumns: "1fr"
        }
    },
    serviceCard: {
        minWidth: 0,
        padding: "22px",
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderTop: "3px solid #008b8b",
        borderRadius: tokens.borderRadiusMedium,
        boxShadow: tokens.shadow4,
        transitionProperty: "transform, box-shadow",
        transitionDuration: "160ms",
        transitionTimingFunction: "ease-out",
        ":hover": {
            transform: "translateY(-2px)",
            boxShadow: tokens.shadow8
        }
    },
    dataverseCard: {
        borderTopColor: "#d65a36"
    },
    cardTop: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: tokens.spacingHorizontalM
    },
    serviceIdentity: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
        minWidth: 0
    },
    serviceMark: {
        display: "grid",
        placeItems: "center",
        width: "42px",
        height: "42px",
        flexShrink: 0,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: "#d9f0ed",
        color: "#006b68",
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightBold
    },
    dataverseMark: {
        backgroundColor: "#fbe5dc",
        color: "#a53a1d"
    },
    serviceName: {
        margin: 0,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold
    },
    serviceDescription: {
        margin: "3px 0 0",
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200
    },
    status: {
        display: "inline-flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXS,
        flexShrink: 0,
        padding: "4px 8px",
        borderRadius: tokens.borderRadiusCircular,
        backgroundColor: tokens.colorNeutralBackground2,
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold
    },
    statusDot: {
        width: "7px",
        height: "7px",
        borderRadius: tokens.borderRadiusCircular,
        backgroundColor: "#c47a2c"
    },
    statusReady: {
        backgroundColor: "#e5f4ed",
        color: "#176b43"
    },
    statusDotReady: {
        backgroundColor: "#21905a"
    },
    divider: {
        height: "1px",
        margin: "20px 0 16px",
        backgroundColor: tokens.colorNeutralStroke2
    },
    fieldList: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: "14px",
        margin: 0
    },
    dataverseFields: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        "@media (max-width: 420px)": {
            gridTemplateColumns: "1fr"
        }
    },
    field: {
        minWidth: 0
    },
    fieldLabel: {
        display: "block",
        marginBottom: "4px",
        color: tokens.colorNeutralForeground2,
        fontSize: tokens.fontSizeBase200
    },
    fieldValue: {
        display: "block",
        overflowWrap: "anywhere",
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase300
    },
    pendingValue: {
        color: tokens.colorNeutralForeground3,
        fontWeight: tokens.fontWeightRegular
    }
});

export default function LandingPage() {
    const styles = useStyles();
    const { graphClient } = useGraph();
    const { spClient, siteUrl } = useSP();
    const { dataverseClient, dataverseResource } = useDataverse();
    const [user, setUser] = useState<IUser | null>(null);
    const [site, setSite] = useState<SPSite | null>(null);
    const [dataverseUser, setDataverseUser] = useState<DataverseUser | null>(null);

    const userService = useMemo(() => {
        return new PersonaService(graphClient);
    }, [graphClient]);
    const sharePointService = useMemo(() => {
        return spClient ? new SharePointService(spClient) : null;
    }, [spClient]);
    const dataverseService = useMemo(() => {
        return dataverseClient && dataverseResource
            ? new DataverseService(dataverseClient, dataverseResource)
            : null;
    }, [dataverseClient, dataverseResource]);

    useEffect(() => {
        userService.getUser().then(setUser);
        if (sharePointService && siteUrl) {
            sharePointService.getSite(siteUrl).then(setSite);
        }
        if (dataverseService) {
            dataverseService.getCurrentUser().then(setDataverseUser);
        }
    }, [userService, sharePointService, siteUrl, dataverseService]);

    const userInitial = user?.displayName?.trim().charAt(0).toUpperCase() || "M";
    const pendingText = "Waiting for connection";

    return (
        <main className={styles.page}>
            <header className={styles.intro}>
                <div className={styles.headingGroup}>
                    <p className={styles.eyebrow}>
                        <span className={styles.eyebrowMark} aria-hidden="true" />
                        Microsoft 365 / Overview
                    </p>
                    <h1 className={styles.title}>Your workspace, at a glance.</h1>
                    <p className={styles.description}>
                        A live view of your Microsoft 365 identity and connected services.
                    </p>
                </div>
                <div className={styles.account}>
                    <span className={styles.avatar} aria-hidden="true">{userInitial}</span>
                    <span className={styles.accountText}>
                        <span className={styles.accountLabel}>Signed in as</span>
                        <span className={styles.accountName} title={user?.displayName ?? ""}>
                            {user?.displayName ?? "Loading your profile"}
                        </span>
                    </span>
                </div>
            </header>

            <section aria-labelledby="services-heading">
                <div className={styles.sectionHeading}>
                    <h2 className={styles.sectionTitle} id="services-heading">Connected services</h2>
                    <span className={styles.sectionCount}>02 services</span>
                </div>
                <div className={styles.serviceGrid}>
                    <article className={styles.serviceCard} aria-labelledby="sharepoint-heading">
                        <div className={styles.cardTop}>
                            <div className={styles.serviceIdentity}>
                                <span className={styles.serviceMark} aria-hidden="true">SP</span>
                                <div>
                                    <h3 className={styles.serviceName} id="sharepoint-heading">SharePoint</h3>
                                    <p className={styles.serviceDescription}>Site connection</p>
                                </div>
                            </div>
                            <span className={`${styles.status} ${site ? styles.statusReady : ""}`}>
                                <span className={`${styles.statusDot} ${site ? styles.statusDotReady : ""}`} aria-hidden="true" />
                                {site ? "Connected" : "Connecting"}
                            </span>
                        </div>
                        <div className={styles.divider} />
                        <dl className={styles.fieldList}>
                            <div className={styles.field}>
                                <dt className={styles.fieldLabel}>Site URL</dt>
                                <dd className={`${styles.fieldValue} ${site ? "" : styles.pendingValue}`}>
                                    {site?.Url ?? pendingText}
                                </dd>
                            </div>
                            <div className={styles.field}>
                                <dt className={styles.fieldLabel}>Site ID</dt>
                                <dd className={`${styles.fieldValue} ${site ? "" : styles.pendingValue}`}>
                                    {site?.Id ?? pendingText}
                                </dd>
                            </div>
                        </dl>
                    </article>

                    <article className={`${styles.serviceCard} ${styles.dataverseCard}`} aria-labelledby="dataverse-heading">
                        <div className={styles.cardTop}>
                            <div className={styles.serviceIdentity}>
                                <span className={`${styles.serviceMark} ${styles.dataverseMark}`} aria-hidden="true">DV</span>
                                <div>
                                    <h3 className={styles.serviceName} id="dataverse-heading">Dataverse</h3>
                                    <p className={styles.serviceDescription}>Environment identity</p>
                                </div>
                            </div>
                            <span className={`${styles.status} ${dataverseUser ? styles.statusReady : ""}`}>
                                <span className={`${styles.statusDot} ${dataverseUser ? styles.statusDotReady : ""}`} aria-hidden="true" />
                                {dataverseUser ? "Connected" : "Connecting"}
                            </span>
                        </div>
                        <div className={styles.divider} />
                        <dl className={`${styles.fieldList} ${styles.dataverseFields}`}>
                            <div className={styles.field}>
                                <dt className={styles.fieldLabel}>User ID</dt>
                                <dd className={`${styles.fieldValue} ${dataverseUser ? "" : styles.pendingValue}`}>
                                    {dataverseUser?.UserId ?? pendingText}
                                </dd>
                            </div>
                            <div className={styles.field}>
                                <dt className={styles.fieldLabel}>Organization ID</dt>
                                <dd className={`${styles.fieldValue} ${dataverseUser ? "" : styles.pendingValue}`}>
                                    {dataverseUser?.OrganizationId ?? pendingText}
                                </dd>
                            </div>
                            <div className={styles.field}>
                                <dt className={styles.fieldLabel}>Business Unit ID</dt>
                                <dd className={`${styles.fieldValue} ${dataverseUser ? "" : styles.pendingValue}`}>
                                    {dataverseUser?.BusinessUnitId ?? pendingText}
                                </dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>
        </main>
    );
}