import { renderHook, waitFor } from "@testing-library/react";
import { useFetchRecipes } from "../../src/hooks/useFetchRecipe";
import { beforeEach, vi, describe, it, expect } from "vitest";
import { getRecipes } from "../../src/services/getRecipes";

vi.mock("../../src/services/getRecipes", () => {
  const getRecipesMock = vi.fn();
  return { getRecipes: getRecipesMock };
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

    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });
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
    const getRecipesMock = vi.fn();
    const setTokenMock = vi.fn();
    const { result } = renderHook(() => useFetchRecipes(token, setTokenMock));

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
      expect(result.current.recipes).toEqual([]);
      expect(getRecipesMock).not.toHaveBeenCalled();
      expect(setTokenMock).not.toHaveBeenCalled();
    });
  });

  it("returns an error", async () => {
    const token = "test token";
    const getRecipesMock = vi.fn();
    const setTokenMock = vi.fn();

    getRecipes.mockRejectedValue(new Error("test error"));
    const { result } = renderHook(() => useFetchRecipes(token, setTokenMock));

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toEqual(new Error("test error"));
      expect(result.current.recipes).toEqual([]);
      expect(setTokenMock).not.toHaveBeenCalled();
    });
  });
});
