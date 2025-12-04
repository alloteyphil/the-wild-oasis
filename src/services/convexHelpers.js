// Helper function to transform Convex documents to include 'id' field for compatibility
export function transformConvexDoc(doc) {
  if (!doc) return doc;
  if (Array.isArray(doc)) {
    return doc.map(transformConvexDoc);
  }
  if (doc._id) {
    return { ...doc, id: doc._id };
  }
  return doc;
}

