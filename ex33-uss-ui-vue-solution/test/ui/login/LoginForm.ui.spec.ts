import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import LoginForm from "../../../src/login/LoginForm.vue"
import { createLoginFormModel } from "../../../src/login/LoginModel"
import { pass } from "jest-extended"
import { computed, nextTick } from "vue"

describe("LoginForm.vue", () => {
  it("render initial state", () => {
    const model = createLoginFormModel()
    const wrapper = mount(LoginForm, {
      props: {
        loginForm: model,
      },
    })

    expect(wrapper.find("label#usernameLabel").text()).toBe("Username")
    const usernameField = wrapper.find("input#username")
    expect(usernameField.exists()).toBe(true)
    expect(usernameField.isVisible()).toBe(true)
    expect(usernameField.attributes().placeholder).toBe("Enter your username")
    expect(usernameField.element.value).toBe("")
    expect(wrapper.find("#usernameError").exists()).toEqual(false)

    expect(wrapper.find("label#passwordLabel").text()).toBe("Password")
    const passwordField = wrapper.find("input#password")
    expect(passwordField.exists()).toBe(true)
    expect(passwordField.isVisible()).toBe(true)
    expect(passwordField.attributes().placeholder).toBe("Enter your password")
    expect(passwordField.element.value).toBe("")
    expect(wrapper.find("#passwordError").exists()).toEqual(false)

    // Check that the login button exists
    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.isVisible()).toBe(true)
    expect(loginButton.attributes().disabled).toBe("")
  })

  it("render with ALL hidden elements showing and CTA enabled", () => {
    const model = createLoginFormModel()
    model.usernameField.errorRef.value = "oops username"
    model.passwordField.errorRef.value = "oops password"
    model.ctaDisabled = computed(() => false)

    const wrapper = mount(LoginForm, {
      props: {
        loginForm: model,
      },
    })

    let element: ReturnType<typeof wrapper.find>

    element = wrapper.find("#usernameError")
    expect(element.exists()).toEqual(true)
    expect(element.isVisible()).toEqual(true)
    expect(element.text()).toEqual("oops username")

    element = wrapper.find("#passwordError")
    expect(element.exists()).toEqual(true)
    expect(element.isVisible()).toEqual(true)
    expect(element.text()).toEqual("oops password")

    // Check that the login button exists
    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.isVisible()).toBe(true)
    expect(loginButton.attributes().disabled).toBe(undefined)
  })
})
