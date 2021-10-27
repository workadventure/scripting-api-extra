<script lang="ts">
    import type {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";
    import type {Writable} from "svelte/store";

    export let variable: VariableDescriptor;

    let label: string = variable.properties.getString('label') ?? variable.name;
    let type: string = variable.properties.getString('type') ?? (variable.properties.getType('default') === 'bool' ? 'checkbox' : 'text');

    const variableStore = createStoreFromVariable(variable.name);
    const description = variable.properties.getString('description');

    const stringVariableStore = variableStore as Writable<string>;
    const boolVariableStore = variableStore as Writable<boolean>;
    let error: string;

    let container: HTMLElement;
    let input: HTMLInputElement;
    let image: HTMLImageElement;
    let showImage = false;
    const formData = new FormData()

    function getAllowedValues() {
        const allowedValuesStr = variable.properties.mustGetString('allowed_values');
        return JSON.parse(allowedValuesStr) as {[key: string]: string | number | undefined};
    }

    function onChange(event: Event) {
        $variableStore = (event.target as HTMLInputElement).value;
    }

    function onUpload(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        const file = files ? files[0] : null;
        error = '';

        if (file) {
            showImage = true;
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    formData.append('file', file)
                    image.setAttribute("src", reader.result);
                    // Just for the rendering, doesn't touch the actual file
                    image.style.maxWidth = "128px";
                    image.style.maxHeight = "64px";
                }
            };
            reader.readAsDataURL(file);
            return;
        }
        showImage = false;
    }

    function uploadFile() {
        error = '';

        fetch('https://some-api-for-the-upload', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                $variableStore = data.url;
            }).catch(e => {
            error = 'An error occurred. Please try later.'
            throw new Error(e)
        })
    }
</script>


{#if type === 'checkbox' }
    <label class="field">
        <input type="checkbox" class="nes-checkbox" bind:checked={ $boolVariableStore } disabled={!variable.isWritable} />
        <span>{label}</span>
    </label>
{:else if type === 'select' }
    <label for={variable.name}>{label}</label>
    <div class="nes-select field">
    <select id={variable.name} bind:value={ $variableStore } disabled={!variable.isWritable}>
    {#each Object.entries(getAllowedValues()) as [name, value] }
        <option value={value}>{ name }</option>
    {/each}
    </select>
    </div>
{:else if type === 'radio' }
    <span>{label}</span>
    <div class="field">
            {#each Object.entries(getAllowedValues()) as [name, value] }
                <label>
                    <input type="radio" class="nes-radio" bind:group={$stringVariableStore} name={variable.name} value={ value } disabled={!variable.isWritable} />
                    <span>{name}</span>
                </label>
            {/each}
    </div>
{:else if type === 'upload' }
    <div class="nes-field field upload">
        <span>{label}</span>
        <div class="field">
            <input type="file" accept="image/*"
                   name={variable.name}
                   id="upload_{variable.name}"
                   bind:this={input}
                   on:change={onUpload}
                   class="nes-btn">

            <div>
                <div bind:this={container} class="image-preview">
                    {#if showImage}
                        <img bind:this={image} src="" alt="Preview" />
                    {:else}
                        <span>/</span>
                    {/if}
                </div>

                <button class="nes-btn is-primary upload-btn" on:click={uploadFile}>Upload & Replace</button>
            </div>
        </div>
    </div>
{:else}
    <div class="nes-field field">
        <label for="input_{variable.name}">{label}</label>
        <input id="input_{variable.name}" type="text" value={ $stringVariableStore } on:change={onChange} class="nes-input" disabled={!variable.isWritable} />
    </div>
{/if}
{#if description }
<div class="description">{ description }</div>
{/if}

{#if error }
<div class="error"><p>{ error }</p></div>
{/if}

<style lang="scss">
    .field {
        margin-bottom: 30px;
    }

    .description {
        margin-top: -25px;
        color: #777;
        margin-bottom: 30px;
    }

    .upload {
        height: 64px;

        .image-preview {
            width: 128px;
            min-height: 64px;
            border: 2px solid #ddd;
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #ccc;
            float: left;
        }

        .upload-btn {
            float: left;
            display: flex;
            margin-top: 20px;
            margin-left: 20px;
        }
    }

    .error {
        margin-top: 25px;
        color: #cb2525;
        display: inline-block;
    }
</style>
