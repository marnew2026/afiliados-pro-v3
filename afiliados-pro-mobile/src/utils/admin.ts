export function isAdmin(user?: { isAdmin?: boolean } | null) {
  return user?.isAdmin === true;
}
