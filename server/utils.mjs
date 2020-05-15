export const paginateResults = ({
   after: cursor,
   pageSize = 20,
   results,
   // Can pass in a function to calculate an item's cursor
   getCursor = () => null,
 }) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => item._id.equals(cursor));

  if (cursorIndex >= 0) {
    if (cursorIndex === results.length - 1) { // Don't let us overflow
      return [];
    }
    return results.slice(
      cursorIndex + 1,
      Math.min(results.length, cursorIndex + 1 + pageSize),
    );
  }
  return results.slice(0, pageSize);
};
