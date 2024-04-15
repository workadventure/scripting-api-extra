import { writable } from "svelte/store";

/*const step1Onboarding = "resources/images/tutov1/step1-onboarding.png";
const step2Onboarding = "resources/images/tutov1/step2-onboarding.png";
const step3Onboarding = "resources/images/tutov1/step3-onboarding.png";
const step4Onboarding = "resources/images/tutov1/step4-onboarding.png";
const step5Onboarding = "resources/images/tutov1/step5-onboarding.png";
const step6Onboarding = "resources/images/tutov1/step6-onboarding.png";*/

/*const step1Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step1-onboarding.png";
const step2Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step2-onboarding.png";
const step3Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step3-onboarding.png";
const step4Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step4-onboarding.png";
const step5Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step5-onboarding.png";
const step6Onboarding =
    "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step6-onboarding.png";*/

export const currentStepStore = writable<number>(1);
