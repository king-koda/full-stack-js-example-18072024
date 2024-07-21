import { describe, expect, test, vi } from "vitest";
import { getPosts } from "./post.service";

vi.mock("../data-source", async (importOriginal) => {
  const original = await importOriginal<typeof import("../data-source")>();
  return {
    ...original,
    // replace some exports
    getDataSource: vi.fn(),
    initializeDataSource: vi.fn(),
  };
});

describe("Post Resolvers", () => {
  describe("Queries", () => {
    describe("getPosts", () => {
      describe("When one or more posts exist in the DB", () => {
        test("The posts are returned in ascending order", async () => {
          // TODO: mockResolvedValue
          expect(getPosts).resolves.toReturnWith([]);
        });
      });
      describe("When zero posts exist in the DB", () => {
        test("An empty array is returned", () => {
          // TODO: mockResolvedValue
          expect(getPosts).resolves.toReturnWith([]);
        });
      });
    });
  });
  describe("Mutations", () => {});
});
