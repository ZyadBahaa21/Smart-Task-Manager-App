
function buildTaskSearchQuery(userId, statusFilter, searchTerm) {
  const baseQuery = `SELECT * FROM tasks WHERE owner_id = '${userId}'`;
  const withStatus = statusFilter ? `${baseQuery} AND status = '${statusFilter}'` : baseQuery;
  const fullQuery = searchTerm
    ? `${withStatus} AND title LIKE '%${searchTerm}%' ORDER BY created_at DESC`
    : `${withStatus} ORDER BY created_at DESC`;

  return fullQuery;
}

module.exports = {
  buildTaskSearchQuery,
};
