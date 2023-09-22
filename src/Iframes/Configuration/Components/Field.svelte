<script lang="ts">
    import type {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";
    import type { Writable } from "svelte/store";

    export let variable: VariableDescriptor;

    let label: string = variable.properties.getString('label') ?? variable.name;
    let type: string = variable.properties.getString('type') ?? (variable.properties.getType('default') === 'bool' ? 'checkbox' : 'text');

    const {store, isLoadingVariableStore} = createStoreFromVariable(variable.name);
    const description = variable.properties.getString('description');

    const stringVariableStore = store as Writable<string>;
    const boolVariableStore = store as Writable<boolean>;

    function getAllowedValues() {
        const allowedValuesStr = variable.properties.mustGetString('allowed_values');
        return JSON.parse(allowedValuesStr) as {[key: string]: string | number | undefined};
    }

    function onChange(event: Event) {
        isLoadingVariableStore.set(true);
        const value = (event.target as HTMLInputElement).value;
        if($store === value) return isLoadingVariableStore.set(false);
        store.set(value);
    }
</script>

<section class="tw-flex tw-flex-col tw-content-start tw-items-start tw-my-2">
    {#if description }
        <h2 class="description tw-text-light-purple tw-pt-4 tw-text-xs">{ description }</h2>
    {/if}
    <div class="tw-flex tw-flex-row tw-items-center">
        {#if type === 'checkbox' }
            <div class="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <input type="checkbox" 
                    id={`checkbox_${variable.name}`}
                    on:focus={() => isLoadingVariableStore.set(true)}
                    on:change={() => isLoadingVariableStore.set(true)}
                    bind:checked={ $boolVariableStore } 
                    disabled={!variable.isWritable}
                />
                <label for={`checkbox_${variable.name}`} class="tw-mb-0 tw-ml-2 tw-text-sm tw-font-bold">{label}</label>
            </div>
        {:else if type === 'select' }
            <div class="group-form tw-flex tw-flex-col tw-content-start tw-items-start tw-my-0 tw-py-0">
                <label for={variable.name} class="tw-text-sm tw-font-bold">Which use?*</label>
                <select id={variable.name} 
                    name="which_use" 
                    class=""
                    on:focus={() => isLoadingVariableStore.set(true)}
                    on:change={() => isLoadingVariableStore.set(true)}
                    bind:value={ $store }
                >
                    {#each Object.entries(getAllowedValues()) as [name, value] }
                        <option value={value}>{ name }</option>
                    {/each}
                </select>
            </div>
        {:else if type === 'radio' }
            <div class="group-form tw-flex tw-flex-col tw-content-start tw-items-start tw-my-0 tw-py-0">
                <label for={`${label}`} class="tw-text-sm tw-font-bold">{label}</label>
                <div id={`${label}`} class="tw-flex tw-flex-row">
                    {#each Object.entries(getAllowedValues()) as [name, value] }
                        <div class="form-group tw-flex tw-flex-row tw-items-center tw-pr-4">
                            <input type="radio" 
                                id={`radio_${variable.name}`}
                                on:focus={() => isLoadingVariableStore.set(true)}
                                on:change={() => isLoadingVariableStore.set(true)}
                                bind:group={$stringVariableStore}
                                name={variable.name} 
                                value={ value } 
                                disabled={!variable.isWritable}
                            /> 
                            <label for={`radio_${variable.name}`} class="tw-ml-2 tw-my-1">{name}</label>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="group-form tw-flex tw-flex-col tw-content-start tw-items-start tw-my-0 tw-py-0">
                <label for="input_{variable.name}" class="tw-text-sm tw-font-bold">{label}</label> 
                <input id="input_{variable.name}" 
                    type="text" 
                    class={!variable.isWritable?'!tw-bg-lighter-purple':''}
                    value={ $stringVariableStore } 
                    on:focus={() => isLoadingVariableStore.set(true)}
                    on:blur={onChange}
                    on:change={onChange}
                    disabled={!variable.isWritable}
                />
            </div>
        {/if}
        {#if $isLoadingVariableStore}
            <div class="tw-w-4 tw-h-4 tw-border-1 tw-border-white tw-border-solid tw-rounded-full tw-animate-spin tw-mx-4" style="border-top-color: transparent;"></div>
        {:else}
            <div class="tw-mx-4">
                <svg id="Layer_1" enable-background="new 0 0 511.375 511.375" height="16" viewBox="0 0 511.375 511.375" width="16" xmlns="http://www.w3.org/2000/svg">
                    <g id="g4152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="22" transform="translate(7.566 1.533)"><path id="path4137" clip-rule="evenodd" d="m248.43359-1.5332031c-141.25424 0-255.9999962 114.7457031-255.9999962 256.0000031 0 141.25429 114.7457562 256 255.9999962 256 141.25425 0 256-114.74571 256-256 0-141.2543-114.74575-256.0000031-256-256.0000031z" fill="#66bb6a" fill-rule="evenodd"></path><path id="path4140" clip-rule="evenodd" d="m248.43359-1.5332031c-3.68908 0-7.34865.1243375-11 .2792969 136.15795 5.7783956 245 118.1556262 245 255.7207062 0 137.56506-108.84205 249.9423-245 255.7207 3.65135.15496 7.31092.2793 11 .2793 141.25411 0 256-114.74585 256-256 0-141.25416-114.74589-256.000003-256-256.0000031z" fill="#4caf50" fill-rule="evenodd"></path><path id="path4143" d="m395.49166 124.4668c-9.41571.001-18.45691 3.75219-25.11129 10.41406l-170.96848 171.12305-72.92761-72.99414a11.001082 11.0011 0 0 0 -.002-.002c-13.77289-13.7824-36.447723-13.7824-50.220618 0a11.001082 11.0011 0 0 0 -.002.002c-13.769914 13.7854-13.769914 36.45287 0 50.23828a11.001082 11.0011 0 0 0 .002 0l85.785018 85.86328c20.45537 20.47305 54.27703 20.47385 74.7323 0l183.82592-183.99219c13.76989-13.78541 13.76989-36.45287 0-50.23828-6.65437-6.66186-15.69365-10.41261-25.10934-10.41406a11.001082 11.0011 0 0 0 -.004 0z" fill="#e8f5e9"></path><path id="path4146" d="m395.49219 124.4668c-3.77249.0004-7.47522.62887-10.99805 1.77929 5.26905 1.72089 10.12319 4.64214 14.11133 8.63477 13.76987 13.7854 13.76987 36.45288 0 50.23828l-183.82617 183.99219c-7.44496 7.45171-16.6679 12.15627-26.36524 14.18359 16.94591 3.54228 35.35542-1.16195 48.36524-14.18359l183.82617-183.99219c13.76987-13.7854 13.76987-36.45288 0-50.23828-6.65436-6.66185-15.6937-10.41261-25.10938-10.41406z" fill="#c8e6c9"></path></g>
                </svg>
            </div>
        {/if}

    </div>
</section>

<style lang="scss">
    input[type=text], select{
        width: 50vw;
    }
</style>
