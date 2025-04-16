<script>

    import i18next from "i18next";

</script>
<div class="tw-flex tw-flex-col tw-mt-10  tw-items-center tw-justify-center tw-mb-5 tw-text-white tw-px-8">

        <h1>{i18next.t("tuto.step3.title")}</h1>
        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-m-10"></div>


        <img src="resources/images/tutov1/discover/Object.png" alt="Walk" class="tw-w-[100px] tw-h-auto tw-mb-2 " />
        <p class="tw-p-3 tw-text-xl"><strong> {i18next.t("tuto.step3.interact")} </strong> {i18next.t("tuto.step3.likeSign")} {i18next.t("tuto.step3.sometimes")} <strong> {i18next.t("tuto.step3.closer")}</strong>  </p>
        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-m-10"></div>


        <div class="tw-flex tw-gap-3"> 
            <div> 
            <img src="resources/images/tutov1/discover/GlobalMessage.png" alt="Walk" class="tw-w-[15em] tw-h-auto tw-mb-2 " />
            <p class="tw-p-3 tw-text-s">{i18next.t("tuto.step3.describe3")}</p>
            </div>

            <div> 
            <img src="resources/images/tutov1/discover/Silent.png" alt="Walk" class="tw-w-[10em] tw-h-auto tw-mb-2 " />
            <p class="tw-p-3 tw-text-s">{i18next.t("tuto.step3.describe4")}</p>
            </div>

        </div>


    <!-- <div class="video">
        <video class="tw-w-full tw-rounded-lg" 
            poster="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step3-onboarding.png" 
            controls 
            autoplay 
            muted
        >
            <track kind="captions">
            <source src="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-3-onboarding.mp4" type="video/mp4">
            {i18next.t('tuto.videoNotLoaded')}
        </video>
    </div> -->

    <!-- <div class="description tw-p-3 tw-mb-16 tw-text-left tw-text-white tw-pb-20 tw-flex tw-row tw-w-full tw-items-center tw-justify-center tw-py-10">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-10">
            <img src="resources/images/tutov1/step3/woka-action.png" alt="Meet in" class="tw-w-64 tw-h-auto">
            <p class="tw-text-xl tw-text-center tw-p-5 tw-font-bold">{i18next.t('tuto.step3.object')}</p>
        </div>
    </div> -->

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