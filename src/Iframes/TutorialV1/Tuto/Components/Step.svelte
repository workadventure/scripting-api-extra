<script lang="ts">
    export let title: string;
    export let shortTitle: string;
    export let videoUrl: string;
    export let videoPoster: string;
    export let description: string;
</script>
<div class="ste tw-px-16 tw-py-5 tw-overflow-y-scroll">
    <div class="title tw-text-white">
        <h1 class="tw-p-3">{title}</h1>
        <p class="tw-p-3">{shortTitle}</p>
    </div>
    <div class="video">
        <video class="tw-w-full tw-rounded-lg" 
            poster={videoPoster} 
            controls 
            autoplay 
            muted
        >
            <track kind="captions">
            <source src={videoUrl} type="video/mp4">
            Video not available in your navigator
        </video>
    </div>
    <div class="description tw-p-3 tw-mb-16 tw-text-left tw-text-white tw-pb-20">
        {@html description}
    </div>
</div>