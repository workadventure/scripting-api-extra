<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { currentStepStore } from "../Store/StepStore";
    import i18next from "i18next";

    const dispatch = createEventDispatcher();

    const steps = ['Welcome', 'Move', 'Interact', 'Discover'];

    const setStep = (index: number) => {
    currentStepStore.set(index);
    };
   
    function next(){
        if($currentStepStore === steps.length)return;
        currentStepStore.set($currentStepStore + 1);
    }
    function previous(){
        if($currentStepStore === 1)return;
        currentStepStore.set($currentStepStore - 1);
    }
    function close(){
        dispatch('close');
    }
    $: console.log('Current Step:', $currentStepStore);
</script>
<div class="tw-flex tw-flex-col  tw-w-full  tw-pt-20 tw-pb-24 ">
 


    <div class="header  tw-p-3 tw-flex tw-justify-center  tw-absolute tw-top-7 sm:tw-top-14 tw-w-full tw-h-3 tw-overflow-visible   ">
        <nav class="tw-flex  tw-gap-2 tw-py-4 tw-text-sm tw-font-medium tw-items-center">
            {#each steps as step, index}
            <button
                on:click={() => setStep(index)}
                class="tw-relative tw-uppercase tw-text-white/50 tw-transition-all hover:tw-text-white tw-flex tw-flex-col tw-items-center"
                class:tw-text-white={index === $currentStepStore}>
                {step}
                {#if index === $currentStepStore}
                <span class="tw-left-0 tw-h-[4px] tw-w-[8em] tw-bg-blue-500 tw-rounded-full tw-flex tw-justify-self-center tw-mt-3"></span>
                {/if}
            </button>
            {/each}
        </nav>
    </div>

    <slot></slot>

  <!-- Étapes et actions -->
    <div class="footer tw-p-3 tw-bg-[#1B2A41] tw-flex tw-justify-around tw-fixed tw-bottom-0 tw-w-full tw-overflow-visible tw-flex-wrap">
        <!-- <div class="tw-w-full tw-h-[240px]  tw-rounded-full tw-overflow-hidden tw-shadow-inner tw-mt-3">
            <div class="tw-h-full tw-transition-all tw-duration-500 tw-ease-in-out progress-bar animated-gradient" style="width: {progress}%"></div>
        </div> -->
      
            {#if $currentStepStore === 0}
            <div class="tw-flex tw-w-full tw-flex-col sm:tw-flex-row "> 
            <button class=" tw-w-full hover:tw-bg-[#ffffff] tw-justify-center tw-rounded-[8px]  tw-mx-0 sm:tw-mx tw-h-[50px] tw-relative tw-cursor-pointer" on:click|stopPropagation={close}>
                <span class="tw-px-4 tw-absolute tw-start-4"></span> {i18next.t('tuto.skipTutorial')}
            </button>
            <button class=" tw-w-full tw-bg-[#4156F6] tw-rounded-[8px] tw-h-[50px] tw-justify-center tw-mx-0 tw-relative tw-cursor-pointer" on:click|stopPropagation={next}>
                <span class="tw-px-4 tw-absolute tw-start-4"></span> {i18next.t('tuto.startTutorial')}
                </button>
            </div>

            {:else if $currentStepStore === 3}

            <button class="tw-bg-[#4156F6] tw-rounded-[8px] tw-w-full tw-h-[50px] tw-justify-center tw-relative tw-cursor-pointer" on:click|stopPropagation={close}>
                {i18next.t('tuto.finish')}
                <span class="tw-px-4 tw-absolute tw-end-4"></span>
            </button>

            {:else}
            <button class="tw-bg-[#4156F6] tw-rounded-[8px] tw-w-full tw-h-[50px] tw-justify-center tw-mx-4 tw-relative tw-cursor-pointer" on:click|stopPropagation={next}>
                {i18next.t('tuto.next')}
                <span class="tw-px-4 tw-absolute tw-end-4"></span>
            </button>
            {/if}
    </div>
    
</div>

<style lang="scss">

.animated-gradient {
  background-size: 200% 200%;
  background-image: linear-gradient(to right, #6366f1, #3b82f6, #6366f1);
  animation: gradient-x 3s ease infinite;
}

.progress-bar {
  height: 6px;
  width: 100%;
  margin-top: 8px;
}
 
    .elispes{
        height: 40px;
        .elispe{
            width: 15px;
            height: 15px;
            border-radius: 99%;
            margin: 6px;
        }
    }
</style>