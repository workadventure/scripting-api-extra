import { writable } from "svelte/store";

interface Form {
    error: string,
    image: HTMLImageElement,
    showImage: boolean,
    formData: FormData,
}

const defaultFormState: Form = {
    error: '',
    image: new Image(0, 0),
    showImage: false,
    formData: new FormData()
}

function createFormAction() {
    const { subscribe, set, update } = writable<Form>(defaultFormState);

    return {
        subscribe,
        setError: (error: string): void => {
            update((form: Form) => {
                form.error = error
                return form
            })
        },
        clearError: (): void => {
            update((form: Form) => {
                form.error = ''
                return form
            })
        },
        setImagePreviewMaxWidth: (width: string): void => {
            update((form: Form) => {
                form.image.style.maxWidth = "" + width + "px";
                return form
            })
        },
        setImagePreviewMaxHeight: (height: string): void => {
            update((form: Form) => {
                form.image.style.maxHeight = "" + height + "px";
                return form
            })
        },
        setImageSource: (source: string): void => {
            update((form: Form) => {
                form.image.setAttribute("src", source);
                return form
            })
        },
        changeImageVisibility: (mustShowImage: boolean): void => {
            update((form: Form) => {
                form.showImage = mustShowImage
                return form
            })
        },
        setFormDataFile: (file: File): void => {
            update((form: Form) => {
                form.formData.append('file', file)
                return form
            })
        },
        setFormDataProperty: (propertyName: string, propertyValue: any): void => {
            update((form: Form) => {
                form.formData.set(propertyName, propertyValue)
                return form
            })
        },
        clearForm: (): void => {
            set(defaultFormState);
        },
    }
}

export const formStore = createFormAction();
