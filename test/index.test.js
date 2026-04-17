/** @jest-environment jsdom */

// Import the functions we want to test from the app file.
const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require('../index')

describe('DOM testing user behavior lab', () => {
  // Reset the HTML before every test so tests do not affect each other.
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
    // Call the function with the target container ID and HTML content.
    addElementToDOM('dynamic-content', '<p>Test content</p>')

    const container = document.getElementById('dynamic-content')

    // The container should exist and show the expected HTML.
    expect(container).not.toBeNull()
    expect(container.innerHTML).toBe('<p>Test content</p>')
  })

  test('removeElementFromDOM removes an element', () => {
    // Make sure the element is present before removal.
    expect(document.getElementById('remove-me')).not.toBeNull()

    removeElementFromDOM('remove-me')

    // The element should be gone after calling the function.
    expect(document.getElementById('remove-me')).toBeNull()
    // Other elements should still remain.
    expect(document.getElementById('remove-target')).not.toBeNull()
  })

  test('simulateClick updates the DOM correctly', () => {
    // This function just reuses addElementToDOM under the hood.
    simulateClick('dynamic-content', 'Button Clicked!')

    const container = document.getElementById('dynamic-content')

    expect(container.textContent).toBe('Button Clicked!')
  })

  test('handleFormSubmit updates the DOM with valid input', () => {
    const input = document.querySelector('#user-form input')
    input.value = ' Hello world '

    // Simulate a form submission with a valid value.
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

    // Submit the form with only whitespace to trigger the error.
    handleFormSubmit('user-form', 'dynamic-content')

    const errorMessage = document.getElementById('error-message')

    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
