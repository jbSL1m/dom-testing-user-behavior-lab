/** @jest-environment jsdom */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require('../index')

describe('DOM testing user behavior lab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="dynamic-content"></div>
      <div id="remove-target">Keep me</div>
      <div id="remove-me">Remove me</div>
      <form id="user-form">
        <input type="text" name="user-input" />
        <button type="submit">Submit</button>
      </form>
      <div id="error-message" class="hidden"></div>
    `
  })

  test('addElementToDOM updates DOM content', () => {
    addElementToDOM('dynamic-content', '<p>Test content</p>')

    const container = document.getElementById('dynamic-content')
    expect(container).not.toBeNull()
    expect(container.innerHTML).toBe('<p>Test content</p>')
  })

  test('removeElementFromDOM removes an element', () => {
    expect(document.getElementById('remove-me')).not.toBeNull()

    removeElementFromDOM('remove-me')

    expect(document.getElementById('remove-me')).toBeNull()
    expect(document.getElementById('remove-target')).not.toBeNull()
  })

  test('simulateClick updates the DOM correctly', () => {
    simulateClick('dynamic-content', 'Button Clicked!')

    const container = document.getElementById('dynamic-content')
    expect(container.textContent).toBe('Button Clicked!')
  })

  test('handleFormSubmit updates the DOM with valid input', () => {
    const input = document.querySelector('#user-form input')
    input.value = ' Hello world '

    handleFormSubmit('user-form', 'dynamic-content')

    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    expect(container.textContent).toBe('Hello world')
    expect(errorMessage.textContent).toBe('')
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  test('handleFormSubmit shows an error for empty input', () => {
    const input = document.querySelector('#user-form input')
    input.value = '   '

    handleFormSubmit('user-form', 'dynamic-content')

    const errorMessage = document.getElementById('error-message')
    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
