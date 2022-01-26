const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid')
const config = require('config')

const User = require('../models/User');
const Token = require('../models/Token');

const router = Router();

const ApiError = require('../exceptions/ApiError')

const generateTokens = payload => {
    const accessToken = jwt.sign(payload, config.get('JWT_ACCESS_TOKEN'), {expiresIn: '10h'}, null)
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
    //const token = await Token.create({user: userID, refreshToken})
    return await Token.create({user: userID, refreshToken})
}

router.post(
    '/signup',
    [
        check('password', 'Min length 4 symbols').isLength({min: 4}).exists(),
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('nickname', 'Incorrect nickname').isLength({min: 3, max: 25}).exists()
    ],
    async (request, response, next) => {
        try {
            console.log('Body ', request.body);
            const errors = validationResult(request);

            if (!errors.isEmpty())
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration',
                });

            const {email, nickname, password, password_confirm} = request.body;

            const candidate = await User.findOne({email});
            if (candidate) throw ApiError.BadRequest(400, 'Such a user exists')

            if (password !== password_confirm) throw ApiError.BadRequest(400, 'Password mismatch')

            const hashPassword = await bcrypt.hash(password, 12)

            const generationID = '#' + nanoid(5)

            const UID = nanoid(8)

            const user = await User.create({UID, email, nickname, generationID, password: hashPassword})

            const userID = user._id //TODO nedawno
            const token = generateTokens({email, userID, UID}) // было const token = generateTokens({email})

            await saveToken(user._id, token.refreshToken)

            response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            response.status(201).json({...token})
        } catch (e) {
            next(e)
        }
    }
);

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail().exists(),
        check('password', 'Min length 4 symbols').exists()
    ],
    async (request, response, next) => {
        try {
            console.log('login: ', request.body);
            const errors = validationResult(request);
            if (!errors.isEmpty())
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email or password',
                });
            const {email, password} = request.body;

            const user = await User.findOne({email});
            if (!user) throw ApiError.BadRequest(404, 'This user does not exist')

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw ApiError.BadRequest(400, 'Invalid password')

            const userID = user._id //TODO nedawno
            const token = generateTokens({email, userID}) // было const token = generateTokens({email})
            await saveToken(user._id, token.refreshToken)

            response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            response.status(201).json({...token});
        } catch (e) {
            next(e)
        }
    }
);

// api/auth/logout
router.get('/logout', async (request, response, next) => {
    try {
        const {refreshToken} = request.cookies
        await Token.deleteOne({refreshToken: refreshToken})
        response.clearCookie('refreshToken')
        response.status(200).json({message: 'You have successfully completed the session'})
    } catch (e) {
        next(e)
    }
})

// api/auth/refresh
router.get('/refresh', async (request, response, next) => {
    try {
        const {refreshToken} = request.cookies
        if (!refreshToken)
            if (!refreshToken) throw ApiError.Unauthorized()

        const UserData = jwt.verify(refreshToken, config.get('JWT_REFRESH_TOKEN'))
        const tokenData = await Token.findOne({refreshToken})

        if (!UserData || !tokenData) throw ApiError.Unauthorized()
        const user = await User.findById(UserData.userID)

        const userID = user._id //TODO nedawno
        const email = user.email //TODO nedawno
        const token = generateTokens({email, userID})
        await saveToken(user._id, token.refreshToken)

        response.cookie('refreshToken', token.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
        response.status(200).json({accessToken: token['accessToken']})
    } catch (e) {
        if (e.name === 'TokenExpiredError') throw ApiError.Unauthorized()
        next(e)
    }
})

module.exports = router;