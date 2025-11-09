import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const initialCount = postsService["posts"].length;
    const newPost = postsService.create(post);

    expect(postsService["posts"].length).toBe(initialCount + 1);
    expect(newPost.id).toBeDefined();
    expect(newPost.date).toBeTruthy();
    expect(typeof newPost.date).toBe("string");
    expect(newPost.text).toBe(post.text);
  });

  it("should find a post", () => {
    const createdPost = postsService.create(post);
    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toEqual(createdPost);
  });
});
