import jwt from 'jsonwebtoken';

export const isAnyAuthorizedUser = (request, response, next) => {
    const authHeader = request.headers.token;

    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');

        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                response.status(403).json('Токен невалидный');
            }

            request.user = user;
            next();
        });
    } else {
        response.status(401).json('Вы не авторизованы');
    }
}

export const isSpecificUser = (request, response, next) => {
    isAnyAuthorizedUser(request, response, () => {
        if (request.user._id === request.params.id || request.user.isAdmin) {
            next();
        } else {
            response.status(403).json('У вас нет прав доступа');
        }
    });
}

export const isAdmin = (request, response, next) => {
    isAnyAuthorizedUser(request, response, () => {
        if (request?.user?.isAdmin) {
            next();
        } else {
            response.status(403).json(
                'Вы должны иметь права администратора, чтобы сделать это'
            );
        }
    });
}