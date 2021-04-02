export function validateUsername(username: string): string {
    // Can't be too short
    if (username.length < 5) return 'Username must be between at least 5 characters';
    // Can't be too long
    if (username.length > 30) return 'Username cannot be greater than 30 characters';
    // Only contains certain characters
    if (username.match(/^[A-Z0-9$!\-_]+$/gi) == null) return 'Username cannot contain whitespace or specials characters other than: $!-_';

    return '';
}

export function validateName(name: string): string {
    // Can't be too short
    if (name.length === 0) return 'Name cannot be empty';
    // Can't be too long
    if (name.length > 35) return 'Name cannot be greater than 35 characters';
    // Only contains certain characters
    if (name.match(/^[a-z ,.'-]+$/i) == null) return 'Name is not valid';

    return '';
}

export function validatePassword(password: string): string {
    // Can't be too short
    if (password.length < 6) return 'Password must be between at least 6 characters';
    // Can't be too long
    if (password.length > 30) return 'Password cannot be greater than 30 characters';
    // Only contains certain characters
    if (password.match(/^(\S)*$/gi) == null) return 'Password cannot contain whitespace';

    return '';
}