import React, { useState, memo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { calculateMathExpressions } from "../utils/mathParser";

const CommentItem = memo(({
  comment, tags = [], onSave, onDelete, onUpdateTags, onRemoveTag,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableComment, setEditableComment] = useState(comment);
  const [newTag, setNewTag] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !editableComment.tags.includes(trimmedTag)) {
      setEditableComment((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      onUpdateTags(trimmedTag);
    }
    setNewTag("");
    setShowDropdown(false);
  };

  const handleRemoveTag = (tag) => {
    setEditableComment((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
    onRemoveTag(comment.id, tag);
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(newTag.toLowerCase()) &&
      !editableComment.tags.includes(tag)
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              value={editableComment.title}
              onChange={(e) =>
                setEditableComment((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <textarea
              className="form-control mb-2"
              value={editableComment.text}
              onChange={(e) =>
                setEditableComment((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
            />
            <div className="mb-2">
              {editableComment.tags.map((tag) => (
                <span key={tag} className="badge bg-secondary me-1">
                  {tag}
                  <button
                    className="btn btn-sm btn-danger ms-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Press Enter to add a tag</Tooltip>}
            >
              <input
                className="form-control mb-2"
                placeholder="Add a new or existing tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag(newTag)}
              />
            </OverlayTrigger>
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
              className="btn btn-primary me-2"
              onClick={() => {
                onSave(editableComment);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditableComment(comment);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">
              {calculateMathExpressions(comment.title)}
            </h5>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: calculateMathExpressions(comment.text),
              }}
            ></p>
            <div className="mb-2">
              {comment.tags.map((tag) => (
                <span key={tag} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(comment.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default CommentItem;
