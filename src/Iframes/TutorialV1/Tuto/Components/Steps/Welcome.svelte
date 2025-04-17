<script lang="ts">

import i18next from "i18next";

</script>


    <div class="tw-flex tw-mt-10  tw-flex-col tw-items-center tw-justify-center tw-mb-5 tw-text-white tw-px-8"> 

            <h1>{i18next.t('tuto.welcome.title')}</h1>
            <p> {i18next.t('tuto.welcome.subtitle')} </p>
            <div class="tw-bg-white/10 tw-h-[1px] tw-w-full tw-m-10"></div>


            
            <div class="tw-mt-[4em]">

                <p class="tw-text-[130px]"> 👋</p>
                <p class="tw-mt-2 tw-text-xl ">  <strong> {i18next.t('tuto.welcome.describe')} </strong> {i18next.t('tuto.welcome.describe2')}</p>
                <p class="tw-text-xl">{i18next.t('tuto.welcome.describe3')}</p>

                <div class="tw-flex tw-flex-col tw-gap-[15px] tw-py-1 tw-w-full tw-h-full">
                    <!-- <div class="tw-flex-shrink-0">  
                        <img src="resources/images/tutov1/welcome/Move.png" alt="Walk" class="tw-w-[100px] tw-h-auto tw-mb-2" />
                    </div> -->
                    <div class="tw-bg-white/5 tw-relative  tw-flex tw-items-center tw-p-4 tw-rounded-[16px]  tw-w-full tw-h-[75px] tw-p-[24px] hover:tw-bg-white/10  ">
                        <img src="resources/images/tutov1/welcome/Move.png" alt="Walk" class="tw-w-[120px] tw-left-[-4px] tw-h-auto tw-absolute tw-mb-2 tw-self-start tw-top-0 " />
                        <span class="tw-font-bold tw-flex-1 tw-text-center tw-text-xl"> {i18next.t('tuto.welcome.bloc1')} </span>
                    </div>

                    <div class="tw-bg-white/5  tw-relative  tw-flex tw-items-center   tw-p-4 tw-rounded-[16px]  tw-w-full tw-p-[24px] hover:tw-bg-white/10  tw-overflow-hidden ">
                        <img src="resources/images/tutov1/welcome/Talk.png" alt="Walk" class="tw-w-[140px] tw-left-[-4px]  tw-h-auto tw-absolute tw-mb-2 tw-self-start tw-top-0 " />
                        <span class="tw-font-bold tw-flex-1 tw-text-center tw-text-xl"> {i18next.t('tuto.welcome.bloc2')} </span>
                    </div>
                    <div class="tw-bg-white/5  tw-relative  tw-flex tw-items-center   tw-p-4 tw-rounded-[16px]  tw-w-full tw-p-[24px] hover:tw-bg-white/10 ">
                        <img src="resources/images/tutov1/welcome/laptop.png" alt="Walk" class="tw-w-[4em] tw-h-auto tw-absolute tw-mb-2 tw-self-start tw-top-0 " />
                         <span class="tw-font-bold tw-flex-1 tw-text-center tw-text-xl"> {i18next.t('tuto.welcome.bloc3')} </span>
                    </div>

                </div>
            </div>



    </div>



<style>

h1,h2,h3{
        font-family: Roboto Condensed;
        font-weight: bold
    }

    p{
        font-family: Roboto , Arial;
    }
    
</style>