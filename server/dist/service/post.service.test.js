import { faker } from "@faker-js/faker";
import { beforeAll, describe, expect, test } from "vitest";
import { getPost, getPosts, reorderPosts, updatePost } from "./post.service";
describe("Post Resolvers", () => {
    describe("Queries", () => {
        describe("getPosts", () => {
            describe("When one or more posts exist in the DB", () => {
                test("The posts are returned in ascending order", async () => {
                    const result = await getPosts({ cursor: 0, limit: 3 });
                    // validate that the correct amount of posts are returned
                    expect(result).toHaveLength(3);
                    // validate that the posts are returned in ascending order
                    expect(result[0].order).toBeLessThan(result[1].order);
                    expect(result[1].order).toBeLessThan(result[2].order);
                });
            });
        });
        describe("getPost (NOT EXPOSED TO CLIENT)", () => {
            describe("When one or more posts exist in the DB", () => {
                describe("And we want to fetch a post by id, content or title", () => {
                    test("The matching post is returned", async () => {
                        // fetch three posts from the DB
                        const results = await getPosts({ cursor: 0, limit: 3 });
                        // use the third post from the results to test the getPost function
                        const thirdPost = results[2];
                        // fetch the post by id only
                        const resultFromId = await getPost({
                            id: thirdPost.id,
                        });
                        // check that the post fetched by id is the same as the third post
                        expect(resultFromId).toMatchObject(thirdPost);
                        // fetch the post by title only
                        const resultFromTitle = await getPost({
                            title: thirdPost.title,
                        });
                        // check that the post fetched by title is the same as the third post
                        expect(resultFromTitle).toMatchObject(thirdPost);
                        // fetch the post by content only
                        const resultFromContent = await getPost({
                            content: thirdPost.content,
                        });
                        // check that the post fetched by content is the same as the third post
                        expect(resultFromContent).toMatchObject(thirdPost);
                    });
                });
            });
        });
    });
    describe("Mutations", () => {
        const postIdToBeUpdated = 1;
        beforeAll(async () => {
            // reset the post to another state to failure on reruns of the test
            await updatePost({
                id: postIdToBeUpdated,
                title: faker.lorem.words(3),
                content: faker.lorem.paragraph(4),
            });
        });
        describe("updatePost", () => {
            describe("When a post exists in the DB", () => {
                describe("And we want to update its title and content", async () => {
                    test("The posts title and content should be updated", async () => {
                        // fetch the post before mutating, to test that values changed
                        const postToBeUpdated = await getPost({ id: postIdToBeUpdated });
                        // mutate the post, changing the title and content values
                        const updatedPost = await updatePost({
                            id: postIdToBeUpdated,
                            title: "Test",
                            content: "Test",
                        });
                        // check that the post fetched before mutating has a different title value
                        expect(postToBeUpdated.title).not.toEqual("Test");
                        // check that the post fetched before mutating has a different content value
                        expect(postToBeUpdated.content).not.toEqual("Test");
                        // check that the post was updated to the values we expect
                        expect(updatedPost).toMatchObject({
                            id: postIdToBeUpdated,
                            title: "Test",
                            content: "Test",
                        });
                    });
                });
            });
        });
        describe("reorderPosts", () => {
            describe("When two posts exists in the DB", () => {
                describe("And we want to swap their order", async () => {
                    test("The posts orders should be swapped", async () => {
                        const firstPostIdToBeSwapped = 1;
                        const secondPostIdToBeSwapped = 2;
                        // fetch the first post before the swap
                        const firstPostToSwap = await getPost({
                            id: firstPostIdToBeSwapped,
                        });
                        // fetch the second post before the swap
                        const secondPostToSwap = await getPost({
                            id: secondPostIdToBeSwapped,
                        });
                        // reorder posts
                        await reorderPosts({
                            firstPostId: firstPostIdToBeSwapped,
                            secondPostId: secondPostIdToBeSwapped,
                        });
                        // fetch the first post after the swap
                        const firstPostAfterSwap = await getPost({
                            id: firstPostIdToBeSwapped,
                        });
                        // fetch the second post after the swap
                        const secondPostAfterSwap = await getPost({
                            id: secondPostIdToBeSwapped,
                        });
                        // check that the first posts order was changed
                        expect(firstPostToSwap.order).not.toEqual(firstPostAfterSwap.order);
                        // check that the first posts order was changed to the second posts order
                        expect(firstPostAfterSwap.order).toEqual(secondPostToSwap.order);
                        // check that the second posts order was changed
                        expect(secondPostToSwap.order).not.toEqual(secondPostAfterSwap.order);
                        // check that the second posts order was changed to the first posts order
                        expect(secondPostAfterSwap.order).toEqual(firstPostToSwap.order);
                    });
                });
            });
        });
    });
});
