export const getErrorMsg = (error) => {
    if (error.name === 'ValidationError') {
        return Object.values(error.errors).map(e => e.message);
    }
    return [error.message]; 
};
