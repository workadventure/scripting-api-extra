<script lang="ts">
    import type {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";
    import {prepareUpload, uploadFile} from "../../../Uploader";
    import type {Writable} from "svelte/store";
    import {formStore} from "../Stores/form";

    export let variable: VariableDescriptor;

    let label: string = variable.properties.getString('label') ?? variable.name;
    let type: string = variable.properties.getString('type') ?? (variable.properties.getType('default') === 'bool' ? 'checkbox' : 'text');

    const variableStore = createStoreFromVariable(variable.name);
    const description = variable.properties.getString('description');

    const stringVariableStore = variableStore as Writable<string>;
    const boolVariableStore = variableStore as Writable<boolean>;

    let container: HTMLElement;
    let fileInput: HTMLInputElement;

    function getAllowedValues() {
        const allowedValuesStr = variable.properties.mustGetString('allowed_values');
        return JSON.parse(allowedValuesStr) as {[key: string]: string | number | undefined};
    }

    function onChange(event: Event) {
        if (type === 'upload') {
            prepareUpload(event, variable)
        } else {
            $variableStore = (event.target as HTMLInputElement).value;
        }
    }

    async function onUpload() {
        $variableStore = await uploadFile()
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
                   bind:this={fileInput}
                   on:change={onChange}
                   class="nes-btn">

            <div>
                <div bind:this={container} class="image-preview">
                    {#if $formStore.showImage}
                        <img bind:this={$formStore.image} src="" alt="Preview" />
                    {:else}
                        <span>/</span>
                    {/if}
                </div>

                <button class="nes-btn is-primary upload-btn" on:click={onUpload}>Upload & Replace</button>
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

{#if $formStore.error }
<div class="error"><p>{ $formStore.error }</p></div>
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
        height: 128px;

        .image-preview {
            image-rendering: -webkit-crisp-edges;
            image-rendering: crisp-edges;
            width: 256px;
            min-height: 128px;
            border: 2px solid #ddd;
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #ccc;
        }

        .upload-btn {
            display: flex;
            margin-top: 20px;
        }
    }

    .error {
        margin-top: 25px;
        color: #cb2525;
        display: inline-block;
    }
</style>
