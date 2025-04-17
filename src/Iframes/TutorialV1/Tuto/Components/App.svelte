<script lang="ts">
    import { currentStepStore } from "../Store/StepStore";
    import Steps from "./Steps.svelte";
    import Welcome from "./Steps/Welcome.svelte";
    import Step1 from "./Steps/Step1.svelte";
    import Step2 from "./Steps/Step2.svelte";
    import Step3 from "./Steps/Step3.svelte";

    function close(){
        WA.player.state.tutorialDone = true;
        //TODO delete @ts-ignore when new scripting release is up
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        WA.ui.modal.closeModal();
    }
</script>

<div class="tuto  tw-h-full tw-text-center tw-bg-transparent">
    <Steps 
        on:close={close}
        on:skip={close}
    >
        {#if $currentStepStore === 0}
            <Welcome />
        {/if}
        {#if $currentStepStore === 1}
            <Step1 />
        {/if}
        {#if $currentStepStore === 2}
            <Step2 />
        {/if}
        {#if $currentStepStore === 3 }
            <Step3 />
        {/if}
    </Steps>
</div>
<style>
    .tuto{
        min-width: 500px;
    }
</style>