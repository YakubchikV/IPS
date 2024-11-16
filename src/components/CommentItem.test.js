import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentItem from "./CommentItem";

describe("CommentItem Component", () => {
  const mockComment = {
    id: "1",
    title: "Test Comment",
    text: "This is a test comment.",
    tags: ["urgent"],
  };

  const mockHandlers = {
    onSave: jest.fn(),
    onDelete: jest.fn(),
    onUpdateTags: jest.fn(),
    onRemoveTag: jest.fn(),
  };

  test("removes a tag when the remove button is clicked", () => {
    render(<CommentItem comment={mockComment} tags={[]} {...mockHandlers} />);
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByRole("button", { name: "x" }));
    expect(mockHandlers.onRemoveTag).toHaveBeenCalledWith("1", "urgent");
  });
});
