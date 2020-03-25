// import * as selectors from "../../helper/selectors";
// const puppeteer = require("puppeteer");
// const timeout = 10000;

const addNewTodo= async(todo)=>{
  await page.waitFor(".new-todo");
  await page.focus(".new-todo");
  await page.keyboard.type(`${todo}`);
  await page.keyboard.press("Enter");
}

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
});
