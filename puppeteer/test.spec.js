// import * as selectors from "../../helper/selectors";
// const puppeteer = require("puppeteer");
// const timeout = 10000;

const addNewTodo = async todo => {
  await page.waitFor(".new-todo");
  await page.focus(".new-todo");
  await page.keyboard.type(`${todo}`);
  await page.keyboard.press("Enter");
};

beforeAll(async () => {
  await page.goto(TodoMVC, { waitUntil: "domcontentloaded" });
});

describe("Main page", () => {
  test("should display a title", async () => {
    const title = await page.title();
    expect(title).toBe("React • TodoMVC");
  });
  describe("Todos list", () => {
    beforeEach(async () => {
      await addNewTodo("Go shopping");
      await addNewTodo("Go doctor");
      await addNewTodo("Attend meeting");
    });
    test("should contain a list", async () => {
      const listInput = await page.$$(".todo-list li");
      expect(listInput).toHaveLength(3);
    });
  });
  test("should allow to delete an item", async () => {
    await page.waitForSelector(".todo-list li:nth-child(2) .destroy");
    await page.evaluate(() =>
      document.querySelector(".todo-list li:nth-child(2) .destroy").click()
    );
    const listInput = await page.$$(".todo-list li");
    expect(listInput).toHaveLength(2);
  });
  test("should allow to mark an item as completed", async () => {
    await page.waitForSelector(".todo-list li:nth-child(1) .toggle");
    await page.evaluate(() =>
      document.querySelector(".todo-list li:nth-child(1) .toggle").click()
    );
    const listInput = await page.$$(".todo-list li.completed");
    expect(listInput).toHaveLength(1);
  });
  test("should display completed list", async () => {
    await page.waitForSelector(".footer ul li:nth-child(5) > a");
    await page.evaluate(() =>
      document.querySelector(".footer ul li:nth-child(5) > a").click()
    );
    const listInput = await page.$$(".todo-list li");
    expect(listInput).toHaveLength(1);
  });
  test("should display only active todos", async () => {
    await page.waitForSelector(".footer ul li:nth-child(3) > a");
    await page.evaluate(() =>
      document.querySelector(".footer ul li:nth-child(3) > a").click()
    );
    const listInput = await page.$$(".todo-list li");
    expect(listInput).toHaveLength(1);
  });
  test("should display the number of the items left", async () => {
    const itemsLeft = await page.waitForSelector(".footer span");
    const html = await page.evaluate(
      itemsLeft => itemsLeft.innerText,
      itemsLeft
    );
    console.log(html);
    expect(html).toMatch("1 item left");
  });
});
