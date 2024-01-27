module.exports = (arr1, arr2) => {
    return arr1.filter((e) => arr2.indexOf(e) !== -1);
};
