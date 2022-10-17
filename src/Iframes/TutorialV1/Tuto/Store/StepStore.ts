import { writable } from "svelte/store";

/*const step1Onboarding = "/dist/resources/images/tutov1/step1-onboarding.png";
const step2Onboarding = "/dist/resources/images/tutov1/step2-onboarding.png";
const step3Onboarding = "/dist/resources/images/tutov1/step3-onboarding.png";
const step4Onboarding = "/dist/resources/images/tutov1/step4-onboarding.png";
const step5Onboarding = "/dist/resources/images/tutov1/step5-onboarding.png";
const step6Onboarding = "/dist/resources/images/tutov1/step6-onboarding.png";*/

const step1Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step6-onboarding.png";
const step2Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step5-onboarding.png";
const step3Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step4-onboarding.png";
const step4Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step3-onboarding.png";
const step5Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step2-onboarding.png";
const step6Onboarding =
    "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step1-onboarding.png";

export const steps = [
    {
        title: "Welcome 👋",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step1-onboarding.mp4",
        videoPoster: step1Onboarding,
        description: `
            <p>Move your avatar (Woka) with your arrow keys, or by right clicking somewhere in the map. If your WOKA does not move, focus on the map by clicking anywhere with your mouse.</p>
            <p>Walk up to another WOKA to create a bubble zone. Your cam & mic will automatically be switched on if you did allow it on your parameters (4 WOKAs max in a bubble zone).</p>
            <p>
                <ul>
                    <li>1. Change the screens positioning,</li>
                    <li>2. Ask someone in your bubble zone to follow you,</li>
                    <li>3. Lock your bubble so that nobody can enter your conversation,</li>
                    <li>4. Share your screen. Click on the sharing screen to make it bigger or smaller,</li>
                    <li>5. Deactivate or activate your cam & mic.</li>
                </ul>
            </p>
        `,
        shortTiltle:
            "Welcome to WorkAdventure adventurer! I'm Viv Legging and i will be showing you how things work down here!",
    },
    {
        title: "Chat with someone 💬",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step2-onboarding.mp4",
        videoPoster: step2Onboarding,
        description: `
            <p>Reduce the distance with your teams with a complete messaging service:</p>
            <p>
                <ul>
                    <li>1. Get access to the list of users connected in your map, or in another map interconnected</li>
                    <li>2. Enter a bubble zone to chat with someone, or click on the teleport button to get to them easily</li>
                    <li>3. Create forum or team groups to better collaborate</li>
                    <li>4. Use the live zone chat to communicate with everyone in a conference room</li>
                    <li>5. Exchange documents, folders, pictures, ...</li>
                </ul>
            </p>
            <p>You can see your timeline chat at anytime!</p>
        `,
        shortTiltle: "",
    },
    {
        title: "Attend a conference 📹",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step3-onboarding-v2.mp4",
        videoPoster: step3Onboarding,
        description: `
            <p>Enter a conference room to connect with unlimited number of WOKAs.</p>
            <p>Touch the red button to close the conference.</p>
            <p>Touch the blue burger button to extend or reduce the conference screen.</p>
            <p>
                <ul>
                    <li>1. Deactivate or activate your cam & mic,</li>
                    <li>2. Share your screen,</li>
                    <li>3. Open the chat or the survey system,</li>
                    <li>4. Raise your hand (speakers will be notified) or send emojis,</li>
                    <li>5. Get a mosaic view of all participants,</li>
                    <li>6. Change your settings,</li>
                    <li>7. Leave the conference.</li>
                </ul>
            </p>
        `,
        shortTiltle: "",
    },
    {
        title: "Interact with dynamic zones 🤸‍♀️",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step4-onboarding.mp4",
        videoPoster: step4Onboarding,
        description: `
            <p>Interact with dynamic zones by walking into them. A window will open at the right of your screen with an integration: a work tool for team collaboration, a website page, a survey doc, a Youtube video...</p>
            </p>Touch the red button to close the interactive window.</p>
            </p>Touch the blue button to extend or reduce the interactive window.</p>
        `,
        shortTiltle: "",
    },
    {
        title: "Go private 🔒",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step5-onboarding.mp4",
        videoPoster: step5Onboarding,
        description: `
            <p>Enter silent zones when you need not to be disturbed. Nobody will be able to connect with you and your cam & mic will automatically be switched off.</p>
            <p>For more privacy, custom your away mode settings at any time to decide whether your cam and/or mic are automatically switched off when you're not on the WorkAdventure's tab.</p>
        `,
        shortTiltle: "",
    },
    {
        title: "Enjoy 🚀",
        videoUrl:
            "https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/upload/tuto_video/step6-onboarding.mp4",
        videoPoster: step6Onboarding,
        description: `
                    <p>That's it for today Adventurer. You are now ready to start your journey with us!</p>
                    <p>If you need any kind of support, please email us: hello@workadventu.re</p>
                    </p>Or talk to our team directly here in the village, they'll be more than happy to help you out!</p>
                `,
        shortTiltle: "",
    },
];
export const currentStepStore = writable<number>(1);
