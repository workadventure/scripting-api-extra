import { writable } from "svelte/store";
const step1Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step1-onboarding.png";
const step2Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step2-onboarding.png";
const step3Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step3-onboarding.png";
const step4Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step4-onboarding.png";
const step5Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step5-onboarding.png";
const step6Onboarding = "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step6-onboarding.png";
export const steps = [
    {
        title: "Welcome 👋",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-1-onboarding.mp4",
        videoPoster: step1Onboarding,
        description: `
            <p>Move your avatar (Woka) with your arrow keys, or by right clicking somewhere in the map. If your WOKA does not move, focus on the map by clicking anywhere with your mouse.</p>
            <p>Walk up to another WOKA to create a bubble zone. Your cam & mic will automatically be switched on if you did allow it on your parameters (4 WOKAs max in a bubble zone).</p>
            <p>
                <ul>
                    <li>Change the screens positioning,</li>
                    <li>Ask someone in your bubble zone to follow you,</li>
                    <li>Lock your bubble so that nobody can enter your conversation,</li>
                    <li>Share your screen. Click on the sharing screen to make it bigger or smaller,</li>
                    <li>Deactivate or activate your cam & mic.</li>
                </ul>
            </p>
        `,
        shortTitle: "Welcome to WorkAdventure adventurer! I'm Viv Legging and i will be showing you how things work down here!",
    },
    {
        title: "Chat with someone 💬",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-2-onboarding.mp4",
        videoPoster: step2Onboarding,
        description: `
            <p>Reduce the distance with your teams with a complete messaging service:</p>
            <p>
                <ul>
                    <li>Get access to the list of users connected in your map, or in another map interconnected</li>
                    <li>Enter a bubble zone to chat with someone, or click on the teleport button to get to them easily</li>
                    <li>Create forum or team groups to better collaborate</li>
                    <li>Use the live zone chat to communicate with everyone in a conference room</li>
                    <li>Exchange documents, folders, pictures, ...</li>
                </ul>
            </p>
            <p>You can see your timeline chat at anytime!</p>
        `,
        shortTitle: "",
    },
    {
        title: "Attend a conference 📹",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-3-onboarding.mp4",
        videoPoster: step3Onboarding,
        description: `
            <p>Enter a conference room to connect with unlimited number of WOKAs.</p>
            <p>Touch the red button to close the conference.</p>
            <p>Touch the blue burger button to extend or reduce the conference screen.</p>
            <p>
                <ul>
                    <li>Deactivate or activate your cam & mic,</li>
                    <li>Share your screen,</li>
                    <li>Open the chat or the survey system,</li>
                    <li>Raise your hand (speakers will be notified) or send emojis,</li>
                    <li>Get a mosaic view of all participants,</li>
                    <li>Change your settings,</li>
                    <li>Leave the conference.</li>
                </ul>
            </p>
        `,
        shortTitle: "",
    },
    {
        title: "Interact with dynamic zones 🤸‍♀️",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-4-onboarding.mp4",
        videoPoster: step4Onboarding,
        description: `
            <p>Interact with dynamic zones by walking into them. A window will open at the right of your screen with an integration: a work tool for team collaboration, a website page, a survey doc, a Youtube video...</p>
            </p>Touch the red button to close the interactive window.</p>
            </p>Touch the blue button to extend or reduce the interactive window.</p>
        `,
        shortTitle: "",
    },
    {
        title: "Go private 🔒",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-5-onboarding.mp4",
        videoPoster: step5Onboarding,
        description: `
            <p>Enter silent zones when you need not to be disturbed. Nobody will be able to connect with you and your cam & mic will automatically be switched off.</p>
            <p>For more privacy, custom your away mode settings at any time to decide whether your cam and/or mic are automatically switched off when you're not on the WorkAdventure's tab.</p>
        `,
        shortTitle: "",
    },
    {
        title: "Enjoy 🚀",
        videoUrl: "https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-6-onboarding.mp4",
        videoPoster: step6Onboarding,
        description: `
                    <p>That's it for today Adventurer. You are now ready to start your journey with us!</p>
                    <p>If you need any kind of support, please email us: hello@workadventu.re</p>
                    </p>Or talk to our team directly here in the village, they'll be more than happy to help you out!</p>
                `,
        shortTitle: "",
    },
];
export const currentStepStore = writable(1);
//# sourceMappingURL=StepStore.js.map