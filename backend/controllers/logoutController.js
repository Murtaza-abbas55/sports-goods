export const logout = async (req, res) => {
    console.log('Before clearing cookie:', req.cookies.token); // Check if the token is present

    res.clearCookie('token', {
        path: '/', // Match the path used when setting the cookie
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });

    console.log('After clearing cookie:', req.cookies.token); // Verify if it's still accessible in this session

    res.status(200).json({ message: 'Logged out successfully' });
};
