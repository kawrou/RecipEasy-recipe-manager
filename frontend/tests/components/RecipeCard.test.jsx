import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Recipe/RecipeCard";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });
});
