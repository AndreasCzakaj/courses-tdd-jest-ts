// src/types/FormField.ts (or wherever you keep your type definitions)
import { type Ref, ref, watch } from "vue"

export interface FormField {
  label: string
  placeholder: string
  valueRef: Ref<string>
  errorRef: Ref<string>
  tainted: Ref<boolean>
  touch: () => void
  validate: () => boolean
  validateImpl: (self: FormField) => void
}

export class FormFieldImpl implements FormField {
  constructor(defaults: Partial<FormField> & Pick<FormField, "validateImpl">) {
    this.label = defaults?.label ?? ""
    this.placeholder = defaults?.placeholder ?? ""
    this.valueRef = defaults?.valueRef ?? ref("")
    this.errorRef = defaults?.errorRef ?? ref("")
    this.validateImpl = defaults.validateImpl

    watch(this.valueRef, (newVal: string, oldVal: string) => {
      console.log("FormFieldImpl: watch", { newVal, oldVal })
      this.touch()
    })

    this.touch = this.touch.bind(this)
  }

  label: string
  placeholder: string
  valueRef: Ref<string>
  errorRef: Ref<string>
  tainted: Ref<boolean> = ref(false)

  touch() {
    //console.log(this)
    this.tainted.value = true
    this.validate()
  }

  validate() {
    if (this.tainted.value) {
      try {
        this.validateImpl(this)
      } catch (e: any) {
        this.errorRef.value = e.message
        return false
      }
    }
    this.errorRef.value = ""
    return true
  }

  validateImpl(self: FormField) {
    throw new Error("not implemented")
  }
}
