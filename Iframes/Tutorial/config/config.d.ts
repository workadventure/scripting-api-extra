export declare const mobileConfig: iFrameConfig[];
export declare const desktopConfig: iFrameConfig[];
declare type iFrameConfig = {
    uppperBound?: number;
    lowerBound?: number;
    config: {
        width: number;
        height: number;
        scale: number;
    };
};
export {};
