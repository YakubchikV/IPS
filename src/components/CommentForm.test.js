import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "./CommentForm";

describe("CommentForm Component", () => {
  const mockTags = ["urgent", "bug", "feature"];

  test("renders correctly with inputs and button", () => {
    render(<CommentForm tags={mockTags} onAdd={jest.fn()} onUpdateTags={jest.fn()} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Text")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a new or existing tag")).toBeInTheDocument();
    expect(screen.getByText("Add Comment")).toBeInTheDocument();
  });

  test("adds a tag when pressing Enter", () => {
    const onUpdateTags = jest.fn();
    render(<CommentForm tags={mockTags} onAdd={jest.fn()} onUpdateTags={onUpdateTags} />);

    const tagInput = screen.getByPlaceholderText("Add a new or existing tag");
    fireEvent.change(tagInput, { target: { value: "urgent" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

    expect(screen.getByText("urgent")).toBeInTheDocument();
    expect(onUpdateTags).toHaveBeenCalledWith("urgent");
  });

  test("calls onAdd with correct data when adding a comment", () => {
    const onAdd = jest.fn();
    const onUpdateTags = jest.fn();

    render(<CommentForm tags={mockTags} onAdd={onAdd} onUpdateTags={onUpdateTags} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Comment" },
    });
    fireEvent.change(screen.getByPlaceholderText("Text"), {
      target: { value: "This is a test comment." },
    });

    const tagInput = screen.getByPlaceholderText("Add a new or existing tag");
    fireEvent.change(tagInput, { target: { value: "testing" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

    fireEvent.click(screen.getByText("Add Comment"));

    expect(onAdd).toHaveBeenCalledWith({
      title: "New Comment",
      text: "This is a test comment.",
      tags: ["testing"],
    });
  });

  test("disables the Add Comment button if title or text is empty", () => {
    render(<CommentForm tags={mockTags} onAdd={jest.fn()} onUpdateTags={jest.fn()} />);

    const button = screen.getByText("Add Comment");

    expect(button).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Comment" },
    });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText("Text"), {
      target: { value: "This is a test comment." },
    });
    expect(button).toBeEnabled();
  });
});
