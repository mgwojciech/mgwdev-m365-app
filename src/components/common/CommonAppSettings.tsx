import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, Dropdown, Label, Option, Switch, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import type { PageHeaderProps } from "./AppHeader/AppHeader";
import { SettingsRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { supportedLanguages, useLocalization } from "../../context/LocalizationContext";
import { useTheme } from "../../context/ThemeContext";

export function CommonAppSettings(_props: PageHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { getLocalization, language, setLanguage } = useLocalization();
    const { isDarkTheme, setTheme } = useTheme();

    return <div>
        <Button onClick={() => setIsOpen(true)} appearance="transparent" title={getLocalization("common.settings")} icon={<SettingsRegular />} />
        <Drawer
            open={isOpen}
            onOpenChange={(_, data) => setIsOpen(data.open)}
        >
            <DrawerHeader>
                <DrawerHeaderTitle>{getLocalization("common.settings")}</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Switch
                        label={getLocalization("common.darkMode")}
                        checked={isDarkTheme}
                        onChange={(_, data) => {
                            setTheme(data.checked ? webDarkTheme : webLightTheme, data.checked);
                            localStorage.setItem("preferredTheme", data.checked ? "dark" : "light");
                        }}
                    />

                    <div>
                        <Label htmlFor="language-picker">{getLocalization("common.language")}</Label>
                        <Dropdown
                            id="language-picker"
                            selectedOptions={[language]}
                            onOptionSelect={(_, data) => {
                                const selectedLanguage = data.optionValue?.toString();
                                if (!selectedLanguage) {
                                    return;
                                }

                                setLanguage(selectedLanguage);
                                localStorage.setItem("preferredLanguage", selectedLanguage);
                            }}
                            value={supportedLanguages.find((item) => item.key === language)?.text}
                            placeholder={getLocalization("common.selectLanguage")}
                        >
                            {supportedLanguages.map((item) => (
                                <Option key={item.key} value={item.key}>
                                    {item.text}
                                </Option>
                            ))}
                        </Dropdown>
                    </div>
                </div>
            </DrawerBody>
        </Drawer>
    </div>
}