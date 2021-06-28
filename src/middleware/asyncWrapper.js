/**
 * @description ExpressJS controller wrapper for error handling
 *
 * @param {Function} wrapFunction - the main controller
 *
 * @returns {Function} - a callback that executes the controller
 */
export default (wrapFunction) => async (request, response, next) => {
    try {
        await wrapFunction(request, response, next);
    } catch (error) {
        return next(error);
    }
};
