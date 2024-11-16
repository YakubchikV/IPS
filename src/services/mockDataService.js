const mockData = [
  {
    id: "1",
    title: "Oracle Issue",
    text: 'This is a description with a <a href="https://oracle.com">link</a>',
    tags: ["bug", "oracle", "issue"],
  },
  {
    id: "2",
    title: "Math Bug",
    text: "5+3-2 is causing problems",
    tags: ["math", "bug"],
  },
  {
    id: "3",
    title: "UI Feedback",
    text: "Update the UI with <b>better styles</b>",
    tags: ["ui", "feedback"],
  },
];

export const fetchComments = async () => {
  return Promise.resolve(mockData);
};
