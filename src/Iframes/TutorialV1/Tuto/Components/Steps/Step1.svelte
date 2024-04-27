<script>
    import i18next from "i18next";
</script>
<div class="ste tw-px-16 tw-py-5 tw-overflow-y-scroll tw-h-screen">
    <div class="title tw-text-white">
        <h1 class="tw-p-3">{i18next.t('tuto.step1.title')}</h1>
        <h2 class="tw-p-3 tw-text-2xl">{i18next.t('tuto.step1.subtitle')}</h2>
        <p class="tw-text-xs tw-p-0">{i18next.t('tuto.step1.describe')}</p>
    </div>
    <div class="video">
        <video class="tw-w-full tw-rounded-lg" 
            poster="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step1-onboarding.png" 
            controls 
            autoplay 
            muted
        >
            <track kind="captions">
            <source src="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-1-onboarding.mp4" type="video/mp4">
            {i18next.t('tuto.step1.videoNotLoaded')}
        </video>
    </div>
    <div class="description tw-p-3 tw-mb-16 tw-text-left tw-text-white tw-pb-20 tw-flex tw-row tw-w-full tw-items-center tw-justify-center tw-py-10">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-10">
            <img src="resources/images/tutov1/step1/keyboard.svg" alt="keyboard" class="tw-w-40 tw-h-auto">
            <p class="tw-text-xl tw-text-center tw-p-5 tw-font-bold">{i18next.t('tuto.step1.arrow')}</p>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-10">
            <img src="resources/images/tutov1/step1/mouse.svg" alt="mouse" class="tw-w-40 tw-h-auto">
            <p class="tw-text-xl tw-text-center tw-p-5 tw-font-bold">{i18next.t('tuto.step1.click')}</p>
        </div>
    </div>
</div>