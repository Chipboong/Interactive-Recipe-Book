import { useState } from "react"
import { EyeIcon, EyeOffIcon, RadioIcon, TickIcon} from "../assets/Pass_icon"

const REQUIREMENTS = [
    {
        key: "length",
        label: "At least 8 characters",
        test: (pw) => pw.length >= 8
    },
    {
        key: "mix",
        label: "Mix of upper and lower letters, numbers, and symbols",
        test: (pw) =>
            /[a-z]/.test(pw) &&
            /[A-Z]/.test(pw) &&
            /\d/.test(pw) &&
            /[^A-Za-z\d]/.test(pw)
    }
]

export default function PasswordField({ id, label = "Password", value, onChange, error, showHint = true, ...inputProps}) {
    const [visible, setVisible] = useState(false)

    const hintId = `${id}-hint`
    const errorId = `${id}-error`
    const hintShown = showHint && value.length > 0

    const describedBy =[hintShown && hintId, error && errorId].filter(Boolean).join(" ") || undefined

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    aria-invalid={error? "true" : undefined}
                    aria-describedby={describedBy}
                    style={{padding: '0.5rem 2.75rem 0.5rem 1rem'}}
                    className="w-full rounded-lg border border-gray-300 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-green focus:ring-1 focus:ring-green-700 [&::-ms-reveal]:hidden"
                    {...inputProps}
                />

                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    aria-pressed={visible}
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:text-primary-green focus-visible:ring-2 focus-visible:ring-primary-green"
                >
                    {visible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>

            {hintShown && (
                <ul
                    id={hintId}
                    aria-label="Password requirements"
                    className="mt-2 space-y-1"
                >
                    {REQUIREMENTS.map(({ key, label: text, test }) => {
                        const met = test(value);
                        return (
                            <li
                                key={key}
                                className={`flex items-center gap-2 text-xs transition-colors ${ met ? "text-primary-green" : "text-gray-600"}`}
                            >
                                {met ? <TickIcon /> : <RadioIcon />}
                                <span className="sr-only">
                                    {met ? "Met: ": "Not met: "}
                                </span>
                                {text}
                            </li>
                        );
                    })}
                </ul>
            )}

            {error && (
                <p id={errorId} role="alert" className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}