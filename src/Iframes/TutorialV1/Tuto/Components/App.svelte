<script lang="ts">
    import { currentStepStore, steps } from "../Store/StepStore";
    import Step from "./Step.svelte";
    import Steps from "./Steps.svelte";

    function close(){
        WA.player.state.tutorialDone = true;
        //TODO delete @ts-ignore when new scripting release is up
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        WA.ui.modal.closeModal();
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
                    shortTitle={step.shortTitle}
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