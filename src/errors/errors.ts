export function notFoundException(message?: string) {
  return {
    type: "application",
    code: 404,
    message: message || "Not Found!",
  };
}

export function notMinimumBalance(message?: string) {
  return {
    type: "application",
    code: 400,
    message: message || "Invalid balance",
  };
}

export function gameAlreadyFinished(message?: string) {
  return {
    type: "application",
    code: 409,
    message: message || "Finished Game",
  };
}

export function insufficientFunds(message?: string) {
  return {
    type: "application",
    code: 400,
    message: message || "Insufficient funds",
  };
}
