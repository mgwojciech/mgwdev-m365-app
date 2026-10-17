import { Toast, ToastBody, Toaster, ToastTitle, useId, useToastController } from "@fluentui/react-components";
import { createContext, useContext } from "react";

export interface IToasterContextProps {
    toasterId: string;
    toastMessage: (options: {
        title?: string;
        message?: string;
        intent?: "success" | "error" | "warning" | "info";
    }) => void;
    advancedToastMessage: (element: React.ReactNode, options?: {
        intent?: "success" | "error" | "warning" | "info";
    }) => void;
}

export const ToasterContext = createContext<IToasterContextProps | undefined>(undefined);

export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error("useToaster must be used within a ToasterProvider");
    }
    return context;
};

export const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
    const toasterId = useId("app-main-toaster");
    const { dispatchToast } = useToastController(toasterId);

    const toastMessage = (options: {
        title?: string;
        message?: string;
        intent?: "success" | "error" | "warning" | "info";
    }) => {
        dispatchToast(<Toast>
            <ToastTitle>{options.title}</ToastTitle>
            <ToastBody subtitle="Subtitle">{options.message}</ToastBody>
        </Toast>, {
            intent: options.intent
        })
    };

    const advancedToastMessage = (element: React.ReactNode, options?: {
        intent?: "success" | "error" | "warning" | "info";
    }) => {
        dispatchToast(
            <Toast>
                {element}
            </Toast>, {
            intent: options?.intent
        });
    };

    return (
        <ToasterContext.Provider value={{ toasterId, toastMessage, advancedToastMessage }}>
            <Toaster toasterId={toasterId} />
            {children}
        </ToasterContext.Provider>
    );
};