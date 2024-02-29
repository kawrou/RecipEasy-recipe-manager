import { render, screen } from "@testing-library/react";

import RecipeCard from "../../src/components/Recipe/RecipeCard";

describe.skip("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<RecipeCard post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });
});
