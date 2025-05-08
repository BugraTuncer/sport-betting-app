import Button from '../common/Button';
import type { SportNavProps } from '~/models/sports';

const sports = [
  { id: 'soccer', title: 'Football', icon: '⚽' },
  { id: 'cricket', title: 'Cricket', icon: '🏏' },
  { id: 'basketball', title: 'Basketball', icon: '🏀' },
  { id: 'volleyball', title: 'Volleyball', icon: '🏐' },
  { id: 'baseball', title: 'Baseball', icon: '⚾' },
  { id: 'tennis', title: 'Tennis', icon: '🎾' },
  { id: 'icehockey', title: 'Ice Hockey', icon: '🏒' },
  { id: 'handball', title: 'Handball', icon: '🤾' },
  { id: 'snooker', title: 'Snooker', icon: '🎱' },
];

export default function SportsNav({ onSportSelect, selectedSport }: SportNavProps) {
  return (
    <nav className="bg-primary-dark p-4 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4 overflow-x-auto">
          {sports.map((sport) => (
            <Button
              key={sport.id}
              onClick={() => onSportSelect(sport.id)}
              className={`flex flex-col items-center justify-center min-w-[100px] p-2 rounded-lg transition-colors cursor-pointer
                ${
                  selectedSport === sport.id
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-dark text-white'
                }`}
            >
              <span className="text-2xl sm:text-4xl mb-1">{sport.icon}</span>
              <span className="text-sm whitespace-nowrap">{sport.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
