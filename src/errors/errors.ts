export function notFoundException(message?: string){
    return {
        type: "application",
        code: 404,
        message: message || "Not Found!"
    }
}

export function forbiddenException(message?: string){
    return {
        type: "application",
        code: 403,
        message: message || "Forbidden!"
    }
}

export function balanceRequired(message?: string){
    return {
        type: "application",
        code: 400,
        message: message || "insufficient funds"
    }
}

export function invalidRequestException(message?: string){
    return {
        type: "application",
        code: 400,
        message: message || "Invalid format"
    }
}

//Começa aqui:

export function notMinimumBalance(message?: string){
    return {
        type: "application",
        code: 400,
        message: message || "Invalid balance"
    }
}

export function gameAlreadyFinished(message?: string){
    return {
        type: "application",
        code: 409,
        message: message || "Finished Game"
    }
}

export function betAlreadyRegistered(message?: string){
    return {
        type: "application",
        code: 409,
        message: message || "Bet already registered"
    }
}

export function insufficientFunds(message?: string){
    return {
        type: "application",
        code: 400,
        message: message || "insufficient funds"
    }
}