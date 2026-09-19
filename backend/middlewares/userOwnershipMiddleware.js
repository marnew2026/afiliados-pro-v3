function sameId(left, right) {
  return Boolean(left && right && String(left) === String(right));
}

function forbidden(res) {
  return res.status(403).json({
    success: false,
    error: "Acesso negado para este usuario.",
  });
}

export function requireSelfParam(paramName = "userId") {
  return function selfParamMiddleware(req, res, next) {
    if (!sameId(req.user?._id, req.params?.[paramName])) return forbidden(res);
    return next();
  };
}

export function requireSelfBody(fieldName = "userId") {
  return function selfBodyMiddleware(req, res, next) {
    if (!sameId(req.user?._id, req.body?.[fieldName])) return forbidden(res);
    return next();
  };
}
