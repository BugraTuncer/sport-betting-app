import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import MainLayout from '~/components/layout/MainLayout';
import Button from '~/components/common/Button';
import ConfirmationModal from '~/components/common/ConfirmationModal';
import { isSelectedMatch } from '~/utils/matchUtils';
import ProtectedRoute from '~/components/common/ProtectedRoute';
import { OutcomeBox } from './OutcomeBox';
import type { MatchDetailProps } from '~/models/matches';

const MatchDetail = ({
  matchInfos,
  matchOutcomes,
  showWarningModal,
  setShowWarningModal,
  onSelectOutcome,
  bets,
}: MatchDetailProps) => {
  const navigate = useNavigate();
  const { homeOutcome, drawOutcome, awayOutcome } = matchOutcomes;
  const { home_team, away_team, commence_time, sport_title, id } = matchInfos;

  const formattedTime = new Date(commence_time).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ProtectedRoute>
      <MainLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-4"
        >
          <div className="bg-white rounded-lg shadow-md">
            <div
              className="flex flex-col mb-6 h-20 g-5 overflow-hidden text-center"
              style={{
                backgroundImage: 'url(/football-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '250px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            >
              <Button
                onClick={() => navigate('/')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-4 mt-4 ml-4 cursor-pointer"
              >
                {'<'}
              </Button>
              <div className="flex-1 gap-5 flex flex-col">
                <h1 className="text-2xl font-bold mb-2 text-white">{sport_title}</h1>
                <div className="text-white text-sm">{formattedTime}</div>
                <div className="text-white text-2xl">
                  {home_team} - {away_team}
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold p-3">Match Result</p>
              <div className="flex gap-2 p-3">
                <OutcomeBox
                  label="MR 1"
                  outcome={homeOutcome}
                  selected={isSelectedMatch(bets, id, homeOutcome?.name)}
                  onClick={() =>
                    homeOutcome &&
                    onSelectOutcome(id, homeOutcome, home_team, away_team, commence_time)
                  }
                />
                {drawOutcome && (
                  <OutcomeBox
                    label="MR X"
                    outcome={drawOutcome}
                    selected={isSelectedMatch(bets, id, drawOutcome?.name)}
                    onClick={() =>
                      drawOutcome &&
                      onSelectOutcome(id, drawOutcome, home_team, away_team, commence_time)
                    }
                  />
                )}
                <OutcomeBox
                  label="MR 2"
                  outcome={awayOutcome}
                  selected={isSelectedMatch(bets, id, awayOutcome?.name)}
                  onClick={() =>
                    awayOutcome &&
                    onSelectOutcome(id, awayOutcome, home_team, away_team, commence_time)
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>
      </MainLayout>

      <ConfirmationModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onConfirm={() => setShowWarningModal(false)}
        title="Warning"
        message="This match has already started. You cannot add it to your basket."
        showButtons={false}
      />
    </ProtectedRoute>
  );
};

export default MatchDetail;
