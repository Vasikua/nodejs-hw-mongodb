export const moongoseSaveError = (error, data, next) => {
    error.status = 400;
    next();
};


export const setUpadateSettings = function (next) {
    this.option.new = true;
    this.option.runValidators = true;
    next();
};