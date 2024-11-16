import React, { useState } from "react";

const CommentForm = ({ tags, onAdd, onUpdateTags }) => {
  const [newComment, setNewComment] = useState({ title: "", text: "", tags: [] });
  const [newTag, setNewTag] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !newComment.tags.includes(trimmedTag)) {
      setNewComment((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      onUpdateTags(trimmedTag);
    }
    setNewTag("");
    setShowDropdown(false);
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(newTag.toLowerCase()) &&
      !newComment.tags.includes(tag)
  );

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Add New Comment</h5>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={newComment.title}
          onChange={(e) =>
            setNewComment((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="form-control mb-2"
          placeholder="Text"
          value={newComment.text}
          onChange={(e) =>
            setNewComment((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <div className="mb-2">
          {newComment.tags.map((tag) => (
            <span key={tag} className="badge bg-secondary me-1">
              {tag}
              <button
                className="btn btn-sm btn-danger ms-1"
                onClick={() =>
                  setNewComment((prev) => ({
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                  }))
                }
              >
                x
              </button>
            </span>
          ))}
        </div>
        <input
          className="form-control mb-2"
          placeholder="Add a new or existing tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag(newTag)}
        />
        {showDropdown && filteredTags.length > 0 && (
          <ul className="list-group mb-2">
            {filteredTags.map((tag) => (
              <li
                key={tag}
                className="list-group-item list-group-item-action"
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn btn-success"
          onClick={() => {
            onAdd(newComment);
            setNewComment({ title: "", text: "", tags: [] });
            setNewTag("");
          }}
          disabled={!newComment.title.trim() || !newComment.text.trim()}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
