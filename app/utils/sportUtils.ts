import type { Sport } from '~/models/sports';

interface GroupedSport {
  id: string;
  title: string;
}

export const getGroupedSports = (sports: Sport[]): GroupedSport[] => {
  return sports
    .map((sport) => ({
      id: sport.key,
      title: sport.group,
    }))
    .filter((sport, index, self) => self.findIndex((t) => t.title === sport.title) === index)
    .sort((a, b) => {
      const priorityOrder = ['Soccer', 'Basketball', 'Tennis'];
      const aIndex = priorityOrder.indexOf(a.title);
      const bIndex = priorityOrder.indexOf(b.title);

      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });
};
