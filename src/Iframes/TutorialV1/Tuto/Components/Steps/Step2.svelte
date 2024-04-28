<script>
    import i18next from "i18next";
</script>
<div class="ste tw-px-16 tw-py-5 tw-overflow-y-scroll tw-h-screen">
    <div class="title tw-text-white">
        <h1 class="tw-p-3">{i18next.t("tuto.step2.title")}</h1>
        <h2 class="tw-p-3 tw-text-2xl">{i18next.t("tuto.step2.subtitle")}</h2>
        <p class="tw-text-xs tw-p-0">{i18next.t("tuto.step2.describe")}</p>
    </div>
    <div class="video">
        <video class="tw-w-full tw-rounded-lg" 
            poster="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step2-onboarding.png" 
            controls 
            autoplay 
            muted
        >
            <track kind="captions">
            <source src="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-2-onboarding.mp4" type="video/mp4">
            {i18next.t('tuto.videoNotLoaded')}
        </video>
    </div>
    <div class="description tw-p-3 tw-mb-16 tw-text-left tw-text-white tw-pb-20 tw-flex tw-row tw-w-full tw-items-center tw-justify-center tw-py-10">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-10">
            <img src="resources/images/tutov1/step2/woka-meet.png" alt="Meet in" class="tw-w-56 tw-h-auto">
            <p class="tw-text-xl tw-text-center tw-p-5 tw-font-bold">{i18next.t('tuto.step2.bubble')}</p>
        </div>
    </div>
</div>
<style lang="scss">
    /* Hide scrollbar for Chrome, Safari and Opera */
    .ste::-webkit-scrollbar{
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .ste {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>