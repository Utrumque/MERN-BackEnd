import { body } from "express-validator"

export const loginValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 4 }),
]

export const registerValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 4 }),
	body("fullName", "Укажите имя").isLength({ min: 3 }),
]

export const postCreateValidation = [
	body("iban", "Введите IBAN").isLength({ min: 3 }),
	body("fullName", "Введите Full name").optional().isString(),
	body("city", "Введите city").optional().isString(),
	body("email", "Введите email").isString(),
	body("password", "Введите password").isString(),
	body("phone", "Введите phone").isString(),
]
