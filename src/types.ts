export interface RSVP {
  id: string;
  fullName: string;
  village: string;
  attending: 'yes' | 'no';
  message: string;
  submittedAt: string;
}

export interface ProgramTimeline {
  time: string;
  title: string;
  description: string;
}

export interface PreWeddingEvent {
  title: string;
  date: string;
  venue: string;
  time: string;
}
