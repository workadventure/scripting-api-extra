<script>
    import i18next from "i18next";
</script>
<div class="tw-flex tw-flex-col tw-mt-10  tw-items-center tw-justify-center tw-mb-5 tw-text-white tw-px-0 sm:tw-px-10">
  
        <h1>{i18next.t("tuto.step2.title")}</h1>
        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-m-10"></div>


        <img src="resources/images/tutov1/interact/Bubble.png" alt="Walk" class="tw-w-[15em] md:tw-w-[20em] tw-h-auto tw-mb-2 " />
        <p class="tw-text-xl tw-p-0"> <strong> {i18next.t("tuto.step2.describe")} </strong> {i18next.t("tuto.step2.describe2")}</p>
        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-m-10"></div>


        <div class="tw-flex tw-gap-3"> 
            <div>  <img src="resources/images/tutov1/interact/Lock.png" alt="Walk" class="tw-w-[10em] md:tw-w-[20em] tw-h-auto tw-mb-2 " />
                <p class="tw-text-l tw-p-0">{i18next.t("tuto.step2.describe3")}</p>
            </div>
      
            <div> 
                <img src="resources/images/tutov1/interact/ShareScreen.png" alt="Walk" class="tw-w-[10em] md:tw-w-[20em] tw-h-auto tw-mb-2 " />
                <p class="tw-text-l tw-p-0">{i18next.t("tuto.step2.describe4")}</p>
            </div>
       
        </div>


    <!-- <div class="video">
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
    </div> -->
    <!-- <div class="description tw-p-3 tw-mb-16 tw-text-left tw-text-white tw-pb-20 tw-flex tw-row tw-w-full tw-items-center tw-justify-center tw-py-10">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-10">
            <img src="resources/images/tutov1/step2/woka-meet.png" alt="Meet in" class="tw-w-56 tw-h-auto">
            <p class="tw-text-xl tw-text-center tw-p-5 tw-font-bold">{i18next.t('tuto.step2.bubble')}</p>
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