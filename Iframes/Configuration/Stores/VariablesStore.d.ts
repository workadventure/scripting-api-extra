import { Readable } from "svelte/store";
import { VariableDescriptor } from "../../../VariablesExtra";
export declare const variablesStore: Readable<Map<string, VariableDescriptor> | undefined>;
