import { useState } from 'react';

interface TeamLogoProps {
    team: string;
    size?: number;
    className?: string;
}

function normalizeTeamName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export default function TeamLogo({ team, size = 48, className = '' }: TeamLogoProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className={`rounded-full bg-white/10 flex items-center justify-center font-bold ${className}`}
                style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
            >
                {team.charAt(0)}
            </div>
        );
    }

    return (
        <img
            src={`/images/teams/${normalizeTeamName(team)}.svg`}
            alt={`${team} logo`}
            width={size}
            height={size}
            className={`rounded-full object-contain ${className}`}
            onError={() => setFailed(true)}
        />
    );
}
