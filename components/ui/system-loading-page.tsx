export default function SystemLoadingPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', width: '100%' }}>
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: 'spin 1s linear infinite', display: 'block' }}
        >
            <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#2563eb"
                strokeWidth="4"
                strokeDasharray="90"
                strokeDashoffset="60"
                strokeLinecap="round"
            />
            <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
        </svg>
    </div>
    );
}