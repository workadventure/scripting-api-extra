<script lang="ts">
    import { currentStepStore, steps } from "../Store/StepStore";
    import Step from "./Step.svelte";
    import Steps from "./Steps.svelte";

    function close(){
        WA.ui.modal.closeModal();
        WA.player.state.tutorialDone = true;
    }
</script>

<div class="tuto tw-h-full tw-text-center tw-bg-dark-purple/95">
    <Steps 
        on:close={close}
        on:skip={close}
    >
        {#each steps as step, index}
            {#if $currentStepStore === (index+1)}
                <Step
                    title={step.title}
                    videoUrl={step.videoUrl}
                    videoPoster={step.videoPoster}
                    description={step.description}
                    shortTiltle={step.shortTiltle}
                />
            {/if}
        {/each}
    </Steps>
</div>
<style>
    .tuto{
        min-width: 500px;
    }
</style>