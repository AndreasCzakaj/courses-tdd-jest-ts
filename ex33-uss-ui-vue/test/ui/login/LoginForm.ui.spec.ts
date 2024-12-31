import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import LoginForm from "../../../src/login/LoginForm.vue"

describe("LoginForm.vue", () => {
  it("render initial state", () => {
    const wrapper = mount(LoginForm)

    expect(wrapper.find("label#usernameLabel").text()).toBe("Username")
    const usernameField = wrapper.find("input#username")
    expect(usernameField.exists()).toBe(true)
    expect(usernameField.isVisible()).toBe(true)
    expect(usernameField.attributes().placeholder).toBe("Enter your username")
    expect(usernameField.element.value).toBe("")
    expect(wrapper.findAll("usernameError")).toEqual([])

    expect(wrapper.find("label#passwordLabel").text()).toBe("Password")
    const passwordField = wrapper.find("input#password")
    expect(passwordField.exists()).toBe(true)
    expect(passwordField.isVisible()).toBe(true)
    expect(passwordField.attributes().placeholder).toBe("Enter your password")
    expect(passwordField.element.value).toBe("")
    expect(wrapper.findAll("passwordError")).toEqual([])

    // Check that the login button exists
    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.isVisible()).toBe(true)
    expect(loginButton.attributes().disabled).toBe("")
  })

  it.todo("render with ALL hidden elements showing and CTA enabled")
})
