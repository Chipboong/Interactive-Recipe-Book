import { Link } from 'react-router'

function Button({ to, onClick, children, variant = 'primary', fullWidth = false }) {

    const styles = {
        primary: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
        outline: 'border border-gray-300 text-gray-700 hover:border-gray-500 focus:ring-gray-400',
    }

    const base = [
        'inline-block rounded-full font-roboto font-semibold text-sm select-none',
        'px-5 py-2 sm:px-6 sm:py-2.5',          
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        fullWidth ? 'w-full text-center' : 'w-auto',  
        styles[variant],
    ].join(' ')

    if (to) return <Link to={to} className={base}>{children}</Link>
    return <button onClick={onClick} className={base}>{children}</button>
}

export default Button;