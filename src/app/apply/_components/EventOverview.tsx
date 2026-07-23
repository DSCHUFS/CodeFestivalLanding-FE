import * as pageStyles from '@/styles/page.css';
import { CodeFestivalEvent } from '@/types/application';

type EventOverviewProps = {
  event: CodeFestivalEvent;
};

const EventOverview = ({ event }: EventOverviewProps) => (
  <header className={pageStyles.header}>
    <h1 className={pageStyles.title}>{event.title} 참가신청서</h1>
  </header>
);

export default EventOverview;
