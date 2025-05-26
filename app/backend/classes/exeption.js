class Exeption {
    constructor(errorCode, details, clientVisible = false) {
        this.errorCode = errorCode;
        this.clientVisible = clientVisible;
        this.details = details;
    }
}

export default { Exeption };