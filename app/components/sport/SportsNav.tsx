import { useRef, useState, useCallback, useMemo } from 'react';
import Button from '../common/Button';
import type { SportNavProps } from '~/models/sports';
import { getSportIcon } from '~/utils/matchUtils';
import { useSports } from '~/hooks/useSports';
import { getGroupedSports } from '~/utils/sportUtils';
import LoadingSpinner from '../common/LoadingSpinner';

export default function SportsNav({ onSportSelect, selectedSport }: SportNavProps) {
  const { sports, isLoading } = useSports();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const groupedSports = useMemo(() => getGroupedSports(sports), [sports]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleSportSelect = useCallback(
    (sportTitle: string) => {
      onSportSelect(sportTitle);
    },
    [onSportSelect]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="bg-primary-dark p-4 shadow-lg">
      <div className="container mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {groupedSports.map((sport) => (
            <Button
              key={sport.id}
              onClick={() => handleSportSelect(sport.title)}
              className={`flex flex-col items-center justify-center min-w-[100px] p-2 rounded-lg transition-colors cursor-pointer flex-shrink-0 select-none
                ${
                  selectedSport === sport.title
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-dark text-white'
                }`}
            >
              <span className="text-2xl sm:text-4xl mb-1">{getSportIcon(sport.title)}</span>
              <span className="text-sm whitespace-nowrap">{sport.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
