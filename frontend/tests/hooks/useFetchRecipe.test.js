import { renderHook, waitFor } from "@testing-library/react";
import { useFetchRecipes } from "../../src/hooks/useFetchRecipe";
import { beforeEach, vi, describe, it, expect } from "vitest";
import { getAllRecipes } from "../../src/services/recipes";

vi.mock("../../src/services/recipes", () => {
  const getAllRecipesMock = vi.fn();
  return { getAllRecipes: getAllRecipesMock };
});

describe("useFetchRecipe hook:", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("fetches recipes from DB when token is present", async () => {
    const token = "test token";
    const setTokenMock = vi.fn();
    const mockRecipes = [
      { _id: "12345", title: "Test Recipe 1", duration: "45" },
      { _id: "23456", title: "Test Recipe 2", duration: "35" },
    ];

    getAllRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });
    const { result } = renderHook(() => useFetchRecipes(token, setTokenMock));

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
      expect(result.current.recipes).toEqual(mockRecipes);
      expect(setTokenMock).toHaveBeenCalledWith("newToken");
    });
  });

  it("doesn't fetch recipes from DB when token isn't present", async () => {
    const token = null;
    const setTokenMock = vi.fn();
    const { result } = renderHook(() => useFetchRecipes(token, setTokenMock));

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
      expect(result.current.recipes).toEqual([]);
      expect(getAllRecipes).not.toHaveBeenCalled();
      expect(setTokenMock).not.toHaveBeenCalled();
    });
  });

  it("returns an error", async () => {
    const token = "test token";
    const setTokenMock = vi.fn();

    getAllRecipes.mockRejectedValue(new Error("test error"));
    const { result } = renderHook(() => useFetchRecipes(token, setTokenMock));

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(new Error("test error"));
      expect(result.current.recipes).toEqual([]);
      expect(setTokenMock).not.toHaveBeenCalled();
      expect(getAllRecipes).toHaveBeenCalled();
    });
  });
});
