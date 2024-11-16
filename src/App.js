import React, { useEffect, useState } from "react";
import { fetchComments } from "./services/mockDataService";
import CommentItem from "./components/CommentItem";
import CommentForm from "./components/CommentForm";

const App = () => {
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchComments().then((data) => {
      setComments(data);
      const uniqueTags = [...new Set(data.flatMap((comment) => comment.tags))];
      setTags(uniqueTags);
    });
  }, []);

  const updateGlobalTags = (updatedComments) => {
    const usedTags = [...new Set(updatedComments.flatMap((comment) => comment.tags))];
    setTags(usedTags);
  };

  const handleSave = (updatedComment) => {
    const updatedComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setComments(updatedComments);
    updateGlobalTags(updatedComments);
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    updateGlobalTags(updatedComments);
  };

  const handleAdd = (newComment) => {
    const updatedComments = [...comments, { ...newComment, id: Date.now().toString() }];
    setComments(updatedComments);
    updateGlobalTags(updatedComments);
  };

  const handleUpdateTags = (newTag) => {
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (commentId, tagToRemove) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, tags: comment.tags.filter((tag) => tag !== tagToRemove) }
        : comment
    );
    setComments(updatedComments);
    updateGlobalTags(updatedComments);
  };

  const filteredComments = filter
    ? comments.filter((comment) => comment.tags.includes(filter))
    : comments;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Issue Posting System</h1>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => setFilter(e.target.value)}
          defaultValue=""
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      {filteredComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          tags={tags}
          onSave={handleSave}
          onDelete={handleDelete}
          onUpdateTags={handleUpdateTags}
          onRemoveTag={handleRemoveTag}
        />
      ))}
      <CommentForm tags={tags} onAdd={handleAdd} onUpdateTags={handleUpdateTags} />
    </div>
  );
};

export default App;
