export const getComponent = async (componentName: string) => {
  try {
    const component = await import(`../pages/${componentName}.vue`)
    return component.default
  } catch {
    const errorComponent = await import("../pages/404.vue")
    return errorComponent.default
  }
}
