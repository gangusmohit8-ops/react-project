
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}   
export const validateName = (name) => {     
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}
export const validateGender = (gender) => {
    const validGenders = ['male', 'female', 'other'];
    return validGenders.includes(gender.toLowerCase());
}