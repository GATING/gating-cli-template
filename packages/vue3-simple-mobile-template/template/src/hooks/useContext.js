import { defineComponent, provide, inject, readonly } from 'vue'

export const createContext = (contextInjectKey, injectCompName) => {
  const ContextProvider = defineComponent({
    name: injectCompName,
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    setup(props, { slots }) {
      provide(contextInjectKey, readonly(props.value))
      return () => slots.default?.()
    }
  })

  return ContextProvider
}

export const useContext = (contextInjectKey, defaultValue) => {
  return inject(contextInjectKey, defaultValue)
}
