<script lang="ts">
    import Section from "./Section.svelte";
    import Sections from "./Sections.svelte";
    import { configurationLayerStore, loadingConfigurationLayerStore } from "../Stores/LayersStore";
    import { onMount } from "svelte";

    let hasFilteredVariables = !!window.location.hash
    let loading = true;
    let loadingVideo = true;

    onMount(() => {
        if(WA.player.state.tutorialConfigureTheRoomDone){
            loading = false;
        }else{
            WA.player.state.tutorialConfigureTheRoomDone = true;
        }
    });
</script>

<div class="main-app tw-text-white">
    <h1>Configure the room</h1>

    {#if loading || $loadingConfigurationLayerStore}
        <div class="tuto tw-flex tw-flex-col tw-justify-center tw-content-center tw-items-center">
            <p>Welcome to world configuration!</p>
            {#if loadingVideo}
                <div class="tw-absolute tw-w-8 tw-h-8 tw-border-1 tw-border-white tw-border-solid tw-rounded-full tw-animate-spin tw-mx-4" 
                    style="border-top-color: transparent;">
                </div>
            {/if}
            <video src="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/tuto-configure.mp4"
                poster="https://workadventure-chat-uploads.s3.eu-west-1.amazonaws.com/upload/video/tuto-configure.png"
                class="tw-w-3/4"
                muted
                autoplay
                on:loadeddata={() => loadingVideo=false}
                on:ended={() => loading=false}
            >
            </video>
            <button class="btn tw-text-light-blue hover:tw-underline tw-cursor-pointer" 
                on:click={() => loading=false}
            >
                Skip tutorial
            </button>
        </div>
    {:else}
        {#if $configurationLayerStore}
            {#if $configurationLayerStore.type === 'objectgroup' || hasFilteredVariables}
                <Section></Section>
            {:else if $configurationLayerStore.type === 'group'}
                <Sections></Sections>
            {:else}
                <div>Unsupported configuration layer type</div>
            {/if}
        {/if}
    {/if}
</div>

<style lang="scss">
    div.tuto{
        height: calc(100vh - 100px);
    }
    div.main-app {
        margin-left: 3%;
        margin-right: 3%;
        h1 {
            margin-top: 10px;
            margin-bottom: 40px;
            text-align: center;
        }
    }
</style>
