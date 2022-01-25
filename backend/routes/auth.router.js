const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid')
const config = require('config')

const User = require('../models/User');
const Token = require('../models/Token');

const router = Router();

const generateTokens = payload => {
    const accessToken = jwt.sign(payload, config.get('JWT_ACCESS_TOKEN'), {expiresIn: '10s'}, null)
    const refreshToken = jwt.sign(payload, config.get('JWT_REFRESH_TOKEN'), {expiresIn: '25h'}, null)
    return {
        accessToken,
        refreshToken
    }
}

async function saveToken(userID, refreshToken) {
    const tokenData = await Token.findOne({user: userID})
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = Token.create({user: userID, refreshToken})
    return token
}

router.post(
    '/signup',
    [
        check('password', 'Минимальная длина 4 символа').isLength({min: 4}).exists(),
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('nickname', 'Некорректный никнейм').isLength({min: 3, max: 25}).exists()
    ],
    async (request, response) => {
        try {
            console.log('Body ', request.body);
            const errors = validationResult(request);

            if (!errors.isEmpty())
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                });

            const {email, nickname, password, password_confirm} = request.body;

            const candidate = await User.findOne({email});
            if (candidate) return response.status(400).json({message: 'Такой пользователь уже есть!'});

            if (password !== password_confirm) return response.status(400).json({message: 'Пароли не совпадают'})

            const hashPassword = await bcrypt.hash(password, 12);

            const generationID = '#' + nanoid(5)

            const user = await User.create({email, nickname, generationID, password: hashPassword});

            const userID = user._id //TODO nedawno
            const token = generateTokens({email, userID}) // было const token = generateTokens({email})

            await saveToken(user._id, token.refreshToken)

            response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            response.status(201).json({...token, message: 'Пользователь создан'});
        } catch (e) {
            response.status(500).json({message: 'Упс.. Что-то пошло не так...'});
        }
    }
);

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail().exists(),
        check('password', 'Минимальная длина 4 символа').exists()
    ],
    async (request, response) => {
        try {
            console.log('login: ', request.body);
            const errors = validationResult(request);
            if (!errors.isEmpty())
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный email или пароль',
                });
            const {email, password} = request.body;

            const user = await User.findOne({email});
            if (!user)
                return response.status(400).json({message: 'Такого пользователя не существует!'});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return response.status(400).json({message: 'Неверный пароль'});

            const userID = user._id //TODO nedawno
            const token = generateTokens({email, userID}) // было const token = generateTokens({email})
            await saveToken(user._id, token.refreshToken)

            //
            console.log(jwt.verify(token.refreshToken, config.get('JWT_REFRESH_TOKEN')))
            //

            response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            response.status(201).json({...token});
        } catch (e) {
            response.status(500).json({message: 'Упс.. Что-то пошло не так...'});
        }
    }
);

// api/auth/logout
router.get('/logout', async (request, response) => {
    try {
        const {refreshToken} = request.cookies
        console.log(request.cookies)
        await Token.deleteOne({refreshToken: refreshToken})
        response.clearCookie('refreshToken')
        response.status(200).json({message: 'Вы успешно вышли'})
    } catch (e) {
        response.status(500).json({message: 'Упс.. Что-то пошло не так...'});
    }
})

// api/auth/refresh
router.get('/refresh', async (request, response) => {
    try {
        const {refreshToken} = request.cookies
        // console.log(refreshToken)
        if (!refreshToken)
        if (!refreshToken) return response.status(401).json({message: '1Пользователь не авторизирован '})

        const UserData = jwt.verify(refreshToken, config.get('JWT_REFRESH_TOKEN'))
        const tokenData = await Token.findOne({refreshToken})
        // console.log('------------')
        // console.log(UserData)
        // console.log(tokenData)
        // console.log('------------')
        if (!UserData || !tokenData) return response.status(401).json({message: '2Пользователь не авторизирован '})
        const user = await User.findById(UserData.userID)

        const userID = user._id //TODO nedawno
        const email = user.email //TODO nedawno
        const token = generateTokens({email, userID})
        await saveToken(user._id, token.refreshToken)

        response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
        response.status(200).json({accessToken: token['accessToken'], message: 'Кука обновлена'})
    } catch (e) {
        if (e.name === 'TokenExpiredError') return response.status(401).json({message: '3Пользователь не авторизирован '})
        response.status(500).json({message: 'Упс.. Что-то пошло не так...'});
    }
})

module.exports = router;