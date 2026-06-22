export default function auth(_to, _from, next) {
    document.title = _to.meta.title + ' - P&P Services'
    const isAuthenticated = localStorage.getItem('auth_token');

    if (!isAuthenticated) {
        next();
    } else {
        next('/dashboard');
    }
};