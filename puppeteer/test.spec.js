import * as selectors from "../helper/selectors";
// const puppeteer = require("puppeteer");
// const timeout = 10000;

const addNewTodo = async todo => {
  await page.waitFor(".new-todo");
  await page.focus(".new-todo");
  await page.keyboard.type(`${todo}`);
  await page.keyboard.press("Enter");
};

describe("Main page", () => {
  beforeEach(async () => {
    await page.goto(TodoMVC, { waitUntil: "domcontentloaded" });
    await addNewTodo("Go shopping");
    await addNewTodo("Go doctor");
    await addNewTodo("Attend meeting");
  });

  afterEach(async () => {
    await page.evaluate(() => localStorage.clear());
  });
  // To clear the local storage after each test.

  test("should display a title", async () => {
    const title = await page.title();
    expect(title).toBe("React • TodoMVC");
  });

  test("should contain a list of todos", async () => {
    const listInput = await page.$$(selectors.todosList);
    expect(listInput).toHaveLength(3);
  });

  test("should allow to delete an item", async () => {
    await page.evaluate(() =>
      document.querySelector(".todo-list li:nth-child(2) .destroy").click()
    );
    const listInput = await page.$$(selectors.todosList);
    await page.screenshot({ path: "results.png", fullPage: true });
    expect(listInput).toHaveLength(2);
  });

  test("should allow to mark an item as completed and display completed list", async () => {
    await page.evaluate(selector => {
      document.querySelector(selector).click();
    }, selectors.completedCheckBox(1));

    await page.evaluate(selector => {
      document.querySelector(selector).click();
    }, selectors.completedCheckBox(2));
    //page.evaluate takes one argument as a function then it runs that funcion, if it has a second argument
    //like(selectors.completedCheckBox(2)) in this example then the result recived from it
    // will be passed as an argument to the function(first argument)
    const listInput = await page.$$(".todo-list li.completed");
    expect(listInput).toHaveLength(2);
  });

  test("should display only active todos", async () => {
    await page.evaluate(selector => {
      document.querySelector(selector).click();
    }, selectors.completedCheckBox(1));
    await page.evaluate(() =>
      document.querySelector(".footer ul li:nth-child(3) > a").click()
    );
    const listInput = await page.$$(selectors.todosList);
    expect(listInput).toHaveLength(2);
  });

  test("should display the number of the items left", async () => {
    const itemsLeft = await page.waitForSelector(".footer span");
    const html = await page.evaluate(
      itemsLeft => itemsLeft.innerText,
      itemsLeft
    );
    console.log(html);
    expect(html).toMatch("3 items left");
  });
});
