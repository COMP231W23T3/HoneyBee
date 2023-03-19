export function userName(req) {
    if (req.user) {
      return req.user.displayName;
    }
    return "";
  }