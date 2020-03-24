module.exports = {
    preset: "jest-puppeteer",
    globals: {
        TodoMVC: "http://todomvc.com/examples/react"
    },
    testMatch: [
        "**/puppeteer/**/*.spec.js"
    ],
    verbose: true
}