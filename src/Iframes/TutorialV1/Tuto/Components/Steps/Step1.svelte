<script>
    import i18next from "i18next";
</script>


<div class=" tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-10 tw-mb-5 tw-text-white tw-h-auto tw-px-0 sm:tw-px-10">
    
  
        
        <h1 class="xs:tw-text-xl" >{i18next.t('tuto.step1.title')}</h1>
        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-my-10"></div>

        <div class="tw-flex tw-flex-col  tw-items-center tw-justify-center  tw-gap-4  tw-py-1 tw-w-10/12 md:tw-w-full tw-h-full ">
            <img src="resources/images/tutov1/move/wokamove.png" alt="Walk" class="tw-w-[80px] sm:tw-w-[100px] tw-h-auto tw-mb-2 " />
            <img src="resources/images/tutov1/move/ZQSD.png" alt="Walk" class="tw-w-full tw-max-w-[300px] sm:tw-max-w-[30em] tw-h-auto tw-mb-2" />
            <p class="tw-text-base sm:tw-text-xl tw-text-center tw-p-0">{i18next.t('tuto.step1.use')} <strong> {i18next.t('tuto.step1.arrowkeys')} </strong> {i18next.t('tuto.step1.or')} <strong> {i18next.t('tuto.step1.wasd')} </strong> {i18next.t('tuto.step1.aroundTheMap')}</p>
   

            <p class="tw-text-sm sm:tw-text-base tw-text-center tw-p-0"> <strong> {i18next.t('tuto.step1.tip')}</strong> {i18next.t('tuto.step1.describeTip')}</p>
        </div>

        <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-my-10"></div>
        <img src="resources/images/tutov1/move/CamOFF.png" alt="Walk" class="tw-w-[80px] sm:tw-w-[120px]  tw-h-auto tw-mb-2 tw-opacity-75" />
        <p class="tw-text-sm sm:tw-text-base tw-w-10/12 md:tw-w-full tw-text-center tw-p-0 tw-opacity-75">{i18next.t('tuto.step1.silentZone')}</p>
   
    <!-- <div class="video">
        <video class="tw-w-full tw-rounded-lg" 
            poster="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step1-onboarding.png" 
            controls 
            autoplay 
            muted
        >
            <track kind="captions">
            <source src="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/step-1-onboarding.mp4" type="video/mp4">
            {i18next.t('tuto.videoNotLoaded')}
        </video>
    </div> -->
 
</div>
<style lang="scss">
    /* Hide scrollbar for Chrome, Safari and Opera */

    h1,h2,h3{
        font-family: Roboto Condensed;
        font-weight: bold
    }

    p{
        font-family: Roboto , Arial;
    }

    .ste::-webkit-scrollbar{
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .ste {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>