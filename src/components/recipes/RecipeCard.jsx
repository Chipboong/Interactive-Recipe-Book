import { useState } from 'react';

function HeartIcon({ filled }) {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true"
            fill={filled ? 'red' : 'none'}
            stroke={filled ? 'red' : 'grey'}
            strokeWidth="1.5"
            style={{ width: '1rem', height: '1rem', flexShrink: 0, transition: 'fill 0.2s ease, stroke 0.2s ease' }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
            style={{ width: '0.85rem', height: '0.85rem', flexShrink: 0 }}
        >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
    )
}

function TrashIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ width: '1.05rem', height: '1.05rem', flexShrink: 0 }}
        >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    )
}

function RecipeCard({ recipe, isFavorited = false, onFavoriteToggle, canDelete = false, onDelete }) {
    const { id, title, image, description, category, prepTime } = recipe
    const [deleting, setDeleting] = useState(false)

    function handleFavoriteClick(e) {
        e.stopPropagation()
        e.preventDefault()
        onFavoriteToggle?.(id)
    }
    async function handleDeleteClick(e) {
        e.stopPropagation()
        e.preventDefault()
        if (deleting) return
        if (!window.confirm(`Delete "${title}"?`)) return

        try {
            setDeleting(true)
            await onDelete?.(id)
        } catch (err) {
            alert(err?.response?.data?.error || 'Failed to delete recipe')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <article className="bg-white rounded-lg hover:shadow-md"
            style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)', transition: 'box-shadow 0.2s ease, transform 0.2s ease', overflow: "hidden", height: '100%' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            aria-label={`Recipe: ${title}`}
        >
            <div style={{ position: 'relative', aspectRatio: '5/3', overflow: 'hidden' }}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    style={{ transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

                />

                <span className='font-roboto absolute bottom-3 left-3'
                    style={{
                        fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.03em', textTransform: 'uppercase', color: 'white',
                        backgroundColor: 'green', backdropFilter: 'blur(4px)', padding: '0.2rem 0.6rem', borderRadius: '999px',
                    }}
                >
                    {category}
                </span>

                <button onClick={handleFavoriteClick}
                    aria-label={isFavorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
                    aria-pressed={isFavorited}
                    className="absolute top-3 right-3 rounded-full flex items-center justify-center hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                    style={{
                        width: '2rem', height: '2rem', backgroundColor: 'white', border: 'none', cursor: 'pointer',
                        transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                >
                    <HeartIcon filled={isFavorited} />
                </button>
            </div>

            {/* card body */}
            <div style={{ padding: '0.85rem 1rem 1rem' }}>
                <h3 className="font-roboto text-gray-900" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: '600', letterSpacing: '-0.01em', marginBottom: '0.35rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {title}
                </h3>

                <p className="font-roboto text-gray-500" style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.82rem)', lineHeight: '1.5', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span className="text-gray-400" style={{ display: 'flex', alignItems: 'center' }}>
                            <ClockIcon />
                        </span>
                        <span className="font-roboto text-gray-400" style={{ fontSize: 'clamp(0.75rem, 0.95vw, 0.85rem)' }}>
                            {prepTime}
                        </span>
                    </div>

                    {canDelete && (
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            disabled={deleting}
                            aria-label={`Delete ${title}`}
                            title="Delete recipe"
                            className="rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{
                                width: '2rem',
                                height: '2rem',
                                border: 'none',
                                cursor: deleting ? 'not-allowed' : 'pointer',
                                opacity: deleting ? 0.5 : 1,
                                transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
                            }}
                        >
                            <TrashIcon />
                        </button>
                    )}
                </div>

            </div>

        </article>
    )
}

export default RecipeCard;