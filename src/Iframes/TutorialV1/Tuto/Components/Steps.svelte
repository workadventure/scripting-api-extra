<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { currentStepStore, steps } from "../Store/StepStore";

    const dispatch = createEventDispatcher();

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
    function skip(){
        dispatch('skip');
    }
</script>
<div class="body">
    <slot></slot>

    <div class="progress-bar">
    </div>
</div>
<div class="footer tw-p-3 tw-bg-medium-purple tw-flex tw-justify-around tw-fixed tw-bottom-0 tw-w-full tw-overflow-y-hidden tw-overflow-x-auto tw-flex-wrap tw-overflow-visible">
    <div class="elispes tw-bg-medium-purple/60 tw-absolute tw-w-full -tw-top-10 tw-flex tw-flex-row tw-justify-center tw-align-middle">
        {#each steps as _, i}
            <span class="elispe {(i+1) === $currentStepStore ? 'tw-bg-light-blue' : 'tw-bg-lighter-purple'}"></span>
        {/each}
    </div>
    <button class="btn {$currentStepStore === 1 ? 'disabled' : 'light outline'} tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" on:click|stopPropagation={previous}>
        <span class="tw-px-4 tw-absolute tw-left-4">&lt;</span> Previous
    </button>
    {#if $currentStepStore === steps.length}
        <button class="btn light tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" on:click|stopPropagation={close}>
            Finish
        </button>
    {:else}
        <button class="btn light tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" on:click|stopPropagation={next}>
            Next
            <span class="tw-px-4 tw-absolute tw-right-4">></span>
        </button>
    {/if}
    <button class="btn blue-title tw-underline tw-decoration-light-blue tw-cursor-pointer" on:click|stopPropagation={skip}>
        Skip all
    </button>
</div>
<style lang="scss">
    .footer{
        overflow: visible;
        button{
            max-height: 40px;
            &:nth-child(1){
                min-width: 160px;
                max-width: 180px;
            }
            &:nth-child(2){
                min-width: 150px;
                max-width: 170px;
            }
        }
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