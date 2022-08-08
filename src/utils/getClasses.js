export const getClasses = (classes, _x) => {
    return classes.filter((item) => item !== '').join(' ').trim('')
}